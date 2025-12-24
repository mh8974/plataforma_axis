import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { InformacoesPessoaisData, TelaAtual } from "../types";
import apiService from "@/services/api";
import authService from "@/services/authService";

const defaultValues: InformacoesPessoaisData = {
  dataNascimento: "",
  identidadeGenero: "",
  religiao: "",
  crp: "",
  cep: "",
  logradouro: "",
  bairro: "",
  localidade: "",
  uf: "",
  estado: "",
  abordagensPrincipais: [],
  abordagensSecundarias: [],
  experienciaAnos: "",
  primeiraConsultaGratuita: false,
  oQueNaoGostaAtender: "",
  casesSucesso: "",
  feedbackPacientes: "",
  demandaMaisComum: "",
  instituicaoFormacao: "",
  anoFormacao: "",
  especialidades: [],
  bio: "",
  estadoCivil: "",
  anosRelacionamento: "",
  possuiFilhos: false,
  quantidadeFilhos: "",
  idadesFilhos: [],
  filhosDeficiencia: "",
  filhoComDeficiencia: false,
  justificativaDeficiencia: "",
  assuntosPrediletos: "",
  hobby: "",
  inspiracao: "",
  filmesMarcantes: "",
  superacoes: "",
  causaSangue: "",
  maiorMudanca: "",
  gastariaDinheiro: "",
  marcaDeixar: "",
  trabalhoAntesSaudeMental: "",
  atenderiaPorAmor: "",
  modalidadeAtendimento: "",
  localizacaoProfissional: "",
  rua: "",
  numero: "",
  complemento: "",
  diasAtendimento: [],
  horariosAtendimento: {},
  valorSessao: "",
  diaReuniao: "",
  horarioReuniao: "",
  
  faixaEtariaAtendimento: [],
  metodosPagamento: [],
  politicaCancelamento: "",
  aceitaConvenio: false,
  conveniosAceitos: "",
  aceitaTermos: false,
  
  redesSociais: {
    instagram: "",
    linkedin: "",
    youtube: "",
    tiktok: "",
    facebook: "",
  },
  
  lgbtqFriendly: false,
  experienciaCasosLgbtq: undefined,
};


const safeTrim = (value: any): string => {
  return value && typeof value === 'string' ? value.trim() : '';
};


const safeNumber = (value: any): number | undefined => {
  const numValue = parseInt(String(value));
  return !isNaN(numValue) ? numValue : undefined;
};


const safeFloat = (value: any): number | undefined => {
  const floatValue = parseFloat(String(value));
  return !isNaN(floatValue) ? floatValue : undefined;
};


const converterDataISOParaBR = (dataISO: string): string => {
  if (!dataISO || typeof dataISO !== 'string') return '';

  
  if (dataISO.includes('/')) return dataISO;

  
  const partes = dataISO.split('-');
  if (partes.length === 3) {
    const [ano, mes, dia] = partes;
    return `${dia}/${mes}/${ano}`;
  }

  return dataISO;
};


const extrairCEP = (localizacao: string): string => {
  if (!localizacao) return '';

  
  const regexCEP = /CEP:\s*(\d{5}-?\d{3})/i;
  const match = localizacao.match(regexCEP);

  return match ? match[1] : '';
};

