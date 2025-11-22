import React, { forwardRef } from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={props.id} className="block text-sm font-medium text-texto mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={`block w-full rounded-lg border-0 pl-4 pr-10 py-3 text-texto shadow-sm ring-1 ring-inset ${
              error
                ? 'ring-rechazado focus:ring-rechazado'
                : 'ring-gray-300 focus:ring-principal'
            } focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 transition-all duration-200 ${className}`}
            {...props}
          >
            {placeholder && <option value="">{placeholder}</option>}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        {error && <p className="mt-2 text-sm text-rechazado">{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';
