import { create } from 'zustand';
import type { Ticket } from '../types/types';

// We need to extend Ticket to include the user info since fetching with _expand=user
export interface TicketWithUser extends Ticket {
  user?: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
}

interface AdminTicketState {
  tickets: TicketWithUser[];
  isLoading: boolean;
  error: string | null;
  setTickets: (tickets: TicketWithUser[]) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useAdminTicketStore = create<AdminTicketState>((set) => ({
  tickets: [],
  isLoading: false,
  error: null,
  setTickets: (tickets) => set({ tickets }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));
