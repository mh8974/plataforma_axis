import React from "react";
import Input from "@/components/ui/Input";

interface CampoNumeroProps {
  id: string;
  label: string;
  placeholder?: string;
  value?: number | string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  min?: number;
  max?: number;
  step?: number;
  register?: any;
  rules?: any;
}

const CampoNumero: React.FC<CampoNumeroProps> = ({
  id,
  label,
  placeholder,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  min,
  max,
  step,
  register,
  rules = {},
  ...props
}) => {
  const registerProps = register 
    ? register(id, {
        required: required ? `${label} é obrigatório` : false,
        min: min !== undefined ? {
          value: min,
          message: `Valor mínimo é ${min}`
        } : undefined,
        max: max !== undefined ? {
          value: max,
          message: `Valor máximo é ${max}`
        } : undefined,
        ...rules
      })
    : {};

  
  const errorMessage = error;

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-neutral-700 mb-2"
      >
        {label} {required && "*"}
      </label>
      <Input
        id={id}
        type="number"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        error={errorMessage}
        disabled={disabled}
        min={min}
        max={max}
        step={step}
        {...registerProps}
        {...props}
      />
    </div>
  );
};

export default CampoNumero;