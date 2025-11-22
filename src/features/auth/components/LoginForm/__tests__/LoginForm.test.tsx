import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LoginForm } from '../src/LoginForm';
import { ticketService } from '../../../../../services/ticketService';
import { useAuthStore } from '../../../../../store/useAuthStore';
import { BrowserRouter } from 'react-router-dom';

// Mock dependencies
vi.mock('../../../../../services/ticketService', () => ({
  ticketService: {
    login: vi.fn(),
  },
}));
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

    vi.mocked(ticketService.login).mockResolvedValueOnce(mockUser);

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
      expect(ticketService.login).toHaveBeenCalledWith('test@example.com', 'password123', 'client');
      // Use objectContaining to avoid issues with extra fields if any (though there shouldn't be)
      expect(mockSetUser).toHaveBeenCalledWith(expect.objectContaining(mockUser));
      expect(mockNavigate).toHaveBeenCalledWith('/client');
    });
  });

  it('should display error message on login failure', async () => {
    (ticketService.login as unknown as ReturnType<typeof vi.fn>).mockRejectedValueOnce(new Error('Credenciales inválidas'));

    renderComponent();

    fireEvent.change(screen.getByLabelText(/correo electrónico/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/contraseña/i), {
      target: { value: 'wrongpass' },
    });
    fireEvent.change(screen.getByLabelText(/rol/i), {
      target: { value: 'client' },
    });

    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    await waitFor(() => {
      expect(screen.getByText('Credenciales inválidas')).toBeInTheDocument();
    });
  });

  it('should validate required fields', async () => {
    renderComponent();

    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    // HTML5 validation might prevent submission, but if we bypass it or check for custom validation
    // In this case, the browser handles "required" attribute. 
    // We can check if the inputs are invalid.
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
