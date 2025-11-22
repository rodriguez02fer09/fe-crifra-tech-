import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { LoginFormView } from '../LoginFormView';

describe('LoginFormView', () => {
  const mockProps = {
    formData: {
      email: '',
      password: '',
      role: '',
    },
    errors: {
      email: '',
      password: '',
      role: '',
    },
    isLoading: false,
    loginError: '',
    onChange: vi.fn(),
    onSubmit: vi.fn(),
  };

  it('should render form fields', () => {
    render(<LoginFormView {...mockProps} />);
    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/rol/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument();
  });

  it('should display loading state', () => {
    render(<LoginFormView {...mockProps} isLoading={true} />);
    expect(screen.getByRole('button', { name: /iniciando sesión.../i })).toBeDisabled();
    expect(screen.getByLabelText(/correo electrónico/i)).toBeDisabled();
  });

  it('should display error message', () => {
    render(<LoginFormView {...mockProps} loginError="Error de prueba" />);
    expect(screen.getByText('Error de prueba')).toBeInTheDocument();
  });

  it('should call onChange when inputs change', () => {
    render(<LoginFormView {...mockProps} />);
    fireEvent.change(screen.getByLabelText(/correo electrónico/i), { target: { value: 'test' } });
    expect(mockProps.onChange).toHaveBeenCalled();
  });

  it('should call onSubmit when form is submitted', () => {
    render(<LoginFormView {...mockProps} />);
    fireEvent.submit(screen.getByRole('button', { name: /iniciar sesión/i }).closest('form')!);
    expect(mockProps.onSubmit).toHaveBeenCalled();
  });
});
