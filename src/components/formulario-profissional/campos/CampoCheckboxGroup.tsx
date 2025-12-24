import React from "react";
import { Controller } from "react-hook-form";

interface Option {
  value: string;
  label: string;
}

interface CampoCheckboxGroupProps {
  id: string;
  label: string;
  options: Option[];
  control: any;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

const CampoCheckboxGroup: React.FC<CampoCheckboxGroupProps> = ({
  id,
  label,
  options,
  control,
  error,
  required = false,
  disabled = false,
}) => {
  return (
    <div className="md:col-span-2">
      <label className="block text-sm font-medium text-neutral-700 mb-3">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <Controller
        name={id as any}
        control={control}
        defaultValue={[] as any}
        rules={{
          validate: (value) => {
            if (required && (!value || value.length === 0)) {
              return `${label} é obrigatório`;
            }
            return true;
          }
        }}
        render={({ field }) => (
          <div className="space-y-2">
            {options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`${id}-${option.value}`}
                  value={option.value}
                  checked={(field.value || []).includes(option.value)}
                  onChange={(e) => {
                    const currentValue = field.value || [];
                    const newValue = e.target.checked
                      ? [...currentValue, option.value]
                      : currentValue.filter((v: string) => v !== option.value);
                    field.onChange(newValue);
                  }}
                  disabled={disabled}
                  className="h-4 w-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                />
                <label
                  htmlFor={`${id}-${option.value}`}
                  className="text-sm text-neutral-700 cursor-pointer"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        )}
      />

      {error && (
        <p className="text-red-600 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default CampoCheckboxGroup;
