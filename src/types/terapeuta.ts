
export interface TerapeutaDetalhado {
  
  id: number;
  nome: string;
  email: string;
  telefone: string;
  dataCadastro: string; 

  
  cpf: string;
  genero?: string;
  dataNascimento?: string; 
  idadeCalculada?: number;
  religiao?: string;
  estadoCivil?: string;
  anosRelacionamento?: number;
  possuiFilhos?: boolean;
  quantidadeFilhos?: number;
  filhosComDeficiencia?: boolean;
  filhosDeficiencia?: string;
  justificativaDeficiencia?: string;

  
  crp?: string;
  instituicaoFormacao?: string;
  anoFormacao?: number;
  experienciaAnos?: number;
  posGraduacao?: string[];
  certificacoes?: string[];

  
  abordagemTerapeutica?: string; 
  abordagensPrincipais?: string[];
  abordagensSecundarias?: string[];
  tipoTerapia?: string;
  especialidades?: string; 
  oQueNaoGostaAtender?: string;

  
  modalidadeAtendimento?: string;
  faixaEtariaAtendimento?: string;
  disponibilidadeHorarios?: string;
  diasAtendimento?: string[];
  horarioInicio?: string; 
  horarioFim?: string; 

  
  diaReuniao?: string;
  horarioReuniao?: string;
  horarioReuniaoDisponivel?: string; 

  
  valorSessao?: number;
  primeiraConsultaGratuita?: boolean;
  valorPrimeiraConsulta?: number;
  metodosPagamento?: string; 
  politicaCancelamento?: string;

  
  aceitaConvenio?: boolean;
  conveniosAceitos?: string[];

  
  lgbtqFriendly?: boolean;
  experienciaCasosLgbtq?: number;
  formacaoDiversidade?: string;
  certificacoesLgbtq?: string[];

  
  localizacaoClinica?: string;

  
  bio?: string;
  demandaMaisComum?: string;
  tempoRespostaHoras?: number;
  totalPacientesAtendidos?: number;
  notaMedia?: number;
  totalAvaliacoes?: number;
  anosPlataforma?: number;
  casesSucesso?: string;
  feedbackPacientes?: string;

  
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

  
  redesSociais?: RedesSociais;

  
  statusCadastro: 'PENDENTE' | 'APROVADO' | 'REPROVADO';
  dataAprovacao?: string;
  aprovadoPor?: number;
  motivoReprovacao?: string;
  fbAprovEntrevista?: string; 
  diasAguardando?: number;
}


export interface RedesSociais {
  instagram?: string;
  linkedin?: string;
  website?: string;
  facebook?: string;
  twitter?: string;
  youtube?: string;
  tiktok?: string;
  [key: string]: string | undefined; 
}


export interface DisponibilidadeDia {
  dia: string;
  horario: string;
  ativo: boolean;
}


export interface AprovarTerapeutaRequest {
  adminId: number;
}


export interface ReprovarTerapeutaRequest {
  adminId: number;
  motivo: string;
}
