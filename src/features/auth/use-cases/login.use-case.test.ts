import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { loginUseCase } from './login.use-case';

describe('loginUseCase', () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return user on successful login', async () => {
    const mockApiResponse = [{
      id: 1,
      name: 'John Doe',
      email: 'john@test.com',
      password: 'password123',
      role: 'client',
      createdAt: '2023-01-01'
    }];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (globalThis.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => mockApiResponse
    });

    const user = await loginUseCase('john@test.com', 'password123', 'client');

    expect(user).toEqual({
      id: 1,
      name: 'John Doe',
      email: 'john@test.com',
      password: 'password123',
      role: 'client',
      createdAt: '2023-01-01'
    });
  });

  it('should throw error when credentials are invalid', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (globalThis.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => []
    });

    await expect(loginUseCase('wrong@test.com', 'wrong', 'client')).rejects.toThrow(
      'Email o contraseña incorrectos'
    );
  });

  it('should throw error when fetch fails', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (globalThis.fetch as any).mockResolvedValue({
      ok: false
    });

    await expect(loginUseCase('john@test.com', 'password123', 'client')).rejects.toThrow(
      'Error al conectar con el servidor'
    );
  });
});
