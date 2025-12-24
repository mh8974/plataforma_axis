import React from "react";
import { Controller } from "react-hook-form";
import Select from "@/components/ui/Select";

interface OpcaoSelect {
  value: string;
  label: string;
}

interface CampoSelectProps {
  id: string;
  label: string;
  options: OpcaoSelect[];
  placeholder?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  rules?: any;
  control: any;
}

const CampoSelect: React.FC<CampoSelectProps> = ({
  id,
  label,
  options,
  placeholder,
  error,
  required = false,
  disabled = false,
  rules = {},
  control,
  ...props
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-neutral-700 mb-2">
        {label} {required && "*"}
      </label>
      <Controller
        name={id}
        control={control}
        rules={{
          required: required ? `${label} é obrigatório` : false,
          ...rules
        }}
        render={({ field: { onChange, value, onBlur } }) => (
          <Select
            options={options}
            value={value || ""}
            onValueChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            error={error}
            {...props}
          />
        )}
      />
      {error && (
        <p className="text-red-600 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default CampoSelect;