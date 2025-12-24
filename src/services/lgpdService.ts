

const API_BASE_URL = '/api';


export const getTermosUso = async (): Promise<string> => {
  const response = await fetch(`${API_BASE_URL}/lgpd/termos`, {
    headers: {
      'Accept': 'text/plain',
    },
  });

  if (!response.ok) {
    throw new Error(`Erro ao buscar termos de uso: ${response.status}`);
  }

  return response.text();
};


export const getPoliticaPrivacidade = async (): Promise<string> => {
  const response = await fetch(`${API_BASE_URL}/lgpd/privacidade`, {
    headers: {
      'Accept': 'text/plain',
    },
  });

  if (!response.ok) {
    throw new Error(`Erro ao buscar política de privacidade: ${response.status}`);
  }

  return response.text();
};

export default {
  getTermosUso,
  getPoliticaPrivacidade,
};
