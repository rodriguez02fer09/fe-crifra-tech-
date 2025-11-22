import { render, screen } from '@testing-library/react';
import { HeaderActions } from '../src/HeaderActions';
import { RouterWrapper } from '../__fixtures__/routerWrapper';

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
  test('renders all navigation links', () => {
    renderWithRoute('/');
    
    expect(screen.getByRole('link', { name: /admin/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /soporte/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /cliente/i })).toBeInTheDocument();
  });

  test('highlights admin link when on /admin route', () => {
    renderWithRoute('/admin');
    
    const adminLink = screen.getByRole('link', { name: /admin/i });
    const supportLink = screen.getByRole('link', { name: /soporte/i });
    const clientLink = screen.getByRole('link', { name: /cliente/i });

    expect(adminLink).toHaveClass('text-principal');
    expect(supportLink).not.toHaveClass('text-principal');
    expect(clientLink).not.toHaveClass('text-principal');
  });

  test('highlights support link when on /support route', () => {
    renderWithRoute('/support');
    
    const adminLink = screen.getByRole('link', { name: /admin/i });
    const supportLink = screen.getByRole('link', { name: /soporte/i });
    const clientLink = screen.getByRole('link', { name: /cliente/i });

    expect(adminLink).not.toHaveClass('text-principal');
    expect(supportLink).toHaveClass('text-principal');
    expect(clientLink).not.toHaveClass('text-principal');
  });

  test('highlights client link when on /client route', () => {
    renderWithRoute('/client');
    
    const adminLink = screen.getByRole('link', { name: /admin/i });
    const supportLink = screen.getByRole('link', { name: /soporte/i });
    const clientLink = screen.getByRole('link', { name: /cliente/i });

    expect(adminLink).not.toHaveClass('text-principal');
    expect(supportLink).not.toHaveClass('text-principal');
    expect(clientLink).toHaveClass('text-principal');
  });

  test('renders user avatar', () => {
    renderWithRoute('/');
    
    const avatar = screen.getByText('U');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveClass('rounded-full');
  });

  test('navigation links have correct href attributes', () => {
    renderWithRoute('/');
    
    expect(screen.getByRole('link', { name: /admin/i })).toHaveAttribute('href', '/admin');
    expect(screen.getByRole('link', { name: /soporte/i })).toHaveAttribute('href', '/support');
    expect(screen.getByRole('link', { name: /cliente/i })).toHaveAttribute('href', '/client');
  });
});
