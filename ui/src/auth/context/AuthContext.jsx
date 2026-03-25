import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { fetchProfile, loginUser, registerUser } from '../services/authService';
import { clearAuth, getStoredToken, getStoredUser, storeAuth } from '../utils/authStorage';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(getStoredToken());
  const [user, setUser] = useState(getStoredUser());
  const [loading, setLoading] = useState(Boolean(getStoredToken()));

  useEffect(() => {
    const hydrateProfile = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const profile = await fetchProfile();
        setUser(profile);
      } catch {
        clearAuth();
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    hydrateProfile();
  }, [token]);

  const login = async (payload) => {
    const data = await loginUser(payload);
    const mappedUser = {
      id: data.id,
      name: data.name,
      email: data.email
    };

    storeAuth({ token: data.token, user: mappedUser });
    setToken(data.token);
    setUser(mappedUser);
    return mappedUser;
  };

  const register = async (payload) => {
    const data = await registerUser(payload);
    const mappedUser = {
      id: data.id,
      name: data.name,
      email: data.email
    };

    storeAuth({ token: data.token, user: mappedUser });
    setToken(data.token);
    setUser(mappedUser);
    return mappedUser;
  };

  const logout = () => {
    clearAuth();
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      token,
      user,
      loading,
      isAuthenticated: Boolean(token),
      login,
      register,
      logout
    }),
    [token, user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
