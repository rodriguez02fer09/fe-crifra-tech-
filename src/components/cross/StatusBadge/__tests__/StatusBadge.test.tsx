import { render, screen } from '@testing-library/react';
import { StatusBadge } from '../src/StatusBadge';

describe('StatusBadge component', () => {
  test('renders open status correctly', () => {
    render(<StatusBadge status="open" />);
    expect(screen.getByText('Abierto')).toBeInTheDocument();
  });

  test('renders in_progress status correctly', () => {
    render(<StatusBadge status="in_progress" />);
    expect(screen.getByText('En Proceso')).toBeInTheDocument();
  });

  test('renders closed status correctly', () => {
    render(<StatusBadge status="closed" />);
    expect(screen.getByText('Cerrado')).toBeInTheDocument();
  });

  test('applies correct styles for open status', () => {
    render(<StatusBadge status="open" />);
    const badge = screen.getByText('Abierto');
    expect(badge).toHaveClass('bg-rechazado/10', 'text-rechazado');
  });

  test('applies correct styles for in_progress status', () => {
    render(<StatusBadge status="in_progress" />);
    const badge = screen.getByText('En Proceso');
    expect(badge).toHaveClass('bg-pendiente/10', 'text-pendiente');
  });

  test('applies correct styles for closed status', () => {
    render(<StatusBadge status="closed" />);
    const badge = screen.getByText('Cerrado');
    expect(badge).toHaveClass('bg-aprobado/10', 'text-aprobado');
  });

  test('handles unknown status gracefully', () => {
    render(<StatusBadge status="unknown" />);
    const badge = screen.getByText('unknown');
    expect(badge).toHaveClass('bg-gray-100', 'text-gray-800');
  });

  test('applies base badge styles', () => {
    render(<StatusBadge status="open" />);
    const badge = screen.getByText('Abierto');
    expect(badge).toHaveClass('inline-flex', 'rounded-full', 'px-2', 'text-xs', 'font-semibold');
  });
});
