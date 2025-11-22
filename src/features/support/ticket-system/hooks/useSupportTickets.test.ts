import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { useSupportTickets } from './useSupportTickets';
import * as GetUseCase from '../use-cases/getAssignedTickets.use-case';
import * as UpdateUseCase from '../use-cases/updateTicket.use-case';
import type { SupportTicket } from '../entities';

describe('useSupportTickets', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should load tickets', async () => {
    const mockTickets: SupportTicket[] = [{ 
      id: 1, 
      title: 'Test',
      description: '',
      userId: 1,
      assignedTo: 2,
      status: 'pendiente',
      priority: 'alta',
      date: '',
      updatedAt: '',
      response: '',
      category: 'tecnico'
    }];
    vi.spyOn(GetUseCase, 'getAssignedTicketsUseCase').mockResolvedValue(mockTickets);

    const { result } = renderHook(() => useSupportTickets());

    await act(async () => {
      await result.current.loadTickets(1);
    });

    expect(result.current.tickets).toEqual(mockTickets);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('should handle load error', async () => {
    vi.spyOn(GetUseCase, 'getAssignedTicketsUseCase').mockRejectedValue(new Error('Load failed'));

    const { result } = renderHook(() => useSupportTickets());

    await act(async () => {
      await result.current.loadTickets(1);
    });

    expect(result.current.tickets).toEqual([]);
    expect(result.current.error).toBe('Load failed');
  });

  it('should update ticket', async () => {
    const initialTickets: SupportTicket[] = [{ 
      id: 1, 
      title: 'Old', 
      status: 'pendiente',
      description: '',
      userId: 1,
      assignedTo: 2,
      priority: 'alta',
      date: '',
      updatedAt: '',
      response: '',
      category: 'tecnico'
    }];
    
    const updatedTicket: SupportTicket = { ...initialTickets[0], status: 'resuelto' };
    
    vi.spyOn(GetUseCase, 'getAssignedTicketsUseCase').mockResolvedValue(initialTickets);
    vi.spyOn(UpdateUseCase, 'updateTicketUseCase').mockResolvedValue(updatedTicket);

    const { result } = renderHook(() => useSupportTickets());

    // Initial load
    await act(async () => {
      await result.current.loadTickets(1);
    });

    // Update
    await act(async () => {
      await result.current.updateTicket(1, { status: 'resuelto' });
    });

    expect(result.current.tickets[0]).toEqual(updatedTicket);
  });
});
