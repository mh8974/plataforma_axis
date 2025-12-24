export interface InformacoesPessoaisData {
  dataNascimento: string;
  identidadeGenero: string;
  religiao: string;
  crp: string;
  cep: string;
  logradouro?: string;
  bairro?: string;
  localidade?: string;
  uf?: string;
  estado?: string;
  abordagensPrincipais: string[];
  abordagensSecundarias: string[];
  tipoTerapia?: string[];
  experienciaAnos: string | number;
  primeiraConsultaGratuita: boolean;
  oQueNaoGostaAtender: string;
  casesSucesso: string;
  feedbackPacientes: string;
  demandaMaisComum: string;
  instituicaoFormacao: string;
  anoFormacao: string | number;
  especialidades: string[];
  bio: string;
  estadoCivil: string;
  anosRelacionamento?: string | number;
  possuiFilhos: boolean;
  quantidadeFilhos?: string | number;
  idadesFilhos?: number[];
  filhosDeficiencia?: string;
  filhoComDeficiencia?: boolean;
  justificativaDeficiencia?: string;
  assuntosPrediletos: string;
  hobby: string;
  inspiracao: string;
  filmesMarcantes: string;
  superacoes: string;
  causaSangue: string;
  maiorMudanca: string;
  gastariaDinheiro: string;
  marcaDeixar: string;
  trabalhoAntesSaudeMental: string;
  atenderiaPorAmor: string;
  modalidadeAtendimento: string;
  localizacaoProfissional?: string;
  localizacaoClinica?: string;
  rua?: string;
  numero?: string;
  complemento?: string;
  diasAtendimento: string[];
  horariosAtendimento: Record<string, string[]>;
  valorSessao: string | number;
  diaReuniao: string;
  horarioReuniao: string;
  
  faixaEtariaAtendimento?: string[];
  metodosPagamento?: string[];
  politicaCancelamento?: string;
  aceitaConvenio?: boolean;
  conveniosAceitos?: string; 
  aceitaTermos: boolean;
  
  redesSociais: {
    instagram?: string;
    linkedin?: string;
    youtube?: string;
    tiktok?: string;
    facebook?: string;
  };
  
  lgbtqFriendly: boolean;
  experienciaCasosLgbtq?: number;
}

export type TelaAtual = 1 | 2 | 3;