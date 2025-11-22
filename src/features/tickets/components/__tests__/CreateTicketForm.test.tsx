import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CreateTicketForm } from '../CreateTicketForm';
import { ticketService } from '../../../../services/ticketService';
import { useAuthStore } from '../../../../store/useAuthStore';
import { useTicketStore } from '../../../../store/useTicketStore';
import type { Ticket } from '../../../../types/types';

// Mock dependencies
vi.mock('../../../../services/ticketService');
vi.mock('../../../../store/useAuthStore');
vi.mock('../../../../store/useTicketStore');

describe('CreateTicketForm', () => {
  const mockUser = { id: 1, name: 'Test User', email: 'test@example.com', role: 'client' };
  const mockAddTicket = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAuthStore).mockReturnValue(mockUser);
    vi.mocked(useTicketStore).mockReturnValue(mockAddTicket);
  });

  it('renders all form fields correctly', () => {
    render(<CreateTicketForm />);
    
    expect(screen.getByLabelText(/título/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/descripción/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/prioridad/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/categoría/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /crear solicitud/i })).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    render(<CreateTicketForm />);
    
    fireEvent.click(screen.getByRole('button', { name: /crear solicitud/i }));

    await waitFor(() => {
      expect(screen.getByText(/el título es obligatorio/i)).toBeInTheDocument();
      expect(screen.getByText(/la descripción es obligatoria/i)).toBeInTheDocument();
      expect(screen.getByText(/debe seleccionar la prioridad/i)).toBeInTheDocument();
      expect(screen.getByText(/debe seleccionar la categoría/i)).toBeInTheDocument();
    });
  });

  it('validates minimum length for title and description', async () => {
    render(<CreateTicketForm />);
    
    fireEvent.change(screen.getByLabelText(/título/i), { target: { value: 'abc' } });
    fireEvent.change(screen.getByLabelText(/descripción/i), { target: { value: 'short' } });
    fireEvent.click(screen.getByRole('button', { name: /crear solicitud/i }));

    await waitFor(() => {
      expect(screen.getByText(/el título debe tener al menos 5 caracteres/i)).toBeInTheDocument();
      expect(screen.getByText(/la descripción debe tener al menos 20 caracteres/i)).toBeInTheDocument();
    });
  });

  it('submits form with valid data', async () => {
    const newTicket = { id: 1, title: 'Valid Title', description: 'Valid Description with enough length', priority: 'alta', category: 'tecnico', userId: 1 };
    vi.mocked(ticketService.createTicket).mockResolvedValueOnce(newTicket as unknown as Ticket);

    render(<CreateTicketForm />);
    
    fireEvent.change(screen.getByLabelText(/título/i), { target: { value: 'Valid Title' } });
    fireEvent.change(screen.getByLabelText(/descripción/i), { target: { value: 'Valid Description with enough length' } });
    fireEvent.change(screen.getByLabelText(/prioridad/i), { target: { value: 'alta' } });
    fireEvent.change(screen.getByLabelText(/categoría/i), { target: { value: 'tecnico' } });
    
    fireEvent.click(screen.getByRole('button', { name: /crear solicitud/i }));

    await waitFor(() => {
      expect(ticketService.createTicket).toHaveBeenCalledWith({
        title: 'Valid Title',
        description: 'Valid Description with enough length',
        priority: 'alta',
        category: 'tecnico',
        userId: 1,
      });
      expect(mockAddTicket).toHaveBeenCalledWith(newTicket);
      expect(screen.getByText(/solicitud creada exitosamente/i)).toBeInTheDocument();
    });
  });

  it('shows error toast on API failure', async () => {
    vi.mocked(ticketService.createTicket).mockRejectedValueOnce(new Error('API Error'));

    render(<CreateTicketForm />);
    
    fireEvent.change(screen.getByLabelText(/título/i), { target: { value: 'Valid Title' } });
    fireEvent.change(screen.getByLabelText(/descripción/i), { target: { value: 'Valid Description with enough length' } });
    fireEvent.change(screen.getByLabelText(/prioridad/i), { target: { value: 'alta' } });
    fireEvent.change(screen.getByLabelText(/categoría/i), { target: { value: 'tecnico' } });
    
    fireEvent.click(screen.getByRole('button', { name: /crear solicitud/i }));

    await waitFor(() => {
      expect(screen.getByText(/error al crear la solicitud/i)).toBeInTheDocument();
    });
  });
});
