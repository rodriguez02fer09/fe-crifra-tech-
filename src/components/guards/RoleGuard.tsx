import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useRole';

interface RoleGuardProps {
  allowedRoles: Array<'admin' | 'support' | 'client'>;
}

export const RoleGuard = ({ allowedRoles }: RoleGuardProps) => {
  const { user, isAuthenticated } = useAuth();

  // If not authenticated, redirect to login
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // If user role is not in allowed roles, show access denied or redirect
  if (!allowedRoles.includes(user.role)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-fondo">
        <div className="rounded-lg bg-white p-8 shadow-lg text-center max-w-md">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <svg
              className="h-6 w-6 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">Acceso Denegado</h3>
          <p className="mt-2 text-sm text-gray-500">
            No tienes permisos para acceder a esta sección.
          </p>
          <p className="mt-1 text-xs text-gray-400">
            Tu rol actual: <span className="font-semibold">{user.role}</span>
          </p>
          <div className="mt-6">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center rounded-md bg-principal px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-400"
            >
              Volver
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <Outlet />;
};
