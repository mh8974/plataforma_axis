import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import apiService from '@/services/api';


export default function ResetarSenha() {
  const router = useRouter();
  const { token } = router.query;

  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [tokenValido, setTokenValido] = useState<boolean | null>(null);
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  
  useEffect(() => {
    
    if (!router.isReady) return;

    
    if (!token) {
      router.push('/resetar-senha/solicitar');
      return;
    }

    
    if (typeof token === 'string') {
      validarToken(token);
    }
  }, [router.isReady, token, router]);

  const validarToken = async (tokenString: string) => {
    try {
      const valido = await apiService.validarTokenReset(tokenString);
      setTokenValido(valido);
      if (!valido) {
        setErro('Token inválido ou expirado');
      }
    } catch (error) {
      
      setTokenValido(false);
      setErro('Token inválido ou expirado');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');

    
    if (novaSenha !== confirmarSenha) {
      setErro('As senhas não coincidem');
      return;
    }

    if (novaSenha.length < 8) {
      setErro('A senha deve ter no mínimo 8 caracteres');
      return;
    }

    
    const senhaForteRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!senhaForteRegex.test(novaSenha)) {
      setErro('A senha deve conter: maiúsculas, minúsculas, números e caracteres especiais (@$!%*?&)');
      return;
    }

    setLoading(true);

    try {
      await apiService.confirmarResetSenha({
        token: token as string,
        novaSenha,
        confirmarSenha
      });

      setSucesso(true);

      
      setTimeout(() => {
        router.push('/login?message=Senha alterada com sucesso');
      }, 3000);
    } catch (error: any) {
      
      setErro(error.response?.data?.error || 'Erro ao redefinir senha. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  
  if (tokenValido === null) {
    return (
      <>
        <Head>
          <title>Validando Token - AXIS</title>
        </Head>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700">
          <div className="text-center">
            <svg
              className="animate-spin h-16 w-16 text-white mx-auto mb-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <p className="text-white text-lg">Validando token...</p>
          </div>
        </div>
      </>
    );
  }

  
  if (tokenValido === false) {
    return (
      <>
        <Head>
          <title>Token Inválido - AXIS</title>
        </Head>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700 px-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                <svg
                  className="h-10 w-10 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Token Inválido ou Expirado
              </h2>

              <p className="text-gray-600 mb-6">
                O link de recuperação que você tentou usar não é válido ou já expirou.
                Por motivos de segurança, Tokens de recuperação de senha expiram após 15 minutos.
              </p>

              <div className="space-y-3">
                <button
                  onClick={() => router.push('/resetar-senha/solicitar')}
                  className="w-full bg-purple-600 text-white py-3 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-150"
                >
                  Solicitar Novo Link
                </button>

                <button
                  onClick={() => router.push('/login')}
                  className="w-full bg-gray-200 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-150"
                >
                  Voltar para o Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  
  if (sucesso) {
    return (
      <>
        <Head>
          <title>Senha Alterada - AXIS</title>
        </Head>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700 px-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                <svg
                  className="h-10 w-10 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Senha Alterada com Sucesso!
              </h2>

              <p className="text-gray-600 mb-6">
                Sua senha foi redefinida com sucesso. Você já pode fazer login com sua nova senha.
              </p>

              <p className="text-sm text-gray-500 mb-6">
                Redirecionando para a página de login em 3 segundos...
              </p>

              <button
                onClick={() => router.push('/login')}
                className="w-full bg-purple-600 text-white py-3 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-150"
              >
                Ir para o Login Agora
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  
  return (
    <>
      <Head>
        <title>Redefinir Senha - AXIS</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700 px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-purple-100 mb-4">
              <svg
                className="h-10 w-10 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Redefinir Senha
            </h2>
            <p className="text-gray-600">
              Digite sua nova senha abaixo.
            </p>
          </div>

          {erro && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
              <p className="text-sm text-red-700">{erro}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="novaSenha"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Nova Senha
              </label>
              <div className="relative">
                <input
                  id="novaSenha"
                  name="novaSenha"
                  type={mostrarSenha ? 'text' : 'password'}
                  required
                  value={novaSenha}
                  onChange={(e) => setNovaSenha(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-10"
                  placeholder="Mínimo 8 caracteres"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {mostrarSenha ? (
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Deve conter: maiúsculas, minúsculas, números e caracteres especiais
              </p>
            </div>

            <div>
              <label
                htmlFor="confirmarSenha"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Confirmar Nova Senha
              </label>
              <input
                id="confirmarSenha"
                name="confirmarSenha"
                type={mostrarSenha ? 'text' : 'password'}
                required
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Digite a senha novamente"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 text-white py-3 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Alterando Senha...
                </span>
              ) : (
                'Redefinir Senha'
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Por motivos de segurança, o token expira em 15 minutos.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
