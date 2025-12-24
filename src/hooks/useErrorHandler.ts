

import { useState, useCallback } from 'react';
import { ApiError } from '@/types';

interface UseErrorHandlerReturn {
  error: string | null;
  isError: boolean;
  clearError: () => void;
  handleError: (error: any) => void;
  handleApiError: (error: ApiError) => void;
}

export function useErrorHandler(): UseErrorHandlerReturn {
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const handleError = useCallback((error: any) => {
    
    
    let errorMessage = 'Ocorreu um erro inesperado';
    
    
    if (typeof error === 'string') {
      errorMessage = error;
    } else if (error?.message) {
      errorMessage = error.message;
    } else if (error?.response?.data?.message) {
      errorMessage = error.response.data.message;
    } else if (error?.response?.statusText) {
      errorMessage = error.response.statusText;
    }
    
    setError(errorMessage);
    
    
    if (process.env.NODE_ENV === 'production') {
      
      
      
      
      
      
      
    }
  }, []);

  const handleApiError = useCallback((apiError: ApiError) => {
    
    
    let errorMessage = 'Erro na comunicação com o servidor';
    
    
    switch (apiError.status) {
      case 400:
        errorMessage = apiError.message || 'Dados inválidos enviados';
        break;
      case 401:
        errorMessage = 'Sessão expirada. Faça login novamente';
        break;
      case 403:
        errorMessage = 'Você não tem permissão para esta ação';
        break;
      case 404:
        errorMessage = 'Recurso não encontrado';
        break;
      case 409:
        errorMessage = apiError.message || 'Conflito de dados';
        break;
      case 422:
        errorMessage = apiError.message || 'Dados de entrada inválidos';
        break;
      case 500:
        errorMessage = 'Erro interno do servidor. Tente novamente mais tarde';
        break;
      case 503:
        errorMessage = 'Serviço temporariamente indisponível';
        break;
      default:
        errorMessage = apiError.message || 'Erro de comunicação com o servidor';
    }
    
    setError(errorMessage);
  }, []);

  return {
    error,
    isError: !!error,
    clearError,
    handleError,
    handleApiError,
  };
}