export const useInformacoesPessoais = () => {
  const router = useRouter();
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [tela, setTela] = useState<TelaAtual>(1);

  const methods = useForm<InformacoesPessoaisData>({
    defaultValues,
    mode: "onChange", 
    reValidateMode: "onChange", 
  });

  const { handleSubmit, control, register, setValue, watch, reset, formState: { errors } } = methods;

  
  const watchedEstadoCivil = watch("estadoCivil");
  const watchedPossuiFilhos = watch("possuiFilhos");
  const watchedModalidadeAtendimento = watch("modalidadeAtendimento");
  const watchedDiaReuniao = watch("diaReuniao");
  const watchedLgbtqFriendly = watch("lgbtqFriendly");

  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tela, submitSuccess]);

  
  useEffect(() => {
    const recuperarProgresso = async () => {
      const usuarioId = sessionStorage.getItem('usuarioId') || localStorage.getItem('usuarioId');

      if (!usuarioId) {
        
        return;
      }

      try {
        
        

        const response = await apiService.recuperarProgressoCadastro(parseInt(usuarioId));

        if (response) {
          
          const terapeutaData = response;

          
          let horariosAtendimento = {};
          if (terapeutaData.disponibilidadeHorarios) {
            try {
              horariosAtendimento = typeof terapeutaData.disponibilidadeHorarios === 'string'
                ? JSON.parse(terapeutaData.disponibilidadeHorarios)
                : terapeutaData.disponibilidadeHorarios;
            } catch (e) {
              
            }
          }

          
          
          
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

          
          
          
          
          
          
          
          
          

          
          const formData: InformacoesPessoaisData = {
            
            dataNascimento: terapeutaData.dataNascimento ? (() => {
              const dateStr = String(terapeutaData.dataNascimento);
              if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
                const [year, month, day] = dateStr.split('-');
                return `${day}/${month}/${year}`;
              }
              return dateStr;
            })() : '',

            
            identidadeGenero: String(terapeutaData.genero || ''),

            
            religiao: String(terapeutaData.religiao || ''),
            crp: String(terapeutaData.crp || ''),
            instituicaoFormacao: String(terapeutaData.instituicaoFormacao || ''),
            anoFormacao: terapeutaData.anoFormacao ? String(terapeutaData.anoFormacao) : '',
            bio: String(terapeutaData.bio || ''),
            valorSessao: terapeutaData.valorSessao ? String(terapeutaData.valorSessao) : '',
            modalidadeAtendimento: String(terapeutaData.modalidadeAtendimento || ''),
            experienciaAnos: terapeutaData.experienciaAnos ? String(terapeutaData.experienciaAnos) : '',
            estadoCivil: String(terapeutaData.estadoCivil || ''),
            anosRelacionamento: terapeutaData.anosRelacionamento ? String(terapeutaData.anosRelacionamento) : '',
            quantidadeFilhos: terapeutaData.quantidadeFilhos ? String(terapeutaData.quantidadeFilhos) : '',
            justificativaDeficiencia: String(terapeutaData.justificativaDeficiencia || ''),
            diaReuniao: String(terapeutaData.diaReuniao || ''),
            horarioReuniao: String(terapeutaData.horarioReuniao || ''),
            
            metodosPagamento: (terapeutaData.metodosPagamento && typeof terapeutaData.metodosPagamento === 'string')
              ? terapeutaData.metodosPagamento.split(',').map((m: string) => m.trim()).filter((m: string) => m)
              : (Array.isArray(terapeutaData.metodosPagamento) ? terapeutaData.metodosPagamento : []),
            politicaCancelamento: String(terapeutaData.politicaCancelamento || ''),

            
            cep: cepMatch ? cepMatch[1] : '',
            logradouro: rua, 
            bairro: bairroMatch ? bairroMatch[1].trim() : '', 
            localidade: cidadeMatch ? cidadeMatch[1].trim() : '', 
            uf: ufMatch ? ufMatch[1] : '', 
            estado: '',
            rua: rua, 
            numero: numero, 
            complemento: complemento, 
            localizacaoProfissional: cidadeMatch ? cidadeMatch[1].trim() : '', 

            
            primeiraConsultaGratuita: Boolean(terapeutaData.primeiraConsultaGratuita),
            possuiFilhos: Boolean(terapeutaData.possuiFilhos),
            lgbtqFriendly: Boolean(terapeutaData.lgbtqFriendly),
            aceitaConvenio: Boolean(terapeutaData.aceitaConvenio),
            filhoComDeficiencia: Boolean(terapeutaData.filhosDeficiencia && terapeutaData.filhosDeficiencia.toLowerCase() === 'true'),

            
            oQueNaoGostaAtender: String(terapeutaData.oQueNaoGostaAtender || ''),
            casesSucesso: String(terapeutaData.casesSucesso || ''),
            feedbackPacientes: String(terapeutaData.feedbackPacientes || ''),
            demandaMaisComum: String(terapeutaData.demandaMaisComum || ''),
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
            experienciaCasosLgbtq: terapeutaData.experienciaCasosLgbtq,
            filhosDeficiencia: '',

            
            abordagensPrincipais: Array.isArray(terapeutaData.abordagensPrincipais) ? terapeutaData.abordagensPrincipais : [],
            abordagensSecundarias: Array.isArray(terapeutaData.abordagensSecundarias) ? terapeutaData.abordagensSecundarias : [],
            diasAtendimento: Array.isArray(terapeutaData.diasAtendimento) ? terapeutaData.diasAtendimento : [],

            
            tipoTerapia: (terapeutaData.tipoTerapia && typeof terapeutaData.tipoTerapia === 'string')
              ? terapeutaData.tipoTerapia.split(',').map((t: string) => t.trim()).filter((t: string) => t)
              : (Array.isArray(terapeutaData.tipoTerapia) ? terapeutaData.tipoTerapia : []),

            
            especialidades: (terapeutaData.especialidades && typeof terapeutaData.especialidades === 'string')
              ? terapeutaData.especialidades.split(',').map((e: string) => e.trim()).filter((e: string) => e)
              : (Array.isArray(terapeutaData.especialidades) ? terapeutaData.especialidades : []),

            
            conveniosAceitos: (terapeutaData.conveniosAceitos && Array.isArray(terapeutaData.conveniosAceitos))
              ? terapeutaData.conveniosAceitos.join(', ')
              : '',

            
            redesSociais: (terapeutaData.redesSociais && typeof terapeutaData.redesSociais === 'object')
              ? terapeutaData.redesSociais
              : { instagram: '', linkedin: '', youtube: '', tiktok: '', facebook: '' },

            
            horariosAtendimento: horariosAtendimento,

            
            faixaEtariaAtendimento: (terapeutaData.faixaEtariaAtendimento && typeof terapeutaData.faixaEtariaAtendimento === 'string')
              ? terapeutaData.faixaEtariaAtendimento.split(',').map((f: string) => f.trim()).filter((f: string) => f)
              : (Array.isArray(terapeutaData.faixaEtariaAtendimento) ? terapeutaData.faixaEtariaAtendimento : []),

            
            idadesFilhos: [],
            aceitaTermos: false,
          };

          
          
          
          
          
          
          
          
          
          
          
          
          
          

          
          reset(formData);

          alert('Dados anteriores recuperados! Você pode continuar de onde parou.');
        } else {
          
        }
      } catch (error) {
        
      }
    };

    recuperarProgresso();
  }, []); 

  
  const onContinuarParaSegundaTela = () => { setTela(2); };
  const onBackFromSegundaTela = () => { setTela(1); };
  const onContinuarParaTerceiraTela = () => { setTela(3); };
  const onBackFromTerceiraTela = () => { setTela(2); };

  
  const salvarProgresso = async (data: InformacoesPessoaisData) => {
    const usuarioId = sessionStorage.getItem('usuarioId') || localStorage.getItem('usuarioId');

    if (!usuarioId) {
      
      return;
    }

    try {
      

      
      const dadosParaEnvio: any = {
        usuarioId: parseInt(usuarioId),
        
        dataNascimento: data.dataNascimento,
        identidadeGenero: safeTrim(data.identidadeGenero),
        religiao: safeTrim(data.religiao),
        crp: safeTrim(data.crp),
        instituicaoFormacao: safeTrim(data.instituicaoFormacao),
        anoFormacao: safeNumber(data.anoFormacao),
        bio: safeTrim(data.bio),
        valorSessao: safeFloat(data.valorSessao),
        primeiraConsultaGratuita: data.primeiraConsultaGratuita || false,
        possuiFilhos: data.possuiFilhos || false,
        abordagensPrincipais: data.abordagensPrincipais || [],
        abordagensSecundarias: data.abordagensSecundarias || [],
        especialidades: data.especialidades || [],
        estadoCivil: safeTrim(data.estadoCivil),
        diasAtendimento: data.diasAtendimento || [],
        horariosAtendimento: data.horariosAtendimento || {},
        modalidadeAtendimento: safeTrim(data.modalidadeAtendimento),
        oQueNaoGostaAtender: data.oQueNaoGostaAtender?.trim() || null,
        casesSucesso: data.casesSucesso?.trim() || null,
        feedbackPacientes: data.feedbackPacientes?.trim() || null,
        demandaMaisComum: data.demandaMaisComum?.trim() || null,
        assuntosPrediletos: safeTrim(data.assuntosPrediletos),
        hobby: safeTrim(data.hobby),
        inspiracao: safeTrim(data.inspiracao),
        filmesMarcantes: safeTrim(data.filmesMarcantes),
        superacoes: safeTrim(data.superacoes),
        causaSangue: safeTrim(data.causaSangue),
        maiorMudanca: safeTrim(data.maiorMudanca),
        gastariaDinheiro: safeTrim(data.gastariaDinheiro),
        marcaDeixar: safeTrim(data.marcaDeixar),
        trabalhoAntesSaudeMental: safeTrim(data.trabalhoAntesSaudeMental),
        atenderiaPorAmor: safeTrim(data.atenderiaPorAmor),
        cep: safeTrim(data.cep),
        logradouro: safeTrim(data.logradouro),
        bairro: safeTrim(data.bairro),
        localidade: safeTrim(data.localidade),
        uf: safeTrim(data.uf),
        estado: safeTrim(data.estado),
        rua: safeTrim(data.rua),
        numero: safeTrim(data.numero),
        complemento: safeTrim(data.complemento),
        anosRelacionamento: safeNumber(data.anosRelacionamento),
        quantidadeFilhos: safeNumber(data.quantidadeFilhos),
        experienciaAnos: safeNumber(data.experienciaAnos),
        filhosDeficiencia: data.filhoComDeficiencia ? 'true' : 'false',
        justificativaDeficiencia: safeTrim(data.justificativaDeficiencia),
        lgbtqFriendly: data.lgbtqFriendly || false,
        experienciaCasosLgbtq: safeNumber(data.experienciaCasosLgbtq),
        diaReuniao: safeTrim(data.diaReuniao),
        horarioReuniao: safeTrim(data.horarioReuniao),
        faixaEtariaAtendimento: Array.isArray(data.faixaEtariaAtendimento) ? data.faixaEtariaAtendimento.join(',') : '',
        metodosPagamento: Array.isArray(data.metodosPagamento) ? data.metodosPagamento.join(',') : '',
        politicaCancelamento: safeTrim(data.politicaCancelamento),
        aceitaConvenio: data.aceitaConvenio || false,
      };

      
      if (data.tipoTerapia && Array.isArray(data.tipoTerapia) && data.tipoTerapia.length > 0) {
        dadosParaEnvio.tipoTerapia = data.tipoTerapia;
      }

      
      const conveniosAceitos = safeTrim(data.conveniosAceitos);
      if (conveniosAceitos) {
        const conveniosArray = conveniosAceitos.split(',').map(c => c.trim()).filter(c => c);
        if (conveniosArray.length > 0) {
          dadosParaEnvio.conveniosAceitos = conveniosArray;
        }
      }

      
      if (data.redesSociais && Object.keys(data.redesSociais).length > 0) {
        const redesSociaisLimpas = Object.entries(data.redesSociais)
          .filter(([_, value]) => value && typeof value === 'string' && value.trim())
          .reduce((acc, [key, value]) => {
            acc[key] = (value as string).trim();
            return acc;
          }, {} as any);

        if (Object.keys(redesSociaisLimpas).length > 0) {
          dadosParaEnvio.redesSociais = redesSociaisLimpas;
        }
      }

      await apiService.salvarProgressoCadastro(dadosParaEnvio);
      
    } catch (error) {
      
      
    }
  };

  const onSubmitTela1 = async (data: InformacoesPessoaisData) => {
    await salvarProgresso(data);
    setTela(2);
  };

  const onSubmitTela2 = async (data: InformacoesPessoaisData) => {
    await salvarProgresso(data);
    setTela(3);
  };

  const onSubmitFinal = async (data: InformacoesPessoaisData) => {
    
    
    
    

    try {
      
      
      
      
      

      
      
      
      
      
      
      

      
      const usuarioId = sessionStorage.getItem('usuarioId') || localStorage.getItem('usuarioId');
      if (!usuarioId) {
        
        alert('Erro: ID do usuário não encontrado. Refaça o cadastro da primeira etapa.');
        router.push('/profissional/cadastro');
        return;
      }

      

      
      

      if (!data.bio || data.bio.trim() === '') {
        
        alert('Por favor, preencha a Bio antes de continuar.');
        return;
      }

      
      const userCpf = sessionStorage.getItem('userCpf') || localStorage.getItem('userCpf');
      

      
      const dadosParaEnvio: any = {
        usuarioId: parseInt(usuarioId),
        
        ...(userCpf && { cpf: userCpf }),
        dataNascimento: data.dataNascimento,
        instituicaoFormacao: safeTrim(data.instituicaoFormacao),
        anoFormacao: safeNumber(data.anoFormacao),
        bio: safeTrim(data.bio),
        primeiraConsultaGratuita: data.primeiraConsultaGratuita || false,
        possuiFilhos: data.possuiFilhos || false,
        identidadeGenero: safeTrim(data.identidadeGenero),
        religiao: safeTrim(data.religiao),
        abordagensPrincipais: data.abordagensPrincipais || [],
        abordagensSecundarias: data.abordagensSecundarias || [],
        oQueNaoGostaAtender: data.oQueNaoGostaAtender?.trim() || null,
        casesSucesso: data.casesSucesso?.trim() || null,
        feedbackPacientes: data.feedbackPacientes?.trim() || null,
        demandaMaisComum: data.demandaMaisComum?.trim() || null,
        especialidades: data.especialidades,
        estadoCivil: safeTrim(data.estadoCivil),
        valorSessao: safeFloat(data.valorSessao),
        diasAtendimento: data.diasAtendimento,
        horariosAtendimento: data.horariosAtendimento,
        assuntosPrediletos: safeTrim(data.assuntosPrediletos),
        atenderiaPorAmor: safeTrim(data.atenderiaPorAmor),
        causaSangue: safeTrim(data.causaSangue),
        filmesMarcantes: safeTrim(data.filmesMarcantes),
        hobby: safeTrim(data.hobby),
        inspiracao: safeTrim(data.inspiracao),
        maiorMudanca: safeTrim(data.maiorMudanca),
        marcaDeixar: safeTrim(data.marcaDeixar),
        superacoes: safeTrim(data.superacoes),
        trabalhoAntesSaudeMental: safeTrim(data.trabalhoAntesSaudeMental),
        modalidadeAtendimento: safeTrim(data.modalidadeAtendimento),
      }

      const crp = safeTrim(data.crp);
      if (crp) {
        dadosParaEnvio.crp = crp;
      }

      
      const cep = safeTrim(data.cep);
      if (cep) {
        dadosParaEnvio.cep = cep;
      }

      const logradouro = safeTrim(data.                       logradouro);
      if (logradouro) {
        dadosParaEnvio.logradouro = logradouro;
      }

      const bairro = safeTrim(data.bairro);
      if (bairro) {
        dadosParaEnvio.bairro = bairro;
      }

      const localidade = safeTrim(data.localidade);
      if (localidade) {
        dadosParaEnvio.localidade = localidade;
      }

      const uf = safeTrim(data.uf);
      if (uf) {
        dadosParaEnvio.uf = uf;
      }

      const estado = safeTrim(data.estado);
      if (estado) {
        dadosParaEnvio.estado = estado;
      }

      
      const rua = safeTrim(data.rua);
      if (rua) {
        dadosParaEnvio.rua = rua;
      }

      const numero = safeTrim(data.numero);
      if (numero) {
        dadosParaEnvio.numero = numero;
      }

      const complemento = safeTrim(data.complemento);
      if (complemento) {
        dadosParaEnvio.complemento = complemento;
      }

      const anosRelacionamento = safeNumber(data.anosRelacionamento);
      if (anosRelacionamento !== undefined) {
        dadosParaEnvio.anosRelacionamento = anosRelacionamento;
      }

      const quantidadeFilhos = safeNumber(data.quantidadeFilhos);
      if (quantidadeFilhos !== undefined) {
        dadosParaEnvio.quantidadeFilhos = quantidadeFilhos;
      }

      const experienciaAnos = safeNumber(data.experienciaAnos);
      if (experienciaAnos !== undefined) {
        dadosParaEnvio.experienciaAnos = experienciaAnos;
      }

      const localizacaoProfissional = safeTrim(data.localizacaoProfissional);
      if (localizacaoProfissional) {
        dadosParaEnvio.localizacaoProfissional = localizacaoProfissional;
      }

      
      dadosParaEnvio.filhosDeficiencia = data.filhoComDeficiencia ? 'true' : 'false';

      
      const justificativaDeficiencia = safeTrim(data.justificativaDeficiencia);
      if (justificativaDeficiencia && data.filhoComDeficiencia) {
        dadosParaEnvio.justificativaDeficiencia = justificativaDeficiencia;
      }

      
      dadosParaEnvio.lgbtqFriendly = data.lgbtqFriendly || false;
      const experienciaCasosLgbtq = safeNumber(data.experienciaCasosLgbtq);
      if (experienciaCasosLgbtq !== undefined) {
        dadosParaEnvio.experienciaCasosLgbtq = experienciaCasosLgbtq;
      }

      
      if (data.tipoTerapia && Array.isArray(data.tipoTerapia) && data.tipoTerapia.length > 0) {
        dadosParaEnvio.tipoTerapia = data.tipoTerapia;
      } else if (data.tipoTerapia && typeof data.tipoTerapia === 'string') {
        dadosParaEnvio.tipoTerapia = [safeTrim(data.tipoTerapia)];
      }

      
      const horarioReuniao = safeTrim(data.horarioReuniao);
      if (horarioReuniao) {
        dadosParaEnvio.horarioReuniao = horarioReuniao;
      }

      
      const diaReuniao = safeTrim(data.diaReuniao);
      if (diaReuniao) {
        dadosParaEnvio.diaReuniao = diaReuniao;
      }

      
      if (data.faixaEtariaAtendimento && Array.isArray(data.faixaEtariaAtendimento) && data.faixaEtariaAtendimento.length > 0) {
        dadosParaEnvio.faixaEtariaAtendimento = data.faixaEtariaAtendimento.join(',');
      }

      
      if (data.metodosPagamento && Array.isArray(data.metodosPagamento) && data.metodosPagamento.length > 0) {
        dadosParaEnvio.metodosPagamento = data.metodosPagamento.join(',');
      }

      const politicaCancelamento = safeTrim(data.politicaCancelamento);
      if (politicaCancelamento) {
        dadosParaEnvio.politicaCancelamento = politicaCancelamento;
      }

      dadosParaEnvio.aceitaConvenio = data.aceitaConvenio || false;

      
      const conveniosAceitos = safeTrim(data.conveniosAceitos);
      if (conveniosAceitos) {
        
        const conveniosArray = conveniosAceitos.split(',').map(c => c.trim()).filter(c => c);
        if (conveniosArray.length > 0) {
          dadosParaEnvio.conveniosAceitos = conveniosArray;
        }
      }

      
      
      
      

      if (data.redesSociais && Object.keys(data.redesSociais).length > 0) {
        

        
        const redesSociaisLimpas = Object.entries(data.redesSociais)
          .filter(([key, value]) => {
            
            return value && typeof value === 'string' && value.trim();
          })
          .reduce((acc, [key, value]) => {
            
            acc[key] = (value as string).trim();
            return acc;
          }, {} as any);

        
        

        if (Object.keys(redesSociaisLimpas).length > 0) {
          
          dadosParaEnvio.redesSociais = redesSociaisLimpas;
        } else {
          
        }
      } else {
        
      }

      
      
      
      
      

      
      const resultado = await apiService.criarInformacoesPessoaisProfissional(dadosParaEnvio);

      
      

      
      authService.clearCadastroData();

      setSubmitSuccess(true);
      setTimeout(() => {
        
        const token = authService.getToken();
        const userData = authService.getUser();

        if (token && userData) {
          
          
          userData.statusPerfil = 'COMPLETO';

          
          const isRememberMe = !!localStorage.getItem('axios_token');
          authService.setUser(userData, isRememberMe);
          
          

          if (userData.tipo === 'TERAPEUTA') {
            router.push('/terapeutas/dashboard');
          } else if (userData.tipo === 'PACIENTE') {
            router.push('/pacientes/dashboard');
          } else if (userData.tipo === 'ADMINISTRADOR') {
            router.push('/admin/dashboard');
          } else {
            router.push('/dashboard');
          }
        } else {
          
          router.push("/login?message=Perfil profissional criado com sucesso! Faça login para continuar.");
        }
      }, 3000);

    } catch (error: any) {
      
      

      
      let errorMessage = "Erro ao finalizar cadastro. Verifique os dados e tente novamente.";

      if (error?.response?.data) {
        const errorData = error.response.data;

        
        if (typeof errorData === 'string') {
          errorMessage = errorData;
        } else if (errorData.message) {
          errorMessage = errorData.message;
        } else if (errorData.error) {
          errorMessage = errorData.error;
        }

        
        if (errorMessage.toLowerCase().includes('usuário não encontrado')) {
          
          errorMessage = 'Erro: O usuário da primeira etapa não foi encontrado no sistema. Por favor, refaça o cadastro da primeira etapa.';
          alert(errorMessage);
          
          authService.clearCadastroData();
          router.push('/profissional/cadastro');
          return;
        } else if (errorMessage.toLowerCase().includes('já existe um perfil de terapeuta')) {
          errorMessage = 'Este usuário já possui um perfil de terapeuta cadastrado. Faça login para acessar sua conta.';
        } else if (errorMessage.toLowerCase().includes('crp já cadastrado') ||
                   errorMessage.toLowerCase().includes('crp já está cadastrado')) {
          errorMessage = 'Este CRP já está cadastrado no sistema. Por favor, verifique seus dados ou entre em contato com o suporte.';
        } else if (errorMessage.toLowerCase().includes('cpf já cadastrado') ||
                   errorMessage.toLowerCase().includes('cpf já está cadastrado')) {
          errorMessage = 'Este CPF já está cadastrado no sistema. Por favor, verifique seus dados.';
        } else if (errorMessage.toLowerCase().includes('data de nascimento') ||
                   errorMessage.toLowerCase().includes('datanascimento')) {
          errorMessage = 'Erro no formato da data de nascimento. Use o formato DD/MM/AAAA.';
        }
      } else if (error?.message) {
        errorMessage = error.message;
      }

      alert(errorMessage);
    }
  };

  return {
    
    submitSuccess,
    tela,

    
    methods,
    handleSubmit,
    control,
    register,
    setValue,
    watch,
    errors,

    
    watchedEstadoCivil,
    watchedPossuiFilhos,
    watchedModalidadeAtendimento,
    watchedDiaReuniao,
    watchedLgbtqFriendly,

    
    onContinuarParaSegundaTela,
    onBackFromSegundaTela,
    onContinuarParaTerceiraTela,
    onBackFromTerceiraTela,

    
    onSubmitTela1,
    onSubmitTela2,
    onSubmitFinal,
  };
};