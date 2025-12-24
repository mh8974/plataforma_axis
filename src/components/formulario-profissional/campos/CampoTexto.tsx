import React, { useState, useEffect } from "react";
import Input from "@/components/ui/Input";

interface CampoTextoProps {
  id: string;
  label: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  register?: any;
  rules?: any;
}

const CampoTexto: React.FC<CampoTextoProps> = ({
  id,
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  minLength,
  maxLength,
  pattern,
  register,
  rules = {},
  ...props
}) => {
  const [currentValue, setCurrentValue] = useState(value || '');
  const [showMinLengthError, setShowMinLengthError] = useState(false);
  const registerProps = register
    ? register(id, {
        required: required ? `${label} é obrigatório` : false,
        minLength: minLength ? {
          value: minLength,
          message: `Mínimo de ${minLength} caracteres`
        } : undefined,
        maxLength: maxLength ? {
          value: maxLength,
          message: `Máximo de ${maxLength} caracteres`
        } : undefined,
        pattern: pattern ? {
          value: new RegExp(pattern),
          message: "Formato inválido"
        } : undefined,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
          const newValue = e.target.value;
          setCurrentValue(newValue);

          
          if (minLength && newValue.length > 0 && newValue.length < minLength) {
            setShowMinLengthError(true);
          } else {
            setShowMinLengthError(false);
          }

          if (onChange) {
            onChange(e);
          }
        },
        ...rules
      })
    : {};

  useEffect(() => {
    if (value !== undefined) {
      setCurrentValue(value);
    }
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setCurrentValue(newValue);

    
    if (minLength && newValue.length > 0 && newValue.length < minLength) {
      setShowMinLengthError(true);
    } else {
      setShowMinLengthError(false);
    }

    if (onChange) {
      onChange(e);
    }
  };

  
  const registerErrorMessage = registerProps?.message || null;

  
  let errorMessage = error || registerErrorMessage;

  
  if (showMinLengthError && minLength && !error && !registerErrorMessage) {
    errorMessage = `Mínimo de ${minLength} caracteres`;
  }

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
        type={type}
        placeholder={placeholder}
        value={register ? undefined : currentValue}
        onChange={register ? registerProps.onChange : handleInputChange}
        onBlur={register ? registerProps.onBlur : undefined}
        error={errorMessage}
        disabled={disabled}
        name={register ? registerProps.name : id}
        ref={register ? registerProps.ref : undefined}
        {...(register ? {} : props)}
      />
    </div>
  );
};

export default CampoTexto;