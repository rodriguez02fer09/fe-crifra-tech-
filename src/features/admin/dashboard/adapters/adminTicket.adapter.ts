import type { AdminTicket } from '../entities';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const adminTicketAdapter = (data: any): AdminTicket => {
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
    user: data.user ? {
      id: data.user.id,
      name: data.user.name,
      email: data.user.email,
    } : undefined,
  };
};
