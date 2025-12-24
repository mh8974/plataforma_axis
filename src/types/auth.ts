

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  cpf?: string; 
  tipo: 'PACIENTE' | 'TERAPEUTA' | 'ADMINISTRADOR';
  ativo: boolean;
  statusPerfil?: 'INCOMPLETO' | 'COMPLETO';
  senha?: string; 
}

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface AuthResponse {
  token: string;
  usuario: Usuario;
}

export interface AuthState {
  user: Usuario | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}