'use client';

import React from 'react';
import { X, MessageSquare } from 'lucide-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getTerapeutaDetalhes, atualizarFeedbackEntrevista } from '@/services/adminService';
import { TerapeutaDetalhado } from '@/types/terapeuta';

interface TerapeutaDetalhesModalProps {
  isOpen: boolean;
  onClose: () => void;
  terapeutaId: number;
  adminId?: number;
  onAprovar?: (terapeutaId: number, feedback: string) => Promise<void>;
  onReprovar?: (terapeutaId: number, motivo: string) => Promise<void>;
}

export default function TerapeutaDetalhesModal({ isOpen, onClose, terapeutaId, adminId, onAprovar, onReprovar }: TerapeutaDetalhesModalProps) {
  const queryClient = useQueryClient();
  const [showMotivoModal, setShowMotivoModal] = React.useState(false);
  const [motivo, setMotivo] = React.useState('');
  const [isProcessing, setIsProcessing] = React.useState(false);

  
  const [showFeedbackModal, setShowFeedbackModal] = React.useState(false);
  const [feedbackEntrevista, setFeedbackEntrevista] = React.useState('');
  const [isEditingFeedback, setIsEditingFeedback] = React.useState(false);

  
  const { data: terapeuta, isLoading, error } = useQuery<TerapeutaDetalhado>({
    queryKey: ['terapeutaDetalhes', terapeutaId],
    queryFn: () => getTerapeutaDetalhes(terapeutaId),
    enabled: isOpen && !!terapeutaId, 
  });

  if (!isOpen) return null;

  
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
        <div className="relative bg-white rounded-lg shadow-xl p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando dados do terapeuta...</p>
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
              {error instanceof Error ? error.message : 'Não foi possível carregar os detalhes do terapeuta.'}
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

  
  if (!terapeuta) {
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

      
      const data = new Date(dataISO);
      if (isNaN(data.getTime())) return 'Data inválida';

      const dia = String(data.getDate()).padStart(2, '0');
      const mes = String(data.getMonth() + 1).padStart(2, '0');
      const ano = data.getFullYear();

      return `${dia}/${mes}/${ano}`;
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

  
  const formatarFaixaEtaria = (faixaEtaria?: string) => {
    if (!faixaEtaria) return 'Não informado';

    const faixasMap: Record<string, string> = {
      'CRIANCAS': 'Crianças (0-12 anos)',
      'ADOLESCENTES': 'Adolescentes (13-17 anos)',
      'ADULTOS': 'Adultos (18-59 anos)',
      'IDOSOS': 'Idosos (60+ anos)',
      'TODAS': 'Todas as faixas etárias',
    };

    const faixas = faixaEtaria.split(',').map(f => f.trim());
    return faixas.map(f => faixasMap[f] || f).join(', ');
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
    if (terapeuta.disponibilidadeHorarios) {
      try {
        horariosObj = JSON.parse(terapeuta.disponibilidadeHorarios);
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

  
  const especialidadesArray = typeof terapeuta.especialidades === 'string'
    ? terapeuta.especialidades.split(',').map(e => e.trim())
    : [];

  
  const normalizarLinkRedeSocial = (valor: string | undefined, rede: string): string | null => {
    if (!valor) return null;

    const valorTrimmed = valor.trim();

    
    if (valorTrimmed.startsWith('http://') || valorTrimmed.startsWith('https://')) {
      return valorTrimmed;
    }

    
    const username = valorTrimmed.startsWith('@') ? valorTrimmed.substring(1) : valorTrimmed;

    
    const dominios: Record<string, string> = {
      'instagram': 'https://instagram.com/',
      'facebook': 'https://facebook.com/',
      'linkedin': 'https://linkedin.com/in/',
      'youtube': 'https://youtube.com/@',
      'tiktok': 'https://tiktok.com/@',
      'website': '' 
    };

    const dominioBase = dominios[rede.toLowerCase()];

    
    if (rede.toLowerCase() === 'website' && !valorTrimmed.startsWith('http')) {
      return `https://${valorTrimmed}`;
    }

    
    if (!dominioBase) {
      return valorTrimmed;
    }

    return `${dominioBase}${username}`;
  };


  
  const handleAprovarClick = () => {
    setFeedbackEntrevista('');
    setIsEditingFeedback(false);
    setShowFeedbackModal(true);
  };

  
  const handleConfirmarAprovacao = async () => {
    if (!onAprovar) return;

    if (!feedbackEntrevista.trim()) {
      alert('Por favor, informe o feedback da entrevista');
      return;
    }

    try {
      setIsProcessing(true);
      await onAprovar(terapeutaId, feedbackEntrevista);
      setShowFeedbackModal(false);
      setFeedbackEntrevista('');
      onClose();
    } catch (error) {
      alert('Erro ao aprovar terapeuta. Tente novamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  
  const handleVerFeedback = () => {
    setFeedbackEntrevista(terapeuta.fbAprovEntrevista || '');
    setIsEditingFeedback(true);
    setShowFeedbackModal(true);
  };

  
  const handleSalvarFeedback = async () => {
    if (!adminId) {
      alert('ID do administrador não disponível');
      return;
    }

    if (!feedbackEntrevista.trim()) {
      alert('Por favor, informe o feedback da entrevista');
      return;
    }

    try {
      setIsProcessing(true);
      await atualizarFeedbackEntrevista(terapeutaId, adminId, feedbackEntrevista);
      
      queryClient.invalidateQueries({ queryKey: ['terapeutaDetalhes', terapeutaId] });
      setShowFeedbackModal(false);
      setFeedbackEntrevista('');
    } catch (error) {
      alert('Erro ao salvar feedback. Tente novamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  
  const handleReprovarClick = () => {
    setMotivo('');
    setShowMotivoModal(true);
  };

  
  const handleConfirmarReprovacao = async () => {
    if (!onReprovar) return;

    if (!motivo.trim()) {
      alert('Por favor, informe o motivo da reprovação');
      return;
    }

    try {
      setIsProcessing(true);
      await onReprovar(terapeutaId, motivo);
      setShowMotivoModal(false);
      setMotivo('');
      onClose();
    } catch (error) {
      
      alert('Erro ao reprovar terapeuta. Tente novamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col m-4">

        {}
        <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-purple-600 to-purple-800 text-white">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold">{terapeuta.nome || 'Nome não informado'}</h2>
              <div className="text-sm mt-1 opacity-90">
                CRP: {terapeuta.crp || 'N/A'} | CPF: {terapeuta.cpf || 'N/A'}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-4 py-1 rounded-full text-xs font-semibold bg-white bg-opacity-20 backdrop-blur">
                {terapeuta.statusCadastro === 'PENDENTE' && '⏳ PENDENTE'}
                {terapeuta.statusCadastro === 'APROVADO' && '✓ APROVADO'}
                {terapeuta.statusCadastro === 'REPROVADO' && '✕ REPROVADO'}
              </span>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {}
        <div className="overflow-y-auto p-6 space-y-6">

          {}
          <Section title="👤 Dados Pessoais">
            <InfoGrid>
              <InfoItem label="Nome Completo" value={terapeuta.nome} />
              <InfoItem label="Email" value={terapeuta.email} />
              <InfoItem label="Telefone" value={terapeuta.telefone} />
              <InfoItem label="CPF" value={terapeuta.cpf} />
              <InfoItem label="CRP" value={terapeuta.crp || 'Não informado'} />
              <InfoItem
                label="Data de Nascimento"
                value={terapeuta.dataNascimento
                  ? `${formatarData(terapeuta.dataNascimento)}${terapeuta.idadeCalculada ? ` (${terapeuta.idadeCalculada} anos)` : ''}`
                  : 'Não informado'
                }
              />
              <InfoItem label="Gênero" value={terapeuta.genero || 'Não informado'} />
              <InfoItem label="Religião" value={terapeuta.religiao || 'Não informado'} />
              <InfoItem label="Estado Civil" value={terapeuta.estadoCivil || 'Não informado'} />
              {terapeuta.anosRelacionamento && (
                <InfoItem label="Anos de Relacionamento" value={`${terapeuta.anosRelacionamento} anos`} />
              )}
              <InfoItem label="Possui Filhos?" value={terapeuta.possuiFilhos ? 'Sim' : 'Não'} />
              {terapeuta.quantidadeFilhos && terapeuta.quantidadeFilhos > 0 && (
                <InfoItem label="Quantidade de Filhos" value={terapeuta.quantidadeFilhos.toString()} />
              )}
            </InfoGrid>
            {terapeuta.filhosDeficiencia === 'true' && (
              <InfoItemFull label="Algum filho possui deficiência?">
                <div className="text-sm text-gray-700">Sim</div>
              </InfoItemFull>
            )}
            {terapeuta.justificativaDeficiencia && (
              <InfoItemFull label="Conte-nos sobre, isso é relevante para o match.">
                <div className="bg-white p-4 rounded-lg border border-gray-200 text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  {terapeuta.justificativaDeficiencia}
                </div>
              </InfoItemFull>
            )}
          </Section>

          {}
          {terapeuta.localizacaoClinica && (
            <Section title="📍 Localização e Disponibilidade">
              <InfoGrid>
                <InfoItem label="Localização da Clínica" value={terapeuta.localizacaoClinica} />
                <InfoItem label="Modalidade de Atendimento" value={terapeuta.modalidadeAtendimento || 'Não informado'} />
              </InfoGrid>
            </Section>
          )}

          {}
          <Section title="📅 Disponibilidade">
            {terapeuta.faixaEtariaAtendimento && (
              <InfoItemFull label="Faixa Etária Atendida">
                <TagList items={terapeuta.faixaEtariaAtendimento.split(',').map((f: string) => {
                  const mapeamento: Record<string, string> = {
                    'CRIANCAS': 'Crianças (0-12 anos)',
                    'ADOLESCENTES': 'Adolescentes (13-17 anos)',
                    'ADULTOS': 'Adultos (18-59 anos)',
                    'IDOSOS': 'Idosos (60+ anos)',
                    'TODAS': 'Todas as faixas etárias'
                  };
                  return mapeamento[f.trim()] || f.trim();
                })} variant="specialty" />
              </InfoItemFull>
            )}

            {}
            <div className="mt-4 bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-300 rounded-lg p-4">
              <div className="font-bold text-yellow-900 mb-3 text-sm">🕐 Horários de Atendimento</div>
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

            {}
            {(terapeuta.diaReuniao || terapeuta.horarioReuniao || terapeuta.horarioReuniaoDisponivel) && (
              <div className="mt-4 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-lg p-4">
                <div className="font-bold text-blue-900 mb-3 text-sm">📆 Reunião com Equipe AXIS</div>
                <div className="grid grid-cols-2 gap-4">
                  {terapeuta.diaReuniao && (
                    <div>
                      <div className="text-xs text-blue-700 font-semibold mb-1">Dia da Reunião</div>
                      <div className="text-sm text-blue-900 font-medium">{terapeuta.diaReuniao}</div>
                    </div>
                  )}
                  {terapeuta.horarioReuniao && (
                    <div>
                      <div className="text-xs text-blue-700 font-semibold mb-1">Horário da Reunião</div>
                      <div className="text-sm text-blue-900 font-medium">{terapeuta.horarioReuniao}</div>
                    </div>
                  )}
                  {terapeuta.horarioReuniaoDisponivel && !terapeuta.diaReuniao && !terapeuta.horarioReuniao && (
                    <div className="col-span-2">
                      <div className="text-xs text-blue-700 font-semibold mb-1">Horário Escolhido (formato antigo)</div>
                      <div className="text-sm text-blue-800">{formatarDataHora(terapeuta.horarioReuniaoDisponivel)}</div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </Section>

          {}
          <Section title="👥 Perfil Profissional">
            <InfoGrid>
              <InfoItem label="Tipo de Terapia" value={terapeuta.tipoTerapia || 'Não informado'} />
              <InfoItem label="Anos de Experiência" value={terapeuta.experienciaAnos ? `${terapeuta.experienciaAnos} anos` : 'Não informado'} />
              <InfoItem
                label="Primeira Consulta"
                value={terapeuta.valorPrimeiraConsulta ? `R$ ${Number(terapeuta.valorPrimeiraConsulta).toFixed(2)}` : (terapeuta.primeiraConsultaGratuita ? 'Gratuita' : 'Não informado')}
              />
            </InfoGrid>
            {terapeuta.abordagensPrincipais && terapeuta.abordagensPrincipais.length > 0 && (
              <InfoItemFull label="Abordagens Principais">
                <TagList items={terapeuta.abordagensPrincipais} variant="specialty" />
              </InfoItemFull>
            )}
            {terapeuta.abordagensSecundarias && terapeuta.abordagensSecundarias.length > 0 && (
              <InfoItemFull label="Abordagens Secundárias">
                <TagList items={terapeuta.abordagensSecundarias} />
              </InfoItemFull>
            )}
            {especialidadesArray.length > 0 && (
              <InfoItemFull label="Especialidades">
                <TagList items={especialidadesArray} variant="specialty" />
              </InfoItemFull>
            )}
            {terapeuta.casesSucesso && (
              <InfoItemFull label="Cite 3 cases de sucesso">
                <div className="bg-white p-4 rounded-lg border border-gray-200 text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  {terapeuta.casesSucesso}
                </div>
              </InfoItemFull>
            )}
            {terapeuta.feedbackPacientes && (
              <InfoItemFull label="O que os pacientes costumam dizer como feedback?">
                <div className="bg-white p-4 rounded-lg border border-gray-200 text-sm text-gray-600 leading-relaxed whitespace-pre-line italic">
                  {terapeuta.feedbackPacientes}
                </div>
              </InfoItemFull>
            )}
            {terapeuta.demandaMaisComum && (
              <InfoItemFull label="Qual a demanda que você mais atende?">
                <div className="bg-white p-4 rounded-lg border border-gray-200 text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  {terapeuta.demandaMaisComum}
                </div>
              </InfoItemFull>
            )}
            {terapeuta.oQueNaoGostaAtender && (
              <InfoItemFull label="O que não gosta de atender e por quê?">
                <div className="bg-white p-4 rounded-lg border border-gray-200 text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  {terapeuta.oQueNaoGostaAtender}
                </div>
              </InfoItemFull>
            )}
          </Section>

          {}
          <Section title="🎓 Formação">
            <InfoGrid>
              <InfoItem label="Instituição de Formação" value={terapeuta.instituicaoFormacao || 'Não informado'} />
              <InfoItem label="Ano de Formação" value={terapeuta.anoFormacao?.toString() || 'Não informado'} />
            </InfoGrid>
            {terapeuta.posGraduacao && terapeuta.posGraduacao.length > 0 && (
              <InfoItemFull label="Pós-Graduação">
                <TagList items={terapeuta.posGraduacao} />
              </InfoItemFull>
            )}
            {terapeuta.certificacoes && terapeuta.certificacoes.length > 0 && (
              <InfoItemFull label="Certificações">
                <TagList items={terapeuta.certificacoes} />
              </InfoItemFull>
            )}
            {terapeuta.bio && (
              <InfoItemFull label="Biografia">
                <div className="bg-white p-4 rounded-lg border border-gray-200 text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  {terapeuta.bio}
                </div>
              </InfoItemFull>
            )}
          </Section>

          {}
          <Section title="💰 Valores e Convênios">
            <InfoGrid>
              <InfoItem
                label="Valor da Sessão"
                value={terapeuta.valorSessao ? `R$ ${Number(terapeuta.valorSessao).toFixed(2)}` : 'Não informado'}
                valueClass={terapeuta.valorSessao ? "text-lg font-bold text-green-600" : ""}
              />
            </InfoGrid>
            {terapeuta.metodosPagamento && (
              <InfoItemFull label="Formas de Pagamento">
                <TagList items={terapeuta.metodosPagamento.split(',').map((m: string) => {
                  const mapeamento: Record<string, string> = {
                    'PIX': 'PIX',
                    'CREDITO': 'Cartão de Crédito',
                    'DEBITO': 'Cartão de Débito',
                    'DINHEIRO': 'Dinheiro',
                    'TODOS': 'Todos os meios'
                  };
                  return mapeamento[m.trim()] || m.trim();
                })} variant="specialty" />
              </InfoItemFull>
            )}
            <InfoGrid>
              <InfoItem label="Política de Cancelamento" value={terapeuta.politicaCancelamento || 'Não informado'} />
              <InfoItem label="Faz reembolso de convênio ?" value={terapeuta.aceitaConvenio ? 'Sim' : 'Não'} />
            </InfoGrid>
            {terapeuta.conveniosAceitos && terapeuta.conveniosAceitos.length > 0 && (
              <InfoItemFull label="Convênios Aceitos">
                <TagList items={terapeuta.conveniosAceitos} />
              </InfoItemFull>
            )}
          </Section>

          {}
          <Section title="🏳️‍🌈 LGBTQ+ Friendly">
            <InfoGrid>
              <InfoItem label="LGBTQ+ Friendly" value={terapeuta.lgbtqFriendly ? '✅ Sim' : '❌ Não'} />
              <InfoItem
                label="Experiência com Casos LGBTQ+"
                value={terapeuta.experienciaCasosLgbtq ? `${terapeuta.experienciaCasosLgbtq} anos atendendo comunidade LGBTQ+` : 'Não informado'}
              />
            </InfoGrid>
            {terapeuta.certificacoesLgbtq && terapeuta.certificacoesLgbtq.length > 0 && (
              <InfoItemFull label="Formações em Diversidade">
                <TagList items={terapeuta.certificacoesLgbtq} variant="lgbtq" />
              </InfoItemFull>
            )}
          </Section>


          {}
          <Section title="💭 Questões de Autoconhecimento">
            {terapeuta.assuntosPrediletos && (
              <InfoItemFull label="Assuntos Prediletos">
                <div className="bg-white p-4 rounded-lg border border-gray-200 text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  {terapeuta.assuntosPrediletos}
                </div>
              </InfoItemFull>
            )}
            {terapeuta.hobby && (
              <InfoItemFull label="Hobby">
                <div className="bg-white p-4 rounded-lg border border-gray-200 text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  {terapeuta.hobby}
                </div>
              </InfoItemFull>
            )}
            {terapeuta.inspiracao && (
              <InfoItemFull label="Inspiração">
                <div className="bg-white p-4 rounded-lg border border-gray-200 text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  {terapeuta.inspiracao}
                </div>
              </InfoItemFull>
            )}
            {terapeuta.filmesMarcantes && (
              <InfoItemFull label="Filmes Marcantes">
                <div className="bg-white p-4 rounded-lg border border-gray-200 text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  {terapeuta.filmesMarcantes}
                </div>
              </InfoItemFull>
            )}
            {terapeuta.superacoes && (
              <InfoItemFull label="Superações">
                <div className="bg-white p-4 rounded-lg border border-gray-200 text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  {terapeuta.superacoes}
                </div>
              </InfoItemFull>
            )}
            {terapeuta.causaSangue && (
              <InfoItemFull label="Causa que Defende com Paixão">
                <div className="bg-white p-4 rounded-lg border border-gray-200 text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  {terapeuta.causaSangue}
                </div>
              </InfoItemFull>
            )}
            {terapeuta.maiorMudanca && (
              <InfoItemFull label="Maior Mudança">
                <div className="bg-white p-4 rounded-lg border border-gray-200 text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  {terapeuta.maiorMudanca}
                </div>
              </InfoItemFull>
            )}
            {terapeuta.gastariaDinheiro && (
              <InfoItemFull label="Como Gastaria o Dinheiro">
                <div className="bg-white p-4 rounded-lg border border-gray-200 text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  {terapeuta.gastariaDinheiro}
                </div>
              </InfoItemFull>
            )}
            {terapeuta.marcaDeixar && (
              <InfoItemFull label="Marca que Deseja Deixar">
                <div className="bg-white p-4 rounded-lg border border-gray-200 text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  {terapeuta.marcaDeixar}
                </div>
              </InfoItemFull>
            )}
            {terapeuta.trabalhoAntesSaudeMental && (
              <InfoItemFull label="Trabalho Antes da Saúde Mental">
                <div className="bg-white p-4 rounded-lg border border-gray-200 text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  {terapeuta.trabalhoAntesSaudeMental}
                </div>
              </InfoItemFull>
            )}
            {terapeuta.atenderiaPorAmor && (
              <InfoItemFull label="Quem Atenderia por Amor">
                <div className="bg-white p-4 rounded-lg border border-gray-200 text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  {terapeuta.atenderiaPorAmor}
                </div>
              </InfoItemFull>
            )}
          </Section>

          {}
          <Section title="🌐 Redes Sociais e Contato">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(() => {
                const linkInstagram = normalizarLinkRedeSocial(terapeuta.redesSociais?.instagram, 'instagram');
                const linkLinkedin = normalizarLinkRedeSocial(terapeuta.redesSociais?.linkedin, 'linkedin');
                const linkFacebook = normalizarLinkRedeSocial(terapeuta.redesSociais?.facebook, 'facebook');
                const linkYoutube = normalizarLinkRedeSocial(terapeuta.redesSociais?.youtube, 'youtube');
                const linkTiktok = normalizarLinkRedeSocial(terapeuta.redesSociais?.tiktok, 'tiktok');
                const linkWebsite = normalizarLinkRedeSocial(terapeuta.redesSociais?.website, 'website');

                return (
                  <>
                    {linkInstagram && (
                      <div className="bg-white p-3 rounded-lg border border-gray-200">
                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Instagram</div>
                        <a
                          href={linkInstagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:text-blue-800 hover:underline break-all"
                        >
                          {linkInstagram}
                        </a>
                      </div>
                    )}
                    {linkLinkedin && (
                      <div className="bg-white p-3 rounded-lg border border-gray-200">
                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">LinkedIn</div>
                        <a
                          href={linkLinkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:text-blue-800 hover:underline break-all"
                        >
                          {linkLinkedin}
                        </a>
                      </div>
                    )}
                    {linkFacebook && (
                      <div className="bg-white p-3 rounded-lg border border-gray-200">
                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Facebook</div>
                        <a
                          href={linkFacebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:text-blue-800 hover:underline break-all"
                        >
                          {linkFacebook}
                        </a>
                      </div>
                    )}
                    {linkYoutube && (
                      <div className="bg-white p-3 rounded-lg border border-gray-200">
                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">YouTube</div>
                        <a
                          href={linkYoutube}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:text-blue-800 hover:underline break-all"
                        >
                          {linkYoutube}
                        </a>
                      </div>
                    )}
                    {linkTiktok && (
                      <div className="bg-white p-3 rounded-lg border border-gray-200">
                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">TikTok</div>
                        <a
                          href={linkTiktok}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:text-blue-800 hover:underline break-all"
                        >
                          {linkTiktok}
                        </a>
                      </div>
                    )}
                    {linkWebsite && (
                      <div className="bg-white p-3 rounded-lg border border-gray-200">
                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Website</div>
                        <a
                          href={linkWebsite}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:text-blue-800 hover:underline break-all"
                        >
                          {linkWebsite}
                        </a>
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
            {!terapeuta.redesSociais || Object.keys(terapeuta.redesSociais).filter(k => terapeuta.redesSociais?.[k]).length === 0 && (
              <div className="text-sm text-gray-500 italic">Nenhuma rede social cadastrada</div>
            )}
          </Section>

          {}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-5">
            <div className="flex items-center gap-2 text-yellow-900 font-bold mb-3">
              <span>⚠️</span>
              <span>Status de Aprovação</span>
            </div>
            <InfoGrid>
              <InfoItem label="Status Atual" value={terapeuta.statusCadastro} valueClass="text-yellow-700 font-bold" />
              <InfoItem label="Data do cadastro" value={formatarDataHora(terapeuta.dataCadastro)} />
              <InfoItem label="Aguardando há" value={terapeuta.diasAguardando ? `${terapeuta.diasAguardando} dias` : 'N/A'} />
            </InfoGrid>
          </div>

        </div>

        {}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-between gap-3">
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 font-medium transition-colors"
              disabled={isProcessing}
            >
              ← Voltar para Lista
            </button>
            {terapeuta.statusCadastro === 'APROVADO' && (
              <button
                onClick={handleVerFeedback}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors flex items-center gap-2"
                disabled={isProcessing}
              >
                <MessageSquare className="w-4 h-4" />
                Feedback
              </button>
            )}
          </div>
          {terapeuta.statusCadastro === 'PENDENTE' && (
            <div className="flex gap-3">
              <button
                onClick={handleReprovarClick}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isProcessing}
              >
                {isProcessing ? 'Processando...' : '✕ Reprovar Cadastro'}
              </button>
              <button
                onClick={handleAprovarClick}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isProcessing}
              >
                {isProcessing ? 'Processando...' : '✓ Aprovar Cadastro'}
              </button>
            </div>
          )}
          {terapeuta.statusCadastro === 'APROVADO' && (
            <div className="text-green-600 font-semibold">✓ Cadastro já aprovado</div>
          )}
          {terapeuta.statusCadastro === 'REPROVADO' && (
            <div className="text-red-600 font-semibold">✕ Cadastro reprovado</div>
          )}
        </div>

      </div>

      {}
      {showMotivoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[60]">
          <div className="relative bg-white rounded-lg shadow-xl p-6 w-full max-w-md m-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Reprovar Cadastro
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Informe o motivo da reprovação para <strong>{terapeuta.nome}</strong>:
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Motivo da Reprovação *
              </label>
              <textarea
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Explique o motivo da reprovação..."
                disabled={isProcessing}
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowMotivoModal(false);
                  setMotivo('');
                }}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                disabled={isProcessing}
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmarReprovacao}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isProcessing}
              >
                {isProcessing ? 'Processando...' : 'Confirmar Reprovação'}
              </button>
            </div>
          </div>
        </div>
      )}

      {}
      {showFeedbackModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[60]">
          <div className="relative bg-white rounded-lg shadow-xl p-6 m-4 min-w-[28rem] max-w-[90vw] max-h-[90vh] overflow-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {isEditingFeedback ? 'Feedback da Entrevista' : 'Aprovar Cadastro'}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              {isEditingFeedback
                ? `Visualize ou edite o feedback da entrevista de ${terapeuta.nome}:`
                : `Informe o feedback da entrevista para aprovar ${terapeuta.nome}:`}
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Feedback da Entrevista *
              </label>
              <textarea
                value={feedbackEntrevista}
                onChange={(e) => setFeedbackEntrevista(e.target.value)}
                rows={6}
                className="w-full min-w-[24rem] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize"
                placeholder="Descreva o feedback da entrevista realizada..."
                disabled={isProcessing}
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowFeedbackModal(false);
                  setFeedbackEntrevista('');
                }}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                disabled={isProcessing}
              >
                Cancelar
              </button>
              <button
                onClick={isEditingFeedback ? handleSalvarFeedback : handleConfirmarAprovacao}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isProcessing}
              >
                {isProcessing
                  ? 'Processando...'
                  : isEditingFeedback
                    ? 'Salvar Feedback'
                    : 'Confirmar Aprovação'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-gray-50 border-l-4 border-purple-500 rounded-lg p-5">
      <div className="flex items-center gap-2 text-gray-900 font-bold mb-4 text-lg">
        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
        <span>{title}</span>
      </div>
      {children}
    </div>
  );
}

function InfoGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {children}
    </div>
  );
}

function InfoItem({ label, value, valueClass = '' }: { label: string; value: string; valueClass?: string }) {
  return (
    <div className="bg-white p-3 rounded-lg border border-gray-200">
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
        {label}
      </div>
      <div className={`text-sm text-gray-900 font-medium ${valueClass}`}>
        {value || <span className="text-gray-400 italic">N/A</span>}
      </div>
    </div>
  );
}

function InfoItemFull({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-4">
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
        {label}
      </div>
      {children}
    </div>
  );
}

function TagList({ items, variant = 'default' }: { items: string[]; variant?: 'default' | 'specialty' | 'lgbtq' }) {
  const variantClasses = {
    default: 'bg-blue-100 text-blue-800',
    specialty: 'bg-yellow-100 text-yellow-800',
    lgbtq: 'bg-pink-100 text-pink-800'
  };

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {items.map((item, idx) => (
        <span
          key={idx}
          className={`px-3 py-1 rounded-full text-xs font-medium ${variantClasses[variant]}`}
        >
          {item}
        </span>
      ))}
    </div>
  );
}
