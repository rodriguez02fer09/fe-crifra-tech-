import { useState, useCallback } from 'react';
import type { SupportTicket } from '../entities';
import { getAssignedTicketsUseCase } from '../use-cases/getAssignedTickets.use-case';
import { updateTicketUseCase } from '../use-cases/updateTicket.use-case';

export const useSupportTickets = () => {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTickets = useCallback(async (supportId: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getAssignedTicketsUseCase(supportId);
      setTickets(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateTicket = useCallback(async (id: number, updates: Partial<SupportTicket>) => {
    setIsLoading(true);
    try {
      const updatedTicket = await updateTicketUseCase(id, updates);
      setTickets((prev) => prev.map((t) => (t.id === id ? updatedTicket : t)));
      return updatedTicket;
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
    updateTicket,
  };
};
