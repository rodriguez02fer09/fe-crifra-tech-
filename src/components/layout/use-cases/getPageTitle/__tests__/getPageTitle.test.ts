import { getPageTitle } from '../index';

describe('getPageTitle use-case', () => {
  test('returns correct title for /admin', () => {
    expect(getPageTitle('/admin')).toBe('Panel Administrador');
  });

  test('returns correct title for /support', () => {
    expect(getPageTitle('/support')).toBe('Panel Soporte');
  });

  test('returns correct title for /client', () => {
    expect(getPageTitle('/client')).toBe('Panel Cliente');
  });

  test('returns empty string for unknown path', () => {
    expect(getPageTitle('/unknown')).toBe('');
  });

  test('returns empty string for root path', () => {
    expect(getPageTitle('/')).toBe('');
  });
});
