import { useEffect, useState } from 'react';
import { useAuthStore } from '../../../../store/useAuthStore';
import { useSupportTickets } from '../hooks/useSupportTickets';
import { SupportDashboardView } from '../components/SupportDashboardView';
import { TicketManagementModal } from '../components/TicketManagementModal';
import type { SupportTicket } from '../entities';

export const SupportDashboard = () => {
  const user = useAuthStore((state) => state.user);
  const { tickets, isLoading, error, loadTickets, updateTicket } = useSupportTickets();
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);

  useEffect(() => {
    if (user && user.role === 'support') {
      loadTickets(user.id);
    }
  }, [user, loadTickets]);

  if (!user || user.role !== 'support') {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-lg text-gray-500">Acceso Denegado. Solo para personal de soporte.</p>
      </div>
    );
  }

  return (
    <>
      <SupportDashboardView
        tickets={tickets}
        isLoading={isLoading}
        error={error}
        onTicketClick={setSelectedTicket}
      />
      
      {selectedTicket && (
        <TicketManagementModal
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
          onUpdate={updateTicket}
        />
      )}
    </>
  );
};
