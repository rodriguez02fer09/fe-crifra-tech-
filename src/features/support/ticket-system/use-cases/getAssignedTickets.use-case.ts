import type { SupportTicket } from '../entities';
import { ticketAdapter } from '../adapters/ticket.adapter';

const API_BASE_URL = 'http://localhost:3001';

export const getAssignedTicketsUseCase = async (supportId: number): Promise<SupportTicket[]> => {
  const url = `${API_BASE_URL}/tickets?assignedTo=${supportId}&status_ne=resuelto`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Error al obtener los tickets asignados');
  }

  const data = await response.json();
  return data.map(ticketAdapter);
};
