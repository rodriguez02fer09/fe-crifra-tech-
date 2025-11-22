import type { TicketWithUser } from '../../../store/useAdminTicketStore';

interface AdminStatsCardProps {
  tickets: TicketWithUser[];
}

export const AdminStatsCard = ({ tickets }: AdminStatsCardProps) => {
  const stats = {
    total: tickets.length,
    pending: tickets.filter((t) => t.status === 'pendiente').length,
    inProgress: tickets.filter((t) => t.status === 'en_proceso').length,
    resolved: tickets.filter((t) => t.status === 'resuelto').length,
    high: tickets.filter((t) => t.priority === 'alta').length,
    medium: tickets.filter((t) => t.priority === 'media').length,
    low: tickets.filter((t) => t.priority === 'baja').length,
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* Total Tickets */}
      <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
        <dt className="text-sm font-medium text-gray-500">Total Solicitudes</dt>
        <dd className="mt-2 text-3xl font-bold text-gray-900">{stats.total}</dd>
      </div>

      {/* Status Breakdown */}
      <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
        <dt className="text-sm font-medium text-gray-500">Por Estado</dt>
        <dd className="mt-2 space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-orange-600">Pendientes</span>
            <span className="font-semibold">{stats.pending}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-blue-600">En Proceso</span>
            <span className="font-semibold">{stats.inProgress}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-green-600">Resueltos</span>
            <span className="font-semibold">{stats.resolved}</span>
          </div>
        </dd>
      </div>

      {/* Priority Breakdown */}
      <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
        <dt className="text-sm font-medium text-gray-500">Por Prioridad</dt>
        <dd className="mt-2 space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-red-600">Alta</span>
            <span className="font-semibold">{stats.high}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-yellow-600">Media</span>
            <span className="font-semibold">{stats.medium}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-green-600">Baja</span>
            <span className="font-semibold">{stats.low}</span>
          </div>
        </dd>
      </div>

      {/* Action Required (Pending High Priority) */}
      <div className="rounded-xl bg-red-50 p-6 shadow-sm ring-1 ring-red-100">
        <dt className="text-sm font-medium text-red-800">Atención Requerida</dt>
        <dd className="mt-2">
          <div className="text-3xl font-bold text-red-900">
            {tickets.filter(t => t.priority === 'alta' && t.status !== 'resuelto').length}
          </div>
          <p className="text-xs text-red-700">Tickets Alta Prioridad Activos</p>
        </dd>
      </div>
    </div>
  );
};
