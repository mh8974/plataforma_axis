

export interface PasswordStrength {
  score: number; 
  label: string;
  color: string;
  percentage: number;
  requirements: {
    minLength: boolean;
    hasUppercase: boolean;
    hasLowercase: boolean;
    hasNumber: boolean;
    hasSpecialChar: boolean;
  };
  suggestions: string[];
}


export const validatePasswordStrength = (password: string): PasswordStrength => {
  const requirements = {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
  };

  // Calcula score baseado nos requisitos atendidos
  const metRequirements = Object.values(requirements).filter(Boolean).length;
  let score = 0;
  let label = '';
  let color = '';

  if (metRequirements === 0 || password.length === 0) {
    score = 0;
    label = 'Nenhuma';
    color = 'bg-gray-300';
  } else if (metRequirements <= 2) {
    score = 1;
    label = 'Muito Fraca';
    color = 'bg-red-500';
  } else if (metRequirements === 3) {
    score = 2;
    label = 'Fraca';
    color = 'bg-orange-500';
  } else if (metRequirements === 4) {
    score = 3;
    label = 'Média';
    color = 'bg-yellow-500';
  } else if (metRequirements === 5) {
    score = 4;
    label = 'Forte';
    color = 'bg-green-500';
  }

  // Gera sugestões baseadas nos requisitos não atendidos
  const suggestions: string[] = [];
  if (!requirements.minLength) suggestions.push('Use pelo menos 8 caracteres');
  if (!requirements.hasUppercase) suggestions.push('Adicione letras maiúsculas (A-Z)');
  if (!requirements.hasLowercase) suggestions.push('Adicione letras minúsculas (a-z)');
  if (!requirements.hasNumber) suggestions.push('Adicione números (0-9)');
  if (!requirements.hasSpecialChar) suggestions.push('Adicione caracteres especiais (!@#$%^&*)');

  const percentage = (metRequirements / 5) * 100;

  return {
    score,
    label,
    color,
    percentage,
    requirements,
    suggestions,
  };
};

/**
 * Gera uma senha forte aleatória
 */
export const generateStrongPassword = (): string => {
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  // Garante pelo menos um de cada tipo
  let password = '';
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += specialChars[Math.floor(Math.random() * specialChars.length)];

  // Adiciona mais 8 caracteres aleatórios
  const allChars = lowercase + uppercase + numbers + specialChars;
  for (let i = 0; i < 8; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  // Embaralha a senha para não ter padrão previsível
  return password
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');
};

/**
 * Regex para validação completa de senha forte
 */
export const STRONG_PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

/**
 * Mensagem de erro padrão para senha fraca
 */
export const WEAK_PASSWORD_MESSAGE = 'A senha deve conter no mínimo 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais';
