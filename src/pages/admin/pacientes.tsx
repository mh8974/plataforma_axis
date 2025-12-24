import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import PacientesDashboard from '../../components/admin/PacientesDashboard';
import { useAuth } from '../../hooks/useAuth';


export default function AdminPacientesPage() {
  const router = useRouter();
  const { user, isLoading, isAuthenticated } = useAuth();

  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  
  if (!isAuthenticated || !user) {
    if (typeof window !== 'undefined') {
      router.push('/login?redirect=/admin/pacientes');
    }
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Redirecionando para login...</p>
        </div>
      </div>
    );
  }

  
  if (user.tipo !== 'ADMINISTRADOR') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-red-900 mb-2">Acesso Negado</h2>
            <p className="text-red-700 mb-4">
              Você não tem permissão para acessar esta página.
              Apenas administradores podem visualizar pacientes.
            </p>
            <button
              onClick={() => router.back()}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Voltar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Gerenciar Pacientes - AXIS Admin</title>
        <meta name="description" content="Painel de visualização de pacientes" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <PacientesDashboard />
        </div>
      </div>
    </>
  );
}
