export interface User {
  id: number;
  name: string;
  email: string;
  password: string; // Password might not be needed in the frontend entity after login, but keeping it for now to match types.ts
  role: 'admin' | 'support' | 'client';
  createdAt: string;
}
