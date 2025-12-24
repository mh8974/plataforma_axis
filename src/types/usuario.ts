

export interface Paciente {
  usuarioId: number;
  nome: string;
  email: string;

  
  idade?: number;
  sexo?: string;
  faixaSalarial?: string;
  localizacao?: string;
  descricaoProblema?: string;

  
  problemaPrincipal?: string;
  problemasSecundarios?: string[];
  nivelUrgencia?: number;

  
  modalidadePreferida?: string;
  frequenciaSessoes?: string;
  duracaoTratamentoEsperada?: string;
  diasDisponiveis?: string[];
  horariosPreferenciais?: string[];
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

  
  metasCurtoPrazo?: string;
  metasLongoPrazo?: string;
  experienciaAutoconhecimento?: number;
  interesseGruposTerapia?: boolean;
  disponibilidadeTarefasCasa?: boolean;
}

export interface Terapeuta {
  anosExperiencia: number;
  religiao: string;
  telefone: string;
  usuarioId: number;
  nome: string;
  email: string;
  cpf: string;
  crp: string;
  instituicaoFormacao: string;
  anoFormacao: number;
  especialidades: string;
  bio: string;
  localizacaoProfissional: string;
  localizacaoClinica?: string;
  metodosPagamento: string; 
  valorSessao: number;
  
  
  genero?: string;
  dataNascimento?: string;
  idadeCalculada?: number;
  experienciaAnos?: number;
  posGraduacao?: string;
  certificacoes?: string[];
  abordagemTerapeutica?: string; 
  abordagensPrincipais?: string[];
  abordagensSecundarias?: string[];
  modalidadeAtendimento?: string;
  faixaEtariaAtendimento?: string;
  aceitaConvenio?: boolean;
  conveniosAceitos?: string[];
  disponibilidadeHorarios?: any; 
  diasAtendimento?: string[];
  horarioInicio?: string;
  horarioFim?: string;
  lgbtqFriendly?: boolean;
  formacaoDiversidade?: string;
  certificacoesLgbtq?: string[];
  experienciaCasosLgbtq?: number;
  notaMedia?: number;
  totalAvaliacoes?: number;
  totalPacientesAtendidos?: number;
  anosPlataforma?: number;
  primeiraConsultaGratuita?: boolean;
  valorPrimeiraConsulta?: number;
  politicaCancelamento?: string;
  tempoRespostaHoras?: number;
  redesSociais?: any;
  tipoTerapia?: string;
  oQueNaoGostaAtender?: string;
  casesSucesso?: string;
  feedbackPacientes?: string;
  demandaMaisComum?: string;

  
  estadoCivil?: string;
  anosRelacionamento?: number;
  possuiFilhos?: boolean;
  quantidadeFilhos?: number;
  filhosDeficiencia?: string;
  justificativaDeficiencia?: string;

  
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

  
  diaReuniao?: string;
  horarioReuniao?: string;
  horarioReuniaoDisponivel?: string; 

  
  statusCadastro?: 'PENDENTE' | 'APROVADO' | 'REPROVADO';
  dataCadastro?: string;
  dataAprovacao?: string;
  aprovadoPor?: number;
  nomeAprovadoPor?: string; 
  motivoReprovacao?: string;
  fbAprovEntrevista?: string; 
  tempoEspera?: number; 
}


export enum StatusCadastro {
  PENDENTE = 'PENDENTE',
  APROVADO = 'APROVADO',
  REPROVADO = 'REPROVADO'
}


export interface AprovarTerapeutaRequest {
  adminId: number;
}


export interface ReprovarTerapeutaRequest {
  adminId: number;
  motivo: string;
}