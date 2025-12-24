import React, { useState, useEffect } from 'react';
import { cn } from '@/utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: 'default' | 'filled';
  minLength?: number;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({
    className,
    label,
    error,
    helperText,
    leftIcon,
    rightIcon,
    variant = 'default',
    id,
    minLength,
    onChange,
    value,
    ...props
  }, ref) => {
    const [currentValue, setCurrentValue] = useState(value || '');
    const [showMinLengthError, setShowMinLengthError] = useState(false);

    useEffect(() => {
      if (value !== undefined) {
        setCurrentValue(value.toString());
      }
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    
    const baseClasses = 'w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 transition-colors disabled:bg-neutral-50 disabled:text-neutral-500 disabled:cursor-not-allowed';

    
    let displayError = error;
    if (showMinLengthError && minLength && !error) {
      displayError = `Mínimo de ${minLength} caracteres`;
    }

    const variantClasses = {
      default: displayError
        ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
        : 'border-neutral-300 focus:border-primary-500 focus:ring-primary-500',
      filled: displayError
        ? 'border-red-300 bg-neutral-50 focus:bg-white focus:border-red-500 focus:ring-red-500'
        : 'border-neutral-200 bg-neutral-50 focus:bg-white focus:border-primary-500 focus:ring-primary-500'
    };

    const iconPadding = leftIcon ? 'pl-10' : rightIcon ? 'pr-10' : '';

    return (
      <div className="space-y-1">
        {label && (
          <label 
            htmlFor={inputId}
            className="block text-sm font-medium text-neutral-700"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-neutral-400">
                {leftIcon}
              </span>
            </div>
          )}
          
          <input
            ref={ref}
            id={inputId}
            value={value}
            onChange={handleChange}
            className={cn(
              baseClasses,
              variantClasses[variant],
              iconPadding,
              className
            )}
            {...props}
          />
          
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <span className="text-neutral-400">
                {rightIcon}
              </span>
            </div>
          )}
        </div>
        
        {displayError && (
          <p className="text-sm text-red-600 mt-1">
            {displayError}
          </p>
        )}
        
        {helperText && !error && (
          <p className="text-sm text-neutral-500 mt-1">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;