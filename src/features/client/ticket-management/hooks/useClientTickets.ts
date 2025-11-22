import { useState, useCallback } from 'react';
import type { ClientTicket } from '../entities';
import { getMyTicketsUseCase } from '../use-cases/getMyTickets.use-case';
import { createTicketUseCase } from '../use-cases/createTicket.use-case';

export const useClientTickets = () => {
  const [tickets, setTickets] = useState<ClientTicket[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTickets = useCallback(async (userId: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getMyTicketsUseCase(userId);
      setTickets(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createTicket = useCallback(async (
    ticketData: Omit<ClientTicket, 'id' | 'date' | 'updatedAt' | 'status' | 'response' | 'assignedTo'>
  ) => {
    setIsLoading(true);
    try {
      const newTicket = await createTicketUseCase(ticketData);
      setTickets((prev) => [newTicket, ...prev]);
      return newTicket;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error desconocido';
      setError(msg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    tickets,
    isLoading,
    error,
    loadTickets,
    createTicket,
  };
};
