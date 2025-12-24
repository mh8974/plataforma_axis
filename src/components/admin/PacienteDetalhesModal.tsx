'use client';

import React from 'react';
import { X } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getPacienteDetalhes, PacienteDetalhado } from '@/services/adminPacientesService';

interface PacienteDetalhesModalProps {
  isOpen: boolean;
  onClose: () => void;
  pacienteId: number;
}


export default function PacienteDetalhesModal({ isOpen, onClose, pacienteId }: PacienteDetalhesModalProps) {
  
  const { data: paciente, isLoading, error } = useQuery<PacienteDetalhado>({
    queryKey: ['pacienteDetalhes', pacienteId],
    queryFn: () => getPacienteDetalhes(pacienteId),
    enabled: isOpen && !!pacienteId,
  });

  if (!isOpen) return null;

  
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
        <div className="relative bg-white rounded-lg shadow-xl p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando dados do paciente...</p>
          </div>
        </div>
      </div>
    );
  }

  
  if (error) {
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
        <div className="relative bg-white rounded-lg shadow-xl p-8 max-w-md">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <X className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Erro ao carregar dados</h3>
            <p className="text-gray-600 mb-6">
              {error instanceof Error ? error.message : 'Não foi possível carregar os detalhes do paciente.'}
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    );
  }

  
  if (!paciente) {
    return null;
  }

  
  const formatarData = (dataISO?: string) => {
    if (!dataISO) return 'N/A';
    try {
      const match = dataISO.match(/^(\d{4})-(\d{2})-(\d{2})/);
      if (match) {
        const [, ano, mes, dia] = match;
        return `${dia}/${mes}/${ano}`;
      }
      return dataISO;
    } catch {
      return dataISO;
    }
  };

  const formatarDataHora = (dataISO?: string) => {
    if (!dataISO) return 'N/A';
    try {
      const data = new Date(dataISO);
      if (isNaN(data.getTime())) return 'Data inválida';

      const dia = String(data.getDate()).padStart(2, '0');
      const mes = String(data.getMonth() + 1).padStart(2, '0');
      const ano = data.getFullYear();
      const horas = String(data.getHours()).padStart(2, '0');
      const minutos = String(data.getMinutes()).padStart(2, '0');

      return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
    } catch {
      return dataISO;
    }
  };

  
  const parseDisponibilidade = () => {
    const diasSemanaMap: Record<string, string> = {
      'SEGUNDA': 'SEG',
      'TERCA': 'TER',
      'QUARTA': 'QUA',
      'QUINTA': 'QUI',
      'SEXTA': 'SEX',
      'SABADO': 'SÁB',
      'DOMINGO': 'DOM'
    };

    const diasOrdenados = ['SEGUNDA', 'TERCA', 'QUARTA', 'QUINTA', 'SEXTA', 'SABADO', 'DOMINGO'];

    
    let horariosObj: Record<string, string[]> = {};
    if (paciente.disponibilidadeHorarios) {
      try {
        horariosObj = JSON.parse(paciente.disponibilidadeHorarios);
      } catch (e) {
        
      }
    }

    return diasOrdenados.map(diaCompleto => {
      const diaAbrev = diasSemanaMap[diaCompleto] || diaCompleto.substring(0, 3);
      const horarios = horariosObj[diaCompleto] || [];

      return {
        dia: diaAbrev,
        horario: horarios.length > 0 ? horarios.join(', ') : '-',
        ativo: horarios.length > 0
      };
    });
  };

  const disponibilidade = parseDisponibilidade();

  
  const Secao = ({ titulo, children }: { titulo: string; children: React.ReactNode }) => (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-200">{titulo}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {children}
      </div>
    </div>
  );

  
  const Campo = ({ label, valor }: { label: string; valor: any }) => (
    <div>
      <span className="text-sm font-medium text-gray-600">{label}:</span>
      <p className="text-gray-900">{valor || 'Não informado'}</p>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-10 mx-auto p-6 border w-full max-w-4xl shadow-lg rounded-lg bg-white mb-10">
        {}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{paciente.nome}</h2>
            <p className="text-sm text-gray-600 mt-1">
              Cadastrado em: {formatarDataHora(paciente.dataCriacao)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto px-2">
          {}
          <Secao titulo="Dados Pessoais">
            <Campo label="Nome" valor={paciente.nome} />
            <Campo label="Email" valor={paciente.email} />
            <Campo label="Telefone" valor={paciente.telefone} />
            <Campo label="Idade" valor={paciente.idade} />
            <Campo label="Sexo" valor={paciente.sexo} />
            <Campo label="Profissão" valor={paciente.profissao} />
            <Campo label="Estado Civil" valor={paciente.estadoCivil} />
            <Campo label="Escolaridade" valor={paciente.escolaridade} />
            <Campo label="Mora com" valor={paciente.moraCom} />
            <Campo label="Religião" valor={paciente.religiao} />
          </Secao>

          {}
          <Secao titulo="Localização">
            <Campo label="Localização" valor={paciente.localizacao} />
            <Campo label="CEP" valor={paciente.cep} />
            <Campo label="Logradouro" valor={paciente.logradouro} />
            <Campo label="Número" valor={paciente.numeroEndereco} />
            <Campo label="Bairro" valor={paciente.bairro} />
            <Campo label="Cidade/Estado" valor={paciente.cidade && paciente.estado ? `${paciente.cidade}/${paciente.estado}` : ''} />
          </Secao>

          {}
          <Secao titulo="Situação Financeira">
            <Campo label="Faixa Salarial" valor={paciente.faixaSalarial} />
            <Campo label="Faixa de Preço da Sessão" valor={
              paciente.faixaPrecoMinimo && paciente.faixaPrecoMaximo
                ? `R$ ${paciente.faixaPrecoMinimo} - R$ ${paciente.faixaPrecoMaximo}`
                : ''
            } />
            <Campo label="Possui Apoio Financeiro" valor={paciente.possuiApoioFinanceiro ? 'Sim' : 'Não'} />
          </Secao>

          {}
          <Secao titulo="Problema/Demanda">
            <Campo label="Problema Principal" valor={paciente.problemaPrincipal} />
            <Campo label="Nível de Urgência" valor={paciente.nivelUrgencia ? `${paciente.nivelUrgencia}/10` : ''} />
            {paciente.problemasSecundarios && paciente.problemasSecundarios.length > 0 && (
              <div className="col-span-2">
                <span className="text-sm font-medium text-gray-600">Problemas Secundários:</span>
                <p className="text-gray-900">{paciente.problemasSecundarios.join(', ')}</p>
              </div>
            )}
        <div className="col-span-2">
                      <Campo label="Descrição do Problema" valor={paciente.descricaoProblema} />
                    </div>
          </Secao>

          {}
          <Secao titulo="Preferências de Tratamento">
            <Campo label="Modalidade Preferida" valor={paciente.modalidadePreferida} />
            <Campo label="Gênero do Terapeuta" valor={paciente.generoTerapeutaPreferido} />
            <Campo label="Faixa Etária do Terapeuta" valor={paciente.faixaEtariaTerapeutaPreferida} />
          </Secao>

          {}
          <Secao titulo="Histórico Terapêutico">
            <Campo label="Já fez terapia" valor={paciente.historicoTerapia ? 'Sim' : 'Não'} />
            {paciente.historicoTerapia && (
              <>
                <Campo label="Quando parou" valor={formatarData(paciente.quandoParouTerapia)} />
                <Campo label="Motivo da Interrupção" valor={paciente.motivoInterrupcao} />
                <Campo label="Abordagem Anterior" valor={paciente.abordagemAnterior} />
                <Campo label="Avaliação da Experiência" valor={paciente.experienciaAvaliacao ? `${paciente.experienciaAvaliacao}/10` : ''} />
              </>
            )}
            <Campo label="Já fez acompanhamento psiquiátrico" valor={paciente.acompanhamentoPsiquiatrico ? 'Sim' : 'Não'} />
          </Secao>

          {}
          <Secao titulo="Diversidade e Inclusão">
            <Campo label="Suporte LGBTQ+ Importante" valor={paciente.lgbtqSupportImportante ? 'Sim' : 'Não'} />
            <Campo label="Orientação Sexual" valor={paciente.orientacaoSexual} />
            <Campo label="Identidade de Gênero" valor={paciente.identidadeGenero} />
            <Campo label="Questões Religiosas Importantes" valor={paciente.questoesReligiosasImportantes ? 'Sim' : 'Não'} />
          </Secao>

          {}
          <Secao titulo="Questões de Autoavaliação">
            <div className="col-span-2">
              <Campo label="Apresentação Individual" valor={paciente.apresentacaoIndividual} />
            </div>
            <Campo label="Experiência com Autoconhecimento" valor={paciente.experienciaAutoconhecimento ? `${paciente.experienciaAutoconhecimento}/10` : ''} />
            <Campo label="Interesse em Grupos de Terapia" valor={paciente.interesseGruposTerapia ? 'Sim' : 'Não'} />
            <Campo label="Disponibilidade para Tarefas de Casa" valor={paciente.disponibilidadeTarefasCasa ? 'Sim' : 'Não'} />
          </Secao>

          {}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-200">
              Disponibilidade de Horários
            </h3>

            {}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <Campo label="Flexibilidade de Horários" valor={paciente.flexibilidadeHorarios ? 'Sim' : 'Não'} />
            </div>

            <div className="mt-4 bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-300 rounded-lg p-4">
              <div className="font-bold text-yellow-900 mb-3 text-sm">🕐 Horários Disponíveis</div>
              <div className="grid grid-cols-7 gap-2">
                {disponibilidade.map((item, idx) => (
                  <div
                    key={idx}
                    className={`bg-white p-2 rounded text-center text-xs border ${
                      item.ativo ? 'border-gray-300' : 'border-gray-200 opacity-50'
                    }`}
                  >
                    <div className="font-bold text-purple-600 text-[10px]">{item.dia}</div>
                    <div className="text-[11px] mt-1 whitespace-pre-wrap">{item.horario}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {}
        <div className="mt-6 pt-4 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-medium transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
