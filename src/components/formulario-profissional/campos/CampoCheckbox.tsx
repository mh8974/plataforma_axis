import React from "react";
import Checkbox from "@/components/ui/Checkbox";

interface CampoCheckboxProps {
  id: string;
  label: string | React.ReactNode;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  register?: any;
  rules?: any;
  control: any;
}

const CampoCheckbox: React.FC<CampoCheckboxProps> = ({
  id,
  label,
  checked,
  onCheckedChange,
  error,
  required = false,
  disabled = false,
  register,
  rules = {},
  control,
  ...props
}) => {
  const registerProps = register 
    ? register(id, {
        required: required ? `${label} é obrigatório` : false,
        ...rules
      })
    : {};

  return (
    <div>
      <Checkbox
        id={id}
        label={label}
        checked={checked ?? false}
        onCheckedChange={onCheckedChange ?? (() => {})}
        disabled={disabled}
        {...props}
      />
      {error && (
        <p className="text-red-600 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default CampoCheckbox;