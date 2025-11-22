import type { SupportTicket } from '../entities';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ticketAdapter = (data: any): SupportTicket => {
  return {
    id: data.id,
    title: data.title,
    description: data.description,
    userId: data.userId,
    assignedTo: data.assignedTo,
    status: data.status,
    priority: data.priority,
    date: data.date,
    updatedAt: data.updatedAt,
    response: data.response,
    category: data.category,
  };
};
