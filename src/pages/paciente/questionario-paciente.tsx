import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import {
  Users,
  Heart,
  CheckCircle,
  User,
  Loader2,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";
import Select from "@/components/ui/Select";
import TextArea from "@/components/ui/TextArea";
import MultiSelect from "@/components/ui/MultiSelect";
import SecaoDisponibilidade from "@/components/shared/SecaoDisponibilidade";
import { QuestionarioPacienteData } from "@/types/formularios";
import { useAuth } from "@/hooks/useAuth";
import apiService from "@/services/api";
import authService from "@/services/authService";
import {
  TIPO_TERAPIA_OPTIONS,
  MODALIDADE_ATENDIMENTO_OPTIONS,
  SEXUALIDADE_OPTIONS,
  VALIDATION_PATTERNS,
  FAIXA_SALARIAL_OPTIONS,
  FREQUENCIA_SESSOES_OPTIONS,
  DURACAO_TRATAMENTO_OPTIONS,
  GENERO_TERAPEUTA_OPTIONS,
  FAIXA_ETARIA_TERAPEUTA_OPTIONS,
  ORIENTACAO_SEXUAL_OPTIONS,
  IDENTIDADE_GENERO_OPTIONS,
  ABORDAGEM_TERAPEUTICA_ANTERIOR_OPTIONS,
  ESCOLARIDADE_OPTIONS,
  MORA_COM_OPTIONS
} from "@/constants/formularios";
import { religioes, estadosCivis } from "@/components/formulario-profissional/informacoes-pessoais/constants";
import { validateField } from "@/utils/validacao";
import CampoData from "@/components/formulario-profissional/campos/CampoData";
import SecaoTermos from "@/components/shared/SecaoTermos";
import { applyCepMask } from "@/utils/mascaras";
import axios from "axios";
import { useQuestionarioPaciente } from "@/hooks/useQuestionarioPaciente";

const QuestionarioPacientePage: React.FC = () => {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading, user } = useAuth();
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [loadingCep, setLoadingCep] = useState(false);
  const [progressoRecuperado, setProgressoRecuperado] = useState(false);

  
  const { salvarProgresso, recuperarProgresso } = useQuestionarioPaciente();

  const methods = useForm<QuestionarioPacienteData>({
    defaultValues: {
      diasDisponiveis: [],
      horariosDisponiveis: {},
      receberEmails: true,
      cpf: "",
      ddi: "+55",
      telefone: "",
      nivelUrgencia: 5,
      flexibilidadeHorarios: false,
      possuiConvenio: false,
      dispostoParticular: true,
      possuiApoioFinanceiro: false,
      historicoTerapia: false,
      acompanhamentoPsiquiatrico: false,
      lgbtqSupportImportante: false,
      questoesReligiosasImportantes: false,
      interesseGruposTerapia: false,
      disponibilidadeTarefasCasa: true,
      experienciaAutoconhecimento: 5,
      experienciaAvaliacao: 5,
    },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
    getValues,
  } = methods;

  
  const isFluxoCadastro = typeof window !== 'undefined' && sessionStorage.getItem('usuarioId') !== null;

  
  useEffect(() => {
    if (!authLoading && !isFluxoCadastro) {
      
      if (!isAuthenticated || !user) {
        router.push('/login');
        return;
      }
      if (user.tipo !== 'PACIENTE') {
        router.push('/login');
        return;
      }
    }
  }, [isAuthenticated, authLoading, user, router, isFluxoCadastro]);

  
  if (!isFluxoCadastro && (authLoading || !isAuthenticated || !user || user.tipo !== 'PACIENTE')) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
        </div>
      </Layout>
    );
  }

  
  useEffect(() => {
    const recuperar = async () => {
      
      const usuarioId = user?.id || (typeof window !== 'undefined' ? sessionStorage.getItem('usuarioId') : null);

      if (!usuarioId) {
        
        return;
      }

      
      const isFluxoContinuo = sessionStorage.getItem('fluxoContinuo') === 'true';

      try {
        const dados = await recuperarProgresso();

        if (dados) {
          
          Object.keys(dados).forEach((key) => {
            if (dados[key] !== undefined && dados[key] !== null) {
              setValue(key as any, dados[key]);
            }
          });

          

          
          if (!isFluxoContinuo) {
            alert('Dados anteriores recuperados! Você pode continuar de onde parou.');
          }
        }
      } catch (error) {
        
      } finally {
        setProgressoRecuperado(true);

        
        if (isFluxoContinuo) {
          sessionStorage.removeItem('fluxoContinuo');
        }
      }
    };

    if (!progressoRecuperado) {
      recuperar();
    }
  }, [progressoRecuperado, recuperarProgresso, setValue]);

  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [submitSuccess]);

  const watchedTipoTerapia = watch("tipoTerapia");
  const watchedModalidadeAtendimento = watch("modalidadeAtendimento");
  const watchedAceitaTermos = watch("aceitaTermos");
  const watchedCep = watch("cep");
  const watchedFaixaSalarial = watch("faixaSalarial");
  const watchedEstadoCivil = watch("estadoCivil");
  const watchedReligiao = watch("religiao");
  const watchedOrientacaoSexual = watch("orientacaoSexual");

  
  const modalidadeOpcoesDisponiveis = watchedTipoTerapia === "GRUPO"
    ? MODALIDADE_ATENDIMENTO_OPTIONS.filter(option => option.value === "online")
    : MODALIDADE_ATENDIMENTO_OPTIONS;

  
  const shouldDisableIdentidadeGenero = Boolean(
    watchedOrientacaoSexual && [
      "heterossexual",
      "homossexual",
      "prefiro_nao_informar"
    ].includes(watchedOrientacaoSexual)
  );

  
  useEffect(() => {
    if (shouldDisableIdentidadeGenero) {
      setValue("identidadeGenero", undefined);
    }
  }, [shouldDisableIdentidadeGenero, setValue]);

  
  useEffect(() => {
    if (watchedTipoTerapia === "GRUPO") {
      
      if (watchedModalidadeAtendimento && watchedModalidadeAtendimento !== "online") {
        alert("Terapia em grupo está disponível apenas na modalidade online. A modalidade foi ajustada automaticamente.");
        setValue("modalidadeAtendimento", "online");
        setValue("cep", ""); 
      } else if (!watchedModalidadeAtendimento) {
        
        setValue("modalidadeAtendimento", "online");
      }
    }
  }, [watchedTipoTerapia, watchedModalidadeAtendimento, setValue]);

  
  useEffect(() => {
    if (watchedCep && watchedCep.length >= 8) {
      const cleanCep = watchedCep.replace(/\D/g, '');

      if (cleanCep.length === 8) {
        const fetchCepInfo = async () => {
          setLoadingCep(true);
          try {
            const response = await axios.get(`https://viacep.com.br/ws/${cleanCep}/json/`);

            if (!response.data.erro) {

              const cidadeEstado = `${response.data.localidade} - ${response.data.uf}`;
              setValue("localizacao", cidadeEstado);
            }
          } catch (error) {
            
          } finally {
            setLoadingCep(false);
          }
        };

        fetchCepInfo();
      }
    } else if (!watchedCep || watchedCep.length === 0) {
      
      setValue("localizacao", "");
    }
  }, [watchedCep, watchedModalidadeAtendimento, setValue]);

  const finalizarCadastroMutation = useMutation({
    mutationFn: async (data: Partial<QuestionarioPacienteData>) => {
      try {
        
        const usuarioId = user?.id || (typeof window !== 'undefined' ? parseInt(sessionStorage.getItem('usuarioId') || '0') : 0);

        if (!usuarioId) {
          throw new Error("ID do usuário não encontrado. Por favor, faça login novamente.");
        }

        
        const questionarioCompleto = {
          usuarioId: usuarioId,
          ...data,
        };

        
        const result = await apiService.completarQuestionarioPaciente(questionarioCompleto);
        return result;
      } catch (error) {
        
        throw error;
      }
    },
    onSuccess: async () => {
      try {
        
        const email = sessionStorage.getItem('userEmail');
        const senha = sessionStorage.getItem('userPassword');

        if (email && senha) {
          
          
          await apiService.login({
            email,
            senha,
            rememberMe: false  
          });

          
        }

        
        authService.clearCadastroData();

        
        setSubmitSuccess(true);

        
        setTimeout(() => {
          router.push('/pacientes/dashboard');
        }, 2000);

      } catch (error) {
        
        
        setTimeout(() => {
          router.push('/login?message=Cadastro concluído! Faça login para continuar.');
        }, 2000);
      }
    },
    onError: (error: any) => {
      
      alert(error.response?.data?.message || "Erro ao completar questionário. Tente novamente.");
    },
  });

  const onSubmit = (data: QuestionarioPacienteData) => {
    
    const dadosMapeados = mapearDadosParaBackend(data);

    
    
    
    

    
    finalizarCadastroMutation.mutate(dadosMapeados);
  };

  
  const converterDataParaISO = (dataBrasileira: string): string | undefined => {
    if (!dataBrasileira) return undefined;

    const [dia, mes, ano] = dataBrasileira.split('/').map(Number);

    
    if (!dia || !mes || !ano || dia < 1 || dia > 31 || mes < 1 || mes > 12 || ano < 1900) {
      return undefined;
    }

    
    const mesFormatado = mes.toString().padStart(2, '0');
    const diaFormatado = dia.toString().padStart(2, '0');

    return `${ano}-${mesFormatado}-${diaFormatado}`;
  };

  
  const calcularIdade = (dataNascimento: string): number => {
    if (!dataNascimento) return 0;

    const [dia, mes, ano] = dataNascimento.split('/').map(Number);
    const nascimento = new Date(ano, mes - 1, dia);
    const hoje = new Date();

    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mesAtual = hoje.getMonth();
    const diaAtual = hoje.getDate();

    if (mesAtual < mes - 1 || (mesAtual === mes - 1 && diaAtual < dia)) {
      idade--;
    }

    return idade;
  };

  
  const transformarHorarios = (horariosDisponiveis: { [key: string]: string[] }): string[] => {
    if (!horariosDisponiveis || typeof horariosDisponiveis !== 'object') {
      return [];
    }

    const todosHorarios = Object.values(horariosDisponiveis).flat();
    const horariosUnicos = Array.from(new Set(todosHorarios));

    
    const periodos = new Set<string>();
    horariosUnicos.forEach(horario => {
      const hora = parseInt(horario.split(':')[0]);
      if (hora >= 6 && hora < 12) periodos.add('manha');
      else if (hora >= 12 && hora < 18) periodos.add('tarde');
      else if (hora >= 18 || hora < 6) periodos.add('noite');
    });

    return Array.from(periodos);
  };

  
  const mapearDadosParaBackend = (formData: any) => {
    
    const idade = formData.dataNascimento ? calcularIdade(formData.dataNascimento) : undefined;

    
    let sexo = formData.sexualidade;
    if (sexo === "FEMININO") sexo = "Feminino";
    else if (sexo === "MASCULINO") sexo = "Masculino";
    else if (sexo === "LGBT") sexo = "LGBTQIAPN+";

    
    const disponibilidadeHorarios = formData.horariosDisponiveis && Object.keys(formData.horariosDisponiveis).length > 0
      ? JSON.stringify(formData.horariosDisponiveis)
      : null;

    
    const horariosPreferenciais = transformarHorarios(formData.horariosDisponiveis);

    
    
    const usuarioId = user?.id || (typeof window !== 'undefined' ? parseInt(sessionStorage.getItem('usuarioId') || '0') : 0);

    const dadosMapeados: any = {
      usuarioId: usuarioId,

      
      idade,
      sexo,

      
      profissao: formData.profissao,
      estadoCivil: formData.estadoCivil,
      tempoRelacionamentoAnos: formData.tempoRelacionamentoAnos,
      escolaridade: formData.escolaridade,
      moraCom: formData.moraCom,
      religiao: formData.religiao,
      religiaoOutras: formData.religiaoOutras,

      faixaSalarial: formData.faixaSalarial,
      localizacao: formData.localizacao,
      cep: formData.cep?.replace(/\D/g, ''), 
      descricaoProblema: formData.expectativas, 

      
      nivelUrgencia: formData.nivelUrgencia,

      
      modalidadePreferida: formData.modalidadeAtendimento, 
      frequenciaSessoes: formData.frequenciaSessoes,
      duracaoTratamentoEsperada: formData.duracaoTratamentoEsperada,
      generoTerapeutaPreferido: formData.generoTerapeutaPreferido,
      faixaEtariaTerapeutaPreferida: formData.faixaEtariaTerapeutaPreferida,
      diasDisponiveis: formData.diasDisponiveis,
      horariosPreferenciais, 
      flexibilidadeHorarios: formData.flexibilidadeHorarios,
      disponibilidadeHorarios, 

      
      faixaPrecoMinimo: formData.faixaPrecoMinimo,
      faixaPrecoMaximo: formData.faixaPrecoMaximo,
      possuiConvenio: formData.possuiConvenio,
      nomeConvenio: formData.nomeConvenio,
      dispostoParticular: formData.dispostoParticular,
      possuiApoioFinanceiro: formData.possuiApoioFinanceiro,

      
      historicoTerapia: formData.historicoTerapia,
      quandoParouTerapia: converterDataParaISO(formData.quandoParouTerapia), 
      motivoInterrupcao: formData.motivoInterrupcao,
      abordagemAnterior: formData.abordagemAnterior,
      experienciaAvaliacao: formData.experienciaAvaliacao,
      acompanhamentoPsiquiatrico: formData.acompanhamentoPsiquiatrico,

      
      lgbtqSupportImportante: formData.lgbtqSupportImportante,
      orientacaoSexual: formData.orientacaoSexual,
      identidadeGenero: formData.identidadeGenero,
      questoesReligiosasImportantes: formData.questoesReligiosasImportantes,

      
      apresentacaoIndividual: formData.apresentacaoIndividual,
      metasLongoPrazo: formData.metasLongoPrazo,
      experienciaAutoconhecimento: formData.experienciaAutoconhecimento,
      interesseGruposTerapia: formData.interesseGruposTerapia,
      disponibilidadeTarefasCasa: formData.disponibilidadeTarefasCasa,
    };

    return dadosMapeados;
  };

  if (submitSuccess) {
    return (
      <Layout
        title="Cadastro concluído com sucesso!"
        description="Seu perfil foi criado"
      >
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 flex items-center justify-center py-12 px-4">
          <div className="max-w-md w-full">
            <Card className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                Cadastro concluído com sucesso!
              </h2>
              <p className="text-neutral-600 mb-6">
                Redirecionando para seu painel...
              </p>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <div
                  className="bg-primary-600 h-2 rounded-full animate-pulse"
                  style={{ width: "100%" }}
                ></div>
              </div>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title="Questionário do Paciente"
      description="Complete seu perfil para encontrar o terapeuta ideal"
    >
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-neutral-900 mb-3">
              Questionário do Paciente
            </h1>
            <p className="text-neutral-600">
              Complete as informações para encontrarmos o terapeuta ideal para
              você
            </p>
          </div>

          {}
          <Card className="p-6 sm:p-8">
            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-8"
              >
              {}
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-primary-100 rounded-lg">
                    <User className="w-5 h-5 text-primary-600" />
                  </div>
                  <h2 className="text-xl font-bold text-neutral-900">
                    Informações Pessoais
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {}
                    <CampoData
                      id="dataNascimento"
                      label="Data de Nascimento"
                      placeholder="DD/MM/AAAA"
                      control={control}
                      required
                      rules={{
                        required: "Data de nascimento é obrigatória",
                      }}
                    />

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Sexo *
                    </label>
                    <Controller
                      name="sexualidade"
                      control={control}
                      rules={{
                        validate: (value) => validateField(value, { required: true, message: "Sexualidade é obrigatória" })
                      }}
                      render={({ field }) => (
                        <Select
                          options={SEXUALIDADE_OPTIONS}
                          value={field.value}
                          onValueChange={field.onChange}
                          
                          disabled={finalizarCadastroMutation.isPending}
                        />
                      )}
                    />
                    {errors.sexualidade && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.sexualidade.message}
                      </p>
                    )}
                  </div>

                  {}
                  <div>
                    <label
                      htmlFor="cep"
                      className="block text-sm font-medium text-neutral-700 mb-2"
                    >
                      CEP *
                    </label>
                    <Input
                      id="cep"
                      type="text"
                      placeholder="00000-000"
                      {...register("cep", {
                        required: "CEP é obrigatório",
                        pattern: {
                          value: VALIDATION_PATTERNS.CEP,
                          message: "CEP inválido (formato: 00000-000)",
                        },
                        onChange: (e) => {
                          const maskedValue = applyCepMask(e.target.value);
                          setValue("cep", maskedValue);
                        }
                      })}
                      error={errors.cep?.message}
                      disabled={finalizarCadastroMutation.isPending || loadingCep}
                    />
                  </div>

                  {}
                  <div>
                    <label
                      htmlFor="profissao"
                      className="block text-sm font-medium text-neutral-700 mb-2"
                    >
                      Profissão/Ocupação *
                    </label>
                    <Input
                      id="profissao"
                      type="text"
                      placeholder="Ex: Estudante, Professor(a), Engenheiro(a)..."
                      maxLength={100}
                      {...register("profissao", {
                        required: "Profissão é obrigatória",
                        minLength: {
                          value: 3,
                          message: "Mínimo 3 caracteres",
                        },
                      })}
                      error={errors.profissao?.message}
                      disabled={finalizarCadastroMutation.isPending}
                    />
                  </div>

                  {}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Estado Civil *
                    </label>
                    <Controller
                      name="estadoCivil"
                      control={control}
                      rules={{
                        validate: (value) => validateField(value, { required: true, message: "Estado civil é obrigatório" })
                      }}
                      render={({ field }) => (
                        <Select
                          options={estadosCivis}
                          value={field.value}
                          onValueChange={field.onChange}
                          placeholder="Selecione seu estado civil"
                          disabled={finalizarCadastroMutation.isPending}
                        />
                      )}
                    />
                    {errors.estadoCivil && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.estadoCivil.message}
                      </p>
                    )}
                  </div>

                  {}
                  {(watchedEstadoCivil === "CASADO" || watchedEstadoCivil === "UNIAO_ESTAVEL") && (
                    <div>
                      <label
                        htmlFor="tempoRelacionamentoAnos"
                        className="block text-sm font-medium text-neutral-700 mb-2"
                      >
                        Há quanto tempo? (em anos) *
                      </label>
                      <Input
                        id="tempoRelacionamentoAnos"
                        type="number"
                        min="0"
                        max="100"
                        placeholder="Ex: 5"
                        {...register("tempoRelacionamentoAnos", {
                          required: "Campo obrigatório",
                          valueAsNumber: true,
                          min: {
                            value: 0,
                            message: "Valor mínimo é 0",
                          },
                          max: {
                            value: 100,
                            message: "Valor máximo é 100",
                          },
                        })}
                        error={errors.tempoRelacionamentoAnos?.message}
                        disabled={finalizarCadastroMutation.isPending}
                      />
                    </div>
                  )}

                  {}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Escolaridade *
                    </label>
                    <Controller
                      name="escolaridade"
                      control={control}
                      rules={{
                        validate: (value) => validateField(value, { required: true, message: "Escolaridade é obrigatória" })
                      }}
                      render={({ field }) => (
                        <Select
                          options={ESCOLARIDADE_OPTIONS}
                          value={field.value}
                          onValueChange={field.onChange}
                          placeholder="Selecione sua escolaridade"
                          disabled={finalizarCadastroMutation.isPending}
                        />
                      )}
                    />
                    {errors.escolaridade && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.escolaridade.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Renda Mensal *
                    </label>
                    <Controller
                      name="faixaSalarial"
                      control={control}
                      rules={{
                        validate: (value) => validateField(value, { required: true, message: "Faixa salarial é obrigatória" })
                      }}
                      render={({ field }) => (
                        <Select
                          options={FAIXA_SALARIAL_OPTIONS}
                          value={field.value}
                          onValueChange={field.onChange}
                          placeholder="Selecione sua renda mensal"
                          disabled={finalizarCadastroMutation.isPending}
                        />
                      )}
                    />
                    {errors.faixaSalarial && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.faixaSalarial.message}
                      </p>
                    )}
                  </div>

                  {}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Mora com quem? *
                    </label>
                    <Controller
                      name="moraCom"
                      control={control}
                      rules={{
                        validate: (value) => validateField(value, { required: true, message: "Campo obrigatório" })
                      }}
                      render={({ field }) => (
                        <Select
                          options={MORA_COM_OPTIONS}
                          value={field.value}
                          onValueChange={field.onChange}
                          placeholder="Selecione com quem você mora"
                          disabled={finalizarCadastroMutation.isPending}
                        />
                      )}
                    />
                    {errors.moraCom && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.moraCom.message}
                      </p>
                    )}
                  </div>

                  {}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Professa alguma fé?
                    </label>
                    <Controller
                      name="religiao"
                      control={control}
                      render={({ field }) => (
                        <Select
                          options={religioes}
                          value={field.value}
                          onValueChange={field.onChange}
                          placeholder="Selecione (opcional)"
                          disabled={finalizarCadastroMutation.isPending}
                        />
                      )}
                    />
                    {errors.religiao && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.religiao.message}
                      </p>
                    )}
                  </div>

                  {}
                  {watchedReligiao === "OUTRAS" && (
                    <div className="md:col-span-2">
                      <label
                        htmlFor="religiaoOutras"
                        className="block text-sm font-medium text-neutral-700 mb-2"
                      >
                        Qual outra fé você professa ? *
                      </label>
                      <Input
                        id="religiaoOutras"
                        type="text"
                        placeholder="Especifique qual religião..."
                        maxLength={100}
                        {...register("religiaoOutras", {
                          required: watchedReligiao === "OUTRAS" ? "Campo obrigatório quando seleciona 'Outras'" : false,
                        })}
                        error={errors.religiaoOutras?.message}
                        disabled={finalizarCadastroMutation.isPending}
                      />
                    </div>
                  )}

                  {watchedFaixaSalarial === "sem_renda" && (
                    <div className="md:col-span-2">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          {...register("possuiApoioFinanceiro")}
                          disabled={finalizarCadastroMutation.isPending}
                          className="rounded border-neutral-300"
                        />
                        <span className="text-sm text-neutral-700">
                          Você dispõe de alguém que possa investir no seu processo terapêutico?
                        </span>
                      </label>
                    </div>
                  )}
                </div>
              </div>

              {}
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-primary-100 rounded-lg">
                    <Users className="w-5 h-5 text-primary-600" />
                  </div>
                  <h2 className="text-xl font-bold text-neutral-900">
                    Preferências de Terapia
                  </h2>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Tipo de Terapia *
                      </label>
                      <Controller
                        name="tipoTerapia"
                        control={control}
                        rules={{
                          validate: (value) => validateField(value, { required: true, message: "Tipo de terapia é obrigatório" })
                        }}
                        render={({ field }) => (
                          <Select
                            options={TIPO_TERAPIA_OPTIONS}
                            value={field.value}
                            onValueChange={field.onChange}
                            placeholder="Selecione o tipo de terapia"
                            disabled={finalizarCadastroMutation.isPending}
                          />
                        )}
                      />
                      {errors.tipoTerapia && (
                        <p className="text-red-600 text-sm mt-1">
                          {errors.tipoTerapia.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Modalidade de Atendimento *
                      </label>
                      <Controller
                        name="modalidadeAtendimento"
                        control={control}
                        rules={{
                          validate: (value) => validateField(value, { required: true, message: "Modalidade de atendimento é obrigatória" })
                        }}
                        render={({ field }) => (
                          <Select
                            options={modalidadeOpcoesDisponiveis}
                            value={field.value}
                            onValueChange={field.onChange}
                            placeholder="Selecione a modalidade"
                            disabled={finalizarCadastroMutation.isPending}
                          />
                        )}
                      />
                      {errors.modalidadeAtendimento && (
                        <p className="text-red-600 text-sm mt-1">
                          {errors.modalidadeAtendimento.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Gênero Preferido do Terapeuta
                      </label>
                      <Controller
                        name="generoTerapeutaPreferido"
                        control={control}
                        render={({ field }) => (
                          <Select
                            options={GENERO_TERAPEUTA_OPTIONS}
                            value={field.value}
                            onValueChange={field.onChange}
                            placeholder="Selecione o gênero preferido"
                            disabled={finalizarCadastroMutation.isPending}
                          />
                        )}
                      />
                      {errors.generoTerapeutaPreferido && (
                        <p className="text-red-600 text-sm mt-1">
                          {errors.generoTerapeutaPreferido.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Faixa Etária Preferida do Terapeuta
                      </label>
                      <Controller
                        name="faixaEtariaTerapeutaPreferida"
                        control={control}
                        render={({ field }) => (
                          <Select
                            options={FAIXA_ETARIA_TERAPEUTA_OPTIONS}
                            value={field.value}
                            onValueChange={field.onChange}
                            placeholder="Selecione a faixa etária preferida"
                            disabled={finalizarCadastroMutation.isPending}
                          />
                        )}
                      />
                      {errors.faixaEtariaTerapeutaPreferida && (
                        <p className="text-red-600 text-sm mt-1">
                          {errors.faixaEtariaTerapeutaPreferida.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="expectativas"
                      className="block text-sm font-medium text-neutral-700 mb-2"
                    >
                      Expectativas e objetivos *
                    </label>
                    <TextArea
                      id="expectativas"
                      placeholder="O que você deseja resolver dentro de um processo terapêutico..."
                      rows={4}
                      {...register("expectativas", {
                        required: "Expectativas são obrigatórias",
                        minLength: {
                          value: 30,
                          message:
                            "Descreva com mais detalhes suas expectativas (mínimo 30 caracteres)",
                        },
                      })}
                      error={errors.expectativas?.message}
                      disabled={finalizarCadastroMutation.isPending}
                    />
                  </div>
                </div>
              </div>

              {}
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-primary-100 rounded-lg">
                    <User className="w-5 h-5 text-primary-600" />
                  </div>
                  <h2 className="text-xl font-bold text-neutral-900">
                    Laudo
                  </h2>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Você possui algum diagnóstico clínico comprovado? (atenção não é auto diagnóstico, mas sim o que um psiquiatra ou psicólogo laudou)
                  </label>
                  <Controller
                    name="laudo"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <MultiSelect
                          options={[

                            { value: "TDAH", label: "TDAH" },
                            { value: "BURNOUT", label: "Burnout" },
                            { value: "DEPRESSAO", label: "Depressão" },
                            { value: "BORDERLINE", label: "Borderline" },
                            { value: "BIPOLARIDADE", label: "Bipolaridade" },
                            { value: "ESQUIZOFRENIA", label: "Esquizofrenia" },
                            { value: "DEPENDENCIA_QUIMICA", label: "Dependência Química" },{ value: "TRANSTORNO_ANSIEDADE", label: "Transtorno de Ansiedade" },
                            { value: "TEA", label: "Transtorno do Espectro Autista (TEA)" },
                            { value: "TOC", label: "Transtorno Obsessivo Compulsivo (TOC)" },
                            { value: "TAG", label: "Transtorno do Ansiedade Generalizada (TAG)" },
                            { value: "TEPT", label: "Transtorno de Estresse Pós-Traumático (TEPT)" },
                            { value: "TRANSTORNO_ALIMENTAR", label: "Transtorno Alimentar (Bulimia, Anorexia, Compulsão Alimentar)" },
                            { value: "OUTRO", label: "Outro" },
                          ]}
                        selectedValues={value || []}
                        onValueChange={onChange}
                        placeholder="Selecione os diagnósticos que possui..."
                        disabled={finalizarCadastroMutation.isPending}
                      />
                    )}
                  />
                  {errors.laudo && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.laudo.message?.toString()}
                    </p>
                  )}
                </div>
              </div>

              {}
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-primary-100 rounded-lg">
                    <Heart className="w-5 h-5 text-primary-600" />
                  </div>
                  <h2 className="text-xl font-bold text-neutral-900">
                    Nível de Urgência
                  </h2>
                </div>

                <div>
                  <label
                    htmlFor="nivelUrgencia"
                    className="block text-sm font-medium text-neutral-700 mb-2"
                  >
                    Em uma escala de 1 a 10, quão urgente você considera a necessidade de iniciar a terapia?
                  </label>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-neutral-600">1 (Baixa)</span>
                    <Input
                      id="nivelUrgencia"
                      type="range"
                      min="1"
                      max="10"
                      step="1"
                      {...register("nivelUrgencia", {
                        valueAsNumber: true,
                      })}
                      disabled={finalizarCadastroMutation.isPending}
                      className="flex-1"
                    />
                    <span className="text-sm text-neutral-600">10 (Alta)</span>
                    <span className="text-lg font-bold text-primary-600 w-8 text-center">
                      {watch("nivelUrgencia") || 5}
                    </span>
                  </div>
                  {errors.nivelUrgencia && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.nivelUrgencia.message}
                    </p>
                  )}
                </div>
              </div>

              {}
              {}

              {}
              <SecaoDisponibilidade
                submitMutation={finalizarCadastroMutation}
                diasFieldName="diasDisponiveis"
                horariosFieldName="horariosDisponiveis"
                diasLabel="Dias Disponíveis *"
                horariosLabel="Horários Disponíveis *"
                showFlexibilidadeHorarios={true}
                flexibilidadeFieldName="flexibilidadeHorarios"
              />

              {}
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-primary-100 rounded-lg">
                    <User className="w-5 h-5 text-primary-600" />
                  </div>
                  <h2 className="text-xl font-bold text-neutral-900">
                    Aspectos Financeiros
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="faixaPrecoMinimo"
                      className="block text-sm font-medium text-neutral-700 mb-2"
                    >
                      Valor Mínimo por Sessão (R$)
                    </label>
                    <Input
                      id="faixaPrecoMinimo"
                      type="number"
                      min="0"
                      step="10"
                      placeholder="Ex: 100"
                      {...register("faixaPrecoMinimo", {
                        valueAsNumber: true,
                      })}
                      error={errors.faixaPrecoMinimo?.message}
                      disabled={finalizarCadastroMutation.isPending}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="faixaPrecoMaximo"
                      className="block text-sm font-medium text-neutral-700 mb-2"
                    >
                      Valor Máximo por Sessão (R$)
                    </label>
                    <Input
                      id="faixaPrecoMaximo"
                      type="number"
                      min="0"
                      step="10"
                      placeholder="Ex: 300"
                      {...register("faixaPrecoMaximo", {
                        valueAsNumber: true,
                      })}
                      error={errors.faixaPrecoMaximo?.message}
                      disabled={finalizarCadastroMutation.isPending}
                    />
                  </div>
                </div>
              </div>

              {}
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-primary-100 rounded-lg">
                    <Heart className="w-5 h-5 text-primary-600" />
                  </div>
                  <h2 className="text-xl font-bold text-neutral-900">
                    Histórico Terapêutico
                  </h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        {...register("historicoTerapia")}
                        disabled={finalizarCadastroMutation.isPending}
                        className="rounded border-neutral-300"
                      />
                      <span className="text-sm text-neutral-700">
                        Já fiz terapia antes
                      </span>
                    </label>
                  </div>

                  {watch("historicoTerapia") && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <CampoData
                            id="quandoParouTerapia"
                            label="Quando parou a terapia?"
                            placeholder="DD/MM/AAAA"
                            control={control}
                            required={false}
                            skipValidation={true}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Abordagem Terapêutica Anterior
                          </label>
                          <Controller
                            name="abordagemAnterior"
                            control={control}
                            render={({ field }) => (
                              <Select
                                options={ABORDAGEM_TERAPEUTICA_ANTERIOR_OPTIONS}
                                value={field.value}
                                onValueChange={field.onChange}
                                placeholder="Selecione a abordagem"
                                disabled={finalizarCadastroMutation.isPending}
                              />
                            )}
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label
                            htmlFor="motivoInterrupcao"
                            className="block text-sm font-medium text-neutral-700 mb-2"
                          >
                            Motivo da Interrupção
                          </label>
                          <TextArea
                            id="motivoInterrupcao"
                            placeholder="Conte-nos o motivo..."
                            rows={3}
                            {...register("motivoInterrupcao")}
                            error={errors.motivoInterrupcao?.message}
                            disabled={finalizarCadastroMutation.isPending}
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label
                            htmlFor="experienciaAvaliacao"
                            className="block text-sm font-medium text-neutral-700 mb-2"
                          >
                            Como você avalia sua experiência anterior com terapia? (1 a 10)
                          </label>
                          <div className="flex items-center space-x-4">
                            <span className="text-sm text-neutral-600">1 (Ruim)</span>
                            <Input
                              id="experienciaAvaliacao"
                              type="range"
                              min="1"
                              max="10"
                              step="1"
                              {...register("experienciaAvaliacao", {
                                valueAsNumber: true,
                              })}
                              disabled={finalizarCadastroMutation.isPending}
                              className="flex-1"
                            />
                            <span className="text-sm text-neutral-600">10 (Excelente)</span>
                            <span className="text-lg font-bold text-primary-600 w-8 text-center">
                              {watch("experienciaAvaliacao") || 5}
                            </span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        {...register("acompanhamentoPsiquiatrico")}
                        disabled={finalizarCadastroMutation.isPending}
                        className="rounded border-neutral-300"
                      />
                      <span className="text-sm text-neutral-700">
                        Faço acompanhamento psiquiátrico atualmente
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {}
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-primary-100 rounded-lg">
                    <Users className="w-5 h-5 text-primary-600" />
                  </div>
                  <h2 className="text-xl font-bold text-neutral-900">
                    Diversidade e Inclusão
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Orientação Sexual
                    </label>
                    <Controller
                      name="orientacaoSexual"
                      control={control}
                      render={({ field }) => (
                        <Select
                          options={ORIENTACAO_SEXUAL_OPTIONS}
                          value={field.value}
                          onValueChange={field.onChange}
                          placeholder="Selecione"
                          disabled={finalizarCadastroMutation.isPending}
                        />
                      )}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Identidade de Gênero
                    </label>
                    <Controller
                      name="identidadeGenero"
                      control={control}
                      render={({ field }) => (
                        <Select
                          options={IDENTIDADE_GENERO_OPTIONS}
                          value={field.value}
                          onValueChange={field.onChange}
                          placeholder={shouldDisableIdentidadeGenero ? "Não aplicável" : "Selecione"}
                          disabled={finalizarCadastroMutation.isPending || shouldDisableIdentidadeGenero}
                        />
                      )}
                    />
                    {shouldDisableIdentidadeGenero && (
                      <p className="text-neutral-500 text-xs mt-1">
                        Este campo não é aplicável para a orientação sexual selecionada
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        {...register("lgbtqSupportImportante")}
                        disabled={finalizarCadastroMutation.isPending}
                        className="rounded border-neutral-300"
                      />
                      <span className="text-sm text-neutral-700">
                        É importante para mim que o terapeuta tenha conhecimento e sensibilidade com questões LGBT+
                      </span>
                    </label>
                  </div>

                  <div className="md:col-span-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        {...register("questoesReligiosasImportantes")}
                        disabled={finalizarCadastroMutation.isPending}
                        className="rounded border-neutral-300"
                      />
                      <span className="text-sm text-neutral-700">
                        Questões religiosas/espirituais são importantes para mim no processo terapêutico
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {}
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-primary-100 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-primary-600" />
                  </div>
                  <h2 className="text-xl font-bold text-neutral-900">
                    Questões de Autoconhecimento
                  </h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="apresentacaoIndividual"
                      className="block text-sm font-medium text-neutral-700 mb-2"
                    >
                      Nos conte sobre você !
                    </label>
                    <TextArea
                      id="apresentacaoIndividual"
                      placeholder="Compartilhe um pouco de sua história, suas experiências nos ajudam a entender melhor suas necessidades."
                      rows={3}
                      {...register("apresentacaoIndividual")}
                      error={errors.apresentacaoIndividual?.message}
                      disabled={finalizarCadastroMutation.isPending}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="experienciaAutoconhecimento"
                      className="block text-sm font-medium text-neutral-700 mb-2"
                    >
                      Como você avalia sua experiência atual com autoconhecimento? (1 a 10)
                    </label>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-neutral-600">1 (Baixa)</span>
                      <Input
                        id="experienciaAutoconhecimento"
                        type="range"
                        min="1"
                        max="10"
                        step="1"
                        {...register("experienciaAutoconhecimento", {
                          valueAsNumber: true,
                        })}
                        disabled={finalizarCadastroMutation.isPending}
                        className="flex-1"
                      />
                      <span className="text-sm text-neutral-600">10 (Alta)</span>
                      <span className="text-lg font-bold text-primary-600 w-8 text-center">
                        {watch("experienciaAutoconhecimento") || 5}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        {...register("interesseGruposTerapia")}
                        disabled={finalizarCadastroMutation.isPending}
                        className="rounded border-neutral-300"
                      />
                      <span className="text-sm text-neutral-700">
                        Tenho interesse em participar de grupos terapêuticos
                      </span>
                    </label>
                  </div>

                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        {...register("disponibilidadeTarefasCasa")}
                        disabled={finalizarCadastroMutation.isPending}
                        className="rounded border-neutral-300"
                      />
                      <span className="text-sm text-neutral-700">
                        Tenho disponibilidade para realizar tarefas/exercícios entre as sessões
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {}
              <SecaoTermos
                  submitMutation={finalizarCadastroMutation}
                  title="Termos e Condições"
                  fieldName="aceitaTermos"
                  required={true}
                  showReceberEmails={true}
                  termosRota="/termos"
                  politicaRota="/privacidade"
                />

              {}
              <div className="pt-6">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={finalizarCadastroMutation.isPending || !watchedAceitaTermos}
                >
                  {finalizarCadastroMutation.isPending
                    ? "Finalizando..."
                    : "Finalizar Cadastro"}
                </Button>
              </div>
              </form>
            </FormProvider>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default QuestionarioPacientePage;
