import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SupportDashboardView } from './SupportDashboardView';
import { TicketManagementModal } from './TicketManagementModal';
import type { SupportTicket } from '../entities';

describe('Support Components', () => {
  const mockTicket: SupportTicket = {
    id: 1,
    title: 'Test Ticket',
    description: 'Desc',
    userId: 1,
    assignedTo: 2,
    status: 'pendiente',
    priority: 'alta',
    date: '2023-01-01',
    updatedAt: '2023-01-01',
    response: '',
    category: 'tecnico'
  };

  describe('SupportDashboardView', () => {
    const mockProps = {
      tickets: [mockTicket],
      isLoading: false,
      error: null,
      onTicketClick: vi.fn(),
    };

    it('should render tickets', () => {
      render(<SupportDashboardView {...mockProps} />);
      expect(screen.getByText('Test Ticket')).toBeInTheDocument();
      expect(screen.getByText('Total Asignados')).toBeInTheDocument();
    });

    it('should handle loading state', () => {
      render(<SupportDashboardView {...mockProps} isLoading={true} />);
      expect(screen.queryByText('Test Ticket')).not.toBeInTheDocument();
    });

    it('should handle error state', () => {
      render(<SupportDashboardView {...mockProps} error="Error loading" />);
      expect(screen.getByText('Error loading')).toBeInTheDocument();
    });

    it('should handle ticket click', () => {
      render(<SupportDashboardView {...mockProps} />);
      fireEvent.click(screen.getByText('Test Ticket'));
      expect(mockProps.onTicketClick).toHaveBeenCalledWith(mockTicket);
    });
  });

  describe('TicketManagementModal', () => {
    const mockProps = {
      ticket: mockTicket,
      onClose: vi.fn(),
      onUpdate: vi.fn(),
    };

    it('should render ticket details', () => {
      render(<TicketManagementModal {...mockProps} />);
      expect(screen.getByText('Gestionar Ticket #1')).toBeInTheDocument();
      expect(screen.getByText('Test Ticket')).toBeInTheDocument();
    });

    it('should call onUpdate on submit', async () => {
      render(<TicketManagementModal {...mockProps} />);
      
      fireEvent.change(screen.getByPlaceholderText('Escribe tu respuesta aquí...'), {
        target: { value: 'New Response' }
      });

      fireEvent.submit(screen.getByRole('button', { name: /guardar cambios/i }).closest('form')!);

      expect(mockProps.onUpdate).toHaveBeenCalledWith(1, expect.objectContaining({
        response: 'New Response'
      }));
    });
  });
});
