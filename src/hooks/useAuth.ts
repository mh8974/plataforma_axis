import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Usuario } from '@/types';
import apiService from '@/services/api';
import authService from '@/services/authService';

export interface AuthState {
  user: Usuario | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  });
  
  const router = useRouter();

  
  const loadUserFromStorage = (): Usuario | null => {
    return authService.getUser();
  };

  
  const setUser = (user: Usuario | null) => {
    setAuthState({
      user,
      isAuthenticated: !!user,
      isLoading: false
    });

    if (!user) {
      authService.logout();
    }
  };

  
  const logout = async () => {
    try {
      await apiService.logout();
    } catch (error) {
      
    }

    authService.logout();
    setUser(null);
    router.push('/');
  };

  
  const checkTokenValidity = async () => {
    if (typeof window === 'undefined') return;

    
    if (!authService.isSessionValid()) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      return;
    }

    try {
      
      await apiService.healthCheck();

      
      authService.renewSession();

      
      const storedUser = loadUserFromStorage();
      if (storedUser) {
        setAuthState({
          user: storedUser,
          isAuthenticated: true,
          isLoading: false
        });
      } else {
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false
        });
      }
    } catch (error) {
      
      authService.logout();
      setUser(null);
    }
  };

  
  const getDashboardRoute = (userType: string): string => {
    switch (userType) {
      case 'PACIENTE':
        return '/pacientes/dashboard';
      case 'TERAPEUTA':
        return '/terapeutas/dashboard';
      case 'ADMINISTRADOR':
        return '/admin/dashboard';
      default:
        return '/dashboard';
    }
  };

  
  useEffect(() => {
    checkTokenValidity();
  }, []);

  
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'axis_user' || e.key === 'axios_token') {
        if (e.newValue === null) {
          
          setUser(null);
        } else if (e.key === 'axis_user' && e.newValue) {
          
          try {
            const user = JSON.parse(e.newValue);
            setAuthState({
              user,
              isAuthenticated: true,
              isLoading: false
            });
          } catch (error) {
            
          }
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return {
    ...authState,
    setUser,
    logout,
    checkTokenValidity,
    getDashboardRoute
  };
};