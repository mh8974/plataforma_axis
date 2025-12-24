import React, { useState, useEffect } from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  minLength?: number;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ error, className = '', minLength, onChange, value, ...props }, ref) => {
    const [currentValue, setCurrentValue] = useState(value || '');
    const [showMinLengthError, setShowMinLengthError] = useState(false);

    useEffect(() => {
      if (value !== undefined) {
        setCurrentValue(value.toString());
      }
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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

    
    let displayError = error;
    if (showMinLengthError && minLength && !error) {
      displayError = `Mínimo de ${minLength} caracteres`;
    }
    return (
      <div>
        <textarea
          ref={ref}
          value={value}
          onChange={handleChange}
          className={`block w-full rounded-md border ${
            displayError
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
              : 'border-neutral-300 focus:border-primary-500 focus:ring-primary-500'
          } shadow-sm focus:ring-2 focus:ring-opacity-20 py-2 px-3 sm:text-sm ${
            props.disabled ? 'bg-neutral-100 text-neutral-500' : 'bg-white'
          } ${className}`}
          {...props}
        />
        {displayError && (
          <p className="text-red-600 text-sm mt-1">
            {displayError}
          </p>
        )}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

export default TextArea;