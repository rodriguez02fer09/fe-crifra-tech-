import type { User } from '../entities';
import { authAdapter } from '../adapters/auth.adapter';

const API_BASE_URL = 'http://localhost:3001';

export const loginUseCase = async (email: string, password: string, role: string): Promise<User> => {
  const response = await fetch(
    `${API_BASE_URL}/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}&role=${encodeURIComponent(role)}`
  );

  if (!response.ok) {
    throw new Error('Error al conectar con el servidor');
  }

  const users = await response.json();

  if (users.length === 0) {
    throw new Error('Email o contraseña incorrectos');
  }

  return authAdapter(users[0]);
};
