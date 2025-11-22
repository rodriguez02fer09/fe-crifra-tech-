import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LoginForm } from '../src/LoginForm';
import { useAuthStore } from '../../../../../store/useAuthStore';
import { BrowserRouter } from 'react-router-dom';
import { useLogin } from '../../../hooks/useLogin';

// Mock dependencies
vi.mock('../../../hooks/useLogin');
vi.mock('../../../../../store/useAuthStore');

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('LoginForm', () => {
  const mockSetUser = vi.fn();
  const mockLogin = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    
    (useAuthStore as unknown as ReturnType<typeof vi.fn>).mockImplementation((selector) => {
      return selector({
        setUser: mockSetUser,
        user: null,
        isAuthenticated: () => false,
        clearUser: vi.fn(),
      });
    });

    (useLogin as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      login: mockLogin,
      loading: false,
      error: null,
      user: null,
    });
  });

  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );
  };

  it('should render login form correctly', () => {
    renderComponent();
    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/rol/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument();
  });

  it('should handle successful login', async () => {
    const mockUser = {
      id: 1,
      email: 'test@example.com',
      name: 'Test User',
      role: 'client',
      password: 'password',
      createdAt: new Date().toISOString(),
    };

    mockLogin.mockResolvedValueOnce(mockUser);

    renderComponent();

    fireEvent.change(screen.getByLabelText(/correo electrónico/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/contraseña/i), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText(/rol/i), {
      target: { value: 'client' },
    });

    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123', 'client');
      expect(mockSetUser).toHaveBeenCalledWith(mockUser);
      expect(mockNavigate).toHaveBeenCalledWith('/client');
    });
  });

  it('should display error message on login failure', async () => {
    // Simulate error state from hook
    (useLogin as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      login: mockLogin,
      loading: false,
      error: 'Credenciales inválidas', // Hook returns error string
      user: null,
    });
    
    // We also need mockLogin to reject or resolve, but if the hook returns error, the component displays it.
    // However, the component calls login(), which might throw or not. 
    // In our implementation, useLogin.login throws. 
    // But the component displays `loginError` from the hook return value.
    // So we just need to render with error in hook return.
    
    renderComponent();

    expect(screen.getByText('Credenciales inválidas')).toBeInTheDocument();
  });

  it('should validate required fields', async () => {
    renderComponent();

    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    const emailInput = screen.getByLabelText(/correo electrónico/i);
    const passwordInput = screen.getByLabelText(/contraseña/i);

    expect(emailInput).toBeInvalid();
    expect(passwordInput).toBeInvalid();
  });

  it('should show validation error for role', async () => {
    renderComponent();

    fireEvent.change(screen.getByLabelText(/correo electrónico/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/contraseña/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    expect(screen.getByText('El rol es obligatorio')).toBeInTheDocument();
  });
});
