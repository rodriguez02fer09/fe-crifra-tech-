import { useEffect, useState } from 'react';
import { useAdminTicketStore } from '../../../store/useAdminTicketStore';
import { ticketService } from '../../../services/ticketService';
import { AdminStatsCard } from './AdminStatsCard';
import { AdminTicketList } from './AdminTicketList';
import { AdminCharts } from './AdminCharts';
import type { TicketWithUser } from '../../../store/useAdminTicketStore';

export const AdminDashboard = () => {
  const { tickets, isLoading, error, setTickets, setLoading, setError } = useAdminTicketStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'tickets'>('overview');

  useEffect(() => {
    const fetchAllTickets = async () => {
      setLoading(true);
      try {
        // Cast the result to TicketWithUser[] since we know the service returns expanded user data
        // In a real app, we would validate this with Zod or similar
        const data = await ticketService.getAllTickets();
        setTickets(data as unknown as TicketWithUser[]);
      } catch (err) {
        setError('Error al cargar el listado de tickets');
      } finally {
        setLoading(false);
      }
    };

    fetchAllTickets();
  }, [setTickets, setLoading, setError]);

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700">
        <p className="font-bold">Error</p>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Panel de Administración</h1>
        <p className="text-gray-500">Visión general del estado de soporte y gestión de tickets.</p>
      </div>

      {/* Dashboard Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('overview')}
            className={`
              whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium
              ${activeTab === 'overview'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}
            `}
          >
            Resumen General
          </button>
          <button
            onClick={() => setActiveTab('tickets')}
            className={`
              whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium
              ${activeTab === 'tickets'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}
            `}
          >
            Gestión de Tickets
          </button>
        </nav>
      </div>

      {/* Content */}
      {activeTab === 'overview' ? (
        <div className="space-y-8 animate-in fade-in duration-500">
          <AdminStatsCard tickets={tickets} />
          <AdminCharts tickets={tickets} />
        </div>
      ) : (
        <div className="animate-in fade-in duration-500">
          <AdminTicketList tickets={tickets} />
        </div>
      )}
    </div>
  );
};
