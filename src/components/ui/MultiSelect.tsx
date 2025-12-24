import React, { useState, useRef, useEffect } from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/utils/cn";
import Input from "@/components/ui/Input";

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  selectedValues: string[];
  onValueChange: (values: string[]) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  selectedValues = [],
  onValueChange,
  placeholder = "Selecione opções...",
  className,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [otherValue, setOtherValue] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  
  const hasOther = selectedValues.includes("OUTRO");

  
  const otherInputValue = selectedValues.find(val => val.startsWith("OUTRO:"))?.substring(6) || "";

  
  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase()) && option.value !== "OUTRO"
  );

  
  const toggleOption = (value: string) => {
    if (selectedValues.includes(value)) {
      
      const updatedValues = selectedValues.filter((v) => v !== value);
      
      
      if (value === "OUTRO") {
        const filteredValues = updatedValues.filter(v => !v.startsWith("OUTRO:"));
        onValueChange(filteredValues);
      } else {
        onValueChange(updatedValues);
      }
    } else {
      
      if (value === "OUTRO") {
        
        const filteredValues = selectedValues.filter(v => !v.startsWith("OUTRO:"));
        onValueChange([...filteredValues, value]);
      } else {
        
        onValueChange([...selectedValues, value]);
      }
    }
  };

  const handleOtherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setOtherValue(value);
    
    
    const filteredValues = selectedValues.filter(v => !v.startsWith("OUTRO:"));
    if (value.trim()) {
      onValueChange([...filteredValues, `OUTRO: ${value.trim()}`]);
    } else {
      onValueChange(filteredValues);
    }
  };

  const handleClear = () => {
    onValueChange([]);
    setSearchTerm("");
  };

  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  
  const displayValues = selectedValues.filter(value => value !== "OUTRO" && !value.startsWith("OUTRO:"));

  return (
    <div className={cn("w-full", className)} ref={containerRef}>
      <div 
        className={cn(
          "w-full flex flex-col border rounded-lg bg-white relative",
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        )}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        {}
        <div className={cn(
          "flex flex-wrap items-center gap-1 p-2 min-h-12", 
          selectedValues.length > 0 ? "py-1" : ""
        )}>
          {displayValues.length > 0 ? (
            displayValues.map((value) => {
              const option = options.find((opt) => opt.value === value);
              return (
                <span
                  key={value}
                  className="inline-flex items-center px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded-md max-w-[200px] truncate"
                >
                  {option?.label || value}
                </span>
              );
            })
          ) : (
            <span className="text-neutral-400 ml-1">{placeholder}</span>
          )}
          
          {}
          {selectedValues.some(v => v.startsWith("OUTRO:")) && (
            <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded-md max-w-[200px] truncate">
              {selectedValues.find(v => v.startsWith("OUTRO:"))?.substring(6)}
            </span>
          )}
        </div>
        
        {}
        <div className="flex items-center justify-between border-t border-neutral-200 px-3 py-2">
          <div className="flex items-center">
            {selectedValues.length > 0 && (
              <button
                type="button"
                className="mr-2 text-neutral-400 hover:text-neutral-600"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClear();
                }}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </div>
      </div>

      {}
      {isOpen && (
        <div 
          className="absolute z-50 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-hidden"
          style={{ width: containerRef.current?.offsetWidth || 'auto' }}
        >
          {}
          <div className="p-2 border-b">
            <input
              type="text"
              className="w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={(e) => e.stopPropagation()} 
            />
          </div>
          
          {}
          <div className="max-h-48 overflow-y-auto">
            {filteredOptions.length === 0 ? (
              <div className="p-3 text-sm text-neutral-500">Nenhuma opção encontrada</div>
            ) : (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm cursor-pointer hover:bg-neutral-100",
                    selectedValues.includes(option.value) || 
                    (option.value === "OUTRO" && selectedValues.some(v => v.startsWith("OUTRO:")))
                      ? "bg-primary-50"
                      : ""
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleOption(option.value);
                  }}
                >
                  <div className="flex items-center mr-2">
                    <div className={cn(
                      "w-4 h-4 rounded border flex items-center justify-center",
                      selectedValues.includes(option.value) || 
                      (option.value === "OUTRO" && selectedValues.some(v => v.startsWith("OUTRO:")))
                        ? "bg-primary-600 border-primary-600"
                        : "border-neutral-300"
                    )}>
                      {selectedValues.includes(option.value) || 
                      (option.value === "OUTRO" && selectedValues.some(v => v.startsWith("OUTRO:"))) ? (
                        <Check className="w-3 h-3 text-white" />
                      ) : null}
                    </div>
                  </div>
                  <span>{option.label}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
      
      {}
      {hasOther && (
        <div className="mt-2">
          <Input
            type="text"
            placeholder="Especifique..."
            value={otherInputValue}
            onChange={handleOtherChange}
            disabled={disabled}
          />
        </div>
      )}
    </div>
  );
};

export default MultiSelect;