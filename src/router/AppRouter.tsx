import { Navigate, Route, Routes, Outlet } from 'react-router-dom';

import { LoginPage } from '../pages/LoginPage';
import { SupportPage } from '../pages/SupportPage';
import { AdminPage } from '../pages/AdminPage';
import { ClientPage } from '../pages/ClientPage';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      
      <Route element={<Outlet />}>
        <Route path="/support" element={<SupportPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/client" element={<ClientPage />} />
      </Route>

      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
};
