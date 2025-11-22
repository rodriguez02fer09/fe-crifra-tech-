import { useEffect } from 'react';
import { useAdminDashboard } from '../hooks/useAdminDashboard';
import { AdminDashboardView } from '../components/AdminDashboardView';

export const AdminDashboard = () => {
  const { tickets, isLoading, error, loadTickets, getStats } = useAdminDashboard();

  useEffect(() => {
    loadTickets();
  }, [loadTickets]);

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700">
        <p className="font-bold">Error</p>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <AdminDashboardView
      tickets={tickets}
      stats={getStats()}
    />
  );
};
