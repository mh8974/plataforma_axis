

export interface ApiResponse<T = any> {
  data: T;
  success: boolean;
  message?: string;
  errors?: string[];
}

export interface ApiError {
  status: number;
  message: string;
  code?: string;
  details?: any;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface ApiRequestConfig {
  timeout?: number;
  retries?: number;
  retryDelay?: number;
  headers?: Record<string, string>;
}

export interface UploadResponse {
  url: string;
  filename: string;
  size: number;
  mimeType: string;
}

export interface HealthCheckResponse {
  status: 'healthy' | 'unhealthy';
  version: string;
  uptime: number;
  timestamp: string;
  services: {
    database: 'connected' | 'disconnected';
    redis?: 'connected' | 'disconnected';
  };
}


export const API_ENDPOINTS = {
  
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    REGISTER: '/auth/register',
    RESET_SENHA: {
      SOLICITAR: '/auth/resetar-senha/solicitar',
      VALIDAR_TOKEN: '/auth/resetar-senha/validar-token',
      CONFIRMAR: '/auth/resetar-senha/confirmar',
    },
  },
  
  
  USERS: {
    PROFILE: '/users/profile',
    UPDATE_PROFILE: '/users/profile',
    CHANGE_PASSWORD: '/users/change-password',
    DELETE_ACCOUNT: '/users/delete-account',
  },
  
  
  PACIENTES: {
    CREATE: '/pacientes',
    GET_BY_ID: (id: number) => `/pacientes/${id}`,
    UPDATE: (id: number) => `/pacientes/${id}`,
    DELETE: (id: number) => `/pacientes/${id}`,
    LIST: '/pacientes',
  },
  
  
  TERAPEUTAS: {
    CREATE: '/terapeutas',
    GET_BY_ID: (id: number) => `/terapeutas/${id}`,
    UPDATE: (id: number) => `/terapeutas/${id}`,
    DELETE: (id: number) => `/terapeutas/${id}`,
    LIST: '/terapeutas',
    SEARCH: '/terapeutas/search',
  },
  
  
  MATCHING: {
    FIND_MATCHES: '/matching/find',
    GET_RECOMMENDATIONS: '/matching/recommendations',
    SAVE_PREFERENCES: '/matching/preferences',
  },
  
  
  UPLOAD: {
    IMAGE: '/upload/image',
    DOCUMENT: '/upload/document',
  },
  
  
  SYSTEM: {
    HEALTH: '/health',
    VERSION: '/version',
  },
} as const;


export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;


export interface ResetSenhaRequest {
  email: string;
}

export interface ValidarTokenRequest {
  token: string;
}

export interface ResetSenhaConfirmRequest {
  token: string;
  novaSenha: string;
  confirmarSenha: string;
}

export interface ResetSenhaResponse {
  message: string;
  details?: string;
}

export interface ValidarTokenResponse {
  valido: boolean;
}