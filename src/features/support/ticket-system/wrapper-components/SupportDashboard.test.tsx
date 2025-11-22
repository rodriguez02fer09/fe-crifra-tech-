import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SupportDashboard } from './SupportDashboard';
import { useAuthStore } from '../../../../store/useAuthStore';
import { useSupportTickets } from '../hooks/useSupportTickets';

// Mock dependencies
vi.mock('../hooks/useSupportTickets', () => ({
  useSupportTickets: vi.fn(),
}));
vi.mock('../../../../store/useAuthStore');

describe('SupportDashboard Wrapper', () => {
  const mockLoadTickets = vi.fn();
  
  beforeEach(() => {
    vi.clearAllMocks();

    (useSupportTickets as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      tickets: [],
      isLoading: false,
      error: null,
      loadTickets: mockLoadTickets,
      updateTicket: vi.fn(),
    });
  });

  it('should render access denied if user is not support', () => {
    (useAuthStore as unknown as ReturnType<typeof vi.fn>).mockImplementation((selector) => {
      return selector({
        user: { role: 'client' },
      });
    });

    render(<SupportDashboard />);
    expect(screen.getByText(/acceso denegado/i)).toBeInTheDocument();
  });

  it('should load tickets on mount if user is support', () => {
    (useAuthStore as unknown as ReturnType<typeof vi.fn>).mockImplementation((selector) => {
      return selector({
        user: { id: 1, role: 'support' },
      });
    });

    render(<SupportDashboard />);
    expect(mockLoadTickets).toHaveBeenCalledWith(1);
  });
});
