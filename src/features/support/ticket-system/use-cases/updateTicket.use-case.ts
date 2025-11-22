import type { SupportTicket } from '../entities';
import { ticketAdapter } from '../adapters/ticket.adapter';

const API_BASE_URL = 'http://localhost:3001';

export const updateTicketUseCase = async (id: number, updates: Partial<SupportTicket>): Promise<SupportTicket> => {
  const response = await fetch(`${API_BASE_URL}/tickets/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...updates,
      updatedAt: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    throw new Error('Error al actualizar el ticket');
  }

  const data = await response.json();
  return ticketAdapter(data);
};
