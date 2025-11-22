import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthGuard } from '../AuthGuard';
import { useAuthStore } from '../../../store/useAuthStore';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

// Mock useAuthStore
vi.mock('../../../store/useAuthStore');

describe('AuthGuard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderWithRouter = (initialEntry = '/protected') => {
    return render(
      <MemoryRouter initialEntries={[initialEntry]}>
        <Routes>
          <Route path="/login" element={<div>Login Page</div>} />
          <Route element={<AuthGuard />}>
            <Route path="/protected" element={<div>Protected Content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
  };

  it('should redirect to login if not authenticated', () => {
    (useAuthStore as unknown as ReturnType<typeof vi.fn>).mockImplementation((selector) => {
      return selector({
        isAuthenticated: () => false,
      });
    });

    renderWithRouter();

    expect(screen.getByText('Login Page')).toBeInTheDocument();
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });

  it('should render protected content if authenticated', () => {
    (useAuthStore as unknown as ReturnType<typeof vi.fn>).mockImplementation((selector) => {
      return selector({
        isAuthenticated: () => true,
      });
    });

    renderWithRouter();

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
    expect(screen.queryByText('Login Page')).not.toBeInTheDocument();
  });
});
