

import axiosInstance from '../lib/axios';
import { Terapeuta, AprovarTerapeutaRequest, ReprovarTerapeutaRequest, StatusCadastro } from '../types/usuario';
import { TerapeutaDetalhado } from '../types/terapeuta';



const API_BASE_URL = '';


export interface PageResponse<T> {
  content: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}


export interface ListarTerapeutasPaginadoParams {
  page?: number;
  size?: number;
  status?: string;
  busca?: string;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
  statusPerfil?: string;
}


export const listarTodosTerapeutas = async (): Promise<Terapeuta[]> => {
  const response = await axiosInstance.get<Terapeuta[]>(`${API_BASE_URL}/admin/terapeutas`);
  return response.data;
};


export const listarTerapeutasPorStatus = async (status: StatusCadastro): Promise<Terapeuta[]> => {
  const response = await axiosInstance.get<Terapeuta[]>(`${API_BASE_URL}/admin/terapeutas`, {
    params: { status }
  });
  return response.data;
};


export const listarTerapeutasPendentes = async (): Promise<Terapeuta[]> => {
  const response = await axiosInstance.get<Terapeuta[]>(`${API_BASE_URL}/admin/terapeutas/pendentes`);
  return response.data;
};


export const listarTerapeutasPaginado = async (
  params: ListarTerapeutasPaginadoParams = {}
): Promise<PageResponse<Terapeuta>> => {
  const response = await axiosInstance.get<PageResponse<Terapeuta>>(
    `${API_BASE_URL}/admin/terapeutas/paginado`,
    { params }
  );
  return response.data;
};


export const aprovarTerapeuta = async (
  terapeutaId: number,
  adminId: number,
  feedback: string
): Promise<Terapeuta> => {
  const request = { adminId: adminId.toString(), feedback };
  const response = await axiosInstance.post<Terapeuta>(
    `${API_BASE_URL}/admin/terapeutas/${terapeutaId}/aprovar`,
    request
  );
  return response.data;
};


export const atualizarFeedbackEntrevista = async (
  terapeutaId: number,
  adminId: number,
  feedback: string
): Promise<Terapeuta> => {
  const request = { adminId: adminId.toString(), feedback };
  const response = await axiosInstance.put<Terapeuta>(
    `${API_BASE_URL}/admin/terapeutas/${terapeutaId}/feedback`,
    request
  );
  return response.data;
};


export const reprovarTerapeuta = async (
  terapeutaId: number,
  adminId: number,
  motivo: string
): Promise<Terapeuta> => {
  const request: ReprovarTerapeutaRequest = { adminId, motivo };
  const response = await axiosInstance.post<Terapeuta>(
    `${API_BASE_URL}/admin/terapeutas/${terapeutaId}/reprovar`,
    request
  );
  return response.data;
};


export const getTerapeutaDetalhes = async (terapeutaId: number): Promise<TerapeutaDetalhado> => {
  const response = await axiosInstance.get<TerapeutaDetalhado>(
    `${API_BASE_URL}/admin/terapeutas/${terapeutaId}/detalhes`
  );
  return response.data;
};

export default {
  listarTodosTerapeutas,
  listarTerapeutasPorStatus,
  listarTerapeutasPendentes,
  listarTerapeutasPaginado,
  aprovarTerapeuta,
  reprovarTerapeuta,
  atualizarFeedbackEntrevista,
  getTerapeutaDetalhes
};
