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

  test('displays correct page title based on route', () => {
    renderWithRoute('/support');
    const titleSpan = screen.getByText('Panel Soporte');
    expect(titleSpan).toBeInTheDocument();
  });
});
