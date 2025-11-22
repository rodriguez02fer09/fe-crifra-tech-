import { useState } from 'react';

// Mock Data
const MOCK_TICKETS = [
  {
    id: 'T-1001',
    subject: 'Error al iniciar sesión',
    customer: 'Juan Pérez',
    status: 'open',
    date: '2023-11-20',
    priority: 'high',
    description: 'No puedo acceder a mi cuenta, me sale error 500.',
    messages: [
      { sender: 'Juan Pérez', text: 'Hola, no puedo entrar a mi cuenta.', date: '2023-11-20 10:00' }
    ]
  },
  {
    id: 'T-1002',
    subject: 'Duda sobre facturación',
    customer: 'Empresa ABC',
    status: 'in_progress',
    date: '2023-11-19',
    priority: 'medium',
    description: 'Necesito la factura del mes pasado.',
    messages: [
      { sender: 'Empresa ABC', text: '¿Dónde descargo la factura?', date: '2023-11-19 14:30' },
      { sender: 'Soporte', text: 'Hola, puedes descargarla en la sección de Pagos.', date: '2023-11-19 15:00' }
    ]
  },
  {
    id: 'T-1003',
    subject: 'Solicitud de nueva funcionalidad',
    customer: 'Ana Gómez',
    status: 'closed',
    date: '2023-11-18',
    priority: 'low',
    description: 'Me gustaría que agregaran modo oscuro.',
    messages: [
      { sender: 'Ana Gómez', text: 'Sería genial tener modo oscuro.', date: '2023-11-18 09:15' },
      { sender: 'Soporte', text: 'Gracias por la sugerencia, lo tendremos en cuenta.', date: '2023-11-18 11:00' }
    ]
  },
];

export const SupportPage = () => {
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [tickets, setTickets] = useState(MOCK_TICKETS);
  const [response, setResponse] = useState('');


  const selectedTicket = tickets.find(t => t.id === selectedTicketId);

  const handleStatusChange = (ticketId: string, newStatus: string) => {
    setTickets(prev => prev.map(t => 
      t.id === ticketId ? { ...t, status: newStatus } : t
    ));
  };

  const handleSendResponse = () => {
    if (!selectedTicket || !response.trim()) return;
    
    const newMessage = {
      sender: 'Soporte',
      text: response,
      date: new Date().toLocaleString()
    };

    setTickets(prev => prev.map(t => 
      t.id === selectedTicket.id 
        ? { ...t, messages: [...t.messages, newMessage] } 
        : t
    ));
    
    setResponse('');
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
    <div className="min-h-screen bg-fondo font-sans text-texto">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-secundario shadow-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-principal">CIFRA TECH</span>
              <span className="ml-4 rounded-md bg-white/10 px-2 py-1 text-xs font-medium text-white">Panel Soporte</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-300">Agente Soporte</span>
              <div className="h-8 w-8 rounded-full bg-principal/20 flex items-center justify-center text-principal font-bold border border-principal">
                S
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row h-[calc(100vh-8rem)]">
          
          {/* Ticket List */}
          <div className="w-full lg:w-1/3 flex flex-col rounded-xl bg-white shadow-sm overflow-hidden">
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="text-lg font-medium text-texto">Solicitudes Asignadas</h2>
            </div>
            <div className="flex-1 overflow-y-auto">
              <ul className="divide-y divide-gray-200">
                {tickets.map((ticket) => (
                  <li 
                    key={ticket.id} 
                    className={`cursor-pointer p-4 hover:bg-gray-50 transition-colors ${selectedTicketId === ticket.id ? 'bg-blue-50' : ''}`}
                    onClick={() => setSelectedTicketId(ticket.id)}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-xs font-bold text-gray-500">{ticket.id}</span>
                      <span className="text-xs text-gray-400">{ticket.date}</span>
                    </div>
                    <h3 className="text-sm font-bold text-texto mb-1">{ticket.subject}</h3>
                    <p className="text-xs text-gray-600 mb-2">{ticket.customer}</p>
                    <div className="flex justify-between items-center">
                      {getStatusBadge(ticket.status)}
                      <span className={`text-xs font-medium ${
                        ticket.priority === 'high' ? 'text-rechazado' : 
                        ticket.priority === 'medium' ? 'text-pendiente' : 'text-aprobado'
                      }`}>
                        {ticket.priority === 'high' ? 'Alta' : ticket.priority === 'medium' ? 'Media' : 'Baja'}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Ticket Detail */}
          <div className="w-full lg:w-2/3 flex flex-col rounded-xl bg-white shadow-sm overflow-hidden">
            {selectedTicket ? (
              <>
                {/* Detail Header */}
                <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center bg-gray-50">
                  <div>
                    <h2 className="text-xl font-bold text-texto">{selectedTicket.subject}</h2>
                    <p className="text-sm text-gray-500">Cliente: {selectedTicket.customer} | ID: {selectedTicket.id}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700">Estado:</label>
                    <select 
                      value={selectedTicket.status}
                      onChange={(e) => handleStatusChange(selectedTicket.id, e.target.value)}
                      className="rounded-md border-gray-300 text-sm focus:border-principal focus:ring-principal"
                    >
                      <option value="open">Abierto</option>
                      <option value="in_progress">En Proceso</option>
                      <option value="closed">Cerrado</option>
                    </select>
                  </div>
                </div>

                {/* Ticket Details Body */}
                <div className="flex-1 overflow-y-auto bg-gray-50/50 p-6">
                  {/* Description Section */}
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wide">Descripción del Problema</h3>
                    <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                      {selectedTicket.description}
                    </div>
                  </div>

                  {/* Responses Section */}
                  <div className="mt-6 space-y-6">
                    {selectedTicket.messages.length > 0 && (
                      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide px-1">Respuestas</h3>
                    )}
                    {selectedTicket.messages.map((msg, idx) => (
                      <div key={idx} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-bold text-gray-900">{msg.sender}</span>
                          <span className="text-xs text-gray-500">{msg.date}</span>
                        </div>
                        <p className="text-sm text-gray-700">{msg.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Response Area */}
                <div className="border-t border-gray-200 p-6 bg-white">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Agregar Respuesta</label>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-principal/20 flex items-center justify-center text-principal font-bold border border-principal">
                      S
                    </div>
                    <div className="flex-1">
                      <textarea
                        rows={3}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-principal sm:text-sm sm:leading-6"
                        placeholder="Escribe una respuesta..."
                        value={response}
                        onChange={(e) => setResponse(e.target.value)}
                      />
                      <div className="mt-3 flex justify-end">
                        <button
                          onClick={handleSendResponse}
                          className="inline-flex justify-center rounded-md bg-principal px-4 py-2 text-sm font-semibold text-secundario shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-principal"
                        >
                          Enviar Respuesta
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-400 flex-col bg-gray-50">
                <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <svg className="h-8 w-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <p className="text-sm font-medium">Selecciona una solicitud para ver los detalles</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
