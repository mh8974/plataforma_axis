import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  User,
  ArrowLeft,
  Save,
  Heart,
  DollarSign,
  Clock,
  Users,
  Target,
  CheckCircle
} from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import MultiSelect from '@/components/ui/MultiSelect';
import TextArea from '@/components/ui/TextArea';
import apiService from '@/services/api';
import { useAuth } from '@/hooks/useAuth';
import CampoData from '@/components/formulario-profissional/campos/CampoData';
import SecaoDisponibilidade from '@/components/shared/SecaoDisponibilidade';
import { applyCepMask } from '@/utils/mascaras';
import axios from 'axios';
import {
  FAIXA_SALARIAL_OPTIONS,
  FOCO_PRINCIPAL_OPTIONS,
  AREAS_ESPECIAIS_OPTIONS,
  GENERO_TERAPEUTA_OPTIONS,
  FAIXA_ETARIA_TERAPEUTA_OPTIONS,
  ORIENTACAO_SEXUAL_OPTIONS,
  IDENTIDADE_GENERO_OPTIONS,
  ABORDAGEM_TERAPEUTICA_ANTERIOR_OPTIONS,
  ESCOLARIDADE_OPTIONS,
  MORA_COM_OPTIONS,
  VALIDATION_PATTERNS
} from '@/constants/formularios';
import { estadosCivis, religioes } from '@/components/formulario-profissional/informacoes-pessoais/constants';

type TabType = 'basico' | 'preferencias' | 'terapeuta' | 'financeiro' | 'historico' | 'diversidade' | 'objetivos';

interface EditarPerfilData {
  
  usuarioId?: number;

  
  faixaSalarial?: string;
  localizacao?: string;
  cep?: string;
  idCep?: number;
  descricaoProblema?: string;

  
  profissao?: string;
  estadoCivil?: string;
  tempoRelacionamentoAnos?: number;
  escolaridade?: string;
  moraCom?: string;
  religiao?: string;
  religiaoOutras?: string;

  
  problemaPrincipal?: string;
  problemasSecundarios?: string[];
  nivelUrgencia?: number;

  
  modalidadePreferida?: string;
  frequenciaSessoes?: string;
  duracaoTratamentoEsperada?: string;
  diasDisponiveis?: string[];
  horariosPreferenciais?: string[];
  horariosDisponiveis?: { [key: string]: string[] }; 
  disponibilidadeHorarios?: string; 
  flexibilidadeHorarios?: boolean;

  
  generoTerapeutaPreferido?: string;
  faixaEtariaTerapeutaPreferida?: string;

  
  faixaPrecoMinimo?: number;
  faixaPrecoMaximo?: number;
  possuiConvenio?: boolean;
  nomeConvenio?: string;
  dispostoParticular?: boolean;
  possuiApoioFinanceiro?: boolean;

  
  historicoTerapia?: boolean;
  quandoParouTerapia?: string;
  motivoInterrupcao?: string;
  abordagemAnterior?: string;
  experienciaAvaliacao?: number;
  acompanhamentoPsiquiatrico?: boolean;

  
  lgbtqSupportImportante?: boolean;
  orientacaoSexual?: string;
  identidadeGenero?: string;
  questoesReligiosasImportantes?: boolean;

  
  apresentacaoIndividual?: string;
  experienciaAutoconhecimento?: number;
  interesseGruposTerapia?: boolean;
  disponibilidadeTarefasCasa?: boolean;
}

