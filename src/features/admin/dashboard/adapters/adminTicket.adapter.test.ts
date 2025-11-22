import { describe, it, expect } from 'vitest';
import { adminTicketAdapter } from './adminTicket.adapter';

describe('adminTicketAdapter', () => {
  it('should adapt api data to admin ticket entity with user', () => {
    const apiData = {
      id: 1,
      title: 'Test Ticket',
      description: 'Test Description',
      userId: 101,
      assignedTo: 202,
      status: 'pendiente',
      priority: 'alta',
      date: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-02T00:00:00.000Z',
      response: '',
      category: 'tecnico',
      user: {
        id: 101,
        name: 'John Doe',
        email: 'john@example.com',
        password: 'secret'
      },
      extraField: 'should be ignored'
    };

    const ticket = adminTicketAdapter(apiData);

    expect(ticket).toEqual({
      id: 1,
      title: 'Test Ticket',
      description: 'Test Description',
      userId: 101,
      assignedTo: 202,
      status: 'pendiente',
      priority: 'alta',
      date: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-02T00:00:00.000Z',
      response: '',
      category: 'tecnico',
      user: {
        id: 101,
        name: 'John Doe',
        email: 'john@example.com'
      }
    });
  });

  it('should handle missing user data', () => {
    const apiData = {
      id: 1,
      title: 'Test',
      description: 'Desc',
      userId: 101,
      assignedTo: null,
      status: 'pendiente',
      priority: 'baja',
      date: '2023-01-01',
      updatedAt: '2023-01-01',
      response: '',
      category: 'consultas'
    };

    const ticket = adminTicketAdapter(apiData);
    expect(ticket.user).toBeUndefined();
  });
});
