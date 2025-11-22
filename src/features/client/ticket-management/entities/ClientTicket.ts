export interface ClientTicket {
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
