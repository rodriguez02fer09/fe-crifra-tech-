import { Navigate, Route, Routes } from 'react-router-dom';

import { LoginPage } from '../pages/LoginPage';
import { SupportPage } from '../pages/SupportPage';
import { AdminPage } from '../pages/AdminPage';
import { ClientPage } from '../pages/ClientPage';
import { DashboardPage } from '../pages/DashboardPage';

import { Layout } from '../components/layout/src/Layout';
import { AuthGuard } from '../components/guards/AuthGuard';
import { RoleGuard } from '../components/guards/RoleGuard';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      
      {/* Protected routes - require authentication */}
      <Route element={<AuthGuard />}>
        <Route element={<Layout />}>
          {/* Dashboard - accessible by all authenticated users */}
          <Route path="/dashboard" element={<DashboardPage />} />
          
          {/* Admin routes - only for admin role */}
          <Route element={<RoleGuard allowedRoles={['admin']} />}>
            <Route path="/admin" element={<AdminPage />} />
          </Route>
          
          {/* Support routes - only for support role */}
          <Route element={<RoleGuard allowedRoles={['support']} />}>
            <Route path="/support" element={<SupportPage />} />
          </Route>
          
          {/* Client routes - only for client role */}
          <Route element={<RoleGuard allowedRoles={['client']} />}>
            <Route path="/client" element={<ClientPage />} />
          </Route>
        </Route>
      </Route>

      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
};
