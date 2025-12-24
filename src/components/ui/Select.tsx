import React from 'react';
import { cn } from '@/utils/cn';
import { SelectOption } from '@/types/ui';

interface SelectProps {
  options: readonly SelectOption[];
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
}

const Select: React.FC<SelectProps> = ({
  options,
  value,
  onValueChange,
  placeholder = 'Selecione...',
  disabled = false,
  error
}) => {
  return (
    <div className="space-y-1">
      <select
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        disabled={disabled}
        className={cn(
          "w-full pl-3 pr-10 py-2 text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 transition-colors disabled:bg-neutral-50 disabled:text-neutral-500 appearance-none",
          error 
            ? "border-red-300 focus:border-red-500 focus:ring-red-500" 
            : "border-neutral-300 focus:border-primary-500 focus:ring-primary-500"
        )}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-sm text-red-600 mt-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default Select;