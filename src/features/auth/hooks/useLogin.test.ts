import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { useLogin } from './useLogin';
import * as LoginUseCaseModule from '../use-cases/login.use-case';

describe('useLogin', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should handle successful login', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mockUser = { id: 1, name: 'Test', email: 'test@test.com', role: 'admin', createdAt: '2023-01-01' } as any;
    vi.spyOn(LoginUseCaseModule, 'loginUseCase').mockResolvedValue(mockUser);

    const { result } = renderHook(() => useLogin());

    await act(async () => {
      await result.current.login('test@test.com', 'pass', 'admin');
    });

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('should handle login error', async () => {
    vi.spyOn(LoginUseCaseModule, 'loginUseCase').mockRejectedValue(new Error('Login failed'));

    const { result } = renderHook(() => useLogin());

    await act(async () => {
      try {
        await result.current.login('test@test.com', 'pass', 'admin');
      } catch {
        // Expected error
      }
    });

    expect(result.current.user).toBe(null);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Login failed');
  });
});
