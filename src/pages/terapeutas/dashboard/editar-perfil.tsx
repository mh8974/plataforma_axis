import React, { useState, useEffect } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { useRouter } from "next/router";
import { User, Users, GraduationCap, MapPin, ArrowLeft } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import CampoSelect from "@/components/formulario-profissional/campos/CampoSelect";
import CampoData from "@/components/formulario-profissional/campos/CampoData";
import CampoTextArea from "@/components/formulario-profissional/campos/CampoTextArea";
import CampoCheckbox from "@/components/formulario-profissional/campos/CampoCheckbox";
import CampoCheckboxGroup from "@/components/formulario-profissional/campos/CampoCheckboxGroup";
import CampoNumero from "@/components/formulario-profissional/campos/CampoNumero";
import CampoTexto from "@/components/formulario-profissional/campos/CampoTexto";
import { applyCrpMask, validateCrp, applyCepMask, validateCep } from "@/utils/mascaras";
import axios from "axios";
import { identidadesGenero, religioes, abordagensTerapeuticas, tiposTerapia, modalidadesAtendimento, estadosCivis, faixasEtarias, metodosPagamento } from "@/components/formulario-profissional/informacoes-pessoais/constants";
import CampoRedesSociais from "@/components/formulario-profissional/campos/CampoRedesSociais";
import SecaoDisponibilidadeShared from "@/components/shared/SecaoDisponibilidade";
import SecaoReuniao from "@/components/formulario-profissional/secoes/SecaoReuniao";
import { useAuth } from "@/hooks/useAuth";
import apiService from "@/services/api";

interface TerapeutaFormData {
  
  nome: string;
  email: string;
  cpf: string;
  dataNascimento: string;
  identidadeGenero: string;

  
  telefone: string;
  crp: string;
  religiao: string;
  estadoCivil: string;
  anosRelacionamento?: number;
  possuiFilhos: boolean;
  quantidadeFilhos?: number;
  filhoComDeficiencia: boolean;
  filhosDeficiencia?: string;
  justificativaDeficiencia?: string;

  
  modalidadeAtendimento: string;
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  localizacaoProfissional: string;
  uf: string;
  estado: string;
  rua: string;
  numero: string;
  complemento: string;

  
  redesSociais: any;
  abordagensPrincipais: string[];
  abordagensSecundarias: string[];
  tipoTerapia: string[];
  experienciaAnos: number;
  primeiraConsultaGratuita: boolean;
  oQueNaoGostaAtender: string;
  casesSucesso: string;
  feedbackPacientes: string;
  demandaMaisComum: string;
  instituicaoFormacao: string;
  anoFormacao: number;
  especialidades: string | string[];
  bio: string;

  
  diasAtendimento: string[];
  horariosAtendimento: any;
  faixaEtariaAtendimento?: string[];

  
  diaReuniao?: string;
  horarioReuniao?: string;

  
  valorSessao?: number;
  metodosPagamento?: string[]; 
  politicaCancelamento?: string;

  
  aceitaConvenio: boolean;
  conveniosAceitos?: string[];

  
  lgbtqFriendly: boolean;
  experienciaCasosLgbtq?: number;
  certificacoesLgbtq?: string[];

  
  assuntosPrediletos?: string;
  hobby?: string;
  inspiracao?: string;
  filmesMarcantes?: string;
  superacoes?: string;
  causaSangue?: string;
  maiorMudanca?: string;
  gastariaDinheiro?: string;
  marcaDeixar?: string;
  trabalhoAntesSaudeMental?: string;
  atenderiaPorAmor?: string;
}

