import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AppShell from '../components/layout/AppShell';

// Pages
import LoginPage       from '../pages/LoginPage';
import DashboardPage   from '../pages/DashboardPage';
import ComplaintsPage  from '../pages/ComplaintsPage';
import LicensingPage   from '../pages/LicensingPage';
import AnalyticsPage   from '../pages/AnalyticsPage';
import ActivityPage    from '../pages/ActivityFeedPage';
import UsersPage       from '../pages/UsersPage';
import SettingsPage    from '../pages/SettingsPage';

function Guard({ children, roles }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/dashboard" replace />;
  return children;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Guard><AppShell /></Guard>}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="complaints" element={<ComplaintsPage />} />
          <Route path="complaints/:id" element={<ComplaintsPage />} />
          <Route path="licensing" element={<LicensingPage />} />
          <Route path="licensing/:id" element={<LicensingPage />} />
          <Route path="analytics" element={<Guard roles={['Officer','Admin']}><AnalyticsPage /></Guard>} />
          <Route path="activity" element={<Guard roles={['Officer','Admin']}><ActivityPage /></Guard>} />
          <Route path="users" element={<Guard roles={['Admin']}><UsersPage /></Guard>} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}