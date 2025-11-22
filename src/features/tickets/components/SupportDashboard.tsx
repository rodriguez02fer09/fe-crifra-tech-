import { useState, useMemo } from 'react';
import { useAuthStore } from '../../../store/useAuthStore';
import { useSupportTicketStore } from '../../../store/useSupportTicketStore';
import { ticketService } from '../../../services/ticketService';
import { TicketManagement } from './TicketManagement';
import { Pagination } from '../../../components/ui/Pagination';
import type { Ticket } from '../../../types/types';

const PRIORITY_ORDER = {
  alta: 3,
  media: 2,
  baja: 1,
};

const PRIORITY_LABELS = {
  alta: 'Alta',
  media: 'Media',
  baja: 'Baja',
};

const STATUS_LABELS = {
  pendiente: 'Pendiente',
  en_proceso: 'En Proceso',
  resuelto: 'Resuelto',
};

const ITEMS_PER_PAGE = 10;

export const SupportDashboard = () => {
  const user = useAuthStore((state) => state.user);
  const { assignedTickets, setAssignedTickets, isLoading, setLoading, error, setError } = useSupportTicketStore();
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'alta' | 'media' | 'baja'>('all');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchTickets = async () => {
      if (!user || user.role !== 'support') return;

      setLoading(true);
      try {
        console.log('Fetching tickets for support agent:', user.id);
        const tickets = await ticketService.getAssignedTickets(user.id);
        console.log('Assigned tickets fetched:', tickets);
        setAssignedTickets(tickets);
      } catch (err) {
        console.log('Error al cargar los tickets asignados:', err);
        setError('Error al cargar los tickets asignados');
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [user, setAssignedTickets, setLoading, setError]);

  const filteredAndSortedTickets = useMemo(() => {
    let result = [...assignedTickets];

    // Filter by priority
    if (priorityFilter !== 'all') {
      result = result.filter((t) => t.priority === priorityFilter);
    }

    // Sort by priority (High -> Low)
    result.sort((a, b) => {
      const priorityA = PRIORITY_ORDER[a.priority] || 0;
      const priorityB = PRIORITY_ORDER[b.priority] || 0;
      return priorityB - priorityA;
    });

    return result;
  }, [assignedTickets, priorityFilter]);

  const totalPages = Math.ceil(filteredAndSortedTickets.length / ITEMS_PER_PAGE);

  const paginatedTickets = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedTickets.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAndSortedTickets, currentPage]);

  const handlePriorityFilterChange = (filter: 'all' | 'alta' | 'media' | 'baja') => {
    setPriorityFilter(filter);
    setCurrentPage(1);
  };

  if (!user || user.role !== 'support') {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-lg text-gray-500">Acceso Denegado. Solo para personal de soporte.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header & Filters */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Panel de Soporte</h1>
          <p className="text-sm text-gray-500">Gestiona tus tickets asignados</p>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-700">Prioridad:</span>
          <div className="flex rounded-lg bg-gray-100 p-1">
            {(['all', 'alta', 'media', 'baja'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => handlePriorityFilterChange(filter)}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-all ${
                  priorityFilter === filter
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {filter === 'all' ? 'Todas' : PRIORITY_LABELS[filter]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-blue-50 p-4 text-blue-900">
          <div className="text-2xl font-bold">{assignedTickets.length}</div>
          <div className="text-sm font-medium text-blue-700">Total Asignados</div>
        </div>
        <div className="rounded-xl bg-orange-50 p-4 text-orange-900">
          <div className="text-2xl font-bold">
            {assignedTickets.filter(t => t.status === 'pendiente').length}
          </div>
          <div className="text-sm font-medium text-orange-700">Pendientes</div>
        </div>
        <div className="rounded-xl bg-purple-50 p-4 text-purple-900">
          <div className="text-2xl font-bold">
            {assignedTickets.filter(t => t.status === 'en_proceso').length}
          </div>
          <div className="text-sm font-medium text-purple-700">En Proceso</div>
        </div>
      </div>

      {/* List View */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        {paginatedTickets.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <div className="mb-4 rounded-full bg-gray-100 p-4">
              <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">No hay tickets</h3>
            <p className="text-gray-500">No se encontraron tickets con los filtros seleccionados.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {paginatedTickets.map((ticket) => (
              <div
                key={ticket.id}
                onClick={() => setSelectedTicket(ticket)}
                className="group flex cursor-pointer items-center gap-4 p-4 transition-colors hover:bg-gray-50"
              >
                {/* Status Indicator Strip */}
                <div className={`h-12 w-1 rounded-full ${
                  ticket.status === 'pendiente' ? 'bg-orange-500' : 'bg-blue-500'
                }`} />

                {/* Main Content */}
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-xs font-medium text-gray-500">#{ticket.id}</span>
                    <h3 className="truncate text-base font-semibold text-gray-900 group-hover:text-blue-600">
                      {ticket.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Cliente #{ticket.userId}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(ticket.date).toLocaleDateString()}
                    </span>
                    <span className="hidden capitalize sm:inline-block">{ticket.category}</span>
                  </div>
                </div>

                {/* Badges & Action */}
                <div className="flex flex-col items-end gap-2 sm:flex-row sm:items-center">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                    ${
                      ticket.status === 'pendiente'
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {STATUS_LABELS[ticket.status]}
                  </span>
                  
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                    ${
                      ticket.priority === 'alta'
                        ? 'bg-red-100 text-red-800'
                        : ticket.priority === 'media'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {PRIORITY_LABELS[ticket.priority]}
                  </span>

                  <svg className="h-5 w-5 text-gray-400 group-hover:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {selectedTicket && (
        <TicketManagement
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
        />
      )}
    </div>
  );
};

