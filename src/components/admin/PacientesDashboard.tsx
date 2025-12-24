'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { ChevronLeft, Search, ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';
import { listarPacientesPaginado, PageResponse, Paciente } from '../../services/adminPacientesService';
import PacienteDetalhesModal from './PacienteDetalhesModal';
import Pagination from '../ui/Pagination';


export default function PacientesDashboard() {
  const router = useRouter();
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
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
  const [pacienteDetalhesId, setPacienteDetalhesId] = useState<number | null>(null);

  
  const carregarPacientes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response: PageResponse<Paciente> = await listarPacientesPaginado({
        page: currentPage,
        size: itemsPerPage,
        busca: buscaAtiva || undefined,
        sortBy: sortBy || undefined,
        sortDir: sortBy ? sortDir : undefined,
        statusPerfil: mostrarIncompletos ? 'INCOMPLETO' : 'COMPLETO'
      });

      setPacientes(response.content);
      setCurrentPage(response.currentPage);
      setTotalPages(response.totalPages);
      setTotalItems(response.totalItems);
    } catch (err) {
      if (err instanceof Error) {
        setError(`Erro ao carregar pacientes: ${err.message}`);
      } else {
        setError('Erro ao carregar pacientes');
      }
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage, buscaAtiva, sortBy, sortDir, mostrarIncompletos]);

  
  useEffect(() => {
    carregarPacientes();
  }, [carregarPacientes]);

  
  const handleSort = (campo: string) => {
    if (sortBy === campo) {
      
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      
      setSortBy(campo);
      setSortDir(campo === 'nivelUrgencia' ? 'desc' : 'asc');
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

  const handleVerDetalhes = (paciente: Paciente) => {
    setPacienteDetalhesId(paciente.usuarioId);
    setShowDetalhesModal(true);
  };

  
  const UrgenciaBadge = ({ nivel }: { nivel?: number }) => {
    if (!nivel) return <span className="text-gray-400">N/A</span>;

    let bgColor = 'bg-green-100 text-green-800';
    if (nivel >= 8) bgColor = 'bg-red-100 text-red-800';
    else if (nivel >= 5) bgColor = 'bg-yellow-100 text-yellow-800';

    return (
      <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${bgColor}`}>
        {nivel}/10
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-600">Carregando pacientes...</div>
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
          <h1 className="text-2xl font-bold text-gray-900">Gerenciar Pacientes</h1>
        </div>

        <div className="text-sm text-gray-600">
          Total: <span className="font-semibold">{totalItems}</span> pacientes
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
              placeholder="Nome ou email..."
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
                Idade
              </th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Localização
              </th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Problema Principal
              </th>
              <th
                onClick={() => handleSort('nivelUrgencia')}
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-100 select-none"
              >
                <div className="flex items-center">
                  Urgência
                  <SortIcon campo="nivelUrgencia" />
                </div>
              </th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {pacientes.map((paciente) => (
              <tr
                key={paciente.usuarioId}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="whitespace-nowrap px-3 py-4 text-sm">
                  <span className="text-gray-900 font-medium">
                    {paciente.nome}
                  </span>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {paciente.email}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {paciente.idade || 'N/A'}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {paciente.localizacao || 'N/A'}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {paciente.problemaPrincipal || 'N/A'}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm">
                  <UrgenciaBadge nivel={paciente.nivelUrgencia} />
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm">
                  <button
                    onClick={() => handleVerDetalhes(paciente)}
                    className="text-blue-600 hover:text-blue-900 font-medium"
                  >
                    Ver Detalhes
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      )}

      {}
      {showDetalhesModal && pacienteDetalhesId && (
        <PacienteDetalhesModal
          pacienteId={pacienteDetalhesId}
          isOpen={showDetalhesModal}
          onClose={() => {
            setShowDetalhesModal(false);
            setPacienteDetalhesId(null);
          }}
        />
      )}
    </div>
  );
}
