import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { HeaderActions } from '../src/HeaderActions';
import { RouterWrapper } from '../__fixtures__/routerWrapper';
import { useAuth } from '../../../hooks/useRole';

// Mock useAuth hook
vi.mock('../../../hooks/useRole');

/**
 * Helper to render HeaderActions with a specific route.
 */
const renderWithRoute = (path: string) => {
  render(
    <RouterWrapper initialEntries={[path]}>
      <HeaderActions />
    </RouterWrapper>
  );
};

describe('HeaderActions component', () => {
  it('renders login link when not authenticated', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: null,
      isAuthenticated: false,
      role: undefined,
    });

    renderWithRoute('/');
    
    expect(screen.getByRole('link', { name: /iniciar sesión/i })).toBeInTheDocument();
  });

  it('renders user info and logout button when authenticated', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: { 
        id: 1, 
        name: 'Test User', 
        email: 'test@example.com', 
        role: 'admin',
        password: 'password',
        createdAt: new Date().toISOString()
      },
      isAuthenticated: true,
      role: 'admin',
    });

    renderWithRoute('/');
    
    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('Administrador')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /salir/i })).toBeInTheDocument();
    // Avatar letter
    expect(screen.getByText('T')).toBeInTheDocument();
  });
});
