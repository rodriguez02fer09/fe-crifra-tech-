import { describe, it, expect } from 'vitest';
import { authAdapter } from './auth.adapter';

describe('authAdapter', () => {
  it('should adapt api data to user entity', () => {
    const apiData = {
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      role: 'admin',
      createdAt: '2023-01-01',
      extraField: 'should be ignored'
    };

    const user = authAdapter(apiData);

    expect(user).toEqual({
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      role: 'admin',
      createdAt: '2023-01-01'
    });
  });
});
