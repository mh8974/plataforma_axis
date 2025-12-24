import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  User,
  Settings,
  Calendar,
  Search,
  Edit3,
  LogOut,
  Bell,
  Heart,
  Clock,
  MessageCircle,
  Star
} from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import apiService from '@/services/api';
import { useAuth } from '@/hooks/useAuth';

interface PacienteData {
  id: number;
  nome: string;
  email: string;
  idade: number;
  localizacao: string;
  problemaPrincipal: string;
  terapeutasFavoritos: number;
  proximasSessoes: number;
}

const DashboardPaciente: React.FC = () => {
  const router = useRouter();
  const [pacienteData, setPacienteData] = useState<PacienteData | null>(null);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, isLoading: authLoading, user, logout } = useAuth();

  
  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated || !user || user.tipo !== 'PACIENTE') {
        router.push('/login');
        return;
      }

      
      if (user.statusPerfil === 'INCOMPLETO') {
        router.push('/paciente/cadastro');
        return;
      }
      
    }
  }, [isAuthenticated, authLoading, user, router]);

  useEffect(() => {
    if (!authLoading && isAuthenticated && user && user.tipo === 'PACIENTE') {

    
    const loadPacienteData = async () => {
      try {
        const pacienteData = await apiService.getPaciente(user.id);

        const dashboardData: PacienteData = {
          id: user.id,
          nome: user.nome,
          email: user.email,
          idade: pacienteData.idade || 0,
          localizacao: pacienteData.localizacao || "Não informado",
          problemaPrincipal: pacienteData.problemaPrincipal || "Não informado",
          terapeutasFavoritos: 0, 
          proximasSessoes: 0 
        };

        setPacienteData(dashboardData);
        setLoading(false);
      } catch (error) {
        
        
        const basicData: PacienteData = {
          id: user.id,
          nome: user.nome,
          email: user.email,
          idade: 0,
          localizacao: "Não informado",
          problemaPrincipal: "Não informado",
          terapeutasFavoritos: 0,
          proximasSessoes: 0
        };
        setPacienteData(basicData);
        setLoading(false);
      }
    };

    loadPacienteData();
    }
  }, [authLoading, isAuthenticated, user]);

  const handleLogout = () => {
    logout();
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-600">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  if (!pacienteData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-neutral-600">Erro ao carregar dados do paciente</p>
          <Button onClick={() => router.push('/login')} className="mt-4">
            Voltar ao Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50">
        {}
        <div className="bg-white shadow-sm border-b border-neutral-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              {}
              <div className="flex items-center space-x-4">
                <Link href="/" className="flex items-center space-x-3">
                  <img
                    src="/logo-axis.png"
                    alt="AXIS Logo"
                    className="w-8 h-8 object-contain"
                  />
                  <span className="text-xl font-bold text-neutral-900">AXIS</span>
                </Link>
                <div className="h-6 border-l border-neutral-300"></div>
                <h1 className="text-2xl font-bold text-neutral-900">Meu Painel</h1>
              </div>

              {}
              <div className="flex items-center space-x-4">
                {}
                <button className="relative p-2 rounded-lg hover:bg-neutral-100 transition-colors">
                  <Bell className="w-5 h-5 text-neutral-600" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-accent-500 rounded-full"></span>
                </button>

                {}
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-sm font-medium text-neutral-900">{pacienteData.nome}</p>
                    <p className="text-xs text-neutral-500">Paciente</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                </div>

                {}
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
                  title="Sair"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-neutral-900 mb-2">
              Olá, {pacienteData.nome.split(' ')[0]}! 👋
            </h2>
            <p className="text-neutral-600">
              Bem-vindo ao seu painel. Aqui você pode gerenciar suas consultas e encontrar o terapeuta ideal para você.
            </p>
          </div>

          {}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-primary-100 rounded-lg">
                  <Calendar className="w-6 h-6 text-primary-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-1">
                {pacienteData.proximasSessoes}
              </h3>
              <p className="text-sm text-neutral-600">Próximas Sessões</p>
            </Card>

            {}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-accent-100 rounded-lg">
                  <Heart className="w-6 h-6 text-accent-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-1">
                {pacienteData.terapeutasFavoritos}
              </h3>
              <p className="text-sm text-neutral-600">Favoritos</p>
            </Card>

            {}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-secondary-100 rounded-lg">
                  <MessageCircle className="w-6 h-6 text-secondary-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-1">0</h3>
              <p className="text-sm text-neutral-600">Mensagens Não Lidas</p>
            </Card>
          </div>

          {}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {}
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push('/buscar-terapeuta')}>
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-primary-100 rounded-lg">
                  <Search className="w-6 h-6 text-primary-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    Buscar Terapeutas
                  </h3>
                  <p className="text-sm text-neutral-600 mb-4">
                    Encontre o terapeuta ideal baseado nas suas necessidades e preferências
                  </p>
                  <Button variant="primary" className="w-full">
                    Começar Busca
                  </Button>
                </div>
              </div>
            </Card>

            {}
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push('/pacientes/dashboard/editar-perfil')}>
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-accent-100 rounded-lg">
                  <Edit3 className="w-6 h-6 text-accent-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    Editar Perfil
                  </h3>
                  <p className="text-sm text-neutral-600 mb-4">
                    Atualize suas informações, preferências e disponibilidade
                  </p>
                  <Button variant="secondary" className="w-full">
                    Editar
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-neutral-900">Informações do Perfil</h3>
              <button
                onClick={() => router.push('/pacientes/dashboard/editar-perfil')}
                className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center space-x-1"
              >
                <Edit3 className="w-4 h-4" />
                <span>Editar</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-neutral-500">Nome</label>
                <p className="text-neutral-900 mt-1">{pacienteData.nome}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-neutral-500">Email</label>
                <p className="text-neutral-900 mt-1">{pacienteData.email}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-neutral-500">Idade</label>
                <p className="text-neutral-900 mt-1">
                  {pacienteData.idade > 0 ? `${pacienteData.idade} anos` : 'Não informado'}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-neutral-500">Localização</label>
                <p className="text-neutral-900 mt-1">{pacienteData.localizacao}</p>
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-medium text-neutral-500">Problema Principal</label>
                <p className="text-neutral-900 mt-1">{pacienteData.problemaPrincipal}</p>
              </div>
            </div>
          </Card>

          {}
          <Card className="p-6 mt-6">
            <h3 className="text-xl font-bold text-neutral-900 mb-4">Próximas Sessões</h3>
            <div className="text-center py-8">
              <Clock className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
              <p className="text-neutral-500 mb-4">Você não tem sessões agendadas</p>
              <Button
                variant="primary"
                onClick={() => router.push('/buscar-terapeuta')}
              >
                Encontrar Terapeuta
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default DashboardPaciente;
