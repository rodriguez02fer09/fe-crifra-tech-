import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { Input } from '../src/Input';

describe('Input component', () => {
  test('renders input field', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test('renders label when provided', () => {
    render(<Input label="Email" id="email" />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  test('does not render label when not provided', () => {
    render(<Input id="test" />);
    expect(screen.queryByText(/label/i)).not.toBeInTheDocument();
  });

  test('displays error message when error prop is provided', () => {
    render(<Input error="This field is required" />);
    expect(screen.getByText(/this field is required/i)).toBeInTheDocument();
  });

  test('applies error styles when error is present', () => {
    render(<Input error="Error message" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('ring-rechazado');
  });

  test('applies normal styles when no error', () => {
    render(<Input />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('ring-gray-300');
  });

  test('handles user input', async () => {
    const user = userEvent.setup();
    render(<Input />);
    
    const input = screen.getByRole('textbox');
    await user.type(input, 'test value');
    
    expect(input).toHaveValue('test value');
  });

  test('applies placeholder text', () => {
    render(<Input placeholder="Enter your email" />);
    expect(screen.getByPlaceholderText(/enter your email/i)).toBeInTheDocument();
  });

  test('handles onChange event', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();
    
    render(<Input onChange={handleChange} />);
    const input = screen.getByRole('textbox');
    
    await user.type(input, 'a');
    expect(handleChange).toHaveBeenCalled();
  });

  test('applies custom className', () => {
    render(<Input className="custom-input" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('custom-input');
  });

  test('supports different input types', () => {
    const { rerender } = render(<Input type="email" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');
    
    rerender(<Input type="password" />);
    const passwordInput = document.querySelector('input[type="password"]');
    expect(passwordInput).toBeInTheDocument();
  });

  test('can be disabled', () => {
    render(<Input disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });
});

