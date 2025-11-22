import type { ClientTicket } from '../entities';
import { clientTicketAdapter } from '../adapters/clientTicket.adapter';

const API_BASE_URL = 'http://localhost:3001';

export const createTicketUseCase = async (
  ticket: Omit<ClientTicket, 'id' | 'date' | 'updatedAt' | 'status' | 'response' | 'assignedTo'>
): Promise<ClientTicket> => {
  const newTicket = {
    ...ticket,
    status: 'pendiente' as const,
    response: '',
    assignedTo: 2,
    date: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const response = await fetch(`${API_BASE_URL}/tickets`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTicket),
  });

  if (!response.ok) {
    throw new Error('Error al crear el ticket');
  }

  const data = await response.json();
  return clientTicketAdapter(data);
};
