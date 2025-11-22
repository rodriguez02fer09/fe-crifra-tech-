import { useState, useCallback } from 'react';
import type { AdminTicket, TicketStats } from '../entities';
import { getAllTicketsUseCase } from '../use-cases/getAllTickets.use-case';

export const useAdminDashboard = () => {
  const [tickets, setTickets] = useState<AdminTicket[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTickets = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getAllTicketsUseCase();
      setTickets(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getStats = useCallback((): TicketStats => {
    return {
      total: tickets.length,
      pending: tickets.filter(t => t.status === 'pendiente').length,
      inProgress: tickets.filter(t => t.status === 'en_proceso').length,
      resolved: tickets.filter(t => t.status === 'resuelto').length,
    };
  }, [tickets]);

  return {
    tickets,
    isLoading,
    error,
    loadTickets,
    getStats,
  };
};
