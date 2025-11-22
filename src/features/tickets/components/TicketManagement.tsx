import { useState } from 'react';


import { ticketService } from '../../../services/ticketService';
import { useSupportTicketStore } from '../../../store/useSupportTicketStore';
import { Toast } from '../../../components/ui/Toast';
import type { Ticket } from '../../../types/types';
import { Button } from '../../../components/cross/Button';

interface TicketManagementProps {
  ticket: Ticket;
  onClose: () => void;
}

export const TicketManagement = ({ ticket, onClose }: TicketManagementProps) => {
  const [response, setResponse] = useState(ticket.response || '');
  const [status, setStatus] = useState<Ticket['status']>(ticket.status);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const updateSingleTicket = useSupportTicketStore((state) => state.updateSingleTicket);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const updatedTicket = await ticketService.updateTicket(ticket.id, {
        response,
        status,
      });

      updateSingleTicket(updatedTicket);
      setToast({ message: 'Ticket actualizado correctamente', type: 'success' });
      
      // Close modal after a short delay to show success message
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error) {
      console.error('Error al actualizar el ticket:', error);
      setToast({ message: 'Error al actualizar el ticket', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Gestionar Ticket #{ticket.id}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mb-6 grid gap-4 rounded-lg bg-gray-50 p-4 text-sm">
          <div>
            <span className="font-semibold text-gray-600">Título:</span>
            <p className="mt-1 text-gray-900">{ticket.title}</p>
          </div>
          <div>
            <span className="font-semibold text-gray-600">Descripción:</span>
            <p className="mt-1 text-gray-900">{ticket.description}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="font-semibold text-gray-600">Categoría:</span>
              <p className="mt-1 capitalize text-gray-900">{ticket.category}</p>
            </div>
            <div>
              <span className="font-semibold text-gray-600">Prioridad:</span>
              <p className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium capitalize
                ${ticket.priority === 'alta' ? 'bg-red-100 text-red-800' : 
                  ticket.priority === 'media' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-green-100 text-green-800'}`}>
                {ticket.priority}
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Estado</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as Ticket['status'])}
              className="w-full rounded-lg border border-gray-300 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="pendiente">Pendiente</option>
              <option value="en_proceso">En Proceso</option>
              <option value="resuelto">Resuelto</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Respuesta</label>
            <textarea
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              rows={6}
              className="w-full rounded-lg border border-gray-300 p-3 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Escribe tu respuesta aquí..."
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={onClose} type="button">
              Cancelar
            </Button>
            <Button variant="primary" type="submit" isLoading={isLoading}>
              Guardar Cambios
            </Button>
          </div>
        </form>
      </div>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type === 'error' ? 'error' : 'success'} // Fixed type mismatch
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};
