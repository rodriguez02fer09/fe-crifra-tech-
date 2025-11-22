import { ticketService } from '../ticketService';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock fetch globalmente
const fetchMock = vi.fn();
globalThis.fetch = fetchMock;

describe('ticketService', () => {
  beforeEach(() => {
    fetchMock.mockClear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('login', () => {
    it('should authenticate user successfully', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        name: 'Test User',
        role: 'client',
      };

      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => [mockUser],
      });

      const user = await ticketService.login('test@example.com', 'password123', 'client');

      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringContaining('/users?email=test%40example.com&password=password123&role=client')
      );
      expect(user).toEqual(mockUser);
    });

    it('should throw error when server response is not ok', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: false,
      });

      await expect(ticketService.login('test@example.com', 'password123', 'client'))
        .rejects.toThrow('Error al conectar con el servidor');
    });

    it('should throw error when credentials are incorrect (empty array)', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      });

      await expect(ticketService.login('wrong@example.com', 'wrongpass', 'client'))
        .rejects.toThrow('Email o contraseña incorrectos');
    });
  });
});
