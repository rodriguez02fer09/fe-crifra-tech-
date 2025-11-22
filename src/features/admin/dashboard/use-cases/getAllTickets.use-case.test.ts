import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getAllTicketsUseCase } from './getAllTickets.use-case';

describe('getAllTicketsUseCase', () => {
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
    category: 'tecnico',
    user: {
      id: 101,
      name: 'John Doe',
      email: 'john@test.com'
    }
  };

  beforeEach(() => {
    globalThis.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return all tickets with user data on success', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (globalThis.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => [mockTicket]
    });

    const tickets = await getAllTicketsUseCase();

    expect(tickets).toHaveLength(1);
    expect(tickets[0]).toEqual(mockTicket);
    expect(globalThis.fetch).toHaveBeenCalledWith(
      expect.stringContaining('?_expand=user')
    );
  });

  it('should throw error on failure', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (globalThis.fetch as any).mockResolvedValue({
      ok: false
    });

    await expect(getAllTicketsUseCase())
      .rejects.toThrow('Error al obtener los tickets');
  });
});
