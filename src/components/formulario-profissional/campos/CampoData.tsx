import React, { useState } from "react";
import { Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar } from "lucide-react";
import Input from "@/components/ui/Input";
import { registerLocale } from "react-datepicker";
import { ptBR } from "date-fns/locale/pt-BR";

interface CampoDataProps {
  id: string;
  label: string;
  placeholder?: string;
  control: any;
  rules?: any;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  skipValidation?: boolean; 
}


registerLocale("pt-BR", ptBR);

const CampoData: React.FC<CampoDataProps> = ({
  id,
  label,
  placeholder = "DD/MM/AAAA",
  control,
  rules = {},
  error,
  required = false,
  disabled = false,
  skipValidation = false,
}) => {
  
  const isRequired = required || (rules && rules.required);
  const [isOpen, setIsOpen] = useState(false);

  
  const stringToDate = (dateString: string): Date | null => {
    if (!dateString) return null;
    
    
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dateRegex.test(dateString)) return null;
    
    const [day, month, year] = dateString.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    
    
    if (date.getDate() !== day || date.getMonth() !== month - 1 || date.getFullYear() !== year) {
      return null;
    }
    
    return date;
  };

  
  const dateToString = (date: Date | null): string => {
    if (!date) return "";
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
  };

  
  const validateDate = (date: Date | string): string | boolean => {
    
    if (!date) return !isRequired || "Data de nascimento é obrigatória";
    
    let dateObj: Date | null = null;
    
    
    if (typeof date === 'string') {
      
      const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
      if (!dateRegex.test(date)) {
        return "Formato de data inválido (use DD/MM/AAAA)";
      }
      
      dateObj = stringToDate(date);
    } else {
      dateObj = date;
    }
    
    
    if (!dateObj) {
      return "Data inválida";
    }

    
    if (skipValidation) {
      return true;
    }

    
    
    const dataMinima = new Date();
    dataMinima.setFullYear(dataMinima.getFullYear() - 100);

    
    const dataMaxima = new Date();
    dataMaxima.setFullYear(dataMaxima.getFullYear() - 18);

    
    if (dateObj < dataMinima || dateObj > dataMaxima) {
      return "Data inválida";
    }

    return true;
  };

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-neutral-700 mb-2"
      >
        {label} {required && "*"}
      </label>
      <Controller
        name={id}
        control={control}
        rules={{
          required: isRequired ? `${label} é obrigatório` : false,
          validate: validateDate,
          ...rules
        }}
        render={({ field: { onChange, value, onBlur, ...field }, fieldState: { error: fieldError } }) => {
          
          const selectedDate = typeof value === 'string' ? stringToDate(value) : value;
          
          return (
            <>
              <div className="relative">
                <Input
                  id={id}
                  type="text"
                  placeholder={placeholder}
                  value={value || ""}
                  onChange={(e) => {
                    
                    let inputValue = e.target.value;
                    inputValue = inputValue.replace(/\D/g, ''); 

                    if (inputValue.length <= 2) {
                      inputValue = inputValue;
                    } else if (inputValue.length <= 4) {
                      inputValue = `${inputValue.slice(0, 2)}/${inputValue.slice(2)}`;
                    } else {
                      inputValue = `${inputValue.slice(0, 2)}/${inputValue.slice(2, 4)}/${inputValue.slice(4, 8)}`;
                    }

                    
                    onChange(inputValue);
                    
                    setIsOpen(false);
                  }}
                  disabled={disabled}
                  onBlur={onBlur}
                  className="pr-10"
                  {...field}
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault(); 
                    setIsOpen(!isOpen);
                  }}
                  disabled={disabled}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-400 hover:text-neutral-600 focus:outline-none disabled:cursor-not-allowed"
                >
                  <Calendar className="h-5 w-5" />
                </button>
                {isOpen && (
                  <div className="absolute z-10 mt-1">
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date: Date | null) => {
                        
                        const dateString = date ? dateToString(date) : "";
                        onChange(dateString);
                        setIsOpen(false); 
                      }}
                      onCalendarClose={() => setIsOpen(false)}
                      inline 
                      dateFormat="dd/MM/yyyy"
                      locale="pt-BR"
                      showYearDropdown 
                      yearDropdownItemNumber={15} 
                      scrollableYearDropdown 
                      showFourColumnMonthYearPicker 
                      minDate={skipValidation ? undefined : (() => {
                            const minDate = new Date();
                            minDate.setFullYear(minDate.getFullYear() - 100);
                            return minDate;
                          })()} 
                      maxDate={skipValidation ? undefined : (() => {
                            const maxDate = new Date();
                            maxDate.setFullYear(maxDate.getFullYear() - 18);
                            return maxDate;
                          })()} 
                      disabled={disabled}
                    />
                  </div>
                )}
              </div>
              {fieldError && (
                <p className="text-red-600 text-sm mt-1">{fieldError.message?.toString()}</p>
              )}
            </>
          );
        }}
      />
    </div>
  );
};

export default CampoData;