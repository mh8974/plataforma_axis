import apiService from '@/services/api';

interface QuestionarioFocoData {
  focoPrincipal?: string;
  areasEspeciais?: string[];
  preferencias?: string[];
  idades?: string[];
}

export const useQuestionarioFoco = () => {
  
  const salvarProgresso = async (data: QuestionarioFocoData) => {
    const usuarioId = sessionStorage.getItem('usuarioId');

    if (!usuarioId) {
      
      return;
    }

    try {
      
      const dadosParaEnvio = {
        usuarioId: parseInt(usuarioId),
        problemaPrincipal: data.focoPrincipal,
        problemasSecundarios: data.areasEspeciais || [],
        preferenciasProfissional: data.preferencias || [], 
      };

      await apiService.salvarProgressoPaciente(dadosParaEnvio);
      
    } catch (error) {
      
      
    }
  };

  
  const recuperarProgresso = async (): Promise<QuestionarioFocoData | null> => {
    const usuarioId = sessionStorage.getItem('usuarioId');

    if (!usuarioId) {
      
      return null;
    }

    try {
      const pacienteDTO = await apiService.recuperarProgressoPaciente(parseInt(usuarioId));

      if (!pacienteDTO) {
        return null;
      }

      
      const dadosRecuperados: QuestionarioFocoData = {
        focoPrincipal: pacienteDTO.problemaPrincipal,
        areasEspeciais: pacienteDTO.problemasSecundarios || [],
        preferencias: pacienteDTO.preferenciasProfissional || [], 
      };

      
      return dadosRecuperados;
    } catch (error) {
      
      return null;
    }
  };

  
  const limparCache = () => {
    sessionStorage.removeItem('questionarioFoco');
  };

  return {
    salvarProgresso,
    recuperarProgresso,
    limparCache,
  };
};
