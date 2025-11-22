import { useState } from 'react';
import type { AdminTicket, TicketStats } from '../entities';
import { AdminStatsCard } from './AdminStatsCard';
import { AdminCharts } from './AdminCharts';
import { AdminTicketList } from './AdminTicketList';

interface AdminDashboardViewProps {
  tickets: AdminTicket[];
  stats: TicketStats;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({ tickets }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'tickets'>('overview');

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
