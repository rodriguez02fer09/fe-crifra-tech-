import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useRole';
import { useAuthStore } from '../../../store/useAuthStore';

/**
 * HeaderActions component - displays navigation links, user info, and logout
 */
export const HeaderActions = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const clearUser = useAuthStore((state) => state.clearUser);

  const handleLogout = () => {
    clearUser();
    navigate('/login');
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'support':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'client':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Administrador';
      case 'support':
        return 'Soporte';
      case 'client':
        return 'Cliente';
      default:
        return role;
    }
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="flex items-center gap-4">
        <Link
          to="/login"
          className="text-sm text-gray-300 hover:text-white transition-colors"
        >
          Iniciar Sesión
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      

      {/* User info */}
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex flex-col items-end">
          <span className="text-sm font-medium text-white">{user.name}</span>
          <span
            className={`text-xs px-2 py-0.5 rounded-full border ${getRoleBadgeColor(user.role)}`}
          >
            {getRoleLabel(user.role)}
          </span>
        </div>

        <div className="h-8 w-8 rounded-full bg-principal/20 flex items-center justify-center text-principal font-bold border border-principal">
          {user.name.charAt(0).toUpperCase()}
        </div>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="text-sm text-gray-300 hover:text-white transition-colors"
          title="Cerrar Sesión"
        >
          Salir
        </button>
      </div>
    </div>
  );
};