const EditarPerfilPaciente: React.FC = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('basico');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [loadingCep, setLoadingCep] = useState(false);
  const { isAuthenticated, isLoading: authLoading, user } = useAuth();

  const methods = useForm<EditarPerfilData>();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
    setValue
  } = methods;

  const watchHistoricoTerapia = watch('historicoTerapia');
  const watchPossuiConvenio = watch('possuiConvenio');
  const watchFaixaSalarial = watch('faixaSalarial');
  const watchedCep = watch('cep');
  const watchedEstadoCivil = watch('estadoCivil');
  const watchedReligiao = watch('religiao');

  
  useEffect(() => {
    if (!authLoading && (!isAuthenticated || !user || user.tipo !== 'PACIENTE')) {
      router.push('/login');
    }
  }, [isAuthenticated, authLoading, user, router]);

  
  const { data: pacienteData, isLoading } = useQuery({
    queryKey: ['paciente', user?.id],
    queryFn: () => apiService.getPaciente(user!.id),
    enabled: !!user?.id,
    staleTime: 0,
  });

  
  useEffect(() => {
    if (pacienteData) {
      
      let horariosDisponiveis = {};
      if ((pacienteData as any).disponibilidadeHorarios) {
        try {
          horariosDisponiveis = JSON.parse((pacienteData as any).disponibilidadeHorarios);
        } catch (e) {
          
        }
      }

      const data = pacienteData as any;

      
      const cepValue = data.cep || '';

      reset({
        
        faixaSalarial: data.faixaSalarial,
        localizacao: data.localizacao,
        cep: cepValue,
        profissao: data.profissao,
        estadoCivil: data.estadoCivil,
        tempoRelacionamentoAnos: data.tempoRelacionamentoAnos,
        escolaridade: data.escolaridade,
        moraCom: data.moraCom,
        religiao: data.religiao,
        religiaoOutras: data.religiaoOutras,
        descricaoProblema: data.descricaoProblema,
        problemaPrincipal: data.problemaPrincipal,
        problemasSecundarios: data.problemasSecundarios || [],
        nivelUrgencia: data.nivelUrgencia || 5,

        
        modalidadePreferida: data.modalidadePreferida,
        frequenciaSessoes: data.frequenciaSessoes,
        duracaoTratamentoEsperada: data.duracaoTratamentoEsperada,
        diasDisponiveis: data.diasDisponiveis || [],
        horariosPreferenciais: data.horariosPreferenciais || [],
        horariosDisponiveis: horariosDisponiveis,
        flexibilidadeHorarios: data.flexibilidadeHorarios || false,

        
        generoTerapeutaPreferido: data.generoTerapeutaPreferido,
        faixaEtariaTerapeutaPreferida: data.faixaEtariaTerapeutaPreferida,

        
        faixaPrecoMinimo: data.faixaPrecoMinimo,
        faixaPrecoMaximo: data.faixaPrecoMaximo,
        possuiConvenio: data.possuiConvenio || false,
        nomeConvenio: data.nomeConvenio,
        dispostoParticular: data.dispostoParticular || true,
        possuiApoioFinanceiro: data.possuiApoioFinanceiro || false,

        
        historicoTerapia: data.historicoTerapia || false,
        quandoParouTerapia: data.quandoParouTerapia,
        motivoInterrupcao: data.motivoInterrupcao,
        abordagemAnterior: data.abordagemAnterior,
        experienciaAvaliacao: data.experienciaAvaliacao || 5,
        acompanhamentoPsiquiatrico: data.acompanhamentoPsiquiatrico || false,

        
        lgbtqSupportImportante: data.lgbtqSupportImportante || false,
        orientacaoSexual: data.orientacaoSexual,
        identidadeGenero: data.identidadeGenero,
        questoesReligiosasImportantes: data.questoesReligiosasImportantes || false,

        
        apresentacaoIndividual: data.apresentacaoIndividual,
        experienciaAutoconhecimento: data.experienciaAutoconhecimento || 5,
        interesseGruposTerapia: data.interesseGruposTerapia || false,
        disponibilidadeTarefasCasa: data.disponibilidadeTarefasCasa || true,
      });
    }
  }, [pacienteData, reset]);

  
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
    }
  }, [watchedCep, setValue]);

  
  const updateMutation = useMutation({
    mutationFn: async (data: EditarPerfilData) => {
      
      const payload = {
        ...data,
        usuarioId: user!.id
      };
      return apiService.updatePaciente(user!.id, payload);
    },
    onSuccess: () => {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    },
    onError: (error: any) => {
      alert(error.response?.data?.message || 'Erro ao salvar alterações');
    },
  });

  
  const converterDataBrasilParaISO = (dataBR: string | undefined): string | undefined => {
    if (!dataBR) return undefined;

    
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dateRegex.test(dataBR)) return undefined; 

    const [dia, mes, ano] = dataBR.split('/').map(Number);

    
    if (!dia || !mes || !ano || dia < 1 || dia > 31 || mes < 1 || mes > 12 || ano < 1900) {
      return undefined;
    }

    
    const mesFormatado = mes.toString().padStart(2, '0');
    const diaFormatado = dia.toString().padStart(2, '0');

    return `${ano}-${mesFormatado}-${diaFormatado}`;
  };

  const onSubmit = (data: EditarPerfilData) => {
    
    const disponibilidadeHorarios = data.horariosDisponiveis && Object.keys(data.horariosDisponiveis).length > 0
      ? JSON.stringify(data.horariosDisponiveis)
      : undefined;

    
    const quandoParouTerapiaISO = converterDataBrasilParaISO(data.quandoParouTerapia);

    const payload = {
      ...data,
      disponibilidadeHorarios,
      quandoParouTerapia: quandoParouTerapiaISO 
    };

    updateMutation.mutate(payload);
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-600">Carregando...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'basico' as TabType, label: 'Básico', icon: User },
    { id: 'preferencias' as TabType, label: 'Preferências', icon: Heart },
    { id: 'terapeuta' as TabType, label: 'Terapeuta', icon: Users },
    { id: 'financeiro' as TabType, label: 'Financeiro', icon: DollarSign },
    { id: 'historico' as TabType, label: 'Histórico', icon: Clock },
    { id: 'diversidade' as TabType, label: 'Diversidade', icon: Heart },
    { id: 'objetivos' as TabType, label: 'Autoconhecimento', icon: Target },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50">
      {}
      <div className="bg-white shadow-sm border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/pacientes/dashboard')}
                className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-neutral-600" />
              </button>
              <h1 className="text-2xl font-bold text-neutral-900">Editar Perfil</h1>
            </div>

            {saveSuccess && (
              <div className="flex items-center space-x-2 text-green-600">
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm font-medium">Salvo com sucesso!</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {}
          <div className="lg:col-span-1">
            <Card className="p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-primary-600 text-white'
                          : 'text-neutral-700 hover:bg-neutral-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </Card>
          </div>

          {}
          <div className="lg:col-span-3">
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Card className="p-6">
                {}
                {activeTab === 'basico' && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold text-neutral-900 mb-4">Informações Básicas</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Faixa Salarial
                        </label>
                        <Controller
                          name="faixaSalarial"
                          control={control}
                          render={({ field }) => (
                            <Select
                              options={FAIXA_SALARIAL_OPTIONS}
                              value={field.value}
                              onValueChange={field.onChange}
                              placeholder="Selecione"
                            />
                          )}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          CEP *
                        </label>
                        <Input
                          type="text"
                          placeholder="00000-000"
                          {...register('cep', {
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
                          disabled={loadingCep}
                        />
                        {errors.cep && (
                          <p className="text-red-600 text-sm mt-1">{errors.cep.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Profissão/Ocupação
                        </label>
                        <Input
                          type="text"
                          placeholder="Ex: Estudante, Professor(a)..."
                          maxLength={100}
                          {...register('profissao')}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Estado Civil
                        </label>
                        <Controller
                          name="estadoCivil"
                          control={control}
                          render={({ field }) => (
                            <Select
                              options={estadosCivis}
                              value={field.value}
                              onValueChange={field.onChange}
                              placeholder="Selecione seu estado civil"
                            />
                          )}
                        />
                      </div>

                      {(watchedEstadoCivil === "CASADO" || watchedEstadoCivil === "UNIAO_ESTAVEL") && (
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Há quanto tempo? (em anos)
                          </label>
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            placeholder="Ex: 5"
                            {...register('tempoRelacionamentoAnos', {
                              valueAsNumber: true,
                              min: { value: 0, message: "Valor mínimo é 0" },
                              max: { value: 100, message: "Valor máximo é 100" },
                            })}
                          />
                          {errors.tempoRelacionamentoAnos && (
                            <p className="text-red-600 text-sm mt-1">{errors.tempoRelacionamentoAnos.message}</p>
                          )}
                        </div>
                      )}

                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Escolaridade
                        </label>
                        <Controller
                          name="escolaridade"
                          control={control}
                          render={({ field }) => (
                            <Select
                              options={ESCOLARIDADE_OPTIONS}
                              value={field.value}
                              onValueChange={field.onChange}
                              placeholder="Selecione sua escolaridade"
                            />
                          )}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Mora com quem?
                        </label>
                        <Controller
                          name="moraCom"
                          control={control}
                          render={({ field }) => (
                            <Select
                              options={MORA_COM_OPTIONS}
                              value={field.value}
                              onValueChange={field.onChange}
                              placeholder="Selecione com quem você mora"
                            />
                          )}
                        />
                      </div>

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
                            />
                          )}
                        />
                      </div>

                      {watchedReligiao === "OUTRAS" && (
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Qual outra fé você professa?
                          </label>
                          <Input
                            type="text"
                            placeholder="Especifique qual religião..."
                            maxLength={100}
                            {...register('religiaoOutras')}
                          />
                        </div>
                      )}

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Descrição do Problema
                        </label>
                        <TextArea
                          rows={4}
                          placeholder="Descreva o que te trouxe aqui..."
                          {...register('descricaoProblema')}
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Problema Principal
                        </label>
                        <Controller
                          name="problemaPrincipal"
                          control={control}
                          render={({ field }) => (
                            <Select
                              options={FOCO_PRINCIPAL_OPTIONS}
                              value={field.value}
                              onValueChange={field.onChange}
                              placeholder="Selecione o foco principal"
                            />
                          )}
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Problemas Secundários
                          <span className="text-xs text-neutral-500 ml-2">(Selecione abaixo)</span>
                        </label>
                        <Controller
                          name="problemasSecundarios"
                          control={control}
                          render={({ field }) => (
                            <MultiSelect
                              options={AREAS_ESPECIAIS_OPTIONS}
                              selectedValues={field.value || []}
                              onValueChange={field.onChange}
                              placeholder="Selecione as áreas específicas..."
                            />
                          )}
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Nível de Urgência (1-10)
                        </label>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-neutral-600">1 (Baixa)</span>
                          <Input
                            type="range"
                            min="1"
                            max="10"
                            step="1"
                            {...register('nivelUrgencia', { valueAsNumber: true })}
                            className="flex-1"
                          />
                          <span className="text-sm text-neutral-600">10 (Alta)</span>
                          <span className="text-lg font-bold text-primary-600 w-8 text-center">
                            {watch('nivelUrgencia') || 5}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {}
                {activeTab === 'preferencias' && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold text-neutral-900 mb-4">Preferências de Tratamento</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Modalidade Preferida
                        </label>
                        <Controller
                          name="modalidadePreferida"
                          control={control}
                          render={({ field }) => (
                            <Select
                              options={[
                                { value: 'presencial', label: 'Presencial' },
                                { value: 'online', label: 'Online' },
                                { value: 'hibrido', label: 'Híbrido' }
                              ]}
                              value={field.value}
                              onValueChange={field.onChange}
                              placeholder="Selecione"
                            />
                          )}
                        />
                      </div>

                      {}
                    </div>

                    {}
                    <SecaoDisponibilidade
                      diasFieldName="diasDisponiveis"
                      horariosFieldName="horariosDisponiveis"
                      diasLabel="Dias Disponíveis *"
                      horariosLabel="Horários Disponíveis *"
                      showFlexibilidadeHorarios={true}
                      flexibilidadeFieldName="flexibilidadeHorarios"
                    />
                  </div>
                )}

                {}
                {activeTab === 'terapeuta' && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold text-neutral-900 mb-4">Preferências de Terapeuta</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Gênero Preferido
                        </label>
                        <Controller
                          name="generoTerapeutaPreferido"
                          control={control}
                          render={({ field }) => (
                            <Select
                              options={GENERO_TERAPEUTA_OPTIONS}
                              value={field.value}
                              onValueChange={field.onChange}
                              placeholder="Selecione"
                            />
                          )}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Faixa Etária Preferida
                        </label>
                        <Controller
                          name="faixaEtariaTerapeutaPreferida"
                          control={control}
                          render={({ field }) => (
                            <Select
                              options={FAIXA_ETARIA_TERAPEUTA_OPTIONS}
                              value={field.value}
                              onValueChange={field.onChange}
                              placeholder="Selecione"
                            />
                          )}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {}
                {activeTab === 'financeiro' && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold text-neutral-900 mb-4">Aspectos Financeiros</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Valor Mínimo por Sessão (R$)
                        </label>
                        <Input
                          type="number"
                          min="0"
                          step="10"
                          placeholder="Ex: 100"
                          {...register('faixaPrecoMinimo', { valueAsNumber: true })}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Valor Máximo por Sessão (R$)
                        </label>
                        <Input
                          type="number"
                          min="0"
                          step="10"
                          placeholder="Ex: 300"
                          {...register('faixaPrecoMaximo', { valueAsNumber: true })}
                        />
                      </div>

                      {}
                      {watchFaixaSalarial === 'sem_renda' && (
                        <div className="md:col-span-2">
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              {...register('possuiApoioFinanceiro')}
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
                )}

                {}
                {activeTab === 'historico' && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold text-neutral-900 mb-4">Histórico Terapêutico</h2>

                    <div className="space-y-6">
                      <div>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            {...register('historicoTerapia')}
                            className="rounded border-neutral-300"
                          />
                          <span className="text-sm text-neutral-700">Já fiz terapia antes</span>
                        </label>
                      </div>

                      {watchHistoricoTerapia && (
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
                                Abordagem Anterior
                              </label>
                              <Controller
                                name="abordagemAnterior"
                                control={control}
                                render={({ field }) => (
                                  <Select
                                    options={ABORDAGEM_TERAPEUTICA_ANTERIOR_OPTIONS}
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    placeholder="Selecione"
                                  />
                                )}
                              />
                            </div>

                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-neutral-700 mb-2">
                                Motivo da Interrupção
                              </label>
                              <TextArea
                                rows={3}
                                placeholder="Conte-nos o motivo..."
                                {...register('motivoInterrupcao')}
                              />
                            </div>

                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-neutral-700 mb-2">
                                Avaliação da Experiência (1-10)
                              </label>
                              <div className="flex items-center space-x-4">
                                <span className="text-sm text-neutral-600">1 (Ruim)</span>
                                <Input
                                  type="range"
                                  min="1"
                                  max="10"
                                  step="1"
                                  {...register('experienciaAvaliacao', { valueAsNumber: true })}
                                  className="flex-1"
                                />
                                <span className="text-sm text-neutral-600">10 (Excelente)</span>
                                <span className="text-lg font-bold text-primary-600 w-8 text-center">
                                  {watch('experienciaAvaliacao') || 5}
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
                            {...register('acompanhamentoPsiquiatrico')}
                            className="rounded border-neutral-300"
                          />
                          <span className="text-sm text-neutral-700">
                            Faço acompanhamento psiquiátrico atualmente
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {}
                {activeTab === 'diversidade' && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold text-neutral-900 mb-4">Diversidade e Inclusão</h2>

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
                              placeholder="Selecione"
                            />
                          )}
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            {...register('lgbtqSupportImportante')}
                            className="rounded border-neutral-300"
                          />
                          <span className="text-sm text-neutral-700">
                            É importante que o terapeuta tenha conhecimento sobre questões LGBTQIAPN+
                          </span>
                        </label>
                      </div>

                      <div className="md:col-span-2">
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            {...register('questoesReligiosasImportantes')}
                            className="rounded border-neutral-300"
                          />
                          <span className="text-sm text-neutral-700">
                            Questões religiosas/espirituais são importantes no processo terapêutico
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {}
                {activeTab === 'objetivos' && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold text-neutral-900 mb-4">Questões de Autoconhecimento</h2>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Apresentação individual
                        </label>
                        <TextArea
                          rows={3}
                          placeholder="Apresente-se de forma livre, conte sobre você..."
                          {...register('apresentacaoIndividual')}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Experiência com Autoconhecimento (1-10)
                        </label>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-neutral-600">1 (Baixa)</span>
                          <Input
                            type="range"
                            min="1"
                            max="10"
                            step="1"
                            {...register('experienciaAutoconhecimento', { valueAsNumber: true })}
                            className="flex-1"
                          />
                          <span className="text-sm text-neutral-600">10 (Alta)</span>
                          <span className="text-lg font-bold text-primary-600 w-8 text-center">
                            {watch('experienciaAutoconhecimento') || 5}
                          </span>
                        </div>
                      </div>

                      <div>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            {...register('interesseGruposTerapia')}
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
                            {...register('disponibilidadeTarefasCasa')}
                            className="rounded border-neutral-300"
                          />
                          <span className="text-sm text-neutral-700">
                            Tenho disponibilidade para realizar tarefas/exercícios entre as sessões
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {}
                <div className="mt-8 flex justify-between">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => router.push('/pacientes/dashboard')}
                  >
                    Cancelar
                  </Button>

                  <Button
                    type="submit"
                    variant="primary"
                    disabled={updateMutation.isPending}
                    className="flex items-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>{updateMutation.isPending ? 'Salvando...' : 'Salvar Alterações'}</span>
                  </Button>
                </div>
              </Card>
            </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarPerfilPaciente;
