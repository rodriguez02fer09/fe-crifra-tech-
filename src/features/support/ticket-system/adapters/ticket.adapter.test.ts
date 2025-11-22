import { describe, it, expect } from 'vitest';
import { ticketAdapter } from './ticket.adapter';

describe('ticketAdapter', () => {
  it('should adapt api data to support ticket entity', () => {
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

    const ticket = ticketAdapter(apiData);

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
