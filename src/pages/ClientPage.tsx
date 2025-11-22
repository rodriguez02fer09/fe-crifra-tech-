import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useRole';
import { useTicketStore } from '../store/useTicketStore';
import { ticketService } from '../services/ticketService';
import { CreateTicketForm } from '../features/tickets/components/CreateTicketForm';
import type { Ticket } from '../types/types';

export const ClientPage = () => {
  const { user } = useAuth();
  const { tickets, setTickets, setLoading, setError } = useTicketStore();
  const [selectedRequest, setSelectedRequest] = useState<Ticket | null>(null);

  useEffect(() => {
    const loadTickets = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const data = await ticketService.getUserDashboardData(user);
        setTickets(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar los tickets');
      } finally {
        setLoading(false);
      }
    };

    loadTickets();
  }, [user, setTickets, setLoading, setError]);

  const getStatusBadge = (status: string) => {
    const styles = {
      pendiente: 'bg-pendiente/10 text-pendiente',
      en_proceso: 'bg-acento/10 text-acento',
      resuelto: 'bg-aprobado/10 text-aprobado'
    };
    const labels = {
      pendiente: 'Pendiente',
      en_proceso: 'En Proceso',
      resuelto: 'Resuelto'
    };
    return (
      <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800'}`}>
        {labels[status as keyof typeof labels] || status}
      </span>
    );
  };

  return (
    <>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Create Request Form */}
          <div className="lg:col-span-1">
            <CreateTicketForm />
          </div>

          {/* My Requests List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                <h2 className="text-lg font-medium text-texto">Mis Solicitudes</h2>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{tickets.length} Total</span>
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
                    {tickets.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                          No tienes solicitudes registradas.
                        </td>
                      </tr>
                    ) : (
                      tickets.map((req) => (
                        <tr key={req.id} className="hover:bg-gray-50">
                          <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">#{req.id}</td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                            <div className="font-medium text-texto">{req.title}</div>
                            <div className="text-xs text-gray-400 truncate max-w-[200px]">{req.description}</div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                            {new Date(req.date).toLocaleDateString('es-ES')}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">{getStatusBadge(req.status)}</td>
                          <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                            <button 
                              onClick={() => setSelectedRequest(req)}
                              className="text-acento hover:text-blue-900"
                            >
                              Ver Detalle
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
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
                <h3 className="text-lg font-bold text-white">Detalle de Solicitud #{selectedRequest.id}</h3>
                <button onClick={() => setSelectedRequest(null)} className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Asunto</p>
                  <p className="text-sm font-medium text-gray-900">{selectedRequest.title}</p>
                </div>
                <div className="mb-4">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Descripción</p>
                  <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md">{selectedRequest.description}</p>
                </div>
                <div className="mb-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Estado</p>
                    <div>{getStatusBadge(selectedRequest.status)}</div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Prioridad</p>
                    <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                      selectedRequest.priority === 'alta' ? 'bg-red-100 text-red-800' :
                      selectedRequest.priority === 'media' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {selectedRequest.priority.charAt(0).toUpperCase() + selectedRequest.priority.slice(1)}
                    </span>
                  </div>
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
