/**
 * Custom React hooks
 */

import { useEffect, useRef } from 'react';
import { useApplication } from '../context/ApplicationContext';

/**
 * Auto-save hook - saves application data to localStorage every N seconds
 */
export function useAutoSave(section, data, interval = 3000) {
  const { saveApplicationData } = useApplication();
  const timerRef = useRef(null);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      saveApplicationData();
    }, interval);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [data, section, saveApplicationData, interval]);
}

/**
 * useApplication with better typing
 */
export function useApplicationData() {
  return useApplication();
}

/**
 * Custom hook for form field state with validation
 */
export function useFormField(initialValue = '', validator = null) {
  const [value, setValue] = React.useState(initialValue);
  const [error, setError] = React.useState('');
  const [touched, setTouched] = React.useState(false);

  const handleChange = (newValue) => {
    setValue(newValue);
    if (validator && touched) {
      const validationError = validator(newValue);
      setError(validationError || '');
    }
  };

  const handleBlur = () => {
    setTouched(true);
    if (validator) {
      const validationError = validator(value);
      setError(validationError || '');
    }
  };

  const reset = () => {
    setValue(initialValue);
    setError('');
    setTouched(false);
  };

  return {
    value,
    setValue: handleChange,
    error,
    setError,
    touched,
    setTouched,
    reset,
    bind: {
      value,
      onChange: e => handleChange(e.target.value),
      onBlur: handleBlur,
    },
  };
}

/**
 * Debounce hook for expensive operations
 */
export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
