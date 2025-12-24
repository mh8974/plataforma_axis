import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import apiService from '@/services/api';
import { LoginRequest, AuthResponse } from '@/types';

interface LoginFormData {
  email: string;
  senha: string;
  rememberMe: boolean;
}

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [shouldShowError, setShouldShowError] = useState(false);
  const [errorType, setErrorType] = useState<'USER_NOT_FOUND' | 'INVALID_PASSWORD' | 'OTHER' | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>();

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginRequest & { rememberMe?: boolean }) => apiService.login(credentials),
    onSuccess: (data: AuthResponse) => {
      

      
      setLoginError(null);
      setErrorType(null);
      setShouldShowError(false);

      
      if (data.usuario.statusPerfil === 'INCOMPLETO') {
        
        
        if (typeof window !== 'undefined') {
          localStorage.setItem('usuarioId', data.usuario.id.toString());

          if (data.usuario.cpf) {
            localStorage.setItem('userCpf', data.usuario.cpf);
          }
        }

        
        verificarProximaEtapa(data.usuario);
      } else {
        
        redirecionarParaDashboard(data.usuario.tipo);
      }
    },
    onError: (error: any) => {
      

      
      let errorMessage = 'Credenciais inválidas. Verifique seu email e senha.';
      let type: 'USER_NOT_FOUND' | 'INVALID_PASSWORD' | 'OTHER' = 'OTHER';

      if (error?.response?.data) {
        const errorData = error.response.data;

        
        if (errorData.errorType) {
          type = errorData.errorType;
          errorMessage = errorData.error || errorMessage;
        } else {
          
          if (typeof errorData === 'string') {
            errorMessage = errorData;
          } else if (errorData.message) {
            errorMessage = errorData.message;
          } else if (errorData.error) {
            errorMessage = errorData.error;
          }

          
          if (error.response.status === 404) {
            type = 'USER_NOT_FOUND';
            errorMessage = 'Usuário não encontrado';
          } else if (error.response.status === 401) {
            type = 'INVALID_PASSWORD';
          } else if (error.response.status === 403) {
            errorMessage = 'Acesso negado. Sua conta pode estar inativa. Entre em contato com o suporte.';
          } else if (error.response.status >= 500) {
            errorMessage = 'Erro no servidor. Por favor, tente novamente em alguns instantes.';
          }
        }
      } else if (error?.message) {
        if (error.message.toLowerCase().includes('network')) {
          errorMessage = 'Erro de conexão. Verifique sua internet e tente novamente.';
        } else {
          errorMessage = error.message;
        }
      }

      
      setLoginError(errorMessage);
      setErrorType(type);
      setShouldShowError(true);
    },
  });

  const onSubmit = (data: LoginFormData) => {
    
    loginMutation.mutate({
      email: data.email,
      senha: data.senha,
      rememberMe: data.rememberMe
    });
  };

  
  const handleFieldFocus = () => {
    if (shouldShowError) {
      setLoginError(null);
      setErrorType(null);
      setShouldShowError(false);
    }
  };

  
  const verificarProximaEtapa = async (usuario: any) => {
    try {
      const response = await apiService.getStatusCadastro(usuario.id);

      if (response.statusPerfil === 'INCOMPLETO') {
        
        
        if (usuario.tipo === 'TERAPEUTA') {
          alert('Seu cadastro está incompleto. Por favor, complete as informações profissionais.');
          router.push('/profissional/informacoes-pessoais');
        } else if (usuario.tipo === 'PACIENTE') {
          
          try {
            const pacienteData = await apiService.recuperarProgressoPaciente(usuario.id);

            
            if (pacienteData && (pacienteData.problemaPrincipal || pacienteData.faixaSalarial)) {
              alert('Seu cadastro está incompleto. Por favor, complete suas preferências de terapia.');

              
              sessionStorage.setItem('usuarioId', usuario.id.toString());
              if (usuario.cpf) {
                sessionStorage.setItem('userCpf', usuario.cpf);
              }

              router.push('/paciente/questionario-paciente');
            } else {
              
              alert('Seu cadastro está incompleto. Por favor, complete o questionário de foco.');

              
              sessionStorage.setItem('usuarioId', usuario.id.toString());
              if (usuario.cpf) {
                sessionStorage.setItem('userCpf', usuario.cpf);
              }

              router.push('/paciente/questionario-foco');
            }
          } catch (error) {
            
            

            sessionStorage.setItem('usuarioId', usuario.id.toString());
            if (usuario.cpf) {
              sessionStorage.setItem('userCpf', usuario.cpf);
            }

            alert('Seu cadastro está incompleto. Por favor, complete o questionário de foco.');
            router.push('/paciente/questionario-foco');
          }
        }
      } else {
        
        redirecionarParaDashboard(usuario.tipo);
      }
    } catch (error) {
      
      
      redirecionarParaDashboard(usuario.tipo);
    }
  };

  
  const redirecionarParaDashboard = (tipo: string) => {
    if (tipo === 'PACIENTE') {
      router.push('/pacientes/dashboard');
    } else if (tipo === 'TERAPEUTA') {
      router.push('/terapeutas/dashboard');
    } else if (tipo === 'ADMINISTRADOR') {
      router.push('/admin/dashboard');
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <Layout
      title="Entrar na sua conta"
      description="Acesse sua conta AXIS para continuar sua jornada de bem-estar mental"
    >
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {}
          <div className="text-center">
            <Link href="/" className="inline-flex items-center space-x-3 mb-8">
              <img 
                src="/logo-axis.png" 
                alt="AXIS Logo" 
                className="w-12 h-12 object-contain"
              />
            </Link>
            
            <h2 className="text-3xl font-bold text-neutral-900 mb-2">
              Entre na sua conta
            </h2>
            <p className="text-neutral-600">
              Bem-vindo de volta! Continue sua jornada de bem-estar mental.
            </p>
          </div>

          {}
          <Card className="p-8">
            {shouldShowError && loginError && (
              <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-red-800">Erro no login</h3>
                  <p className="text-sm text-red-700 mt-1">{loginError}</p>

                  {errorType === 'USER_NOT_FOUND' && (
                    <p className="text-sm text-red-700 mt-2">
                      Novo usuário?{' '}
                      <Link href="/profissional/cadastro" className="font-semibold text-primary-600 hover:text-primary-700 underline">
                        Cadastre-se aqui
                      </Link>
                    </p>
                  )}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu.email@exemplo.com"
                  {...register('email', {
                    required: 'Email é obrigatório',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Email inválido'
                    }
                  })}
                  error={errors.email?.message}
                  disabled={loginMutation.isPending}
                  onFocus={handleFieldFocus}
                />
              </div>

              {}
              <div>
                <label htmlFor="senha" className="block text-sm font-medium text-neutral-700 mb-2">
                  Senha
                </label>
                <div className="relative">
                  <Input
                    id="senha"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Digite sua senha"
                    {...register('senha', {
                      required: 'Senha é obrigatória',
                      minLength: {
                        value: 6,
                        message: 'Senha deve ter pelo menos 6 caracteres'
                      }
                    })}
                    error={errors.senha?.message}
                    disabled={loginMutation.isPending}
                    onFocus={handleFieldFocus}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-neutral-400 hover:text-neutral-600" />
                    ) : (
                      <Eye className="h-4 w-4 text-neutral-400 hover:text-neutral-600" />
                    )}
                  </button>
                </div>
              </div>

              {}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="rememberMe"
                    type="checkbox"
                    {...register('rememberMe')}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                    disabled={loginMutation.isPending}
                  />
                  <label htmlFor="rememberMe" className="ml-2 block text-sm text-neutral-700">
                    Lembrar de mim
                  </label>
                </div>

                <Link
                  href="/resetar-senha/solicitar"
                  className="text-sm text-primary-600 hover:text-primary-700"
                >
                  Esqueci minha senha
                </Link>
              </div>

              {}
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>

            {}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-neutral-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-neutral-500">
                    Não tem uma conta?
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <Link href="#">
                  <Button variant="outline" size="lg" className="w-full">
                    Criar conta gratuita
                  </Button>
                </Link>
              </div>
            </div>
          </Card>

          {}
          <div className="text-center text-sm text-neutral-600">
            <p>
              Ao continuar, você concorda com nossos{' '}
              <Link href="/termos" className="text-primary-600 hover:text-primary-700">
                Termos de Uso
              </Link>{' '}
              e{' '}
              <Link href="/privacidade" className="text-primary-600 hover:text-primary-700">
                Política de Privacidade
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;