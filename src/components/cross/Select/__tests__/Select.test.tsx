import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import { Select } from '../src/Select';

import type { SelectOption } from '../core';
import React from 'react';

// Opciones de prueba
const testOptions: SelectOption[] = [
  { value: 'apple', label: 'Manzana' },
  { value: 'banana', label: 'Plátano' },
  { value: 'cherry', label: 'Cereza' },
];

describe('Select Component', () => {

  // --- Renderizado Básico y Estructura ---
  
  it('renders without crashing', () => {
    render(<Select options={testOptions} />);
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toBeInTheDocument();
  });

  it('renders all provided options', () => {
    render(<Select options={testOptions} />);
    // Verifica que el número de opciones (incluyendo el valor vacío por defecto de la prueba) sea correcto
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(testOptions.length); // No se incluye placeholder aquí, así que son 3
    
    // Verifica el contenido de las opciones
    expect(screen.getByRole('option', { name: 'Manzana' })).toHaveValue('apple');
    expect(screen.getByRole('option', { name: 'Plátano' })).toHaveValue('banana');
    expect(screen.getByRole('option', { name: 'Cereza' })).toHaveValue('cherry');
  });

  // --- Propiedades y Contenido ---

  it('renders the label correctly', () => {
    const labelText = 'Fruta Favorita';
    render(<Select options={testOptions} label={labelText} id="test-select" />);
    const labelElement = screen.getByText(labelText);
    expect(labelElement).toBeInTheDocument();
    // Verifica la accesibilidad: la etiqueta debe estar asociada al select
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toHaveAttribute('id', 'test-select');
    expect(labelElement).toHaveAttribute('for', 'test-select');
  });

  it('renders the placeholder option correctly', () => {
    const placeholderText = 'Selecciona una fruta';
    render(<Select options={testOptions} placeholder={placeholderText} />);
    const placeholderOption = screen.getByRole('option', { name: placeholderText });
    
    expect(placeholderOption).toBeInTheDocument();
    expect(placeholderOption).toHaveValue(''); // El valor del placeholder debe ser vacío
    
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(testOptions.length + 1); // 3 opciones + 1 placeholder
  });

  it('displays the error message when the error prop is present', () => {
    const errorMessage = 'Este campo es obligatorio.';
    render(<Select options={testOptions} error={errorMessage} />);
    
    const errorElement = screen.getByText(errorMessage);
    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveClass('text-rechazado');
  });

  it('does not display the error message when the error prop is absent', () => {
    const errorMessage = 'Este campo es obligatorio.';
    render(<Select options={testOptions} />);
    
    expect(screen.queryByText(errorMessage)).not.toBeInTheDocument();
  });

  // --- Interacción y Funcionalidad ---

  it('handles change events correctly', () => {
    const handleChange = vi.fn();
    render(<Select options={testOptions} onChange={handleChange} />);
    const selectElement = screen.getByRole('combobox');

    // Simula la selección de una opción
    fireEvent.change(selectElement, { target: { value: 'banana' } });

    // Verifica que la función onChange haya sido llamada
    expect(handleChange).toHaveBeenCalledTimes(1);
    
    // Verifica que el valor del select haya cambiado
    expect(selectElement).toHaveValue('banana');
  });

  it('applies the initial selected value', () => {
    render(<Select options={testOptions} defaultValue="cherry" />);
    const selectElement = screen.getByRole('combobox');
    expect(selectElement).toHaveValue('cherry');
  });

  // --- Reenvío de Referencia (ForwardRef) ---

  it('forwards the ref to the select element', () => {
    const ref = React.createRef<HTMLSelectElement>();
    render(<Select options={testOptions} ref={ref} data-testid="test-select" />);
    
    // Verifica que la referencia esté adjunta al elemento <select>
    expect(ref.current).not.toBeNull();
    expect(ref.current).toBeInstanceOf(HTMLSelectElement);
    expect(ref.current).toHaveAttribute('data-testid', 'test-select');
  });

  // --- Estilización y Clases ---

  it('applies the correct classes for normal state', () => {
    render(<Select options={testOptions} data-testid="test-select" />);
    const selectElement = screen.getByTestId('test-select');
    
    // Verifica la clase de anillo por defecto
    expect(selectElement).toHaveClass('ring-gray-300');
    // Verifica la clase de enfoque normal
    expect(selectElement).toHaveClass('focus:ring-principal');
  });

  it('applies the correct error classes when the error prop is present', () => {
    render(<Select options={testOptions} error="Error" data-testid="test-select" />);
    const selectElement = screen.getByTestId('test-select');
    
    // Verifica la clase de anillo de error
    expect(selectElement).toHaveClass('ring-rechazado');
    // Verifica la clase de enfoque de error
    expect(selectElement).toHaveClass('focus:ring-rechazado');
    // Asegúrate de que no tenga la clase de anillo normal
    expect(selectElement).not.toHaveClass('ring-gray-300');
  });
  
  it('applies custom className', () => {
    const customClass = 'mt-5 border-blue-500';
    render(<Select options={testOptions} className={customClass} data-testid="test-select" />);
    const selectElement = screen.getByTestId('test-select');

    expect(selectElement).toHaveClass(customClass.split(' ')[0]);
    expect(selectElement).toHaveClass(customClass.split(' ')[1]);
  });
});