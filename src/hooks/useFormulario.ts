

import { useState, useCallback, useRef, useEffect } from 'react';
import { validateField, validateFields } from '@/utils/validacao';
import { ValidationRule, FormState, FieldError } from '@/types';
import { FORM_CONFIG } from '@/constants';

interface UseFormularioConfig<T> {
  initialValues: T;
  validationRules?: Record<keyof T, ValidationRule>;
  onSubmit?: (values: T) => Promise<void> | void;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  autoSave?: boolean;
  autoSaveKey?: string;
}

interface UseFormularioReturn<T> {
  values: T;
  errors: Record<keyof T, string>;
  touched: Record<keyof T, boolean>;
  isSubmitting: boolean;
  isValid: boolean;
  isDirty: boolean;
  
  
  setValue: (field: keyof T, value: any) => void;
  setValues: (values: Partial<T>) => void;
  setError: (field: keyof T, error: string) => void;
  clearError: (field: keyof T) => void;
  clearErrors: () => void;
  
  
  validateField: (field: keyof T) => boolean;
  validateForm: () => boolean;
  
  
  markFieldAsTouched: (field: keyof T) => void;
  resetForm: () => void;
  resetField: (field: keyof T) => void;
  
  
  handleSubmit: (customSubmit?: (values: T) => Promise<void> | void) => Promise<void>;
  
  
  getFieldProps: (field: keyof T) => {
    value: any;
    onChange: (value: any) => void;
    onBlur: () => void;
    error?: string;
    name: string;
  };
}

