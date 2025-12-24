import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  User,
  Settings,
  BarChart3,
  Calendar,
  Users,
  Edit3,
  LogOut,
  Bell,
  Star,
  Clock,
  TrendingUp,
  MessageCircle
} from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import apiService from '@/services/api';
import { useAuth } from '@/hooks/useAuth';

interface TerapeutaData {
  id: number;
  nome: string;
  email: string;
  crp: string;
  especialidades: string;
  valorSessao: number;
  notaMedia: number;
  totalPacientes: number;
  proximasConsultas: number;
}

const DashboardTerapeuta: React.FC = () => {
  const router = useRouter();
  const [terapeutaData, setTerapeutaData] = useState<TerapeutaData | null>(null);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, isLoading: authLoading, user, logout } = useAuth();

  
  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated || !user || user.tipo !== 'TERAPEUTA') {
        router.push('/login');
        return;
      }

      
      if (user.statusPerfil === 'INCOMPLETO') {
        router.push('/profissional/informacoes-pessoais');
        return;
      }
      
    }
  }, [isAuthenticated, authLoading, user, router]);

  useEffect(() => {
    if (!authLoading && isAuthenticated && user && user.tipo === 'TERAPEUTA') {

    
    const loadTerapeutaData = async () => {
      try {
        const terapeutaData = await apiService.getTerapeuta(user.id);

        const dashboardData: TerapeutaData = {
          id: user.id,
          nome: user.nome,
          email: user.email,
          crp: terapeutaData.crp || "N/A",
          especialidades: terapeutaData.especialidades || "Não informado",
          valorSessao: terapeutaData.valorSessao ? Number(terapeutaData.valorSessao) : 0,
          notaMedia: terapeutaData.notaMedia || 0,
          totalPacientes: terapeutaData.totalPacientesAtendidos || 0,
          proximasConsultas: 0 
        };

        setTerapeutaData(dashboardData);
        setLoading(false);
      } catch (error) {
        
        
        const basicData: TerapeutaData = {
          id: user.id,
          nome: user.nome,
          email: user.email,
          crp: "N/A",
          especialidades: "Não informado",
          valorSessao: 0,
          notaMedia: 0,
          totalPacientes: 0,
          proximasConsultas: 0
        };
        setTerapeutaData(basicData);
        setLoading(false);
      }
    };

    loadTerapeutaData();
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

  if (!terapeutaData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-neutral-600">Erro ao carregar dados do terapeuta</p>
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
                <h1 className="text-2xl font-bold text-neutral-900">Dashboard</h1>
              </div>

              {}
              <div className="flex items-center space-x-4">
                <button className="p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors">
                  <Bell className="w-5 h-5" />
                </button>

                <div className="flex items-center space-x-3 pl-4 border-l border-neutral-300">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-primary-600" />
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium text-neutral-900">{terapeutaData.nome}</p>
                    <p className="text-xs text-neutral-600">CRP: {terapeutaData.crp}</p>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="p-2 text-neutral-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
              Olá, {terapeutaData.nome.split(' ')[0]}! 👋
            </h2>
            <p className="text-neutral-600">
              Bem-vindo ao seu painel de controle. Aqui você pode gerenciar seu perfil e acompanhar suas atividades.
            </p>
          </div>

          {}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {}
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-600">Total de Pacientes</p>
                  <p className="text-3xl font-bold text-neutral-900">{terapeutaData.totalPacientes}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </Card>

            {}
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-600">Avaliação Média</p>
                  <div className="flex items-center space-x-2">
                    <p className="text-3xl font-bold text-neutral-900">{terapeutaData.notaMedia}</p>
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  </div>
                </div>
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </Card>

            {}
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-600">Valor por Sessão</p>
                  <p className="text-3xl font-bold text-neutral-900">R$ {terapeutaData.valorSessao}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </Card>

            {}
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-neutral-600">Próximas Consultas</p>
                  <p className="text-3xl font-bold text-neutral-900">{terapeutaData.proximasConsultas}</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </Card>
          </div>

          {}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {}
            <div className="lg:col-span-2">
              <Card className="p-6">
                <h3 className="text-xl font-bold text-neutral-900 mb-6">Ações Rápidas</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {}
                  <Link href="/terapeutas/dashboard/editar-perfil">
                    <div className="p-4 border border-neutral-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors cursor-pointer group">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-primary-100 rounded-lg group-hover:bg-primary-200 transition-colors">
                          <Edit3 className="w-5 h-5 text-primary-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-neutral-900">Editar Perfil</h4>
                          <p className="text-sm text-neutral-600">Atualizar informações pessoais</p>
                        </div>
                      </div>
                    </div>
                  </Link>

                  {}
                  <div className="p-4 border border-neutral-200 rounded-lg opacity-50 cursor-not-allowed">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-neutral-100 rounded-lg">
                        <Calendar className="w-5 h-5 text-neutral-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-neutral-500">Agenda</h4>
                        <p className="text-sm text-neutral-400">Em breve</p>
                      </div>
                    </div>
                  </div>

                  {}
                  <div className="p-4 border border-neutral-200 rounded-lg opacity-50 cursor-not-allowed">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-neutral-100 rounded-lg">
                        <BarChart3 className="w-5 h-5 text-neutral-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-neutral-500">Relatórios</h4>
                        <p className="text-sm text-neutral-400">Em breve</p>
                      </div>
                    </div>
                  </div>

                  {}
                  <div className="p-4 border border-neutral-200 rounded-lg opacity-50 cursor-not-allowed">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-neutral-100 rounded-lg">
                        <Settings className="w-5 h-5 text-neutral-400" />
                      </div>
                      <div>
                        <h4 className="font-medium text-neutral-500">Configurações</h4>
                        <p className="text-sm text-neutral-400">Em breve</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {}
            <div className="space-y-6">
              {}
              <Card className="p-6">
                <h3 className="text-lg font-bold text-neutral-900 mb-4">Meu Perfil</h3>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">{terapeutaData.nome}</p>
                      <p className="text-sm text-neutral-600">{terapeutaData.email}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-neutral-200">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-neutral-600">CRP:</span>
                        <span className="text-sm font-medium text-neutral-900">{terapeutaData.crp}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-neutral-600">Especialidades:</span>
                        <span className="text-sm font-medium text-neutral-900 text-right">
                          {terapeutaData.especialidades}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Link href="/terapeutas/dashboard/editar-perfil">
                    <Button variant="outline" size="sm" className="w-full mt-4">
                      <Edit3 className="w-4 h-4 mr-2" />
                      Editar Perfil
                    </Button>
                  </Link>
                </div>
              </Card>

              {}
              <Card className="p-6">
                <h3 className="text-lg font-bold text-neutral-900 mb-4">Atividade Recente</h3>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-neutral-600">Perfil atualizado</span>
                    <span className="text-neutral-400">2h atrás</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-neutral-600">Nova consulta agendada</span>
                    <span className="text-neutral-400">1d atrás</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-neutral-600">Avaliação recebida</span>
                    <span className="text-neutral-400">3d atrás</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardTerapeuta;