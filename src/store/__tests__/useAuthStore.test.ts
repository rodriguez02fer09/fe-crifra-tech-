import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { useAuthStore } from '../useAuthStore';

describe('useAuthStore', () => {
  beforeEach(() => {
    // Limpiar el estado antes de cada test
    const { result } = renderHook(() => useAuthStore());
    act(() => {
      result.current.clearUser();
    });
    sessionStorage.clear();
  });

  it('should have initial state null', () => {
    const { result } = renderHook(() => useAuthStore());
    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated()).toBe(false);
  });

  it('should set user and update authentication status', () => {
    const { result } = renderHook(() => useAuthStore());
    const mockUser = {
      id: 1,
      email: 'test@example.com',
      name: 'Test User',
      role: 'client' as const,
      password: 'password123',
      createdAt: new Date().toISOString(),
    };

    act(() => {
      result.current.setUser(mockUser);
    });

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.isAuthenticated()).toBe(true);
  });

  it('should clear user and update authentication status', () => {
    const { result } = renderHook(() => useAuthStore());
    const mockUser = {
      id: 1,
      email: 'test@example.com',
      name: 'Test User',
      role: 'client' as const,
      password: 'password123',
      createdAt: new Date().toISOString(),
    };

    act(() => {
      result.current.setUser(mockUser);
    });

    expect(result.current.isAuthenticated()).toBe(true);

    act(() => {
      result.current.clearUser();
    });

    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated()).toBe(false);
  });

  it('should persist user in sessionStorage', () => {
    const { result } = renderHook(() => useAuthStore());
    const mockUser = {
      id: 1,
      email: 'test@example.com',
      name: 'Test User',
      role: 'client' as const,
      password: 'password123',
      createdAt: new Date().toISOString(),
    };

    act(() => {
      result.current.setUser(mockUser);
    });

    const storedData = sessionStorage.getItem('auth-storage');
    expect(storedData).toBeTruthy();
    expect(JSON.parse(storedData!).state.user).toEqual(mockUser);
  });
});
