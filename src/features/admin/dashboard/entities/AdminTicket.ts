export interface AdminTicket {
  id: number;
  title: string;
  description: string;
  userId: number;
  assignedTo: number | null;
  status: 'pendiente' | 'en_proceso' | 'resuelto';
  priority: 'baja' | 'media' | 'alta';
  date: string;
  updatedAt: string;
  response: string;
  category:
    | 'autenticacion'
    | 'pagos'
    | 'facturacion'
    | 'tecnico'
    | 'consultas'
    | 'configuracion';
  user?: {
    id: number;
    name: string;
    email: string;
  };
}

export interface TicketStats {
  total: number;
  pending: number;
  inProgress: number;
  resolved: number;
}
