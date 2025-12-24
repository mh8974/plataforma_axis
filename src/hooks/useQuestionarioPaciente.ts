import apiService from '@/services/api';

interface QuestionarioPacienteData {
  [key: string]: any; 
}

export const useQuestionarioPaciente = () => {
  
  const salvarProgresso = async (data: QuestionarioPacienteData) => {
    const usuarioId = sessionStorage.getItem('usuarioId');

    if (!usuarioId) {
      
      return;
    }

    try {
      
      const dadosParaEnvio = {
        usuarioId: parseInt(usuarioId),
        ...data, 
      };

      await apiService.salvarProgressoPaciente(dadosParaEnvio);
      
    } catch (error) {
      
      
    }
  };

  
  const recuperarProgresso = async (): Promise<QuestionarioPacienteData | null> => {
    const usuarioId = sessionStorage.getItem('usuarioId');

    if (!usuarioId) {
      
      return null;
    }

    try {
      const pacienteDTO = await apiService.recuperarProgressoPaciente(parseInt(usuarioId));

      if (!pacienteDTO) {
        return null;
      }

      
      
      return pacienteDTO;
    } catch (error) {
      
      return null;
    }
  };

  return {
    salvarProgresso,
    recuperarProgresso,
  };
};
