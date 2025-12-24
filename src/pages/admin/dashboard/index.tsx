import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Users,
  UserCheck,
  Clock,
  Heart,
  Search,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Star,
  X,
  ArrowRight,
  Loader2
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import adminService from '@/services/adminService';
import adminPacientesService from '@/services/adminPacientesService';
import authService from '@/services/authService';

interface Terapeuta {
  id: number;
  nome: string;
  email: string;
  crp: string;
  especialidades: string;
  status: 'ativo' | 'pendente' | 'inativo';
  avaliacao?: number;
  telefone?: string;
  dataNascimento?: string;
  genero?: string;
  religiao?: string;
  instituicaoFormacao?: string;
  anoFormacao?: number;
  anosExperiencia?: number;
  modalidadeAtendimento?: string;
  valorSessao?: number;
  consultaGratuita?: boolean;
  diasAtendimento?: string[];
  totalAvaliacoes?: number;
  totalPacientes?: number;
  tempoPlataforma?: string;
  redesSociais?: {
    instagram?: string;
    linkedin?: string;
    youtube?: string;
  };
  bio?: string;
}

const AdminDashboard: React.FC = () => {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading, user } = useAuth();
  const [terapeutas, setTerapeutas] = useState<Terapeuta[]>([]);
  const [selectedTerapeuta, setSelectedTerapeuta] = useState<Terapeuta | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    busca: '',
    status: '',
    especialidade: ''
  });

  
  const [stats, setStats] = useState({
    totalTerapeutas: 0,
    terapeutasAtivos: 0,
    pendentesAprovacao: 0,
    totalPacientes: 0
  });

  
  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated || !user) {
        router.push('/login');
        return;
      }
      if (user.tipo !== 'ADMINISTRADOR') {
        router.push('/login');
        return;
      }
    }
  }, [isAuthenticated, authLoading, user, router]);

  useEffect(() => {
    if (!authLoading && isAuthenticated && user && user.tipo === 'ADMINISTRADOR') {
      
      loadTerapeutas();
      loadStats();
    }
  }, [authLoading, isAuthenticated, user]);

  const loadTerapeutas = async () => {
    try {
      setLoading(true);
      const terapeutasData = await adminService.listarTodosTerapeutas();

      
      const terapeutasFormatados = terapeutasData.map((t: any) => {
        
        let status: 'ativo' | 'pendente' | 'inativo' = 'pendente';
        if (t.statusCadastro === 'APROVADO') status = 'ativo';
        else if (t.statusCadastro === 'REPROVADO') status = 'inativo';
        else if (t.statusCadastro === 'PENDENTE') status = 'pendente';

        return {
        id: t.id,
        nome: t.usuario?.nome || t.nome || 'Nome não disponível',
        email: t.usuario?.email || t.email || 'Email não disponível',
        crp: t.crp || 'CRP não disponível',
        especialidades: t.especialidades?.join(', ') || 'Não especificado',
        status,
        avaliacao: t.avaliacaoMedia || undefined,
        telefone: t.telefone || t.usuario?.telefone || undefined,
        dataNascimento: t.dataNascimento || undefined,
        genero: t.genero || undefined,
        religiao: t.religiao || undefined,
        instituicaoFormacao: t.instituicaoFormacao || undefined,
        anoFormacao: t.anoFormacao || undefined,
        anosExperiencia: t.anosExperiencia || undefined,
        modalidadeAtendimento: t.modalidadeAtendimento?.join(', ') || undefined,
        valorSessao: t.valorMinimo || undefined,
        consultaGratuita: t.consultaGratuita || false,
        diasAtendimento: t.diasAtendimento || undefined,
        totalAvaliacoes: t.totalAvaliacoes || undefined,
        totalPacientes: t.totalPacientes || undefined,
        tempoPlataforma: t.tempoPlataforma || undefined,
        redesSociais: t.redesSociais || undefined,
        bio: t.bio || undefined
      }});

      setTerapeutas(terapeutasFormatados);
    } catch (error) {
      
      setTerapeutas([]);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      
      const terapeutasData = await adminService.listarTodosTerapeutas();

      const totalTerapeutas = terapeutasData.length;
      const terapeutasAtivos = terapeutasData.filter((t: any) => t.statusCadastro === 'APROVADO').length;
      const pendentesAprovacao = terapeutasData.filter((t: any) => t.statusCadastro === 'PENDENTE').length;

      
      let totalPacientes = 0;
      try {
        const estatisticasPacientes = await adminPacientesService.getEstatisticasPacientes();
        totalPacientes = estatisticasPacientes.totalPacientes;
      } catch (error) {
        
        totalPacientes = 0;
      }

      setStats({
        totalTerapeutas,
        terapeutasAtivos,
        pendentesAprovacao,
        totalPacientes
      });
    } catch (error) {
      
      setStats({
        totalTerapeutas: 0,
        terapeutasAtivos: 0,
        pendentesAprovacao: 0,
        totalPacientes: 0
      });
    }
  };

  const handleLogout = () => {
    authService.logout();
    router.push('/login');
  };

  const openModal = (terapeuta: Terapeuta) => {
    setSelectedTerapeuta(terapeuta);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTerapeuta(null);
  };

  const handleAprovar = async (id: number) => {
    try {
      
      
      alert('Terapeuta aprovado com sucesso!');
      loadTerapeutas();
      closeModal();
    } catch (error) {
      
      alert('Erro ao aprovar terapeuta');
    }
  };

  const handleRejeitar = async (id: number) => {
    if (!confirm('Tem certeza que deseja rejeitar este terapeuta?')) return;

    try {
      
      
      alert('Terapeuta rejeitado');
      loadTerapeutas();
      closeModal();
    } catch (error) {
      
      alert('Erro ao rejeitar terapeuta');
    }
  };

  const handleDesativar = async (id: number) => {
    if (!confirm('Tem certeza que deseja desativar este terapeuta?')) return;

    try {
      
      
      alert('Terapeuta desativado');
      loadTerapeutas();
    } catch (error) {
      
      alert('Erro ao desativar terapeuta');
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      ativo: 'bg-green-100 text-green-800',
      pendente: 'bg-yellow-100 text-yellow-800',
      inativo: 'bg-red-100 text-red-800'
    };

    const labels = {
      ativo: 'Ativo',
      pendente: 'Pendente',
      inativo: 'Inativo'
    };

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const getInitials = (nome: string) => {
    return nome
      .split(' ')
      .map(n => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  
  if (authLoading || !isAuthenticated || !user || user.tipo !== 'ADMINISTRADOR') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto" />
          <p className="mt-4 text-gray-600">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard Administrativo</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                <span>Admin: {user?.nome || 'Administrador'}</span>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <button
            onClick={() => router.push('/admin/terapeutas?status=todos')}
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer text-left w-full group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center flex-1">
                <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Terapeutas</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalTerapeutas}</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
            </div>
          </button>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <UserCheck className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Terapeutas Ativos</p>
                <p className="text-2xl font-bold text-gray-900">{stats.terapeutasAtivos}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pendentes Aprovação</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pendentesAprovacao}</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => router.push('/admin/pacientes')}
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer text-left w-full group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center flex-1">
                <div className="p-3 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                  <Heart className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Pacientes</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalPacientes}</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
            </div>
          </button>
        </div>

        {}
        <div className="bg-white rounded-lg shadow mb-6 p-6">
          <div className="flex flex-col md:flex-row gap-4 items-end justify-between">
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Buscar</label>
                <input
                  type="text"
                  placeholder="Nome, email, CRP..."
                  value={filters.busca}
                  onChange={(e) => setFilters({ ...filters, busca: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Todos</option>
                  <option value="ativo">Ativo</option>
                  <option value="pendente">Pendente</option>
                  <option value="inativo">Inativo</option>
                </select>
              </div>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
              <Search className="w-4 h-4 mr-2" />
              Buscar
            </button>
          </div>
        </div>

        {}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Lista de Terapeutas</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Terapeuta
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    CRP
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Especialidades
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Avaliação
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {terapeutas.map((terapeuta) => (
                  <tr key={terapeuta.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-600">
                              {getInitials(terapeuta.nome)}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{terapeuta.nome}</div>
                          <div className="text-sm text-gray-500">{terapeuta.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {terapeuta.crp}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {terapeuta.especialidades}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(terapeuta.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {terapeuta.avaliacao ? (
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="ml-1">{terapeuta.avaliacao}</span>
                        </div>
                      ) : (
                        <span className="text-gray-400">Novo</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => openModal(terapeuta)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {terapeuta.status === 'pendente' ? (
                        <>
                          <button
                            onClick={() => handleAprovar(terapeuta.id)}
                            className="text-green-600 hover:text-green-900 mr-3"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleRejeitar(terapeuta.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button className="text-green-600 hover:text-green-900 mr-3">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDesativar(terapeuta.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {}
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Anterior
              </button>
              <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Próximo
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Mostrando <span className="font-medium">1</span> a <span className="font-medium">{terapeutas.length}</span> de{' '}
                  <span className="font-medium">{stats.totalTerapeutas}</span> resultados
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button className="bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                    1
                  </button>
                  <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                    2
                  </button>
                  <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                    3
                  </button>
                  <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </main>

      {}
      {isModalOpen && selectedTerapeuta && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-lg font-medium text-gray-900">Detalhes do Terapeuta</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              {}
              <div className="mb-8">
                <div className="flex items-center mb-6">
                  <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center mr-6">
                    <span className="text-2xl font-medium text-blue-600">
                      {getInitials(selectedTerapeuta.nome)}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedTerapeuta.nome}</h2>
                    <p className="text-gray-600">{selectedTerapeuta.email}</p>
                    <p className="text-gray-600">CRP: {selectedTerapeuta.crp}</p>
                    <div className="mt-2">{getStatusBadge(selectedTerapeuta.status)}</div>
                  </div>
                </div>
              </div>

              {}
              {selectedTerapeuta.status === 'pendente' && (
                <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h3 className="text-lg font-medium text-yellow-800 mb-2">Aguardando Aprovação</h3>
                  <p className="text-sm text-yellow-700 mb-4">
                    Este terapeuta completou o cadastro e está aguardando aprovação administrativa.
                  </p>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleAprovar(selectedTerapeuta.id)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm flex items-center"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Aprovar
                    </button>
                    <button
                      onClick={() => handleRejeitar(selectedTerapeuta.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm flex items-center"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Rejeitar
                    </button>
                  </div>
                </div>
              )}

              {}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Dados Pessoais</h3>
                  <div className="space-y-3">
                    {selectedTerapeuta.telefone && (
                      <div>
                        <label className="block text-sm font-medium text-gray-500">Telefone</label>
                        <p className="text-sm text-gray-900">{selectedTerapeuta.telefone}</p>
                      </div>
                    )}
                    {selectedTerapeuta.dataNascimento && (
                      <div>
                        <label className="block text-sm font-medium text-gray-500">Data de Nascimento</label>
                        <p className="text-sm text-gray-900">{selectedTerapeuta.dataNascimento}</p>
                      </div>
                    )}
                    {selectedTerapeuta.genero && (
                      <div>
                        <label className="block text-sm font-medium text-gray-500">Gênero</label>
                        <p className="text-sm text-gray-900">{selectedTerapeuta.genero}</p>
                      </div>
                    )}
                    {selectedTerapeuta.religiao && (
                      <div>
                        <label className="block text-sm font-medium text-gray-500">Religião</label>
                        <p className="text-sm text-gray-900">{selectedTerapeuta.religiao}</p>
                      </div>
                    )}
                  </div>
                </div>

                {}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Dados Profissionais</h3>
                  <div className="space-y-3">
                    {selectedTerapeuta.instituicaoFormacao && (
                      <div>
                        <label className="block text-sm font-medium text-gray-500">Instituição de Formação</label>
                        <p className="text-sm text-gray-900">{selectedTerapeuta.instituicaoFormacao}</p>
                      </div>
                    )}
                    {selectedTerapeuta.anoFormacao && (
                      <div>
                        <label className="block text-sm font-medium text-gray-500">Ano de Formação</label>
                        <p className="text-sm text-gray-900">{selectedTerapeuta.anoFormacao}</p>
                      </div>
                    )}
                    {selectedTerapeuta.anosExperiencia && (
                      <div>
                        <label className="block text-sm font-medium text-gray-500">Anos de Experiência</label>
                        <p className="text-sm text-gray-900">{selectedTerapeuta.anosExperiencia} anos</p>
                      </div>
                    )}
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Especialidades</label>
                      <p className="text-sm text-gray-900">{selectedTerapeuta.especialidades}</p>
                    </div>
                  </div>
                </div>

                {}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Atendimento</h3>
                  <div className="space-y-3">
                    {selectedTerapeuta.modalidadeAtendimento && (
                      <div>
                        <label className="block text-sm font-medium text-gray-500">Modalidade</label>
                        <p className="text-sm text-gray-900">{selectedTerapeuta.modalidadeAtendimento}</p>
                      </div>
                    )}
                    {selectedTerapeuta.valorSessao && (
                      <div>
                        <label className="block text-sm font-medium text-gray-500">Valor da Sessão</label>
                        <p className="text-sm text-gray-900">R$ {selectedTerapeuta.valorSessao.toFixed(2)}</p>
                      </div>
                    )}
                    {selectedTerapeuta.consultaGratuita !== undefined && (
                      <div>
                        <label className="block text-sm font-medium text-gray-500">Consulta Gratuita</label>
                        <p className="text-sm text-gray-900">{selectedTerapeuta.consultaGratuita ? 'Sim' : 'Não'}</p>
                      </div>
                    )}
                    {selectedTerapeuta.diasAtendimento && selectedTerapeuta.diasAtendimento.length > 0 && (
                      <div>
                        <label className="block text-sm font-medium text-gray-500">Dias de Atendimento</label>
                        <p className="text-sm text-gray-900">{selectedTerapeuta.diasAtendimento.join(', ')}</p>
                      </div>
                    )}
                  </div>
                </div>

                {}
                {(selectedTerapeuta.avaliacao || selectedTerapeuta.totalPacientes) && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Estatísticas</h3>
                    <div className="space-y-3">
                      {selectedTerapeuta.avaliacao && (
                        <div>
                          <label className="block text-sm font-medium text-gray-500">Avaliação Média</label>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="ml-1 text-sm text-gray-900">
                              {selectedTerapeuta.avaliacao} {selectedTerapeuta.totalAvaliacoes && `(${selectedTerapeuta.totalAvaliacoes} avaliações)`}
                            </span>
                          </div>
                        </div>
                      )}
                      {selectedTerapeuta.totalPacientes && (
                        <div>
                          <label className="block text-sm font-medium text-gray-500">Total de Pacientes</label>
                          <p className="text-sm text-gray-900">{selectedTerapeuta.totalPacientes} pacientes atendidos</p>
                        </div>
                      )}
                      {selectedTerapeuta.tempoPlataforma && (
                        <div>
                          <label className="block text-sm font-medium text-gray-500">Tempo na Plataforma</label>
                          <p className="text-sm text-gray-900">{selectedTerapeuta.tempoPlataforma}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {}
              {selectedTerapeuta.redesSociais && Object.keys(selectedTerapeuta.redesSociais).length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Redes Sociais</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {selectedTerapeuta.redesSociais.instagram && (
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">{selectedTerapeuta.redesSociais.instagram}</span>
                      </div>
                    )}
                    {selectedTerapeuta.redesSociais.linkedin && (
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">{selectedTerapeuta.redesSociais.linkedin}</span>
                      </div>
                    )}
                    {selectedTerapeuta.redesSociais.youtube && (
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">{selectedTerapeuta.redesSociais.youtube}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {}
              {selectedTerapeuta.bio && (
                <div className="mt-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Biografia Profissional</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">{selectedTerapeuta.bio}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
