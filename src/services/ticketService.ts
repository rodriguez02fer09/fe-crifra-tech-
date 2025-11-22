import type { User, Ticket } from '../types/types';

const API_BASE_URL = 'http://localhost:3001';

export const ticketService = {
  /**
   * Authenticate user with email and password
   * @throws Error if credentials are incorrect
   */
  async login(email: string, password: string, role: string): Promise<User> {
    const response = await fetch(
      `${API_BASE_URL}/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}&role=${encodeURIComponent(role)}`
    );

    if (!response.ok) {
      throw new Error('Error al conectar con el servidor');
    }

    const users: User[] = await response.json();

    if (users.length === 0) {
      throw new Error('Email o contraseña incorrectos');
    }

    return users[0];
  },

  /**
   * Get all tickets with user information (Admin only)
   */
  async getAllTickets(): Promise<Ticket[]> {
    const response = await fetch(`${API_BASE_URL}/tickets?_expand=user`);

    if (!response.ok) {
      throw new Error('Error al obtener los tickets');
    }

    return response.json();
  },

  /**
   * Get tickets created by a specific user (Client)
   */
  async getMyTickets(userId: number): Promise<Ticket[]> {
    const response = await fetch(`${API_BASE_URL}/tickets?userId=${userId}`);

    if (!response.ok) {
      throw new Error('Error al obtener tus tickets');
    }

    return response.json();
  },

  /**
   * Get tickets assigned to a support agent (Support)
   */
  async getAssignedTickets(supportId: number): Promise<Ticket[]> {
    const response = await fetch(
      `${API_BASE_URL}/tickets?assignedTo=${supportId}&status_ne=resuelto`
    );

    if (!response.ok) {
      throw new Error('Error al obtener los tickets asignados');
    }

    return response.json();
  },

  /**
   * Get dashboard data filtered by user role
   */
  async getUserDashboardData(user: User): Promise<Ticket[]> {
    switch (user.role) {
      case 'admin':
        return this.getAllTickets();
      case 'support':
        return this.getAssignedTickets(user.id);
      case 'client':
        return this.getMyTickets(user.id);
      default:
        throw new Error('Rol de usuario no válido');
    }
  },

  /**
   * Create a new ticket
   */
  /**
   * Create a new ticket
   */
  async createTicket(ticket: Omit<Ticket, 'id' | 'date' | 'updatedAt' | 'status' | 'response' | 'assignedTo'>): Promise<Ticket> {
    const newTicket = {
      ...ticket,
      status: 'pendiente',
      response: '',
      assignedTo: null,
      date: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const response = await fetch(`${API_BASE_URL}/tickets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTicket),
    });

    if (!response.ok) {
      throw new Error('Error al crear el ticket');
    }

    return response.json();
  },

  /**
   * Update an existing ticket
   */
  async updateTicket(id: number, updates: Partial<Ticket>): Promise<Ticket> {
    const response = await fetch(`${API_BASE_URL}/tickets/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...updates,
        updatedAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error('Error al actualizar el ticket');
    }

    return response.json();
  },
};
