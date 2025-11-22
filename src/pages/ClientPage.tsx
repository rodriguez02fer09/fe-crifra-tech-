import { useState } from 'react';

// Mock Data
const MOCK_MY_REQUESTS = [
  {
    id: 'R-2001',
    subject: 'Problema con la facturación',
    date: '2023-11-20',
    status: 'in_progress',
    response: 'Estamos revisando su caso con el departamento contable.',
  },
  {
    id: 'R-2002',
    subject: 'Error al cargar imágenes',
    date: '2023-11-18',
    status: 'closed',
    response: 'El problema ha sido resuelto. Por favor intente nuevamente.',
  },
  {
    id: 'R-2003',
    subject: 'Solicitud de soporte técnico',
    date: '2023-11-21',
    status: 'open',
    response: null,
  },
];

export const ClientPage = () => {
  const [requests, setRequests] = useState(MOCK_MY_REQUESTS);
  const [newRequest, setNewRequest] = useState({
    subject: '',
    description: '',
    priority: 'medium',
  });
  const [selectedRequest, setSelectedRequest] = useState<typeof MOCK_MY_REQUESTS[0] | null>(null);

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRequest.subject || !newRequest.description) return;

    const request = {
      id: `R-${Math.floor(Math.random() * 10000)}`,
      subject: newRequest.subject,
      date: new Date().toISOString().split('T')[0],
      status: 'open',
      response: null,
    };

    setRequests([request, ...requests]);
    setNewRequest({ subject: '', description: '', priority: 'medium' });
    alert('Solicitud creada exitosamente');
  };

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
    <>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Create Request Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="border-b border-gray-200 px-6 py-4 bg-gray-50">
                <h2 className="text-lg font-medium text-texto">Nueva Solicitud</h2>
              </div>
              <div className="p-6">
                <form onSubmit={handleCreateRequest} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Asunto</label>
                    <input
                      type="text"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-principal sm:text-sm sm:leading-6"
                      placeholder="Resumen del problema"
                      value={newRequest.subject}
                      onChange={(e) => setNewRequest({ ...newRequest, subject: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Prioridad</label>
                    <select
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-principal sm:text-sm sm:leading-6"
                      value={newRequest.priority}
                      onChange={(e) => setNewRequest({ ...newRequest, priority: e.target.value })}
                    >
                      <option value="low">Baja</option>
                      <option value="medium">Media</option>
                      <option value="high">Alta</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                    <textarea
                      rows={4}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-principal sm:text-sm sm:leading-6"
                      placeholder="Detalla tu solicitud..."
                      value={newRequest.description}
                      onChange={(e) => setNewRequest({ ...newRequest, description: e.target.value })}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full flex justify-center rounded-md bg-principal px-3 py-2 text-sm font-semibold text-secundario shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-principal"
                  >
                    Enviar Solicitud
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* My Requests List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                <h2 className="text-lg font-medium text-texto">Mis Solicitudes</h2>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{requests.length} Total</span>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">ID</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Asunto</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Fecha</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Estado</th>
                      <th scope="col" className="relative px-6 py-3"><span className="sr-only">Ver</span></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {requests.map((req) => (
                      <tr key={req.id} className="hover:bg-gray-50">
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{req.id}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{req.subject}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{req.date}</td>
                        <td className="whitespace-nowrap px-6 py-4">{getStatusBadge(req.status)}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                          <button 
                            onClick={() => setSelectedRequest(req)}
                            className="text-acento hover:text-blue-900"
                          >
                            Ver Respuesta
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Response Modal */}
        {selectedRequest && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-xl bg-white shadow-2xl overflow-hidden">
              <div className="bg-secundario px-6 py-4 flex justify-between items-center">
                <h3 className="text-lg font-bold text-white">Detalle de Solicitud</h3>
                <button onClick={() => setSelectedRequest(null)} className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Asunto</p>
                  <p className="text-sm font-medium text-gray-900">{selectedRequest.subject}</p>
                </div>
                <div className="mb-4">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Estado</p>
                  <div>{getStatusBadge(selectedRequest.status)}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Respuesta de Soporte</p>
                  {selectedRequest.response ? (
                    <p className="text-sm text-gray-700">{selectedRequest.response}</p>
                  ) : (
                    <p className="text-sm text-gray-400 italic">Aún no hay respuesta disponible.</p>
                  )}
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-3 flex justify-end">
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}
    </>
  );
};
