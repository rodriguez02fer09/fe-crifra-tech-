import { useState } from 'react';
import type { User } from '../entities';
import { loginUseCase } from '../use-cases/login.use-case';

export const useLogin = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string, role: string) => {
    setLoading(true);
    setError(null);
    try {
      const loggedUser = await loginUseCase(email, password, role);
      setUser(loggedUser);
      return loggedUser;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, error, login };
};
