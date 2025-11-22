import { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from 'recharts';
import type { TicketWithUser } from '../../../store/useAdminTicketStore';

interface AdminChartsProps {
  tickets: TicketWithUser[];
}


const STATUS_COLORS = {
  pendiente: '#F97316', // Orange
  en_proceso: '#3B82F6', // Blue
  resuelto: '#22C55E', // Green
};

export const AdminCharts = ({ tickets }: AdminChartsProps) => {
  // 1. Status Distribution Data
  const statusData = useMemo(() => {
    const counts = tickets.reduce((acc, ticket) => {
      acc[ticket.status] = (acc[ticket.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return [
      { name: 'Pendiente', value: counts['pendiente'] || 0, color: STATUS_COLORS.pendiente },
      { name: 'En Proceso', value: counts['en_proceso'] || 0, color: STATUS_COLORS.en_proceso },
      { name: 'Resuelto', value: counts['resuelto'] || 0, color: STATUS_COLORS.resuelto },
    ];
  }, [tickets]);

  // 2. Priority Breakdown Data
  const priorityData = useMemo(() => {
    const counts = tickets.reduce((acc, ticket) => {
      acc[ticket.priority] = (acc[ticket.priority] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return [
      { name: 'Alta', tickets: counts['alta'] || 0 },
      { name: 'Media', tickets: counts['media'] || 0 },
      { name: 'Baja', tickets: counts['baja'] || 0 },
    ];
  }, [tickets]);

  // 3. Trend Data (Mocked/Aggregated by Month)
  const trendData = useMemo(() => {
    // Group by month (YYYY-MM)
    const grouped = tickets.reduce((acc, ticket) => {
      const date = new Date(ticket.date);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Convert to array and sort
    return Object.entries(grouped)
      .map(([date, count]) => ({ date, tickets: count }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [tickets]);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Status Chart */}
      <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Distribución por Estado</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Priority Chart */}
      <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Tickets por Prioridad</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={priorityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="tickets" fill="#8884d8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Trend Chart */}
      <div className="col-span-1 rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200 lg:col-span-2">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Tendencia de Tickets (Últimos Meses)</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="colorTickets" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="date" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area type="monotone" dataKey="tickets" stroke="#3B82F6" fillOpacity={1} fill="url(#colorTickets)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
