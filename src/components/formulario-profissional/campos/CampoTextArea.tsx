import React, { useState, useEffect } from "react";
import TextArea from "@/components/ui/TextArea";

interface CampoTextAreaProps {
  id: string;
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
  minLength?: number;
  maxLength?: number;
  register?: any;
  rules?: any;
}

const CampoTextArea: React.FC<CampoTextAreaProps> = ({
  id,
  label,
  placeholder,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  rows = 3,
  minLength,
  maxLength,
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
        onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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

      <TextArea
        id={id}
        placeholder={placeholder}
        value={register ? undefined : currentValue}
        onChange={register ? registerProps.onChange : handleInputChange}
        onBlur={register ? registerProps.onBlur : undefined}
        error={errorMessage}
        disabled={disabled}
        rows={rows}
        name={register ? registerProps.name : id}
        ref={register ? registerProps.ref : undefined}
        {...(register ? {} : props)}
      />
    </div>
  );
};

export default CampoTextArea;