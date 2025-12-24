

import { VALIDATION_PATTERNS, VALIDATION_MESSAGES } from '@/constants';
import { ValidationRule } from '@/types/formularios';


export const validateField = (value: any, rules: ValidationRule): string | true => {
  
  if (rules.required && (!value || (typeof value === 'string' && value.trim() === '') || (Array.isArray(value) && value.length === 0))) {
    return rules.message || VALIDATION_MESSAGES.REQUIRED;
  }

  
  if (!value) return true;

  
  if (rules.minLength && value.length < rules.minLength) {
    return `Deve ter pelo menos ${rules.minLength} caracteres`;
  }

  
  if (rules.maxLength && value.length > rules.maxLength) {
    return `Deve ter no máximo ${rules.maxLength} caracteres`;
  }

  
  if (rules.min !== undefined && Number(value) < rules.min) {
    return `Valor mínimo é ${rules.min}`;
  }

  
  if (rules.max !== undefined && Number(value) > rules.max) {
    return `Valor máximo é ${rules.max}`;
  }

  
  if (rules.pattern && !rules.pattern.test(value)) {
    return 'Formato inválido';
  }

  
  if (rules.email && !VALIDATION_PATTERNS.EMAIL.test(value)) {
    return VALIDATION_MESSAGES.EMAIL_INVALID;
  }

  
  if (rules.cpf && !validateCpf(value)) {
    return VALIDATION_MESSAGES.CPF_INVALID;
  }

  
  if (rules.telefone && !VALIDATION_PATTERNS.TELEFONE_BRASIL.test(value)) {
    return VALIDATION_MESSAGES.TELEFONE_INVALID;
  }

  
  if (rules.customValidator) {
    return rules.customValidator(value);
  }

  return true;
};


export const validateCpf = (cpf: string): boolean => {
  if (!cpf) return false;
  
  
  if (!VALIDATION_PATTERNS.CPF.test(cpf)) return false;
  
  
  const cpfNumbers = cpf.replace(/\D/g, '');
  
  
  if (/^(\d)\1{10}$/.test(cpfNumbers)) return false;
  
  
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpfNumbers.charAt(i)) * (10 - i);
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpfNumbers.charAt(9))) return false;
  
  
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpfNumbers.charAt(i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpfNumbers.charAt(10))) return false;
  
  return true;
};


export const validateCrp = (crp: string): boolean => {
  if (!crp) return false;
  return VALIDATION_PATTERNS.CRP.test(crp);
};


export const validateDdi = (ddi: string): boolean => {
  if (!ddi) return false;
  return VALIDATION_PATTERNS.DDI.test(ddi);
};


export const validateSenhaForte = (senha: string): string | true => {
  if (!senha) return VALIDATION_MESSAGES.REQUIRED;
  
  if (senha.length < 8) {
    return VALIDATION_MESSAGES.SENHA_MIN_LENGTH;
  }
  
  if (!VALIDATION_PATTERNS.SENHA_FORTE.test(senha)) {
    return VALIDATION_MESSAGES.SENHA_WEAK;
  }
  
  return true;
};


export const validateConfirmarSenha = (senha: string, confirmarSenha: string): string | true => {
  if (!confirmarSenha) return VALIDATION_MESSAGES.REQUIRED;
  
  if (senha !== confirmarSenha) {
    return VALIDATION_MESSAGES.SENHAS_NAO_COINCIDEM;
  }
  
  return true;
};


export const validateIdade = (idade: number): string | true => {
  if (!idade) return VALIDATION_MESSAGES.REQUIRED;
  
  const idadeNum = Number(idade);
  
  if (idadeNum < 18) {
    return VALIDATION_MESSAGES.IDADE_MIN;
  }
  
  if (idadeNum > 120) {
    return VALIDATION_MESSAGES.IDADE_MAX;
  }
  
  return true;
};


export const validateAnoFormacao = (ano: number): string | true => {
  if (!ano) return VALIDATION_MESSAGES.REQUIRED;
  
  const anoNum = Number(ano);
  const anoAtual = new Date().getFullYear();
  
  if (anoNum < 1950) {
    return VALIDATION_MESSAGES.ANO_FORMACAO_MIN;
  }
  
  if (anoNum > anoAtual) {
    return VALIDATION_MESSAGES.ANO_FORMACAO_MAX;
  }
  
  return true;
};


export const validateValorSessao = (valor: number): string | true => {
  if (!valor) return VALIDATION_MESSAGES.REQUIRED;
  
  const valorNum = Number(valor);
  
  if (valorNum < 50) {
    return VALIDATION_MESSAGES.VALOR_SESSAO_MIN;
  }
  
  if (valorNum > 500) {
    return VALIDATION_MESSAGES.VALOR_SESSAO_MAX;
  }
  
  return true;
};


export const validateFile = (
  file: File,
  maxSize: number,
  acceptedTypes: string[]
): string | true => {
  if (!file) return VALIDATION_MESSAGES.REQUIRED;
  
  if (file.size > maxSize) {
    const maxSizeMB = Math.round(maxSize / (1024 * 1024));
    return `Arquivo deve ter no máximo ${maxSizeMB}MB`;
  }
  
  if (!acceptedTypes.includes(file.type)) {
    return 'Tipo de arquivo não suportado';
  }
  
  return true;
};


export const validateFields = (
  values: Record<string, any>,
  rules: Record<string, ValidationRule>
): Record<string, string> => {
  const errors: Record<string, string> = {};
  
  Object.keys(rules).forEach(field => {
    const validation = validateField(values[field], rules[field]);
    if (validation !== true) {
      errors[field] = validation;
    }
  });
  
  return errors;
};


export const validateForm = (
  values: Record<string, any>,
  rules: Record<string, ValidationRule>
): { isValid: boolean; errors: Record<string, string> } => {
  const errors = validateFields(values, rules);
  const isValid = Object.keys(errors).length === 0;
  
  return { isValid, errors };
};


export const sanitizeText = (text: string): string => {
  return text
    .trim()
    .replace(/\s+/g, ' ') 
    .replace(/[<>]/g, ''); 
};


export const formatNomeProprio = (nome: string): string => {
  return nome
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};