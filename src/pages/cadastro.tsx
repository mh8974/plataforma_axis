import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { 
  Eye, 
  EyeOff, 
  AlertCircle, 
  CheckCircle, 
  User, 
  Stethoscope,
  Users,
  MapPin,
  Clock,
  Calendar,
  Heart
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import Select from '@/components/ui/Select';
import Checkbox from '@/components/ui/Checkbox';
import apiService from '@/services/api';
import { Usuario } from '@/types';

interface CadastroFormData {
  nome: string;
  email: string;
  senha: string;
  confirmarSenha: string;
  tipo: 'PACIENTE' | 'TERAPEUTA';
  aceitaTermos: boolean;
  aceitaPrivacidade: boolean;
  receberEmails: boolean;
  
  
  tipoTerapia: 'INDIVIDUAL' | 'CASAL';
  modalidadeAtendimento: 'presencial' | 'online';
  cep: string;
  idade: number;
  sexualidade: 'FEMININO' | 'MASCULINO' | 'LGBTQIAPN+';
  diasDisponiveis: string[];
  horariosDisponiveis: { [key: string]: string[] };
}

const CadastroPage: React.FC = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [cadastroError, setCadastroError] = useState<string | null>(null);
  const [cadastroSuccess, setCadastroSuccess] = useState(false);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    control
  } = useForm<CadastroFormData>({
    defaultValues: {
      tipo: 'PACIENTE',
      receberEmails: true,
      diasDisponiveis: [],
      horariosDisponiveis: {}
    }
  });

  const watchedPassword = watch('senha');
  const watchedTipo = watch('tipo');
  const watchedDiasDisponiveis = watch('diasDisponiveis');

  const cadastroMutation = useMutation({
    mutationFn: (userData: Partial<Usuario>) => apiService.createUsuario(userData),
    onSuccess: (data: Usuario) => {
      setCadastroSuccess(true);
      setCadastroError(null);
      
      
      if (data.tipo === 'TERAPEUTA') {
        
        setTimeout(() => {
          router.push('/questionario-psicologo');
        }, 2000);
      } else {
        
        setTimeout(() => {
          router.push('/login?message=Conta criada com sucesso! Faça login para continuar.');
        }, 2000);
      }
    },
    onError: (error: any) => {
      
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          'Erro ao criar conta. Tente novamente.';
      setCadastroError(errorMessage);
    },
  });

  const onSubmit = (data: CadastroFormData) => {
    setCadastroError(null);
    
    if (data.senha !== data.confirmarSenha) {
      setCadastroError('As senhas não coincidem.');
      return;
    }

    cadastroMutation.mutate({
      nome: data.nome,
      email: data.email,
      senha: data.senha, 
      tipo: data.tipo,
      ativo: true
    });
  };

  const diasSemana = [
    { value: 'SEGUNDA', label: 'Segunda-feira' },
    { value: 'TERCA', label: 'Terça-feira' },
    { value: 'QUARTA', label: 'Quarta-feira' },
    { value: 'QUINTA', label: 'Quinta-feira' },
    { value: 'SEXTA', label: 'Sexta-feira' },
    { value: 'SABADO', label: 'Sábado' },
    { value: 'DOMINGO', label: 'Domingo' }
  ];

  const horarios = [
    '08:00', '09:00', '10:00', '11:00', '12:00', 
    '13:00', '14:00', '15:00', '16:00', '17:00', 
    '18:00', '19:00', '20:00', '21:00'
  ];

  const toggleDaySelection = (day: string) => {
    const newSelectedDays = watchedDiasDisponiveis.includes(day)
      ? watchedDiasDisponiveis.filter(d => d !== day)
      : [...watchedDiasDisponiveis, day];
    
    setValue('diasDisponiveis', newSelectedDays);
  };

  if (cadastroSuccess) {
    return (
      <Layout
        title="Conta criada com sucesso!"
        description="Sua conta AXIS foi criada com sucesso"
      >
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 flex items-center justify-center py-12 px-4">
          <div className="max-w-md w-full">
            <Card className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                Conta criada com sucesso!
              </h2>
              <p className="text-neutral-600 mb-6">
                Você será redirecionado para a página de login em alguns segundos...
              </p>
              <Link href="/login">
                <Button size="lg" className="w-full">
                  Ir para Login
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title="Criar conta gratuita"
      description="Crie sua conta AXIS e comece sua jornada de bem-estar mental"
    >
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl w-full space-y-8">
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
              Criar conta gratuita
            </h2>
            <p className="text-neutral-600">
              Junte-se à nossa comunidade e comece sua jornada hoje.
            </p>
          </div>

          {}
          <Card className="p-8">
            {cadastroError && (
              <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-red-800">Erro no cadastro</h3>
                  <p className="text-sm text-red-700 mt-1">{cadastroError}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-3">
                  Qual é o seu perfil?
                </label>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => setValue('tipo', 'PACIENTE')}
                    className={`p-4 border-2 rounded-lg text-left transition-colors ${
                      watchedTipo === 'PACIENTE'
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-neutral-300 hover:border-neutral-400'
                    }`}
                  >
                    <User className="w-6 h-6 mb-2 text-primary-600" />
                    <div className="font-medium text-neutral-900">Paciente</div>
                    <div className="text-sm text-neutral-600">Busco apoio psicológico</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setValue('tipo', 'TERAPEUTA')}
                    className={`p-4 border-2 rounded-lg text-left transition-colors ${
                      watchedTipo === 'TERAPEUTA'
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-neutral-300 hover:border-neutral-400'
                    }`}
                  >
                    <Stethoscope className="w-6 h-6 mb-2 text-primary-600" />
                    <div className="font-medium text-neutral-900">Profissional</div>
                    <div className="text-sm text-neutral-600">Ofereço atendimento</div>
                  </button>
                </div>
              </div>

              {}
              <div>
                <label htmlFor="nome" className="block text-sm font-medium text-neutral-700 mb-2">
                  Nome completo
                </label>
                <Input
                  id="nome"
                  type="text"
                  placeholder="Digite seu nome completo"
                  {...register('nome', {
                    required: 'Nome é obrigatório',
                    minLength: {
                      value: 2,
                      message: 'Nome deve ter pelo menos 2 caracteres'
                    }
                  })}
                  error={errors.nome?.message}
                  disabled={cadastroMutation.isPending}
                />
              </div>

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
                  disabled={cadastroMutation.isPending}
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
                    placeholder="Digite uma senha segura"
                    {...register('senha', {
                      required: 'Senha é obrigatória',
                      minLength: {
                        value: 8,
                        message: 'Senha deve ter pelo menos 8 caracteres'
                      },
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                        message: 'Senha deve conter ao menos uma letra minúscula, maiúscula e um número'
                      }
                    })}
                    error={errors.senha?.message}
                    disabled={cadastroMutation.isPending}
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
              <div>
                <label htmlFor="confirmarSenha" className="block text-sm font-medium text-neutral-700 mb-2">
                  Confirmar senha
                </label>
                <div className="relative">
                  <Input
                    id="confirmarSenha"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Digite a senha novamente"
                    {...register('confirmarSenha', {
                      required: 'Confirmação de senha é obrigatória',
                      validate: (value) => 
                        value === watchedPassword || 'As senhas não coincidem'
                    })}
                    error={errors.confirmarSenha?.message}
                    disabled={cadastroMutation.isPending}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-neutral-400 hover:text-neutral-600" />
                    ) : (
                      <Eye className="h-4 w-4 text-neutral-400 hover:text-neutral-600" />
                    )}
                  </button>
                </div>
              </div>

              {}
              {watchedTipo === 'PACIENTE' && (
                <div className="space-y-8">
                  {}
                  <div>
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="p-2 bg-primary-100 rounded-lg">
                        <Users className="w-5 h-5 text-primary-600" />
                      </div>
                      <h3 className="text-xl font-bold text-neutral-900">Tipo de Terapia</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-3">
                          Tipo de Terapia *
                        </label>
                        <Controller
                          name="tipoTerapia"
                          control={control}
                          rules={{ required: 'Tipo de terapia é obrigatório' }}
                          render={({ field }) => (
                            <Select
                              options={[
                                { value: 'INDIVIDUAL', label: 'Individual' },
                                { value: 'CASAL', label: 'Casal' }
                              ]}
                              value={field.value}
                              onValueChange={field.onChange}
                              placeholder="Selecione o tipo de terapia"
                              disabled={cadastroMutation.isPending}
                            />
                          )}
                        />
                        {errors.tipoTerapia && (
                          <p className="text-red-600 text-sm mt-1">{errors.tipoTerapia.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-3">
                          Modalidade de Atendimento *
                        </label>
                        <Controller
                          name="modalidadeAtendimento"
                          control={control}
                          rules={{ required: 'Modalidade de atendimento é obrigatória' }}
                          render={({ field }) => (
                            <Select
                              options={[
                                { value: 'presencial', label: 'Presencial' },
                                { value: 'online', label: 'Online' }
                              ]}
                              value={field.value}
                              onValueChange={field.onChange}
                              placeholder="Selecione a modalidade"
                              disabled={cadastroMutation.isPending}
                            />
                          )}
                        />
                        {errors.modalidadeAtendimento && (
                          <p className="text-red-600 text-sm mt-1">{errors.modalidadeAtendimento.message}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {}
                  <div>
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="p-2 bg-primary-100 rounded-lg">
                        <MapPin className="w-5 h-5 text-primary-600" />
                      </div>
                      <h3 className="text-xl font-bold text-neutral-900">Localização</h3>
                    </div>
                    
                    <div>
                      <label htmlFor="cep" className="block text-sm font-medium text-neutral-700 mb-2">
                        CEP *
                      </label>
                      <Input
                        id="cep"
                        type="text"
                        placeholder="00000-000"
                        {...register('cep', {
                          required: 'CEP é obrigatório',
                          pattern: {
                            value: /^\d{5}-\d{3}$/,
                            message: 'CEP inválido (formato: 00000-000)'
                          }
                        })}
                        error={errors.cep?.message}
                        disabled={cadastroMutation.isPending}
                      />
                    </div>
                  </div>

                  {}
                  <div>
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="p-2 bg-primary-100 rounded-lg">
                        <User className="w-5 h-5 text-primary-600" />
                      </div>
                      <h3 className="text-xl font-bold text-neutral-900">Informações Pessoais</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="idade" className="block text-sm font-medium text-neutral-700 mb-2">
                          Idade *
                        </label>
                        <Input
                          id="idade"
                          type="number"
                          placeholder="25"
                          {...register('idade', {
                            required: 'Idade é obrigatória',
                            min: {
                              value: 18,
                              message: 'Idade mínima é 18 anos'
                            },
                            max: {
                              value: 120,
                              message: 'Idade máxima é 120 anos'
                            }
                          })}
                          error={errors.idade?.message}
                          disabled={cadastroMutation.isPending}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-3">
                          Sexualidade *
                        </label>
                        <Controller
                          name="sexualidade"
                          control={control}
                          rules={{ required: 'Sexualidade é obrigatória' }}
                          render={({ field }) => (
                            <Select
                              options={[
                                { value: 'FEMININO', label: 'Feminino' },
                                { value: 'MASCULINO', label: 'Masculino' },
                                { value: 'LGBT', label: 'LGBTQIAPN+' }
                              ]}
                              value={field.value}
                              onValueChange={field.onChange}
                              placeholder="Selecione sua sexualidade"
                              disabled={cadastroMutation.isPending}
                            />
                          )}
                        />
                        {errors.sexualidade && (
                          <p className="text-red-600 text-sm mt-1">{errors.sexualidade.message}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {}
                  <div>
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="p-2 bg-primary-100 rounded-lg">
                        <Clock className="w-5 h-5 text-primary-600" />
                      </div>
                      <h3 className="text-xl font-bold text-neutral-900">Disponibilidade</h3>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-3">
                          Dias Disponíveis *
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                          {diasSemana.map((dia) => (
                            <Controller
                              key={dia.value}
                              name="diasDisponiveis"
                              control={control}
                              rules={{ required: 'Selecione pelo menos um dia disponível' }}
                              render={({ field }) => (
                                <Checkbox
                                  id={`dia-${dia.value}`}
                                  label={dia.label}
                                  checked={field.value?.includes(dia.value) ?? false}
                                  onCheckedChange={(checked) => {
                                    const newValue = checked
                                      ? [...(field.value || []), dia.value]
                                      : (field.value || []).filter((v: string) => v !== dia.value);
                                    field.onChange(newValue);
                                  }}
                                  disabled={cadastroMutation.isPending}
                                />
                              )}
                            />
                          ))}
                        </div>
                        {errors.diasDisponiveis && (
                          <p className="text-red-600 text-sm mt-2">{errors.diasDisponiveis.message}</p>
                        )}
                      </div>

                      {watchedDiasDisponiveis.length > 0 && (
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-3">
                            Horários Disponíveis *
                          </label>
                          <div className="space-y-4">
                            {watchedDiasDisponiveis.map((dia) => {
                              const diaLabel = diasSemana.find(d => d.value === dia)?.label || dia;
                              return (
                                <div key={dia} className="border border-neutral-200 rounded-lg p-4">
                                  <h4 className="font-medium text-neutral-900 mb-3">{diaLabel}</h4>
                                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                                    {horarios.map((horario) => (
                                      <Controller
                                        key={`${dia}-${horario}`}
                                        name={`horariosDisponiveis.${dia}`}
                                        control={control}
                                        render={({ field }) => {
                                          const currentValue = field.value || [];
                                          return (
                                            <Checkbox
                                              id={`horario-${dia}-${horario}`}
                                              label={horario}
                                              checked={currentValue.includes(horario)}
                                              onCheckedChange={(checked) => {
                                                const newValue = checked
                                                  ? [...currentValue, horario]
                                                  : currentValue.filter((h: string) => h !== horario);
                                                field.onChange(newValue);
                                              }}
                                              disabled={cadastroMutation.isPending}
                                            />
                                          );
                                        }}
                                      />
                                    ))}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {}
              <div className="space-y-4">
                <div className="flex items-start">
                  <input
                    id="aceitaTermos"
                    type="checkbox"
                    {...register('aceitaTermos', {
                      required: 'Você deve aceitar os termos de uso'
                    })}
                    className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                    disabled={cadastroMutation.isPending}
                  />
                  <label htmlFor="aceitaTermos" className="ml-3 text-sm text-neutral-700">
                    Eu aceito os{' '}
                    <Link href="/termos" className="text-primary-600 hover:text-primary-700">
                      Termos de Uso
                    </Link>
                    {' '}e a{' '}
                    <Link href="/privacidade" className="text-primary-600 hover:text-primary-700">
                      Política de Privacidade
                    </Link>
                    {errors.aceitaTermos && (
                      <span className="block text-red-600 text-xs mt-1">
                        {errors.aceitaTermos.message}
                      </span>
                    )}
                  </label>
                </div>

                <div className="flex items-start">
                  <input
                    id="receberEmails"
                    type="checkbox"
                    {...register('receberEmails')}
                    className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                    disabled={cadastroMutation.isPending}
                  />
                  <label htmlFor="receberEmails" className="ml-3 text-sm text-neutral-700">
                    Desejo receber emails com dicas de bem-estar e novidades da plataforma
                  </label>
                </div>
              </div>

              {}
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={cadastroMutation.isPending}
              >
                {cadastroMutation.isPending ? 'Criando conta...' : 'Criar conta gratuita'}
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
                    Já tem uma conta?
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <Link href="/login">
                  <Button variant="outline" size="lg" className="w-full">
                    Fazer login
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default CadastroPage;