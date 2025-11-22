import { create } from 'zustand';
import type { Ticket } from '../types/types';

interface TicketState {
  tickets: Ticket[];
  isLoading: boolean;
  error: string | null;
  setTickets: (tickets: Ticket[]) => void;
  addTicket: (ticket: Ticket) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useTicketStore = create<TicketState>((set) => ({
  tickets: [],
  isLoading: false,
  error: null,
  setTickets: (tickets) => set({ tickets }),
  addTicket: (ticket) => set((state) => ({ tickets: [...state.tickets, ticket] })),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));