const TelaEditarPerfil: React.FC = () => {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  const methods = useForm<TerapeutaFormData>();
  const { register, setValue, control, watch, handleSubmit, reset, formState: { errors } } = methods;
  const [loadingCep, setLoadingCep] = useState(false);
  const [checkboxesSelecionados, setCheckboxesSelecionados] = useState<string[]>([]);

  
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, authLoading, router]);

  
  useEffect(() => {
    const loadTerapeutaData = async () => {
      if (!user?.id) return;

      try {
        const terapeutaData = await apiService.getTerapeuta(user.id);

        
        
        
        const localizacao = (terapeutaData.localizacaoClinica || '').replace(/\s+/g, ' ').trim();
        

        const cepMatch = localizacao.match(/CEP:\s*(\d{5}-?\d{3})/);
        const ufMatch = localizacao.match(/\s-\s([A-Z]{2})\s-\sCEP/);

        
        const cidadeMatch = localizacao.match(/,\s*([^,]+)\s+-\s+[A-Z]{2}\s+-\s+CEP/);

        
        
        const bairroMatch = localizacao.match(/\s-\s([^,]+),\s*[^,]+\s+-\s+[A-Z]{2}\s+-\s+CEP/);

        let rua = '', numero = '', complemento = '';
        
        const enderecoMatch = localizacao.match(/^([^,]+),\s*(\d+)(?:,\s*(.+?))?\s*-\s*/);
        if (enderecoMatch) {
          rua = enderecoMatch[1]?.trim() || '';
          numero = enderecoMatch[2]?.trim() || '';
          complemento = enderecoMatch[3]?.trim() || '';
        }
        

        
        let horariosAtendimento = {};
        if (terapeutaData.disponibilidadeHorarios) {
          try {
            horariosAtendimento = typeof terapeutaData.disponibilidadeHorarios === 'string'
              ? JSON.parse(terapeutaData.disponibilidadeHorarios)
              : terapeutaData.disponibilidadeHorarios;
          } catch (e) {
            
          }
        }

        

        const formData = {
          
          nome: user.nome || '',
          email: user.email || '',
          cpf: String(terapeutaData.cpf || ''),
          dataNascimento: terapeutaData.dataNascimento ? (() => {
            
            const dateStr = String(terapeutaData.dataNascimento);
            if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
              const [year, month, day] = dateStr.split('-');
              return `${day}/${month}/${year}`;
            }
            return dateStr;
          })() : '',
          identidadeGenero: String(terapeutaData.genero || ''),

          
          telefone: String(terapeutaData.telefone || ''),
          crp: String(terapeutaData.crp || ''),
          religiao: String(terapeutaData.religiao || 'CATOLICO'),
          estadoCivil: String(terapeutaData.estadoCivil || ''),
          anosRelacionamento: terapeutaData.anosRelacionamento ? Number(terapeutaData.anosRelacionamento) : undefined,
          possuiFilhos: Boolean(terapeutaData.possuiFilhos),
          quantidadeFilhos: terapeutaData.quantidadeFilhos ? Number(terapeutaData.quantidadeFilhos) : undefined,
          filhoComDeficiencia: Boolean(terapeutaData.filhosDeficiencia && terapeutaData.filhosDeficiencia.toLowerCase() === 'true'),
          justificativaDeficiencia: String(terapeutaData.justificativaDeficiencia || ''),

          
          modalidadeAtendimento: String(terapeutaData.modalidadeAtendimento || 'online'),
          cep: cepMatch ? cepMatch[1] : '',
          logradouro: rua,
          bairro: bairroMatch ? bairroMatch[1].trim() : '', 
          localidade: cidadeMatch ? cidadeMatch[1].trim() : '',
          localizacaoProfissional: cidadeMatch ? cidadeMatch[1].trim() : '',
          uf: ufMatch ? ufMatch[1] : '',
          estado: '',
          rua: rua,
          numero: numero,
          complemento: complemento,

          
          redesSociais: terapeutaData.redesSociais || {},
          abordagensPrincipais: Array.isArray(terapeutaData.abordagensPrincipais) ? terapeutaData.abordagensPrincipais : [],
          abordagensSecundarias: Array.isArray(terapeutaData.abordagensSecundarias) ? terapeutaData.abordagensSecundarias : [],
          tipoTerapia: (terapeutaData.tipoTerapia && typeof terapeutaData.tipoTerapia === 'string')
            ? terapeutaData.tipoTerapia.split(',').map(s => s.trim())
            : (Array.isArray(terapeutaData.tipoTerapia) ? terapeutaData.tipoTerapia : []),
          experienciaAnos: Number(terapeutaData.experienciaAnos || 0),
          primeiraConsultaGratuita: Boolean(terapeutaData.primeiraConsultaGratuita),
          oQueNaoGostaAtender: (() => {
            
            return String(terapeutaData.oQueNaoGostaAtender || '');
          })(),
          casesSucesso: String(terapeutaData.casesSucesso || ''),
          feedbackPacientes: String(terapeutaData.feedbackPacientes || ''),
          demandaMaisComum: String(terapeutaData.demandaMaisComum || ''),
          instituicaoFormacao: String(terapeutaData.instituicaoFormacao || ''),
          anoFormacao: Number(terapeutaData.anoFormacao || 0),
          especialidades: (terapeutaData.especialidades && typeof terapeutaData.especialidades === 'string')
            ? terapeutaData.especialidades.split(',').map(s => s.trim())
            : (Array.isArray(terapeutaData.especialidades) ? terapeutaData.especialidades : []),
          bio: String(terapeutaData.bio || ''),

          
          diasAtendimento: Array.isArray(terapeutaData.diasAtendimento) ? terapeutaData.diasAtendimento : [],
          horariosAtendimento: horariosAtendimento,
          faixaEtariaAtendimento: (terapeutaData.faixaEtariaAtendimento && typeof terapeutaData.faixaEtariaAtendimento === 'string')
            ? terapeutaData.faixaEtariaAtendimento.split(',').map(s => s.trim()).filter(Boolean)
            : (Array.isArray(terapeutaData.faixaEtariaAtendimento) ? terapeutaData.faixaEtariaAtendimento : []),

          
          diaReuniao: String(terapeutaData.diaReuniao || ''),
          horarioReuniao: String(terapeutaData.horarioReuniao || ''),

          
          valorSessao: terapeutaData.valorSessao ? Number(terapeutaData.valorSessao) : undefined,
          metodosPagamento: (terapeutaData.metodosPagamento && typeof terapeutaData.metodosPagamento === 'string')
            ? terapeutaData.metodosPagamento.split(',').map((m: string) => m.trim()).filter((m: string) => m)
            : (Array.isArray(terapeutaData.metodosPagamento) ? terapeutaData.metodosPagamento : []),
          politicaCancelamento: String(terapeutaData.politicaCancelamento || ''),

          
          aceitaConvenio: Boolean(terapeutaData.aceitaConvenio),
          conveniosAceitos: Array.isArray(terapeutaData.conveniosAceitos) ? terapeutaData.conveniosAceitos : [],

          
          lgbtqFriendly: Boolean(terapeutaData.lgbtqFriendly),
          experienciaCasosLgbtq: terapeutaData.experienciaCasosLgbtq ? Number(terapeutaData.experienciaCasosLgbtq) : undefined,
          certificacoesLgbtq: Array.isArray(terapeutaData.certificacoesLgbtq) ? terapeutaData.certificacoesLgbtq : [],

          
          assuntosPrediletos: String(terapeutaData.assuntosPrediletos || ''),
          hobby: String(terapeutaData.hobby || ''),
          inspiracao: String(terapeutaData.inspiracao || ''),
          filmesMarcantes: String(terapeutaData.filmesMarcantes || ''),
          superacoes: String(terapeutaData.superacoes || ''),
          causaSangue: String(terapeutaData.causaSangue || ''),
          maiorMudanca: String(terapeutaData.maiorMudanca || ''),
          gastariaDinheiro: String(terapeutaData.gastariaDinheiro || ''),
          marcaDeixar: String(terapeutaData.marcaDeixar || ''),
          trabalhoAntesSaudeMental: String(terapeutaData.trabalhoAntesSaudeMental || ''),
          atenderiaPorAmor: String(terapeutaData.atenderiaPorAmor || ''),
        };

        reset(formData);
        setIsLoading(false);
      } catch (error) {
        
        alert('Erro ao carregar dados do perfil');
        router.push('/terapeutas/dashboard');
      }
    };

    if (user?.id && !authLoading) {
      loadTerapeutaData();
    }
  }, [user, authLoading, reset, router]);

  
  const watchedModalidadeAtendimento = watch("modalidadeAtendimento");
  const cep = watch("cep");
  const watchedPossuiFilhos = watch("possuiFilhos");
  const watchedFilhoComDeficiencia = watch("filhoComDeficiencia");
  const watchedLgbtqFriendly = watch("lgbtqFriendly");
  const watchedAceitaConvenio = watch("aceitaConvenio");
  const watchedEstadoCivil = watch("estadoCivil");

  
  const abordagensPrincipais = watch("abordagensPrincipais") || [];
  const abordagensSecundarias = watch("abordagensSecundarias") || [];

  
  const handleCheckboxChange = (value: string, checked: boolean) => {
    if (checked) {
      setCheckboxesSelecionados([...checkboxesSelecionados, value]);
    } else {
      setCheckboxesSelecionados(checkboxesSelecionados.filter(v => v !== value));
    }
  };

  const definirComoPrincipais = () => {
    if (checkboxesSelecionados.length === 0) return;
    const novasAbordagens = [...abordagensPrincipais, ...checkboxesSelecionados];
    setValue("abordagensPrincipais", novasAbordagens);
    setCheckboxesSelecionados([]);
  };

  const definirComoSecundarias = () => {
    if (checkboxesSelecionados.length === 0) return;
    const novasAbordagens = [...abordagensSecundarias, ...checkboxesSelecionados];
    setValue("abordagensSecundarias", novasAbordagens);
    setCheckboxesSelecionados([]);
  };

  const removerPrincipal = (valor: string) => {
    setValue("abordagensPrincipais", abordagensPrincipais.filter((v: string) => v !== valor));
  };

  const removerSecundaria = (valor: string) => {
    setValue("abordagensSecundarias", abordagensSecundarias.filter((v: string) => v !== valor));
  };

  const isAbordagemCategorizada = (value: string) => {
    return abordagensPrincipais.includes(value) || abordagensSecundarias.includes(value);
  };

  
  const mostrarCamposEndereco =
    watchedModalidadeAtendimento?.toLowerCase() === "presencial" ||
    watchedModalidadeAtendimento?.toLowerCase() === "hibrido";

  
  useEffect(() => {
    if (cep && cep.length === 8) { 
      const cleanCep = cep.replace(/\D/g, ''); 

      if (cleanCep.length === 8) { 
        const fetchCepInfo = async () => {
          setLoadingCep(true);
          try {
            const response = await axios.get(`https://viacep.com.br/ws/${cleanCep}/json/`);

            if (!response.data.erro) {

              setValue("logradouro", response.data.logradouro || "");
              setValue("rua", response.data.logradouro || "");
              setValue("bairro", response.data.bairro || "");
              setValue("localidade", response.data.localidade || "");
              setValue("localizacaoProfissional", response.data.localidade || "");
              setValue("uf", response.data.uf || "");
              setValue("estado", response.data.estado || "");
            }
          } catch (error) {
            
          } finally {
            setLoadingCep(false);
          }
        };

        fetchCepInfo();
      }
    } else if (cep && cep.length === 0) {
      
      setValue("logradouro", "");
      setValue("rua", "");
      setValue("bairro", "");
      setValue("localidade", "");
      setValue("localizacaoProfissional", "");
      setValue("uf", "");
      setValue("estado", "");
    }
  }, [cep, setValue]);

  
  
  

  
  
  
  
  
  
  

  
  const onSubmit = async (data: TerapeutaFormData) => {
    if (!user?.id) return;

    try {
      
      let localizacaoClinica = '';
      if (data.rua && data.localidade && data.uf) {
        localizacaoClinica = `${data.rua}`;
        if (data.numero) localizacaoClinica += `, ${data.numero}`;
        if (data.complemento) localizacaoClinica += `, ${data.complemento}`;
        
        if (data.bairro) {
          localizacaoClinica += ` - ${data.bairro}`;
        }
        localizacaoClinica += `, ${data.localidade} - ${data.uf}`;
        if (data.cep) localizacaoClinica += ` - CEP: ${data.cep}`;
      }

      const updateData: any = {
        
        telefone: data.telefone?.trim() || null,
        crp: data.crp?.trim() || null,
        religiao: data.religiao || null,
        estadoCivil: data.estadoCivil || null,
        anosRelacionamento: data.anosRelacionamento || null,
        possuiFilhos: data.possuiFilhos || false,
        quantidadeFilhos: data.quantidadeFilhos || null,
        filhosDeficiencia: data.filhoComDeficiencia ? 'true' : 'false',
        justificativaDeficiencia: data.justificativaDeficiencia?.trim() || null,

        
        modalidadeAtendimento: data.modalidadeAtendimento || null,
        localizacaoClinica: localizacaoClinica || null,

        
        instituicaoFormacao: data.instituicaoFormacao || null,
        anoFormacao: data.anoFormacao || null,
        especialidades: Array.isArray(data.especialidades) ? data.especialidades.join(', ') : (data.especialidades || null),
        bio: data.bio || null,
        abordagensPrincipais: Array.isArray(data.abordagensPrincipais) ? data.abordagensPrincipais : [],
        abordagensSecundarias: Array.isArray(data.abordagensSecundarias) ? data.abordagensSecundarias : [],
        tipoTerapia: Array.isArray(data.tipoTerapia) ? data.tipoTerapia.join(',') : (data.tipoTerapia || null),
        experienciaAnos: data.experienciaAnos || null,
        primeiraConsultaGratuita: data.primeiraConsultaGratuita || false,
        oQueNaoGostaAtender: data.oQueNaoGostaAtender?.trim() || null,
        casesSucesso: data.casesSucesso || null,
        feedbackPacientes: data.feedbackPacientes || null,
        demandaMaisComum: data.demandaMaisComum || null,
        redesSociais: data.redesSociais || null,

        
        diasAtendimento: Array.isArray(data.diasAtendimento) ? data.diasAtendimento : null,
        disponibilidadeHorarios: data.horariosAtendimento ? JSON.stringify(data.horariosAtendimento) : null,
        faixaEtariaAtendimento: Array.isArray(data.faixaEtariaAtendimento)
          ? data.faixaEtariaAtendimento.filter(f => f !== "TODAS").join(',')
          : null,

        
        diaReuniao: data.diaReuniao?.trim() || null,
        horarioReuniao: data.horarioReuniao?.trim() || null,

        
        valorSessao: data.valorSessao || null,
        metodosPagamento: (data.metodosPagamento && Array.isArray(data.metodosPagamento) && data.metodosPagamento.length > 0)
          ? data.metodosPagamento.filter(m => m !== "TODOS").join(',')
          : null,
        politicaCancelamento: data.politicaCancelamento?.trim() || null,

        
        aceitaConvenio: data.aceitaConvenio || false,
        conveniosAceitos: Array.isArray(data.conveniosAceitos) ? data.conveniosAceitos : null,

        
        lgbtqFriendly: data.lgbtqFriendly || false,
        experienciaCasosLgbtq: data.experienciaCasosLgbtq || null,
        certificacoesLgbtq: Array.isArray(data.certificacoesLgbtq) ? data.certificacoesLgbtq : null,

        
        assuntosPrediletos: data.assuntosPrediletos?.trim() || null,
        hobby: data.hobby?.trim() || null,
        inspiracao: data.inspiracao?.trim() || null,
        filmesMarcantes: data.filmesMarcantes?.trim() || null,
        superacoes: data.superacoes?.trim() || null,
        causaSangue: data.causaSangue?.trim() || null,
        maiorMudanca: data.maiorMudanca?.trim() || null,
        gastariaDinheiro: data.gastariaDinheiro?.trim() || null,
        marcaDeixar: data.marcaDeixar?.trim() || null,
        trabalhoAntesSaudeMental: data.trabalhoAntesSaudeMental?.trim() || null,
        atenderiaPorAmor: data.atenderiaPorAmor?.trim() || null,
      };

      await apiService.updateTerapeuta(user.id, updateData);
      alert('Perfil atualizado com sucesso!');
      router.push('/terapeutas/dashboard');
    } catch (error) {
      
      alert('Erro ao atualizar perfil. Tente novamente.');
    }
  };

  if (isLoading || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-t-4 border-primary-600 border-solid rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-neutral-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {}
        <div className="mb-10">
          <button
            onClick={() => router.push('/terapeutas/dashboard')}
            className="flex items-center text-primary-600 hover:text-primary-700 mb-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar para Dashboard
          </button>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-neutral-900 mb-3">
              Editar Perfil Profissional
            </h1>
            <p className="text-neutral-600">
              Atualize as informações do seu perfil profissional
            </p>
          </div>
        </div>

        {}
        <Card className="p-6 sm:p-8">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-primary-100 rounded-lg">
                    <User className="w-5 h-5 text-primary-600" />
                  </div>
                  <h2 className="text-xl font-bold text-neutral-900">
                    Dados Pessoais
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Nome Completo
                    </label>
                    <Input
                      type="text"
                      value={watch("nome")}
                      disabled
                      className="bg-neutral-100 cursor-not-allowed"
                    />
                  </div>

                  {}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Email
                    </label>
                    <Input
                      type="email"
                      value={watch("email")}
                      disabled
                      className="bg-neutral-100 cursor-not-allowed"
                    />
                  </div>

                  {}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Data de Nascimento
                    </label>
                    <Input
                      type="text"
                      value={watch("dataNascimento")}
                      disabled
                      className="bg-neutral-100 cursor-not-allowed"
                    />
                  </div>

                  {}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Gênero
                    </label>
                    <Input
                      type="text"
                      value={watch("identidadeGenero")}
                      disabled
                      className="bg-neutral-100 cursor-not-allowed"
                    />
                  </div>

                  {}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      CPF
                    </label>
                    <Input
                      type="text"
                      value={watch("cpf")}
                      disabled
                      className="bg-neutral-100 cursor-not-allowed"
                    />
                  </div>

                  {}
                  <CampoTexto
                    id="telefone"
                    label="Telefone"
                    placeholder="(00) 00000-0000"
                    register={register}
                    error={errors.telefone?.message?.toString()}
                  />

                  {}
                  <div>
                    <label
                      htmlFor="crp"
                      className="block text-sm font-medium text-neutral-700 mb-2"
                    >
                      CRP/CRM (opcional)
                    </label>
                    <Input
                      id="crp"
                      type="text"
                      placeholder="Ex: 12/34567"
                      {...register("crp")}
                      error={errors.crp?.message?.toString()}
                    />
                  </div>

                  {}
                  <div>
                    <CampoSelect
                      id="religiao"
                      label="Religião *"
                      options={religioes}
                      placeholder="Selecione sua religião"
                      control={control}
                      rules={{
                        required: "Religião é obrigatória",
                      }}
                    />
                    {errors.religiao && errors.religiao.message && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.religiao.message.toString()}
                      </p>
                    )}
                  </div>

                  {}
                  <div>
                    <CampoSelect
                      id="modalidadeAtendimento"
                      label="Modalidade de Atendimento *"
                      options={modalidadesAtendimento}
                      placeholder="Selecione a modalidade"
                      control={control}
                      rules={{
                        required: "Modalidade de atendimento é obrigatória",
                      }}
                    />
                    {errors.modalidadeAtendimento && errors.modalidadeAtendimento.message && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.modalidadeAtendimento.message.toString()}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {}
              {mostrarCamposEndereco && (
                <div>
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 bg-primary-100 rounded-lg">
                      <MapPin className="w-5 h-5 text-primary-600" />
                    </div>
                    <h2 className="text-xl font-bold text-neutral-900">
                      Localização do Consultório
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {}
                    <div>
                      <label
                        htmlFor="cep"
                        className="block text-sm font-medium text-neutral-700 mb-2"
                      >
                        CEP *
                      </label>
                      <div className="relative">
                        <Input
                          id="cep"
                          type="text"
                          placeholder="00000-000"
                          {...register("cep", {
                            required: "CEP é obrigatório",
                            pattern: {
                              value: /^\d{5}-?\d{3}$/,
                              message: "CEP inválido (formato: 00000-000)",
                            },
                            validate: validateCep,
                            setValueAs: (value: string) => {
                              if (!value) return "";
                              return value.replace(/\D/g, '');
                            }
                          })}
                          error={errors.cep?.message?.toString()}
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            if (!inputValue) {
                              setValue("cep", "");
                            } else {
                              const maskedValue = applyCepMask(inputValue);
                              setValue("cep", maskedValue);
                            }
                          }}
                          disabled={loadingCep}
                          className={loadingCep ? "opacity-75 cursor-not-allowed" : ""}
                        />
                        {loadingCep && (
                          <div className="absolute right-3 top-3">
                            <div className="w-5 h-5 border-t-2 border-blue-600 border-solid rounded-full animate-spin"></div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <CampoTexto
                        id="localizacaoProfissional"
                        label="Cidade"
                        placeholder="Cidade"
                        register={register}
                        required
                        rules={{
                          required: "Cidade é obrigatória",
                        }}
                        error={errors.localizacaoProfissional?.message?.toString()}
                      />
                    </div>

                    <div>
                      <CampoTexto
                        id="uf"
                        label="UF"
                        placeholder="UF (ex: SP)"
                        register={register}
                        required
                        rules={{
                          required: "UF é obrigatória",
                          minLength: {
                            value: 2,
                            message: "UF deve ter 2 dígitos",
                          },
                          maxLength: {
                            value: 2,
                            message: "UF deve ter 2 dígitos",
                          },
                          pattern: {
                            value: /^[A-Z]{2}$/,
                            message: "UF deve conter apenas 2 letras maiúsculas (ex: SP)",
                          },
                        }}
                        error={errors.uf?.message?.toString()}
                      />
                    </div>

                    <div>
                      <CampoTexto
                        id="rua"
                        label="Rua"
                        placeholder="Nome da rua"
                        register={register}
                        required
                        rules={{
                          required: "Rua é obrigatória",
                        }}
                        error={errors.rua?.message?.toString()}
                      />
                    </div>

                    <div>
                      <CampoTexto
                        id="bairro"
                        label="Bairro"
                        placeholder="Nome do bairro"
                        register={register}
                        error={errors.bairro?.message?.toString()}
                      />
                    </div>

                    <div>
                      <CampoTexto
                        id="numero"
                        label="Número"
                        placeholder="Número do endereço"
                        register={register}
                      />
                    </div>

                    <div>
                      <CampoTexto
                        id="complemento"
                        label="Complemento"
                        placeholder="Apartamento, bloco, etc."
                        register={register}
                      />
                    </div>
                  </div>
                </div>
              )}

              {}
              <div>
                <CampoRedesSociais />
              </div>

              {}
              <div>
                <SecaoDisponibilidadeShared
                  diasFieldName="diasAtendimento"
                  horariosFieldName="horariosAtendimento"
                  diasLabel="Dias de Atendimento *"
                  horariosLabel="Horários de Atendimento *"
                  title="Disponibilidade"
                />
              </div>

              {}
              <div>
                <SecaoReuniao submitMutation={{ isPending: false }} />
              </div>

              {}
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-primary-100 rounded-lg">
                    <Users className="w-5 h-5 text-primary-600" />
                  </div>
                  <h2 className="text-xl font-bold text-neutral-900">
                    Perfil Profissional
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-neutral-700">
                        Abordagens Terapêuticas *
                      </label>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={definirComoPrincipais}
                          disabled={checkboxesSelecionados.length === 0}
                          className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                            checkboxesSelecionados.length === 0
                              ? "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                              : "bg-primary-600 text-white hover:bg-primary-700"
                          }`}
                        >
                          Principais
                        </button>
                        <button
                          type="button"
                          onClick={definirComoSecundarias}
                          disabled={checkboxesSelecionados.length === 0}
                          className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                            checkboxesSelecionados.length === 0
                              ? "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                              : "bg-neutral-600 text-white hover:bg-neutral-700"
                          }`}
                        >
                          Secundárias
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto p-2 border border-neutral-300 rounded-lg">
                      {abordagensTerapeuticas.map((abordagem) => {
                        const isCategorizada = isAbordagemCategorizada(abordagem.value);
                        const isChecked = checkboxesSelecionados.includes(abordagem.value);

                        return (
                          <div key={abordagem.value} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`abordagem-${abordagem.value}`}
                              value={abordagem.value}
                              checked={isChecked}
                              disabled={isCategorizada}
                              onChange={(e) => handleCheckboxChange(abordagem.value, e.target.checked)}
                              className={`h-4 w-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500 ${
                                isCategorizada ? "opacity-50 cursor-not-allowed" : ""
                              }`}
                            />
                            <label
                              htmlFor={`abordagem-${abordagem.value}`}
                              className={`ml-2 block text-sm ${
                                isCategorizada ? "text-neutral-400 line-through" : "text-neutral-700"
                              }`}
                            >
                              {abordagem.label}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                    {errors.abordagensPrincipais && errors.abordagensPrincipais.message && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.abordagensPrincipais.message.toString()}
                      </p>
                    )}
                  </div>

                  {}
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-neutral-700">
                      Abordagens Selecionadas
                    </label>

                    {}
                    <div className="border border-primary-300 rounded-lg p-3 bg-primary-50">
                      <div className="flex items-center mb-2">
                        <span className="text-lg mr-2">📌</span>
                        <h3 className="text-sm font-semibold text-primary-800">Principais</h3>
                        <span className="ml-auto text-xs text-primary-600">
                          {abordagensPrincipais.length}
                        </span>
                      </div>
                      <div className="space-y-1 max-h-32 overflow-y-auto">
                        {abordagensPrincipais.length === 0 ? (
                          <p className="text-xs text-neutral-500 italic">
                            Nenhuma abordagem principal selecionada
                          </p>
                        ) : (
                          abordagensPrincipais.map((valor: string) => {
                            const abordagem = abordagensTerapeuticas.find(a => a.value === valor);
                            return (
                              <div key={valor} className="flex items-center justify-between bg-white rounded px-2 py-1">
                                <span className="text-xs text-neutral-700">{abordagem?.label}</span>
                                <button
                                  type="button"
                                  onClick={() => removerPrincipal(valor)}
                                  className="text-red-500 hover:text-red-700 text-xs font-bold"
                                  title="Remover"
                                >
                                  ✕
                                </button>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>

                    {}
                    <div className="border border-neutral-300 rounded-lg p-3 bg-neutral-50">
                      <div className="flex items-center mb-2">
                        <span className="text-lg mr-2">📋</span>
                        <h3 className="text-sm font-semibold text-neutral-700">Secundárias</h3>
                        <span className="ml-auto text-xs text-neutral-600">
                          {abordagensSecundarias.length}
                        </span>
                      </div>
                      <div className="space-y-1 max-h-32 overflow-y-auto">
                        {abordagensSecundarias.length === 0 ? (
                          <p className="text-xs text-neutral-500 italic">
                            Nenhuma abordagem secundária selecionada
                          </p>
                        ) : (
                          abordagensSecundarias.map((valor: string) => {
                            const abordagem = abordagensTerapeuticas.find(a => a.value === valor);
                            return (
                              <div key={valor} className="flex items-center justify-between bg-white rounded px-2 py-1">
                                <span className="text-xs text-neutral-700">{abordagem?.label}</span>
                                <button
                                  type="button"
                                  onClick={() => removerSecundaria(valor)}
                                  className="text-red-500 hover:text-red-700 text-xs font-bold"
                                  title="Remover"
                                >
                                  ✕
                                </button>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>
                  </div>

                  {}
                  <Controller
                    name="tipoTerapia"
                    control={control}
                    rules={{
                      required: "Tipo de terapia é obrigatório",
                      validate: (value) => (value && value.length > 0) || "Selecione pelo menos um tipo de terapia",
                    }}
                    render={({ field }) => (
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-neutral-700">
                          Tipo de Terapia *
                        </label>
                        <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto p-2 border border-neutral-300 rounded-lg">
                          {tiposTerapia.map((tipo) => (
                            <div key={tipo.value} className="flex items-center">
                              <input
                                type="checkbox"
                                id={`tipo-${tipo.value}`}
                                value={tipo.value}
                                checked={field.value?.includes(tipo.value) || false}
                                onChange={(e) => {
                                  const newValue = e.target.checked
                                    ? [...(field.value || []), tipo.value]
                                    : (field.value || []).filter((v: string) => v !== tipo.value);
                                  field.onChange(newValue);
                                }}
                                className="h-4 w-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                              />
                              <label
                                htmlFor={`tipo-${tipo.value}`}
                                className="ml-2 block text-sm text-neutral-700"
                              >
                                {tipo.label}
                              </label>
                            </div>
                          ))}
                        </div>
                        {errors.tipoTerapia && errors.tipoTerapia.message && (
                          <p className="text-red-600 text-sm mt-1">
                            {errors.tipoTerapia.message.toString()}
                          </p>
                        )}
                      </div>
                    )}
                  />

                  {}
                  <CampoNumero
                    id="experienciaAnos"
                    label="Anos de Experiência"
                    placeholder="5"
                    min={0}
                    max={50}
                    register={register}
                    required
                    rules={{
                      required: "Anos de experiência são obrigatórios",
                      setValueAs: (value: string) => {
                        if (!value) return 0;
                        return parseInt(value, 10) || 0;
                      },
                      validate: (value: string | number) => {
                        const num = Number(value);
                        if (isNaN(num)) return "Valor deve ser um número";
                        if (num < 0) return "Anos de experiência não podem ser negativos";
                        if (num > 50) return "Máximo de 50 anos de experiência";
                        return true;
                      }
                    }}
                    error={errors.experienciaAnos?.message?.toString()}
                  />

                  {}
                  <div className="md:col-span-2 space-y-4">
                    <Controller
                      name="primeiraConsultaGratuita"
                      control={control}
                      render={({ field }) => (
                        <CampoCheckbox
                          id="primeiraConsultaGratuita"
                          label="Sessão de alinhamento gratuita"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          control={control}
                        />
                      )}
                    />
                  </div>

                  {}
                  <div className="md:col-span-2">
                    <CampoTextArea
                      id="casesSucesso"
                      label="Cite 3 cases de sucesso"
                      placeholder="Descreva três casos de sucesso em sua prática profissional (mantendo sigilo e anonimato)..."
                      rows={4}
                      register={register}
                      required
                      rules={{
                        required: "Este campo é obrigatório",
                        minLength: {
                          value: 50,
                          message: "Descreva com mais detalhes (mínimo 50 caracteres)",
                        },
                      }}
                      error={errors.casesSucesso?.message?.toString()}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <CampoTextArea
                      id="feedbackPacientes"
                      label="O que os pacientes costumam dizer como feedback ?"
                      placeholder="Descreva os feedbacks mais comuns que recebe de seus pacientes..."
                      rows={4}
                      register={register}
                      required
                      rules={{
                        required: "Este campo é obrigatório",
                        minLength: {
                          value: 30,
                          message: "Descreva com mais detalhes (mínimo 30 caracteres)",
                        },
                      }}
                      error={errors.feedbackPacientes?.message?.toString()}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <CampoTextArea
                      id="demandaMaisComum"
                      label="Qual a demanda que você mais atende ?"
                      placeholder="Descreva as demandas mais comuns que você atende em sua prática..."
                      rows={4}
                      register={register}
                      required
                      rules={{
                        required: "Este campo é obrigatório",
                        minLength: {
                          value: 20,
                          message: "Descreva com mais detalhes (mínimo 20 caracteres)",
                        },
                      }}
                      error={errors.demandaMaisComum?.message?.toString()}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <CampoTextArea
                      id="oQueNaoGostaAtender"
                      label="O que não gosta de atender e por quê ?"
                      placeholder="Descreva quais temas ou situações você evita atender e os motivos..."
                      rows={4}
                      register={register}
                      required
                      rules={{
                        required: "Este campo é obrigatório",
                        minLength: {
                          value: 20,
                          message: "Descreva com mais detalhes (mínimo 20 caracteres)",
                        },
                      }}
                      error={errors.oQueNaoGostaAtender?.message?.toString()}
                    />
                  </div>
                </div>
              </div>

              {}
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-primary-100 rounded-lg">
                    <GraduationCap className="w-5 h-5 text-primary-600" />
                  </div>
                  <h2 className="text-xl font-bold text-neutral-900">
                    Formação
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {}
                  <CampoTexto
                    id="instituicaoFormacao"
                    label="Instituição de Formação (opcional)"
                    placeholder="Nome da universidade"
                    register={register}
                    error={errors.instituicaoFormacao?.message?.toString()}
                  />

                  {}
                  <CampoNumero
                    id="anoFormacao"
                    label="Ano de Formação (opcional)"
                    placeholder="2020"
                    register={register}
                    rules={{
                      setValueAs: (value: string) => {
                        if (!value) return 0;
                        return parseInt(value, 10) || 0;
                      },
                      validate: (value: string | number) => {
                        const num = Number(value);
                        
                        if (!num || num === 0) return true;
                        const currentYear = new Date().getFullYear();
                        if (isNaN(num)) return "Valor deve ser um número";
                        if (num < 1950) return "Ano inválido";
                        if (num > currentYear) return "Ano não pode ser no futuro";
                        return true;
                      }
                    }}
                    error={errors.anoFormacao?.message?.toString()}
                  />

                  {}
                  <div className="md:col-span-2">
                    <CampoTexto
                      id="especialidades"
                      label="Especialidades"
                      placeholder="Separe por vírgulas (ex: Ansiedade, Depressão, Relacionamentos)"
                      register={register}
                      required
                      rules={{
                        required: "Especialidades são obrigatórias",
                        setValueAs: (value: string) => {
                          if (!value) return [];
                          if (Array.isArray(value)) return value;
                          if (typeof value === 'string') {
                            return value
                              .split(',')
                              .map((item: string) => item.trim())
                              .filter((item: string) => item.length > 0);
                          }
                          return [];
                        },
                        validate: (value: string[]) => {
                          if (!value || value.length === 0) return "Especialidades são obrigatórias";
                          if (value.length < 1) return "Informe pelo menos uma especialidade";
                          const shortItems = value.filter((item: string) => item.length < 3);
                          if (shortItems.length > 0) return "Cada especialidade deve ter pelo menos 3 caracteres";
                          return true;
                        },
                      }}
                      error={errors.especialidades?.message?.toString()}
                    />
                  </div>

                  {}
                  <div className="md:col-span-2">
                    <CampoTextArea
                      id="bio"
                      label="Biografia Profissional"
                      placeholder="Conte um pouco sobre sua experiência profissional, abordagens terapêuticas e o que motiva seu trabalho..."
                      rows={4}
                      register={register}
                      required
                      rules={{
                        required: "Biografia profissional é obrigatória",
                        minLength: {
                          value: 50,
                          message: "Biografia deve ter pelo menos 50 caracteres",
                        },
                      }}
                      error={errors.bio?.message?.toString()}
                    />
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
                    Informações Familiares
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {}
                  <CampoSelect
                    id="estadoCivil"
                    label="Estado Civil"
                    options={estadosCivis}
                    placeholder="Selecione seu estado civil"
                    control={control}
                  />

                  {}
                  {(watchedEstadoCivil === "CASADO" || watchedEstadoCivil === "DIVORCIADO") && (
                    <CampoNumero
                      id="anosRelacionamento"
                      label="Anos de Relacionamento"
                      placeholder="0"
                      min={0}
                      max={70}
                      register={register}
                    />
                  )}

                  {}
                  <div className="md:col-span-2">
                    <Controller
                      name="possuiFilhos"
                      control={control}
                      render={({ field }) => (
                        <CampoCheckbox
                          id="possuiFilhos"
                          label="Possui filhos?"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          control={control}
                        />
                      )}
                    />
                  </div>

                  {}
                  {watchedPossuiFilhos && (
                    <>
                      <CampoNumero
                        id="quantidadeFilhos"
                        label="Quantidade de Filhos"
                        placeholder="0"
                        min={0}
                        max={20}
                        register={register}
                      />

                      {}
                      <div className="md:col-span-2">
                        <Controller
                          name="filhoComDeficiencia"
                          control={control}
                          defaultValue={false}
                          render={({ field }) => (
                            <div className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id="filhoComDeficiencia"
                                checked={field.value || false}
                                onChange={(e) => field.onChange(e.target.checked)}
                                className="h-4 w-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                              />
                              <label
                                htmlFor="filhoComDeficiencia"
                                className="text-sm font-medium text-neutral-700 cursor-pointer"
                              >
                                Algum filho possui deficiência?
                              </label>
                            </div>
                          )}
                        />
                      </div>

                      {}
                      {watchedFilhoComDeficiencia && (
                        <div className="md:col-span-2">
                          <CampoTextArea
                            id="justificativaDeficiencia"
                            label="Conte-nos sobre, isso é relevanta para o match."
                            placeholder="Descreva como a deficiência do seu filho pode ser relevante para o atendimento terapêutico..."
                            rows={4}
                            register={register}
                          />
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              {}
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-primary-100 rounded-lg">
                    <GraduationCap className="w-5 h-5 text-primary-600" />
                  </div>
                  <h2 className="text-xl font-bold text-neutral-900">
                    Valores e Convênios
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {}
                  <CampoNumero
                    id="valorSessao"
                    label="Valor da Sessão (R$)"
                    placeholder="150"
                    step={10}
                    min={50}
                    max={1000}
                    register={register}
                  />

                  {}
                  <Controller
                    name="faixaEtariaAtendimento"
                    control={control}
                    rules={{
                      validate: (value) =>
                        (value && value.length > 0) || "Selecione pelo menos uma faixa etária",
                    }}
                    render={({ field }) => {
                      const todasSelecionado = field.value?.includes("TODAS") || false;

                      const handleCheckboxChange = (faixaValue: string, checked: boolean) => {
                        if (faixaValue === "TODAS") {
                          if (checked) {
                            
                            const todasFaixas = faixasEtarias.map(f => f.value);
                            field.onChange(todasFaixas);
                          } else {
                            field.onChange([]);
                          }
                        } else {
                          const newValue = checked
                            ? [...(field.value || []), faixaValue]
                            : (field.value || []).filter((v: string) => v !== faixaValue && v !== "TODAS");
                          field.onChange(newValue);
                        }
                      };

                      return (
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-neutral-700 mb-3">
                            Faixa Etária Atendida *
                          </label>
                          <div className="space-y-2">
                            {faixasEtarias.map((faixa) => {
                              const isChecked = (field.value || []).includes(faixa.value);
                              const isDisabled = todasSelecionado && faixa.value !== "TODAS";

                              return (
                                <div key={faixa.value} className="flex items-center space-x-2">
                                  <input
                                    type="checkbox"
                                    id={`faixaEtariaAtendimento-${faixa.value}`}
                                    value={faixa.value}
                                    checked={isChecked}
                                    onChange={(e) => handleCheckboxChange(faixa.value, e.target.checked)}
                                    disabled={isDisabled}
                                    className={`h-4 w-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500 ${
                                      isDisabled ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                                  />
                                  <label
                                    htmlFor={`faixaEtariaAtendimento-${faixa.value}`}
                                    className={`text-sm ${
                                      isDisabled ? "text-neutral-400 cursor-not-allowed" : "text-neutral-700 cursor-pointer"
                                    }`}
                                  >
                                    {faixa.label}
                                  </label>
                                </div>
                              );
                            })}
                          </div>
                          {errors.faixaEtariaAtendimento && errors.faixaEtariaAtendimento.message && (
                            <p className="text-red-600 text-sm mt-1">
                              {errors.faixaEtariaAtendimento.message.toString()}
                            </p>
                          )}
                        </div>
                      );
                    }}
                  />

                  {}
                  <Controller
                    name="metodosPagamento"
                    control={control}
                    rules={{
                      required: "Selecione pelo menos uma forma de pagamento",
                      validate: (value) =>
                        (value && value.length > 0) || "Selecione pelo menos uma forma de pagamento",
                    }}
                    render={({ field }) => {
                      const todosSelecionado = field.value?.includes("TODOS") || false;

                      const handleCheckboxChange = (metodoValue: string, checked: boolean) => {
                        if (metodoValue === "TODOS") {
                          if (checked) {
                            
                            const todosMetodos = metodosPagamento.map(m => m.value);
                            field.onChange(todosMetodos);
                          } else {
                            
                            field.onChange([]);
                          }
                        } else {
                          
                          const newValue = checked
                            ? [...(field.value || []), metodoValue]
                            : (field.value || []).filter((v: string) => v !== metodoValue && v !== "TODOS");
                          field.onChange(newValue);
                        }
                      };

                      return (
                        <div className="md:col-span-2 space-y-2">
                          <label className="block text-sm font-medium text-neutral-700">
                            Formas de Pagamento *
                          </label>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-4 border border-neutral-300 rounded-lg bg-neutral-50">
                            {metodosPagamento.map((metodo) => {
                              const isChecked = field.value?.includes(metodo.value) || false;
                              const isDisabled = todosSelecionado && metodo.value !== "TODOS";

                              return (
                                <div key={metodo.value} className="flex items-center">
                                  <input
                                    type="checkbox"
                                    id={`metodo-${metodo.value}`}
                                    value={metodo.value}
                                    checked={isChecked}
                                    disabled={isDisabled}
                                    onChange={(e) => handleCheckboxChange(metodo.value, e.target.checked)}
                                    className={`h-4 w-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500 ${
                                      isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                                    }`}
                                  />
                                  <label
                                    htmlFor={`metodo-${metodo.value}`}
                                    className={`ml-2 block text-sm ${
                                      isDisabled ? "text-neutral-400 cursor-not-allowed" : "text-neutral-700 cursor-pointer"
                                    }`}
                                  >
                                    {metodo.label}
                                  </label>
                                </div>
                              );
                            })}
                          </div>
                          {errors.metodosPagamento && errors.metodosPagamento.message && (
                            <p className="text-red-600 text-sm mt-1">
                              {errors.metodosPagamento.message.toString()}
                            </p>
                          )}
                        </div>
                      );
                    }}
                  />

                  {}
                  <div className="md:col-span-2">
                    <CampoTextArea
                      id="politicaCancelamento"
                      label="Política de Cancelamento"
                      placeholder="Descreva sua política de cancelamento de sessões..."
                      rows={3}
                      register={register}
                    />
                  </div>

                  {}
                  <div className="md:col-span-2">
                    <Controller
                      name="aceitaConvenio"
                      control={control}
                      render={({ field }) => (
                        <CampoCheckbox
                          id="aceitaConvenio"
                          label="Faz reembolso de convênio ?"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          control={control}
                        />
                      )}
                    />
                  </div>

                </div>
              </div>

              {}
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-pink-100 rounded-lg">
                    <Users className="w-5 h-5 text-pink-600" />
                  </div>
                  <h2 className="text-xl font-bold text-neutral-900">
                    🏳️‍🌈 Faz atendimento ao público LGBTQ+
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {}
                  <div className="md:col-span-2">
                    <Controller
                      name="lgbtqFriendly"
                      control={control}
                      render={({ field }) => (
                        <CampoCheckbox
                          id="lgbtqFriendly"
                          label="Faço atendimento ao público LGBTQ+"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          control={control}
                        />
                      )}
                    />
                  </div>

                  {}
                  {watchedLgbtqFriendly && (
                    <>
                      <CampoNumero
                        id="experienciaCasosLgbtq"
                        label="Anos de Experiência com Comunidade LGBTQ+"
                        placeholder="0"
                        min={0}
                        max={50}
                        register={register}
                      />
                    </>
                  )}
                </div>
              </div>

              {}
              <div className="border-t-4 border-yellow-300 pt-8">
                <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4 mb-6">
                  <p className="text-sm text-yellow-900 font-medium">
                    ⚠️ <strong>Seção de Admissibilidade:</strong> Estas informações são usadas apenas durante o processo de cadastro na plataforma.
                  </p>
                </div>

                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <User className="w-5 h-5 text-yellow-600" />
                  </div>
                  <h2 className="text-xl font-bold text-neutral-900">
                    Questões de Autoconhecimento
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <CampoTextArea
                    id="assuntosPrediletos"
                    label="Quais assuntos você mais gosta de conversar ?"
                    placeholder="Descreva os assuntos que mais te interessam..."
                    rows={3}
                    register={register}
                  />

                  <CampoTextArea
                    id="hobby"
                    label="Qual seu hobby?"
                    placeholder="Descreva seus hobbies e atividades de lazer..."
                    rows={3}
                    register={register}
                  />

                  <CampoTextArea
                    id="inspiracao"
                    label="Quem te inspira?"
                    placeholder="Pessoas, histórias ou experiências que te inspiram..."
                    rows={3}
                    register={register}
                  />

                  <CampoTextArea
                    id="filmesMarcantes"
                    label="Filmes marcantes"
                    placeholder="Obras que marcaram sua vida..."
                    rows={3}
                    register={register}
                  />

                  <CampoTextArea
                    id="superacoes"
                    label="Superações pessoais"
                    placeholder="Conte sobre desafios que você superou..."
                    rows={3}
                    register={register}
                  />

                  <CampoTextArea
                    id="causaSangue"
                    label="Qual causa você defende com paixão?"
                    placeholder="Descreva uma causa importante para você..."
                    rows={3}
                    register={register}
                  />

                  <CampoTextArea
                    id="maiorMudanca"
                    label="Qual foi a maior mudança na sua vida?"
                    placeholder="Conte sobre uma grande transformação..."
                    rows={3}
                    register={register}
                  />

                  <CampoTextArea
                    id="marcaDeixar"
                    label="Que marca você quer deixar no mundo?"
                    placeholder="Seu legado e impacto desejado..."
                    rows={3}
                    register={register}
                  />

                  <CampoTextArea
                    id="trabalhoAntesSaudeMental"
                    label="O que fazia antes de trabalhar com saúde mental?"
                    placeholder="Sua trajetória profissional anterior..."
                    rows={3}
                    register={register}
                  />

                  <CampoTextArea
                    id="atenderiaPorAmor"
                    label="Quem você atenderia por amor (gratuitamente)?"
                    placeholder="Públicos ou causas que te motivam além do financeiro..."
                    rows={3}
                    register={register}
                  />
                </div>
              </div>

              {}
              <div className="pt-6 flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="w-1/2"
                  onClick={() => router.push('/terapeutas/dashboard')}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  size="lg"
                  className="w-1/2"
                >
                  Salvar Alterações
                </Button>
              </div>
            </form>
          </FormProvider>
        </Card>
      </div>
    </div>
  );
};

export default TelaEditarPerfil;