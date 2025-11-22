import { useState, useMemo } from 'react';
import type { TicketWithUser } from '../../../store/useAdminTicketStore';
import { Pagination } from '../../../components/ui/Pagination';

interface AdminTicketListProps {
  tickets: TicketWithUser[];
}

const ITEMS_PER_PAGE = 10;

export const AdminTicketList = ({ tickets }: AdminTicketListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      // Text Search (Client Name or Email)
      const searchLower = searchTerm.toLowerCase();
      const clientName = ticket.user?.name?.toLowerCase() || '';
      const clientEmail = ticket.user?.email?.toLowerCase() || '';
      const matchesSearch =
        clientName.includes(searchLower) || clientEmail.includes(searchLower);

      // Status Filter
      const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;

      // Date Range Filter
      const ticketDate = new Date(ticket.date).getTime();
      const start = dateStart ? new Date(dateStart).getTime() : 0;
      const end = dateEnd ? new Date(dateEnd).setHours(23, 59, 59, 999) : Infinity;
      const matchesDate = ticketDate >= start && ticketDate <= end;

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [tickets, searchTerm, statusFilter, dateStart, dateEnd]);

  const totalPages = Math.ceil(filteredTickets.length / ITEMS_PER_PAGE);
  
  const paginatedTickets = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredTickets.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredTickets, currentPage]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleDateStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateStart(e.target.value);
    setCurrentPage(1);
  };

  const handleDateEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateEnd(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="grid gap-4 rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-200 md:grid-cols-4">
        <div className="md:col-span-2">
          <label className="mb-1 block text-xs font-medium text-gray-500">Buscar Cliente</label>
          <input
            type="text"
            placeholder="Nombre o Email..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full rounded-lg border-gray-300 text-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-500">Estado</label>
          <select
            value={statusFilter}
            onChange={handleStatusChange}
            className="w-full rounded-lg border-gray-300 text-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="all">Todos</option>
            <option value="pendiente">Pendiente</option>
            <option value="en_proceso">En Proceso</option>
            <option value="resuelto">Resuelto</option>
          </select>
        </div>

        <div className="flex gap-2">
          <div className="flex-1">
            <label className="mb-1 block text-xs font-medium text-gray-500">Desde</label>
            <input
              type="date"
              value={dateStart}
              onChange={handleDateStartChange}
              className="w-full rounded-lg border-gray-300 text-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="flex-1">
            <label className="mb-1 block text-xs font-medium text-gray-500">Hasta</label>
            <input
              type="date"
              value={dateEnd}
              onChange={handleDateEndChange}
              className="w-full rounded-lg border-gray-300 text-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Asunto</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Cliente</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Prioridad</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Fecha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {paginatedTickets.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-sm text-gray-500">
                    No se encontraron tickets con los filtros seleccionados.
                  </td>
                </tr>
              ) : (
                paginatedTickets.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-gray-50">
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">#{ticket.id}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{ticket.title}</div>
                      <div className="text-xs text-gray-500 line-clamp-1">{ticket.description}</div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="text-sm text-gray-900">{ticket.user?.name || 'Desconocido'}</div>
                      <div className="text-xs text-gray-500">{ticket.user?.email}</div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 
                        ${ticket.status === 'pendiente' ? 'bg-orange-100 text-orange-800' : 
                          ticket.status === 'en_proceso' ? 'bg-blue-100 text-blue-800' : 
                          'bg-green-100 text-green-800'}`}>
                        {ticket.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 
                        ${ticket.priority === 'alta' ? 'bg-red-100 text-red-800' : 
                          ticket.priority === 'media' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-green-100 text-green-800'}`}>
                        {ticket.priority}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {new Date(ticket.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
        
        <div className="border-t border-gray-200 bg-gray-50 px-6 py-3 text-right text-xs text-gray-500">
          Mostrando {paginatedTickets.length} de {filteredTickets.length} tickets (Total: {tickets.length})
        </div>
      </div>
    </div>
  );
};
