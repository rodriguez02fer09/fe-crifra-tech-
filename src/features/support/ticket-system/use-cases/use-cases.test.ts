import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getAssignedTicketsUseCase } from './getAssignedTickets.use-case';
import { updateTicketUseCase } from './updateTicket.use-case';

describe('Support Ticket Use Cases', () => {
  const mockTicket = {
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
  };

  beforeEach(() => {
    globalThis.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getAssignedTicketsUseCase', () => {
    it('should return tickets on success', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (globalThis.fetch as any).mockResolvedValue({
        ok: true,
        json: async () => [mockTicket]
      });

      const tickets = await getAssignedTicketsUseCase(202);

      expect(tickets).toHaveLength(1);
      expect(tickets[0]).toEqual(mockTicket);
      expect(globalThis.fetch).toHaveBeenCalledWith(
        expect.stringContaining('assignedTo=202')
      );
    });

    it('should throw error on failure', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (globalThis.fetch as any).mockResolvedValue({
        ok: false
      });

      await expect(getAssignedTicketsUseCase(202))
        .rejects.toThrow('Error al obtener los tickets asignados');
    });
  });

  describe('updateTicketUseCase', () => {
    it('should return updated ticket on success', async () => {
      const updates = { status: 'resuelto' as const, response: 'Fixed' };
      const updatedTicket = { ...mockTicket, ...updates };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (globalThis.fetch as any).mockResolvedValue({
        ok: true,
        json: async () => updatedTicket
      });

      const result = await updateTicketUseCase(1, updates);

      expect(result).toEqual(updatedTicket);
      expect(globalThis.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/tickets/1'),
        expect.objectContaining({
          method: 'PATCH',
          body: expect.stringContaining('"status":"resuelto"')
        })
      );
    });

    it('should throw error on failure', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (globalThis.fetch as any).mockResolvedValue({
        ok: false
      });

      await expect(updateTicketUseCase(1, { status: 'resuelto' }))
        .rejects.toThrow('Error al actualizar el ticket');
    });
  });
});
