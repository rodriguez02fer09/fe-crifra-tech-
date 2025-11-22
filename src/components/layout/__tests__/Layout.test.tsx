import React from 'react';
import { render, screen } from '@testing-library/react';
import { Layout } from '../src/Layout';
import { RouterWrapper } from '../__fixtures__/routerWrapper';

/**
 * Helper to render Layout with a specific route.
 */
const renderWithRoute = (path: string) => {
  render(
    <RouterWrapper initialEntries={[path]}>
      <Layout />
    </RouterWrapper>
  );
};

describe('Layout component', () => {
  test('renders the brand link', () => {
    renderWithRoute('/');
    const brand = screen.getByRole('link', { name: /cifra tech/i });
    expect(brand).toBeInTheDocument();
    expect(brand).toHaveAttribute('href', '/');
  });

  test('shows navigation links with correct active state', () => {
    renderWithRoute('/admin');
    const adminLink = screen.getByRole('link', { name: /admin/i });
    const supportLink = screen.getByRole('link', { name: /soporte/i });
    const clientLink = screen.getByRole('link', { name: /cliente/i });

    expect(adminLink).toHaveClass('text-principal'); // active
    expect(supportLink).not.toHaveClass('text-principal');
    expect(clientLink).not.toHaveClass('text-principal');
  });

  test('displays correct page title based on route', () => {
    renderWithRoute('/support');
    const titleSpan = screen.getByText('Panel Soporte');
    expect(titleSpan).toBeInTheDocument();
  });
});
