import { Link, useLocation } from 'react-router-dom';

/**
 * HeaderActions component - displays navigation links and user avatar
 */
export const HeaderActions = () => {
  const location = useLocation();

  return (
    <div className="flex items-center gap-4">
      <nav className="hidden md:flex gap-4 mr-4">
        <Link
          to="/admin"
          className={`text-sm ${location.pathname === '/admin' ? 'text-principal' : 'text-gray-300 hover:text-white'}`}
        >
          Admin
        </Link>
        <Link
          to="/support"
          className={`text-sm ${location.pathname === '/support' ? 'text-principal' : 'text-gray-300 hover:text-white'}`}
        >
          Soporte
        </Link>
        <Link
          to="/client"
          className={`text-sm ${location.pathname === '/client' ? 'text-principal' : 'text-gray-300 hover:text-white'}`}
        >
          Cliente
        </Link>
      </nav>
      <div className="h-8 w-8 rounded-full bg-principal/20 flex items-center justify-center text-principal font-bold border border-principal">
        U
      </div>
    </div>
  );
};
