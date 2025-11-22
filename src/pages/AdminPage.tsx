import { useState, useMemo } from 'react';

// Mock Data
const MOCK_REQUESTS = [
  { id: 'R-001', subject: 'Acceso denegado', client: 'TechCorp', status: 'open', date: '2023-11-21', priority: 'high' },
  { id: 'R-002', subject: 'Factura pendiente', client: 'Consulting Inc', status: 'in_progress', date: '2023-11-20', priority: 'medium' },
  { id: 'R-003', subject: 'Bug en reporte', client: 'TechCorp', status: 'closed', date: '2023-11-19', priority: 'low' },
  { id: 'R-004', subject: 'Nuevo usuario', client: 'Retail Group', status: 'open', date: '2023-11-21', priority: 'medium' },
  { id: 'R-005', subject: 'Cambio de plan', client: 'Consulting Inc', status: 'closed', date: '2023-11-18', priority: 'low' },
  { id: 'R-006', subject: 'Error 404', client: 'Retail Group', status: 'in_progress', date: '2023-11-20', priority: 'high' },
];

export const AdminPage = () => {
  const [filters, setFilters] = useState({
    client: '',
    status: '',
    date: '',
  });

  // Statistics
  const stats = useMemo(() => {
    const total = MOCK_REQUESTS.length;
    const open = MOCK_REQUESTS.filter(r => r.status === 'open').length;
    const inProgress = MOCK_REQUESTS.filter(r => r.status === 'in_progress').length;
    const closed = MOCK_REQUESTS.filter(r => r.status === 'closed').length;
    return { total, open, inProgress, closed };
  }, []);

  // Filtered Data
  const filteredRequests = useMemo(() => {
    return MOCK_REQUESTS.filter(req => {
      const matchClient = req.client.toLowerCase().includes(filters.client.toLowerCase());
      const matchStatus = filters.status ? req.status === filters.status : true;
      const matchDate = filters.date ? req.date === filters.date : true;
      return matchClient && matchStatus && matchDate;
    });
  }, [filters]);

  const getStatusBadge = (status: string) => {
    const styles = {
      open: 'bg-rechazado/10 text-rechazado',
      in_progress: 'bg-pendiente/10 text-pendiente',
      closed: 'bg-aprobado/10 text-aprobado'
    };
    const labels = {
      open: 'Abierto',
      in_progress: 'En Proceso',
      closed: 'Cerrado'
    };
    return (
      <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-fondo font-sans text-texto">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-secundario shadow-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-principal">CIFRA TECH</span>
              <span className="ml-4 rounded-md bg-white/10 px-2 py-1 text-xs font-medium text-white">Panel Administrador</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-300">Admin User</span>
              <div className="h-8 w-8 rounded-full bg-principal/20 flex items-center justify-center text-principal font-bold border border-principal">
                A
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="overflow-hidden rounded-xl bg-white shadow-sm border-l-4 border-principal p-5">
            <dt className="truncate text-sm font-medium text-gray-500">Total Solicitudes</dt>
            <dd className="mt-1 text-3xl font-bold text-texto">{stats.total}</dd>
          </div>
          <div className="overflow-hidden rounded-xl bg-white shadow-sm border-l-4 border-rechazado p-5">
            <dt className="truncate text-sm font-medium text-gray-500">Abiertas</dt>
            <dd className="mt-1 text-3xl font-bold text-texto">{stats.open}</dd>
          </div>
          <div className="overflow-hidden rounded-xl bg-white shadow-sm border-l-4 border-pendiente p-5">
            <dt className="truncate text-sm font-medium text-gray-500">En Proceso</dt>
            <dd className="mt-1 text-3xl font-bold text-texto">{stats.inProgress}</dd>
          </div>
          <div className="overflow-hidden rounded-xl bg-white shadow-sm border-l-4 border-aprobado p-5">
            <dt className="truncate text-sm font-medium text-gray-500">Cerradas</dt>
            <dd className="mt-1 text-3xl font-bold text-texto">{stats.closed}</dd>
          </div>
        </div>

        {/* Filters & List */}
        <div className="rounded-xl bg-white shadow-sm overflow-hidden">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-medium text-texto">Gestión de Solicitudes</h2>
          </div>
          
          {/* Filters */}
          <div className="p-6 bg-gray-50 border-b border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
              <input
                type="text"
                placeholder="Buscar cliente..."
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-principal sm:text-sm sm:leading-6"
                value={filters.client}
                onChange={(e) => setFilters({ ...filters, client: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
              <select
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-principal sm:text-sm sm:leading-6"
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              >
                <option value="">Todos</option>
                <option value="open">Abierto</option>
                <option value="in_progress">En Proceso</option>
                <option value="closed">Cerrado</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
              <input
                type="date"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-principal sm:text-sm sm:leading-6"
                value={filters.date}
                onChange={(e) => setFilters({ ...filters, date: e.target.value })}
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Asunto</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Cliente</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Fecha</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Estado</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Prioridad</th>
                  <th scope="col" className="relative px-6 py-3"><span className="sr-only">Acciones</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {filteredRequests.length > 0 ? (
                  filteredRequests.map((req) => (
                    <tr key={req.id} className="hover:bg-gray-50">
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{req.id}</td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{req.subject}</td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{req.client}</td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{req.date}</td>
                      <td className="whitespace-nowrap px-6 py-4">{getStatusBadge(req.status)}</td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        <span className={`font-medium ${
                          req.priority === 'high' ? 'text-rechazado' : 
                          req.priority === 'medium' ? 'text-pendiente' : 'text-aprobado'
                        }`}>
                          {req.priority === 'high' ? 'Alta' : req.priority === 'medium' ? 'Media' : 'Baja'}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                        <a href="#" className="text-acento hover:text-blue-900">Ver Detalles</a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                      No se encontraron solicitudes que coincidan con los filtros.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};
