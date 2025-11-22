import { render, screen } from '@testing-library/react';
import { LoginHeader } from '../src/LoginHeader';

describe('LoginHeader component', () => {
  test('renders title correctly', () => {
    render(<LoginHeader title="Test Title" description="Test Description" />);
    
    const title = screen.getByRole('heading', { name: /test title/i });
    expect(title).toBeInTheDocument();
    expect(title).toHaveClass('text-3xl', 'font-bold', 'text-texto');
  });

  test('renders description correctly', () => {
    render(<LoginHeader title="Test Title" description="Test Description" />);
    
    const description = screen.getByText(/test description/i);
    expect(description).toBeInTheDocument();
    expect(description).toHaveClass('text-sm', 'text-gray-600');
  });

  test('applies correct text alignment', () => {
    render(<LoginHeader title="Test Title" description="Test Description" />);
    
    const title = screen.getByRole('heading');
    const description = screen.getByText(/test description/i);
    
    expect(title).toHaveClass('text-center');
    expect(description).toHaveClass('text-center');
  });
});
