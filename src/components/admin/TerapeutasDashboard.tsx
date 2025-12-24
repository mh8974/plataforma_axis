'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { ChevronLeft, Search, ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';
import { Terapeuta, StatusCadastro } from '../../types/usuario';
import { listarTerapeutasPaginado, aprovarTerapeuta, reprovarTerapeuta, PageResponse } from '../../services/adminService';
import TerapeutaDetalhesModal from './TerapeutaDetalhesModal';
import Pagination from '../ui/Pagination';

interface TerapeutasDashboardProps {
  adminId: number; 
  initialStatus?: StatusCadastro | 'TODOS'; 
}

export default function TerapeutasDashboard({ adminId, initialStatus }: TerapeutasDashboardProps) {
  const router = useRouter();
  const [terapeutas, setTerapeutas] = useState<Terapeuta[]>([]);
  const [filtroStatus, setFiltroStatus] = useState<StatusCadastro | 'TODOS'>(initialStatus || StatusCadastro.PENDENTE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  
  const [busca, setBusca] = useState('');
  const [buscaAtiva, setBuscaAtiva] = useState('');

  
  const [sortBy, setSortBy] = useState<string>('');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  
  const [mostrarIncompletos, setMostrarIncompletos] = useState(false);

  
  const [showDetalhesModal, setShowDetalhesModal] = useState(false);
  const [terapeutaDetalhesId, setTerapeutaDetalhesId] = useState<number | null>(null);

  
  const carregarTerapeutas = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response: PageResponse<Terapeuta> = await listarTerapeutasPaginado({
        page: currentPage,
        size: itemsPerPage,
        status: filtroStatus === 'TODOS' ? undefined : filtroStatus,
        busca: buscaAtiva || undefined,
        sortBy: sortBy || undefined,
        sortDir: sortBy ? sortDir : undefined,
        statusPerfil: mostrarIncompletos ? 'INCOMPLETO' : 'COMPLETO'
      });

      setTerapeutas(response.content);
      setCurrentPage(response.currentPage);
      setTotalPages(response.totalPages);
      setTotalItems(response.totalItems);
    } catch (err) {
      if (err instanceof Error) {
        setError(`Erro ao carregar terapeutas: ${err.message}`);
      } else {
        setError('Erro ao carregar terapeutas');
      }
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage, filtroStatus, buscaAtiva, sortBy, sortDir, mostrarIncompletos]);

  
  useEffect(() => {
    carregarTerapeutas();
  }, [carregarTerapeutas]);

  
  const handleFiltroStatusChange = (novoStatus: StatusCadastro | 'TODOS') => {
    setFiltroStatus(novoStatus);
    setCurrentPage(1);
    setItemsPerPage(10); 
    setSortBy(''); 
    setSortDir('desc');
  };

  
  const handleSort = (campo: string) => {
    if (sortBy === campo) {
      
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      
      setSortBy(campo);
      setSortDir(campo === 'tempoEspera' ? 'desc' : 'asc');
    }
    setCurrentPage(1);
  };

  
  const SortIcon = ({ campo }: { campo: string }) => {
    if (sortBy !== campo) {
      return <ArrowUpDown className="w-4 h-4 ml-1 text-gray-400" />;
    }
    return sortDir === 'asc'
      ? <ArrowUp className="w-4 h-4 ml-1 text-blue-600" />
      : <ArrowDown className="w-4 h-4 ml-1 text-blue-600" />;
  };

  
  const handleBuscar = () => {
    setBuscaAtiva(busca);
    setCurrentPage(1);
  };

  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleBuscar();
    }
  };

  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  
  const handleItemsPerPageChange = (newSize: number) => {
    setItemsPerPage(newSize);
    setCurrentPage(1);
  };

  const handleVerDetalhes = (terapeuta: Terapeuta) => {
    setTerapeutaDetalhesId(terapeuta.usuarioId);
    setShowDetalhesModal(true);
  };

  
  const handleAprovarFromModal = async (terapeutaId: number, feedback: string) => {
    await aprovarTerapeuta(terapeutaId, adminId, feedback);
    carregarTerapeutas(); 
  };

  
  const handleReprovarFromModal = async (terapeutaId: number, motivo: string) => {
    await reprovarTerapeuta(terapeutaId, adminId, motivo);
    carregarTerapeutas(); 
  };

  const getStatusBadgeClass = (status?: string) => {
    switch (status) {
      case 'APROVADO':
        return 'bg-green-100 text-green-800';
      case 'REPROVADO':
        return 'bg-red-100 text-red-800';
      case 'PENDENTE':
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-600">Carregando terapeutas...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Voltar"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Gerenciar Terapeutas</h1>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => handleFiltroStatusChange('TODOS')}
            className={`px-4 py-2 rounded ${filtroStatus === 'TODOS' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Todos
          </button>
          <button
            onClick={() => handleFiltroStatusChange(StatusCadastro.PENDENTE)}
            className={`px-4 py-2 rounded ${filtroStatus === StatusCadastro.PENDENTE ? 'bg-yellow-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Pendentes
          </button>
          <button
            onClick={() => handleFiltroStatusChange(StatusCadastro.APROVADO)}
            className={`px-4 py-2 rounded ${filtroStatus === StatusCadastro.APROVADO ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Aprovados
          </button>
          <button
            onClick={() => handleFiltroStatusChange(StatusCadastro.REPROVADO)}
            className={`px-4 py-2 rounded ${filtroStatus === StatusCadastro.REPROVADO ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Reprovados
          </button>
        </div>
      </div>

      {}
      <div className="mb-4 flex justify-end">
        <button
          onClick={() => {
            setMostrarIncompletos(!mostrarIncompletos);
            setCurrentPage(1);
          }}
          className={`px-4 py-2 rounded ${
            mostrarIncompletos
              ? 'bg-orange-600 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          {mostrarIncompletos ? '✓ ' : ''}Incompletos
        </button>
      </div>

      {}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Buscar</label>
            <input
              type="text"
              placeholder="Nome, email ou telefone..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={handleBuscar}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <Search className="w-4 h-4 mr-2" />
            Buscar
          </button>
          {buscaAtiva && (
            <button
              onClick={() => {
                setBusca('');
                setBuscaAtiva('');
              }}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Limpar
            </button>
          )}
        </div>
        {buscaAtiva && (
          <div className="mt-2 text-sm text-gray-600">
            Buscando por: <span className="font-medium">&quot;{buscaAtiva}&quot;</span>
          </div>
        )}
      </div>

      {}
      <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th
                onClick={() => handleSort('nome')}
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-100 select-none"
              >
                <div className="flex items-center">
                  Nome
                  <SortIcon campo="nome" />
                </div>
              </th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Email
              </th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Telefone
              </th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
              {}
              {filtroStatus === StatusCadastro.APROVADO && (
                <>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Aprovado por</th>
                  <th
                    onClick={() => handleSort('dataAprovacao')}
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-100 select-none"
                  >
                    <div className="flex items-center">
                      Aprovado em
                      <SortIcon campo="dataAprovacao" />
                    </div>
                  </th>
                </>
              )}
              {}
              {filtroStatus === StatusCadastro.REPROVADO && (
                <>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Reprovado por</th>
                  <th
                    onClick={() => handleSort('dataAprovacao')}
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-100 select-none"
                  >
                    <div className="flex items-center">
                      Reprovado em
                      <SortIcon campo="dataAprovacao" />
                    </div>
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Motivo</th>
                </>
              )}
              {}
              {filtroStatus !== 'TODOS' && (
                <th
                  onClick={() => handleSort('tempoEspera')}
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-100 select-none"
                >
                  <div className="flex items-center">
                    Tempo de espera
                    <SortIcon campo="tempoEspera" />
                  </div>
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {terapeutas.map((terapeuta) => (
              <tr
                key={terapeuta.usuarioId}
                onClick={() => handleVerDetalhes(terapeuta)}
                className="hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <td className="whitespace-nowrap px-3 py-4 text-sm">
                  <span className="text-blue-600 hover:text-blue-900 font-medium">
                    {terapeuta.nome}
                  </span>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{terapeuta.email}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{terapeuta.telefone || 'N/A'}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm">
                  <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getStatusBadgeClass(terapeuta.statusCadastro)}`}>
                    {terapeuta.statusCadastro || 'PENDENTE'}
                  </span>
                </td>
                {}
                {filtroStatus === StatusCadastro.APROVADO && (
                  <>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {terapeuta.nomeAprovadoPor || 'N/A'}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {terapeuta.dataAprovacao
                        ? new Date(terapeuta.dataAprovacao).toLocaleDateString('pt-BR')
                        : 'N/A'}
                    </td>
                  </>
                )}
                {}
                {filtroStatus === StatusCadastro.REPROVADO && (
                  <>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {terapeuta.nomeAprovadoPor || 'N/A'}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {terapeuta.dataAprovacao
                        ? new Date(terapeuta.dataAprovacao).toLocaleDateString('pt-BR')
                        : 'N/A'}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500 max-w-xs truncate" title={terapeuta.motivoReprovacao || ''}>
                      {terapeuta.motivoReprovacao || 'N/A'}
                    </td>
                  </>
                )}
                {}
                {filtroStatus !== 'TODOS' && (
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {terapeuta.tempoEspera !== undefined && terapeuta.tempoEspera !== null
                      ? `${terapeuta.tempoEspera} dia${terapeuta.tempoEspera !== 1 ? 's' : ''}`
                      : 'N/A'}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {}
      {totalItems > 0 && (
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
            showInfo={true}
            showItemsPerPageSelector={true}
            itemsPerPageOptions={[10, 25, 50, 100]}
          />
        </div>
      )}

      {}
      {showDetalhesModal && terapeutaDetalhesId && (
        <TerapeutaDetalhesModal
          isOpen={showDetalhesModal}
          onClose={() => {
            setShowDetalhesModal(false);
            setTerapeutaDetalhesId(null);
          }}
          terapeutaId={terapeutaDetalhesId}
          adminId={adminId}
          onAprovar={handleAprovarFromModal}
          onReprovar={handleReprovarFromModal}
        />
      )}
    </div>
  );
}
