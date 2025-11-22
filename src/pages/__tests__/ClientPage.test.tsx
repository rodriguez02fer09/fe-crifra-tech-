import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ClientPage } from '../ClientPage';
import { ticketService } from '../../services/ticketService';
import { useAuth } from '../../hooks/useRole';
import { useTicketStore } from '../../store/useTicketStore';

// Mock dependencies
vi.mock('../../services/ticketService');
vi.mock('../../hooks/useRole');
vi.mock('../../store/useTicketStore');
vi.mock('../../features/tickets/components/CreateTicketForm', () => ({
  CreateTicketForm: () => <div data-testid="create-ticket-form">Create Ticket Form</div>,
}));

describe('ClientPage', () => {
  const mockUser = { id: 1, name: 'Test User', email: 'test@example.com', role: 'client' };
  const mockSetTickets = vi.fn();
  const mockSetLoading = vi.fn();
  const mockSetError = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAuth).mockReturnValue({ user: mockUser } as const);
    vi.mocked(useTicketStore).mockReturnValue({
      tickets: [],
      isLoading: false,
      error: null,
      setTickets: mockSetTickets,
      setLoading: mockSetLoading,
      setError: mockSetError,
    } as const);
  });

  it('renders CreateTicketForm', () => {
    render(<ClientPage />);
    expect(screen.getByTestId('create-ticket-form')).toBeInTheDocument();
  });

  it('fetches and displays tickets on mount', async () => {
    const mockTickets = [
      { id: 1, title: 'Ticket 1', description: 'Desc 1', status: 'pendiente', date: '2023-01-01', priority: 'alta' },
      { id: 2, title: 'Ticket 2', description: 'Desc 2', status: 'resuelto', date: '2023-01-02', priority: 'baja' },
    ];
    
    vi.mocked(useTicketStore).mockReturnValue({
      tickets: mockTickets,
      isLoading: false,
      error: null,
      setTickets: mockSetTickets,
      setLoading: mockSetLoading,
      setError: mockSetError,
    } as const);

    render(<ClientPage />);

    expect(ticketService.getUserDashboardData).toHaveBeenCalledWith(mockUser);
    expect(screen.getByText('Ticket 1')).toBeInTheDocument();
    expect(screen.getByText('Ticket 2')).toBeInTheDocument();
    expect(screen.getByText('Pendiente')).toBeInTheDocument();
    expect(screen.getByText('Resuelto')).toBeInTheDocument();
  });

  it('displays "No tickets" message when list is empty', () => {
    render(<ClientPage />);
    expect(screen.getByText(/no tienes solicitudes registradas/i)).toBeInTheDocument();
  });

  it('opens and closes ticket detail modal', () => {
    const mockTicket = { id: 1, title: 'Ticket 1', description: 'Desc 1', status: 'pendiente', date: '2023-01-01', priority: 'alta', response: 'Response' };
    vi.mocked(useTicketStore).mockReturnValue({
      tickets: [mockTicket],
      isLoading: false,
      error: null,
      setTickets: mockSetTickets,
      setLoading: mockSetLoading,
      setError: mockSetError,
    } as const);

    render(<ClientPage />);

    fireEvent.click(screen.getByText(/ver detalle/i));
    expect(screen.getByText('Detalle de Solicitud #1')).toBeInTheDocument();
    expect(screen.getByText('Response')).toBeInTheDocument();

    fireEvent.click(screen.getByText(/cerrar/i));
    expect(screen.queryByText('Detalle de Solicitud #1')).not.toBeInTheDocument();
  });
});
