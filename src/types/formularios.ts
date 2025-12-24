

export interface FormStep {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
}

export interface FormField {
  id: string;
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'radio' | 'checkbox' | 'textarea' | 'range' | 'multiselect';
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: Array<{
    value: string | number;
    label: string;
    description?: string;
  }>;
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
  conditional?: {
    field: string;
    value: any;
  };
}

export interface FormState {
  currentStep: number;
  totalSteps: number;
  isValid: boolean;
  isSubmitting: boolean;
  errors: Record<string, string>;
  values: Record<string, any>;
}

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: RegExp;
  email?: boolean;
  cpf?: boolean;
  telefone?: boolean;
  message?: string;
  customValidator?: (value: any) => string | true;
}

export interface FieldError {
  field: string;
  message: string;
  type: 'required' | 'validation' | 'custom';
}


export interface QuestionarioPacienteData {
  
  nomeCompleto: string;
  email: string;
  senha: string;
  confirmarSenha: string;
  cpf: string;
  ddi: string;
  telefone: string;

  
  dataNascimento?: string; 
  sexualidade?: "FEMININO" | "MASCULINO" | "LGBTQIAPN+"; 

  
  profissao?: string;
  estadoCivil?: string; 
  tempoRelacionamentoAnos?: number; 
  escolaridade?: string;
  moraCom?: string; 
  religiao?: string; 
  religiaoOutras?: string; 

  faixaSalarial?: string; 
  localizacao?: string; 
  expectativas?: string; 
  cep?: string;

  
  focoPrincipal?: string; 
  areasEspeciais?: string[]; 
  nivelUrgencia?: number; 

  
  tipoTerapia?: "INDIVIDUAL" | "CASAL" | "GRUPO";
  modalidadeAtendimento?: "presencial" | "online" | "hibrido"; 
  frequenciaSessoes?: string; 
  duracaoTratamentoEsperada?: string; 
  diasDisponiveis?: string[];
  horariosDisponiveis?: { [key: string]: string[] }; 
  flexibilidadeHorarios?: boolean;

  
  preferenciasProfissional?: string[]; 
  preferenciaIdade?: string[]; 
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
  metasLongoPrazo?: string;
  experienciaAutoconhecimento?: number; 
  interesseGruposTerapia?: boolean;
  disponibilidadeTarefasCasa?: boolean;

  
  laudo?: string[];
  aceitaTermos?: boolean;
  receberEmails?: boolean;
}

export interface QuestionarioProfissionalData {
  
  nomeCompleto: string;
  email: string;
  senha: string;
  confirmarSenha: string;
  cpf: string;
  ddi: string;
  telefone: string;

  
  crp: string;
  instituicaoFormacao: string;
  anoFormacao: number;
  especializacoes: string[];
  abordagemTerapeutica: string;
  bio: string;

  
  modalidadeAtendimento: string;
  valorSessao: number;
  disponibilidade: any;

  
  aceitaTermos: boolean;
  receberEmails: boolean;
}