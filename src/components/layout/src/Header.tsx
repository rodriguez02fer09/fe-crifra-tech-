import { Link, useLocation } from 'react-router-dom';
import { getPageTitle } from '../use-cases/getPageTitle';
import { HeaderActions } from './HeaderActions';

/**
 * Header component extracted from Layout.
 * It includes the brand link, page title, navigation links, and user avatar.
 */
export const Header = () => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-secundario shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-principal hover:text-white transition-colors">
              CIFRA TECH
            </Link>
            <span className="ml-4 rounded-md bg-white/10 px-2 py-1 text-xs font-medium text-white">
              {getPageTitle(location.pathname)}
            </span>
          </div>
          <HeaderActions />
        </div>
      </div>
    </header>
  );
};
