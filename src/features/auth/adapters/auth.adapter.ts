import type { User } from '../entities';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const authAdapter = (data: any): User => {
  return {
    id: data.id,
    name: data.name,
    email: data.email,
    role: data.role,
    createdAt: data.createdAt,
    // We might want to exclude password here if it's not needed in the UI
    password: data.password
  };
};
