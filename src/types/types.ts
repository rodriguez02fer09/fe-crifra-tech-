export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'support' | 'client';
  createdAt: string;
}

export interface Ticket {
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
}

export interface TicketWithUser extends Ticket {
  user?: User;
}
