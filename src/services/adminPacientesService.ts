

import axiosInstance from '../lib/axios';


const API_BASE_URL = '';


export interface PageResponse<T> {
  content: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}


export interface Paciente {
  usuarioId: number;
  nome: string;
  email: string;
  idade?: number;
  sexo?: string;
  profissao?: string;
  faixaSalarial: string;
  localizacao: string;
  descricaoProblema: string;
  problemaPrincipal?: string;
  problemasSecundarios?: string[];
  nivelUrgencia?: number;
  modalidadePreferida?: string;
  frequenciaSessoes?: string;
  duracaoTratamentoEsperada?: string;
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
  flexibilidadeHorarios?: boolean;
  horariosPreferenciais?: string[];
  diasDisponiveis?: string[];
}


export interface PacienteDetalhado extends Paciente {
  id: number;
  telefone?: string;
  dataCriacao: string;
  dataAtualizacao: string;

  
  estadoCivil?: string;
  tempoRelacionamentoAnos?: number;
  escolaridade?: string;
  moraCom?: string;
  religiao?: string;
  religiaoOutras?: string;

  
  idCep?: number;
  cep?: string;
  logradouro?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  numeroEndereco?: string;
  complementoEndereco?: string;
  complementoLocalizacao?: string;
  latitude?: number;
  longitude?: number;

  
  disponibilidadeHorarios?: string;
}


export interface ListarPacientesPaginadoParams {
  page?: number;
  size?: number;
  busca?: string;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
  statusPerfil?: string;
}


export interface EstatisticasPacientes {
  totalPacientes: number;
  porLocalizacao: Record<string, number>;
  porProblemaPrincipal: Record<string, number>;
}


export const listarPacientesPaginado = async (
  params: ListarPacientesPaginadoParams = {}
): Promise<PageResponse<Paciente>> => {
  const response = await axiosInstance.get<PageResponse<Paciente>>(
    `${API_BASE_URL}/admin/pacientes/paginado`,
    { params }
  );
  return response.data;
};


export const getPacienteDetalhes = async (pacienteId: number): Promise<PacienteDetalhado> => {
  const response = await axiosInstance.get<PacienteDetalhado>(
    `${API_BASE_URL}/admin/pacientes/${pacienteId}/detalhes`
  );
  return response.data;
};


export const getEstatisticasPacientes = async (): Promise<EstatisticasPacientes> => {
  const response = await axiosInstance.get<EstatisticasPacientes>(
    `${API_BASE_URL}/admin/pacientes/estatisticas`
  );
  return response.data;
};

export default {
  listarPacientesPaginado,
  getPacienteDetalhes,
  getEstatisticasPacientes
};
