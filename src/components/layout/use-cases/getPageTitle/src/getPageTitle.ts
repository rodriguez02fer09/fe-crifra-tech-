export const getPageTitle = (pathname: string): string => {
  switch (pathname) {
    case '/admin':
      return 'Panel Administrador';
    case '/support':
      return 'Panel Soporte';
    case '/client':
      return 'Panel Cliente';
    default:
      return '';
  }
};
