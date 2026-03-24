import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { authApi } from '../api/authApi';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('civic_user')); }
    catch { return null; }
  });
  const [loading, setLoading] = useState(false);

  // Listen for global logout events (e.g. 401 from interceptor)
  useEffect(() => {
    const handler = () => logout();
    window.addEventListener('auth:logout', handler);
    return () => window.removeEventListener('auth:logout', handler);
  }, []);

  const login = useCallback(async (credentials) => {
    setLoading(true);
    try {
      const { data } = await authApi.login(credentials);
      localStorage.setItem('civic_token', data.token);
      localStorage.setItem('civic_user', JSON.stringify(data.user));
      setUser(data.user);
      return data.user;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('civic_token');
    localStorage.removeItem('civic_user');
    setUser(null);
  }, []);

  const isAdmin   = user?.role === 'Admin';
  const isOfficer = user?.role === 'Officer';
  const isCitizen = user?.role === 'Citizen';

  return (
    <AuthContext.Provider value={{
      user, loading, login, logout,
      isAdmin, isOfficer, isCitizen,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};