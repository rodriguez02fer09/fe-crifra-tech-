import type { ClientTicket } from '../entities';
import { clientTicketAdapter } from '../adapters/clientTicket.adapter';

const API_BASE_URL = 'http://localhost:3001';

export const getMyTicketsUseCase = async (userId: number): Promise<ClientTicket[]> => {
  const response = await fetch(`${API_BASE_URL}/tickets?userId=${userId}`);

  if (!response.ok) {
    throw new Error('Error al obtener tus tickets');
  }

  const data = await response.json();
  return data.map(clientTicketAdapter);
};