export function useFormulario<T extends Record<string, any>>({
  initialValues,
  validationRules = {} as Record<keyof T, ValidationRule>,
  onSubmit,
  validateOnChange = true,
  validateOnBlur = true,
  autoSave = false,
  autoSaveKey,
}: UseFormularioConfig<T>): UseFormularioReturn<T> {
  
  const [values, setValuesState] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<keyof T, string>>({} as Record<keyof T, string>);
  const [touched, setTouched] = useState<Record<keyof T, boolean>>({} as Record<keyof T, boolean>);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  
  
  const debounceTimeouts = useRef<Record<string, NodeJS.Timeout>>({});
  const autoSaveTimeout = useRef<NodeJS.Timeout>();
  
  
  const isValid = Object.keys(errors).length === 0;
  
  
  useEffect(() => {
    if (autoSave && autoSaveKey) {
      const savedData = localStorage.getItem(autoSaveKey);
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);
          setValuesState({ ...initialValues, ...parsedData });
          setIsDirty(true);
        } catch (error) {
          
        }
      }
    }
  }, [autoSave, autoSaveKey]);
  
  
  useEffect(() => {
    if (autoSave && autoSaveKey && isDirty) {
      if (autoSaveTimeout.current) {
        clearTimeout(autoSaveTimeout.current);
      }
      
      autoSaveTimeout.current = setTimeout(() => {
        localStorage.setItem(autoSaveKey, JSON.stringify(values));
      }, FORM_CONFIG.AUTO_SAVE_DELAY);
    }
    
    return () => {
      if (autoSaveTimeout.current) {
        clearTimeout(autoSaveTimeout.current);
      }
    };
  }, [values, autoSave, autoSaveKey, isDirty]);
  
  
  const validateFieldMethod = useCallback((field: keyof T): boolean => {
    const fieldRules = validationRules[field];
    if (!fieldRules) return true;
    
    const validation = validateField(values[field], fieldRules);
    
    if (validation === true) {
      clearError(field);
      return true;
    } else {
      setError(field, validation);
      return false;
    }
  }, [values, validationRules]);
  
  
  const validateFormMethod = useCallback((): boolean => {
    const validationErrors = validateFields(values, validationRules);
    setErrors(validationErrors as Record<keyof T, string>);
    return Object.keys(validationErrors).length === 0;
  }, [values, validationRules]);
  
  
  const setValue = useCallback((field: keyof T, value: any) => {
    setValuesState(prev => ({ ...prev, [field]: value }));
    setIsDirty(true);
    
    
    if (validateOnChange) {
      const timeoutKey = String(field);
      if (debounceTimeouts.current[timeoutKey]) {
        clearTimeout(debounceTimeouts.current[timeoutKey]);
      }
      
      debounceTimeouts.current[timeoutKey] = setTimeout(() => {
        validateFieldMethod(field);
      }, FORM_CONFIG.DEBOUNCE_DELAY);
    }
  }, [validateOnChange, validateFieldMethod]);
  
  
  const setValues = useCallback((newValues: Partial<T>) => {
    setValuesState(prev => ({ ...prev, ...newValues }));
    setIsDirty(true);
    
    if (validateOnChange) {
      
      Object.keys(newValues).forEach(field => {
        validateFieldMethod(field as keyof T);
      });
    }
  }, [validateOnChange, validateFieldMethod]);
  
  
  const setError = useCallback((field: keyof T, error: string) => {
    setErrors(prev => ({ ...prev, [field]: error }));
  }, []);
  
  
  const clearError = useCallback((field: keyof T) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  }, []);
  
  
  const clearErrors = useCallback(() => {
    setErrors({} as Record<keyof T, string>);
  }, []);
  
  
  const markFieldAsTouched = useCallback((field: keyof T) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    
    if (validateOnBlur) {
      validateFieldMethod(field);
    }
  }, [validateOnBlur, validateFieldMethod]);
  
  
  const resetForm = useCallback(() => {
    setValuesState(initialValues);
    setErrors({} as Record<keyof T, string>);
    setTouched({} as Record<keyof T, boolean>);
    setIsDirty(false);
    setIsSubmitting(false);
    
    
    if (autoSave && autoSaveKey) {
      localStorage.removeItem(autoSaveKey);
    }
  }, [initialValues, autoSave, autoSaveKey]);
  
  
  const resetField = useCallback((field: keyof T) => {
    setValue(field, initialValues[field]);
    clearError(field);
    setTouched(prev => {
      const newTouched = { ...prev };
      delete newTouched[field];
      return newTouched;
    });
  }, [initialValues, setValue, clearError]);
  
  
  const handleSubmit = useCallback(async (customSubmit?: (values: T) => Promise<void> | void) => {
    setIsSubmitting(true);
    
    try {
      
      const isFormValid = validateFormMethod();
      
      if (!isFormValid) {
        
        const allTouched = Object.keys(values).reduce((acc, key) => {
          acc[key as keyof T] = true;
          return acc;
        }, {} as Record<keyof T, boolean>);
        setTouched(allTouched);
        return;
      }
      
      
      const submitFn = customSubmit || onSubmit;
      if (submitFn) {
        await submitFn(values);
      }
      
      
      if (autoSave && autoSaveKey) {
        localStorage.removeItem(autoSaveKey);
      }
      
      setIsDirty(false);
    } catch (error) {
      
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }, [values, validateFormMethod, onSubmit, autoSave, autoSaveKey]);
  
  
  const getFieldProps = useCallback((field: keyof T) => ({
    value: values[field],
    onChange: (value: any) => setValue(field, value),
    onBlur: () => markFieldAsTouched(field),
    error: touched[field] ? errors[field] : undefined,
    name: String(field),
  }), [values, errors, touched, setValue, markFieldAsTouched]);
  
  
  useEffect(() => {
    return () => {
      Object.values(debounceTimeouts.current).forEach(timeout => {
        if (timeout) clearTimeout(timeout);
      });
      if (autoSaveTimeout.current) {
        clearTimeout(autoSaveTimeout.current);
      }
    };
  }, []);
  
  return {
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    isDirty,
    setValue,
    setValues,
    setError,
    clearError,
    clearErrors,
    validateField: validateFieldMethod,
    validateForm: validateFormMethod,
    markFieldAsTouched,
    resetForm,
    resetField,
    handleSubmit,
    getFieldProps,
  };
}