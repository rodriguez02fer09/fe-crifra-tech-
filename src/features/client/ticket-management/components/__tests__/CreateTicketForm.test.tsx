import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CreateTicketForm } from '../CreateTicketForm';
import { useAuthStore } from '../../../../../store/useAuthStore';
import { useTicketStore } from '../../../../../store/useTicketStore';
import { ticketService } from '../../../../../services/ticketService';

vi.mock('../../../../../store/useAuthStore');
vi.mock('../../../../../store/useTicketStore');
vi.mock('../../../../../services/ticketService');

describe('CreateTicketForm', () => {
  const mockUser = { id: 1, name: 'Test User', email: 'test@test.com', role: 'client' as const };
  const mockAddTicket = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    
    // Proper way to mock Zustand stores
    (useAuthStore as unknown as ReturnType<typeof vi.fn>).mockImplementation((selector) => 
      selector({ user: mockUser })
    );
    
    (useTicketStore as unknown as ReturnType<typeof vi.fn>).mockImplementation((selector) =>
      selector({ addTicket: mockAddTicket })
    );
  });

  it('should render the form', () => {
    render(<CreateTicketForm />);
    expect(screen.getByText('Nueva Solicitud')).toBeInTheDocument();
    expect(screen.getByLabelText('Título')).toBeInTheDocument();
    expect(screen.getByLabelText('Descripción')).toBeInTheDocument();
  });

  it('should show validation errors on empty submit', async () => {
    render(<CreateTicketForm />);
    
    const submitButton = screen.getByRole('button', { name: /crear solicitud/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('El título es obligatorio')).toBeInTheDocument();
    });
  });

  it('should validate minimum length', async () => {
    render(<CreateTicketForm />);

    const titleInput = screen.getByLabelText('Título');
    fireEvent.change(titleInput, { target: { value: 'abc' } });

    const submitButton = screen.getByRole('button', { name: /crear solicitud/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('El título debe tener al menos 5 caracteres')).toBeInTheDocument();
    });
  });

  it('should call ticketService on valid submit', async () => {
    const mockTicket = {
      id: 1,
      title: 'Test Title',
      description: 'Test description with more than 20 characters',
      priority: 'alta' as const,
      category: 'tecnico' as const,
      userId: 1,
      status: 'pendiente' as const,
      assignedTo: 2,
      date: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      response: '',
    };

    vi.spyOn(ticketService, 'createTicket').mockResolvedValue(mockTicket);

    render(<CreateTicketForm />);

    fireEvent.change(screen.getByLabelText('Título'), { target: { value: 'Test Title' } });
    fireEvent.change(screen.getByLabelText('Descripción'), { 
      target: { value: 'Test description with more than 20 characters' } 
    });
    fireEvent.change(screen.getByLabelText('Prioridad'), { target: { value: 'alta' } });
    fireEvent.change(screen.getByLabelText('Categoría'), { target: { value: 'tecnico' } });

    const submitButton = screen.getByRole('button', { name: /crear solicitud/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(ticketService.createTicket).toHaveBeenCalled();
      expect(mockAddTicket).toHaveBeenCalledWith(mockTicket);
    });
  });

  it('should reset form after successful submit', async () => {
    const mockTicket = {
      id: 1,
      title: 'Test Title',
      description: 'Test description with more than 20 characters',
      priority: 'alta' as const,
      category: 'tecnico' as const,
      userId: 1,
      status: 'pendiente' as const,
      assignedTo: 2,
      date: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      response: '',
    };

    vi.spyOn(ticketService, 'createTicket').mockResolvedValue(mockTicket);

    render(<CreateTicketForm />);

    const titleInput = screen.getByLabelText('Título') as HTMLInputElement;
    
    fireEvent.change(titleInput, { target: { value: 'Test Title' } });
    fireEvent.change(screen.getByLabelText('Descripción'), { 
      target: { value: 'Test description with more than 20 characters' } 
    });
    fireEvent.change(screen.getByLabelText('Prioridad'), { target: { value: 'alta' } });
    fireEvent.change(screen.getByLabelText('Categoría'), { target: { value: 'tecnico' } });

    const submitButton = screen.getByRole('button', { name: /crear solicitud/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(titleInput.value).toBe('');
    });
  });
});
