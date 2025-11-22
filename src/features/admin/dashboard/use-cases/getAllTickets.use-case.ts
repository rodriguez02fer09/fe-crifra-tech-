import type { AdminTicket } from '../entities';
import { adminTicketAdapter } from '../adapters/adminTicket.adapter';

const API_BASE_URL = 'http://localhost:3001';

export const getAllTicketsUseCase = async (): Promise<AdminTicket[]> => {
  const response = await fetch(`${API_BASE_URL}/tickets?_expand=user`);

  if (!response.ok) {
    throw new Error('Error al obtener los tickets');
  }

  const data = await response.json();
  return data.map(adminTicketAdapter);
};
