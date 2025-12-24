import React, { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { User, Eye, EyeOff, RefreshCw, CheckCircle2, XCircle } from "lucide-react";
import Input from "@/components/ui/Input";
import {
  applyCpfMask,
  applyTelefoneDinamicoMask,
  applyDdiMask,
  validateCpf,
  validateDdi,
  FORMATOS_TELEFONE,
  DDI_FORMATO_MAP
} from "@/utils/mascaras";
import {
  validatePasswordStrength,
  generateStrongPassword,
  STRONG_PASSWORD_REGEX,
  WEAK_PASSWORD_MESSAGE
} from "@/utils/passwordValidation";

interface InformacoesBasicasProps {
  submitMutation?: any;
  showCpf?: boolean;
  showPassword?: boolean;
  showConfirmPassword?: boolean;
  title?: string;
  required?: boolean;
  cpfRequired?: boolean;
}

const InformacoesBasicas: React.FC<InformacoesBasicasProps> = ({
  submitMutation,
  showCpf = true,
  showPassword = true,
  showConfirmPassword = true,
  title = "Informações Básicas",
  required = false,
  cpfRequired = false,
}) => {
  const formContext = useFormContext();
  
  
  if (!formContext) {
    throw new Error('InformacoesBasicas deve ser usado dentro de um FormProvider');
  }

  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = formContext;

  
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [showConfirmPasswordField, setShowConfirmPasswordField] = useState(false);

  
  const ddiValue = watch("ddi") || "+55";
  const watchedPassword = watch("senha");

  
  const passwordStrength = watchedPassword ? validatePasswordStrength(watchedPassword) : null;
  
  
  const formatoTelefone = DDI_FORMATO_MAP[ddiValue.replace('+', '')] || "INTERNACIONAL";
  const configTelefone = FORMATOS_TELEFONE[formatoTelefone];

  
  useEffect(() => {
    if (!watch("ddi")) {
      setValue("ddi", "+55");
    }
  }, [setValue, watch]);

  
  const handleGeneratePassword = () => {
    const newPassword = generateStrongPassword();
    setValue("senha", newPassword);
    setValue("confirmarSenha", newPassword);
    setShowPasswordField(true);
    setShowConfirmPasswordField(true);
  };

  return (
    <div>
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-primary-100 rounded-lg">
          <User className="w-5 h-5 text-primary-600" />
        </div>
        <h2 className="text-xl font-bold text-neutral-900">
          {title}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="nomeCompleto"
            className="block text-sm font-medium text-neutral-700 mb-2"
          >
            Nome Completo {required && "*"}
          </label>
          <Input
            id="nomeCompleto"
            type="text"
            placeholder="Digite seu nome completo"
            {...register("nomeCompleto", {
              required: required ? "Nome completo é obrigatório" : false,
              minLength: {
                value: 3,
                message: "Nome deve ter pelo menos 3 caracteres",
              },
            })}
            error={errors.nomeCompleto?.message?.toString()}
            disabled={submitMutation?.isPending}
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-neutral-700 mb-2"
          >
            Email {required && "*"}
          </label>
          <Input
            id="email"
            type="email"
            placeholder="seu.email@exemplo.com"
            {...register("email", {
              required: required ? "Email é obrigatório" : false,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email inválido",
              },
            })}
            error={errors.email?.message?.toString()}
            disabled={submitMutation?.isPending}
          />
        </div>

        {showPassword && (
        <div>
          <div className="md:col-span-2">
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="senha"
                className="block text-sm font-medium text-neutral-700"
              >
                Senha {required && "*"}
              </label>
              <button
                type="button"
                onClick={handleGeneratePassword}
                className="flex items-center gap-1 text-xs text-primary-600 hover:text-primary-700 font-medium transition-colors"
                disabled={submitMutation?.isPending}
              >
                <RefreshCw className="h-3 w-3" />
                Gerar senha forte
              </button>
            </div>
            <div className="relative">
              <Input
                id="senha"
                type={showPasswordField ? "text" : "password"}
                placeholder="Digite uma senha segura"
                {...register("senha", {
                  required: required ? "Senha é obrigatória" : false,
                  minLength: {
                    value: 8,
                    message: "Senha deve ter pelo menos 8 caracteres",
                  },
                  pattern: {
                    value: STRONG_PASSWORD_REGEX,
                    message: WEAK_PASSWORD_MESSAGE,
                  },
                })}
                error={errors.senha?.message?.toString()}
                disabled={submitMutation?.isPending}
                rightIcon={
                  <button
                    type="button"
                    className="flex items-center"
                    onClick={() => setShowPasswordField(!showPasswordField)}
                  >
                    {showPasswordField ? (
                      <EyeOff className="h-4 w-4 text-neutral-400 hover:text-neutral-600" />
                    ) : (
                      <Eye className="h-4 w-4 text-neutral-400 hover:text-neutral-600" />
                    )}
                  </button>
                }
              />
            </div>

            {}
            {watchedPassword && passwordStrength && (
              <div className="mt-3 space-y-2">
                {}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-neutral-600">
                      Força da senha:
                    </span>
                    <span className={`text-xs font-bold ${
                      passwordStrength.score <= 1 ? 'text-red-600' :
                      passwordStrength.score === 2 ? 'text-orange-600' :
                      passwordStrength.score === 3 ? 'text-yellow-600' :
                      'text-green-600'
                    }`}>
                      {passwordStrength.label}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                      style={{ width: `${passwordStrength.percentage}%` }}
                    />
                  </div>
                </div>

                {}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs">
                  <div className={`flex items-center gap-1.5 ${passwordStrength.requirements.minLength ? 'text-green-600' : 'text-neutral-500'}`}>
                    {passwordStrength.requirements.minLength ? (
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    ) : (
                      <XCircle className="h-3.5 w-3.5" />
                    )}
                    <span>Mínimo 8 caracteres</span>
                  </div>
                  <div className={`flex items-center gap-1.5 ${passwordStrength.requirements.hasUppercase ? 'text-green-600' : 'text-neutral-500'}`}>
                    {passwordStrength.requirements.hasUppercase ? (
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    ) : (
                      <XCircle className="h-3.5 w-3.5" />
                    )}
                    <span>Letra maiúscula (A-Z)</span>
                  </div>
                  <div className={`flex items-center gap-1.5 ${passwordStrength.requirements.hasLowercase ? 'text-green-600' : 'text-neutral-500'}`}>
                    {passwordStrength.requirements.hasLowercase ? (
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    ) : (
                      <XCircle className="h-3.5 w-3.5" />
                    )}
                    <span>Letra minúscula (a-z)</span>
                  </div>
                  <div className={`flex items-center gap-1.5 ${passwordStrength.requirements.hasNumber ? 'text-green-600' : 'text-neutral-500'}`}>
                    {passwordStrength.requirements.hasNumber ? (
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    ) : (
                      <XCircle className="h-3.5 w-3.5" />
                    )}
                    <span>Número (0-9)</span>
                  </div>
                  <div className={`flex items-center gap-1.5 sm:col-span-2 ${passwordStrength.requirements.hasSpecialChar ? 'text-green-600' : 'text-neutral-500'}`}>
                    {passwordStrength.requirements.hasSpecialChar ? (
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    ) : (
                      <XCircle className="h-3.5 w-3.5" />
                    )}
                    <span>Caractere especial (!@#$%^&*)</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        )}

        {showConfirmPassword && (
          <div>
            <label
              htmlFor="confirmarSenha"
              className="block text-sm font-medium text-neutral-700 mb-2"
            >
              Confirmar senha {required && "*"}
            </label>
            <div className="relative">
              <Input
                id="confirmarSenha"
                type={showConfirmPasswordField ? "text" : "password"}
                placeholder="Digite a senha novamente"
                {...register("confirmarSenha", {
                  required: required ? "Confirmação de senha é obrigatória" : false,
                  validate: (value) => {
                    if (required && !value) return "Confirmação de senha é obrigatória";
                    if (value && value !== watchedPassword) return "As senhas não coincidem";
                    return true;
                  },
                })}
                error={errors.confirmarSenha?.message?.toString()}
                disabled={submitMutation?.isPending}
                rightIcon={
                  <button
                    type="button"
                    className="flex items-center"
                    onClick={() =>
                      setShowConfirmPasswordField(!showConfirmPasswordField)
                    }
                  >
                    {showConfirmPasswordField ? (
                      <EyeOff className="h-4 w-4 text-neutral-400 hover:text-neutral-600" />
                    ) : (
                      <Eye className="h-4 w-4 text-neutral-400 hover:text-neutral-600" />
                    )}
                  </button>
                }
              />
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Telefone {required && "*"}
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex items-center">
              <div className="w-20">
                <Input
                  id="ddi"
                  type="text"
                  placeholder="+55"
                  {...register("ddi", {
                    required: required ? "DDI é obrigatório" : false,
                    pattern: {
                      value: /^\+\d{1,4}$/,
                      message: "DDI inválido (formato: +55)",
                    },
                    validate: validateDdi,
                  })}
                  error={errors.ddi?.message?.toString()}
                  disabled={submitMutation?.isPending}
                  onChange={(e) => {
                    const maskedValue = applyDdiMask(e.target.value);
                    setValue("ddi", maskedValue);
                  }}
                />
              </div>
            </div>
            <div className="flex-1">
              <Input
                id="telefone"
                type="text"
                placeholder={configTelefone.exemplo}
                {...register("telefone", {
                  required: required ? "Telefone é obrigatório" : false,
                  pattern: {
                    value: configTelefone.regex,
                    message: `Telefone inválido (formato: ${configTelefone.mascara})`,
                  },
                  validate: (value) => {
                    if (!value) return true;

                    
                    const telefoneNumbers = value.replace(/\D/g, '');

                    
                    if (formatoTelefone === "BRASIL") {
                      
                      if (telefoneNumbers.length !== 10 && telefoneNumbers.length !== 11) {
                        return "Telefone brasileiro deve ter 10 ou 11 dígitos";
                      }
                      
                      if (!configTelefone.regex.test(value)) return "Formato de telefone inválido";
                      return true;
                    }

                    
                    const telefoneRegex = configTelefone.regex;
                    if (!telefoneRegex.test(value)) return "Telefone inválido";

                    
                    if (telefoneNumbers.length < 10 || telefoneNumbers.length > 12) {
                      return "Telefone inválido";
                    }

                    return true;
                  }
                })}
                error={errors.telefone?.message?.toString()}
                disabled={submitMutation?.isPending}
                onChange={(e) => {
                  const maskedValue = applyTelefoneDinamicoMask(
                    e.target.value,
                    formatoTelefone
                  );
                  setValue("telefone", maskedValue);
                }}
              />
            </div>
          </div>
        </div>

        {showCpf && (
          <div>
            <label
              htmlFor="cpf"
              className="block text-sm font-medium text-neutral-700 mb-2"
            >
              CPF {cpfRequired && "*"}
            </label>
            <Input
              id="cpf"
              type="text"
              placeholder="000.000.000-00"
              {...register("cpf", {
                validate: (value) => {
                  
                  if (cpfRequired && (!value || value.replace(/\D/g, '').length === 0)) {
                    return "CPF é obrigatório";
                  }
                  
                  
                  if (value && value.replace(/\D/g, '').length > 0) {
                    
                    const cpfNumeros = value.replace(/\D/g, '');
                    if (cpfNumeros.length !== 11) return "CPF deve ter 11 dígitos";
                    if (!validateCpf(value)) return "CPF inválido";
                  }
                  return true;
                }
              })}
              error={errors.cpf?.message?.toString()}
              disabled={submitMutation?.isPending}
              onChange={(e) => {
                const maskedValue = applyCpfMask(e.target.value);
                setValue("cpf", maskedValue);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default InformacoesBasicas;