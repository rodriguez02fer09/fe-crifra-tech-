import { create } from 'zustand';
import type { Ticket } from '../types/types';

interface SupportTicketState {
  assignedTickets: Ticket[];
  isLoading: boolean;
  error: string | null;
  setAssignedTickets: (tickets: Ticket[]) => void;
  updateSingleTicket: (updatedTicket: Ticket) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useSupportTicketStore = create<SupportTicketState>((set) => ({
  assignedTickets: [],
  isLoading: false,
  error: null,
  setAssignedTickets: (tickets) => set({ assignedTickets: tickets }),
  updateSingleTicket: (updatedTicket) =>
    set((state) => {
      if (updatedTicket.status === 'resuelto') {
        return {
          assignedTickets: state.assignedTickets.filter(
            (ticket) => ticket.id !== updatedTicket.id
          ),
        };
      }
      return {
        assignedTickets: state.assignedTickets.map((ticket) =>
          ticket.id === updatedTicket.id ? updatedTicket : ticket
        ),
      };
    }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));
