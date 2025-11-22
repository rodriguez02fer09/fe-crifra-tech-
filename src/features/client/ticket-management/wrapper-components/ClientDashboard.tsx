import { useEffect } from 'react';
import { useAuthStore } from '../../../../store/useAuthStore';
import { useClientTickets } from '../hooks/useClientTickets';
import { ClientDashboardView } from '../components/ClientDashboardView';

export const ClientDashboard = () => {
  const user = useAuthStore((state) => state.user);
  const { tickets, isLoading, error, loadTickets, createTicket } = useClientTickets();

  useEffect(() => {
    if (user && user.role === 'client') {
      loadTickets(user.id);
    }
  }, [user, loadTickets]);

  if (!user || user.role !== 'client') {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-lg text-gray-500">Acceso Denegado. Solo para clientes.</p>
      </div>
    );
  }

  return (
    <ClientDashboardView
      tickets={tickets}
      isLoading={isLoading}
      error={error}
      userId={user.id}
      onCreateTicket={createTicket}
    />
  );
};
