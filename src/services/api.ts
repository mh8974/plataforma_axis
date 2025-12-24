import axios, { AxiosInstance, AxiosResponse } from 'axios';
import {
  LoginRequest,
  AuthResponse,
  Usuario,
  Paciente,
  Terapeuta
} from '@/types';
import authService from './authService';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: '/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    
    this.api.interceptors.request.use((config) => {
      const token = this.getAuthToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          
          
          const isLoginRequest = error.config?.url?.includes('/auth/login');
          const isOnLoginPage = typeof window !== 'undefined' && window.location.pathname === '/login';

          if (!isLoginRequest && !isOnLoginPage) {
            this.removeAuthToken();
            if (typeof window !== 'undefined') {
              window.location.href = '/login';
            }
          }
        }
        return Promise.reject(error);
      }
    );
  }

  private getAuthToken(): string | null {
    return authService.getToken();
  }

  private setAuthToken(token: string, rememberMe: boolean = false): void {
    authService.setToken(token, rememberMe);
  }

  private removeAuthToken(): void {
    authService.logout();
  }

  
  async login(credentials: LoginRequest & { rememberMe?: boolean }): Promise<AuthResponse> {
    
    authService.clearAllCache();

    
    const response: AxiosResponse<AuthResponse> = await this.api.post('/auth/login', {
      email: credentials.email,
      senha: credentials.senha
    });

    
    this.setAuthToken(response.data.token, credentials.rememberMe || false);

    
    authService.setUser(response.data.usuario, credentials.rememberMe || false);

    
    

    return response.data;
  }

  async logout(): Promise<void> {
    this.removeAuthToken();
  }

  
  async solicitarResetSenha(email: string): Promise<{ message: string; details?: string }> {
    const response: AxiosResponse<{ message: string; details?: string }> = await this.api.post(
      '/auth/resetar-senha/solicitar',
      { email }
    );
    return response.data;
  }

  async validarTokenReset(token: string): Promise<boolean> {
    try {
      const response: AxiosResponse<{ valido: boolean }> = await this.api.post(
        '/auth/resetar-senha/validar-token',
        { token }
      );
      return response.data.valido;
    } catch (error) {
      return false;
    }
  }

  async confirmarResetSenha(dados: {
    token: string;
    novaSenha: string;
    confirmarSenha: string;
  }): Promise<{ message: string; details?: string }> {
    const response: AxiosResponse<{ message: string; details?: string }> = await this.api.post(
      '/auth/resetar-senha/confirmar',
      dados
    );
    return response.data;
  }

  
  async createUsuario(usuario: Partial<Usuario>): Promise<Usuario> {
    const response: AxiosResponse<Usuario> = await this.api.post('/usuarios', usuario);
    return response.data;
  }

  async getUsuarios(): Promise<Usuario[]> {
    const response: AxiosResponse<Usuario[]> = await this.api.get('/usuarios');
    return response.data;
  }

  async getUsuario(id: number): Promise<Usuario> {
    const response: AxiosResponse<Usuario> = await this.api.get(`/usuarios/${id}`);
    return response.data;
  }

  
  async createPaciente(paciente: Partial<Paciente>): Promise<Paciente> {
    const response: AxiosResponse<Paciente> = await this.api.post('/pacientes', paciente);
    return response.data;
  }

  async getPaciente(id: number): Promise<Paciente> {
    const response: AxiosResponse<Paciente> = await this.api.get(`/pacientes/${id}`);
    return response.data;
  }

  async updatePaciente(id: number, paciente: Partial<Paciente>): Promise<Paciente> {
    const response: AxiosResponse<Paciente> = await this.api.put(`/pacientes/${id}`, paciente);
    return response.data;
  }

  
  async criarUsuarioPaciente(dados: {
    nomeCompleto: string;
    email: string;
    senha: string;
    confirmarSenha: string;
    telefone: string;
    ddi?: string;
    cpf: string;
    aceitaTermos: boolean;
  }): Promise<any> {
    const response = await this.api.post('/questionario-paciente', dados);
    return response.data;
  }

  
  async completarQuestionarioPaciente(dados: any): Promise<any> {
    const response = await this.api.post('/pacientes/completar-questionario', dados);
    return response.data;
  }

  
  async salvarProgressoPaciente(dados: any): Promise<any> {
    const response = await this.api.post('/pacientes/salvar-progresso', dados);
    return response.data;
  }

  
  async recuperarProgressoPaciente(usuarioId: number): Promise<any> {
    const response = await this.api.get(`/pacientes/recuperar/${usuarioId}`);
    return response.data;
  }

  
  async createTerapeuta(terapeuta: Partial<Terapeuta>): Promise<Terapeuta> {
    const response: AxiosResponse<Terapeuta> = await this.api.post('/terapeutas', terapeuta);
    return response.data;
  }

  async getTerapeuta(id: number): Promise<Terapeuta> {
    const response: AxiosResponse<Terapeuta> = await this.api.get(`/terapeutas/${id}`);
    return response.data;
  }

  async getTerapeutas(): Promise<Terapeuta[]> {
    const response: AxiosResponse<Terapeuta[]> = await this.api.get('/terapeutas');
    return response.data;
  }

  async updateTerapeuta(id: number, terapeuta: Partial<Terapeuta>): Promise<Terapeuta> {
    const response: AxiosResponse<Terapeuta> = await this.api.put(`/terapeutas/${id}`, terapeuta);
    return response.data;
  }

  
  async criarUsuarioProfissional(dados: {
    nomeCompleto: string;
    email: string;
    senha: string;
    confirmarSenha: string;
    telefone: string;
    ddi?: string;
    cpf: string;
    aceitaTermos: boolean;
  }): Promise<any> {
    const response = await this.api.post('/questionario-profissional', dados);
    return response.data;
  }

  
  async criarInformacoesPessoaisProfissional(dados: any): Promise<any> {
    const response = await this.api.post('/profissionais/informacoes-pessoais', dados);
    return response.data;
  }

  
  async salvarProgressoCadastro(dados: any): Promise<any> {
    const response = await this.api.post('/profissionais/salvar-progresso', dados);
    return response.data;
  }

  
  async recuperarProgressoCadastro(usuarioId: number): Promise<any> {
    const response = await this.api.get(`/profissionais/recuperar/${usuarioId}`);
    return response.data;
  }

  
  async getStatusCadastro(usuarioId: number): Promise<any> {
    const response: AxiosResponse<any> = await this.api.get(`/usuarios/${usuarioId}/status-cadastro`);
    return response.data;
  }

  
  async healthCheck(): Promise<{ status: string }> {
    const response = await this.api.get('/health');
    return response.data;
  }
}


const apiService = new ApiService();
export default apiService;