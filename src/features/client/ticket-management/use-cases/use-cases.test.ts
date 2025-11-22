import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getMyTicketsUseCase } from './getMyTickets.use-case';
import { createTicketUseCase } from './createTicket.use-case';

describe('Client Ticket Use Cases', () => {
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

  describe('getMyTicketsUseCase', () => {
    it('should return tickets on success', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (globalThis.fetch as any).mockResolvedValue({
        ok: true,
        json: async () => [mockTicket]
      });

      const tickets = await getMyTicketsUseCase(101);

      expect(tickets).toHaveLength(1);
      expect(tickets[0]).toEqual(mockTicket);
      expect(globalThis.fetch).toHaveBeenCalledWith(
        expect.stringContaining('userId=101')
      );
    });

    it('should throw error on failure', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (globalThis.fetch as any).mockResolvedValue({
        ok: false
      });

      await expect(getMyTicketsUseCase(101))
        .rejects.toThrow('Error al obtener tus tickets');
    });
  });

  describe('createTicketUseCase', () => {
    it('should return created ticket on success', async () => {
      const newTicketData = {
        title: 'New Ticket',
        description: 'New Description',
        userId: 101,
        priority: 'alta' as const,
        category: 'tecnico' as const
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (globalThis.fetch as any).mockResolvedValue({
        ok: true,
        json: async () => ({ ...newTicketData, ...mockTicket })
      });

      const result = await createTicketUseCase(newTicketData);

      expect(result).toBeDefined();
      expect(globalThis.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/tickets'),
        expect.objectContaining({
          method: 'POST'
        })
      );
    });

    it('should throw error on failure', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (globalThis.fetch as any).mockResolvedValue({
        ok: false
      });

      await expect(createTicketUseCase({
        title: 'Test',
        description: 'Test',
        userId: 101,
        priority: 'alta',
        category: 'tecnico'
      })).rejects.toThrow('Error al crear el ticket');
    });
  });
});
