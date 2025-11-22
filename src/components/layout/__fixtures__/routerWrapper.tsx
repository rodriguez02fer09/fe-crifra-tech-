import type { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';

/**
 * Wrapper component that provides routing context for tests.
 * Accepts an optional `initialEntries` array to simulate the current path.
 */
export const RouterWrapper = ({
  children,
  initialEntries = ['/'],
}: {
  children: ReactNode;
  initialEntries?: string[];
}) => (
  <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
);
