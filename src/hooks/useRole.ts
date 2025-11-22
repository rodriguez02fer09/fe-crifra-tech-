import { useAuthStore } from '../store/useAuthStore';

export const useRole = () => {
  const user = useAuthStore((state) => state.user);
  return user?.role;
};

export const useAuth = () => {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated());
  
  return {
    user,
    isAuthenticated,
    role: user?.role,
  };
};
