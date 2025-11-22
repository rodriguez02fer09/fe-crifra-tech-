import React, { forwardRef } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={props.id} className="block text-sm font-medium text-texto mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            className={`block w-full rounded-lg border-0 px-4 py-3 text-texto shadow-sm ring-1 ring-inset ${
              error
                ? 'ring-rechazado focus:ring-rechazado'
                : 'ring-gray-300 focus:ring-principal'
            } placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 transition-all duration-200 ${className}`}
            {...props}
          />
        </div>
        {error && <p className="mt-2 text-sm text-rechazado">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
