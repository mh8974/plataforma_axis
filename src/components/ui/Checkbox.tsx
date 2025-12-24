import React from 'react';

interface CheckboxProps {
  id?: string;
  label?: React.ReactNode;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  label,
  checked,
  onCheckedChange,
  disabled = false
}) => {
  return (
    <div className="flex items-center">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
        disabled={disabled}
        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
      />
      {label && (
        <label htmlFor={id} className="ml-3 text-sm text-neutral-700">
          {label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;