import { describe, it, expect } from 'vitest';
import { clientTicketAdapter } from './clientTicket.adapter';

describe('clientTicketAdapter', () => {
  it('should adapt api data to client ticket entity', () => {
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
      extraField: 'should be ignored'
    };

    const ticket = clientTicketAdapter(apiData);

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
      category: 'tecnico'
    });
  });
});
