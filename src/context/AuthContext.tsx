import React, { createContext, useContext, useEffect, useState, useTransition } from 'react';
import type { AdminUser, AuthState } from '../types/auth';
import { 
  signInWithGoogleAdmin, 
  signOutAdmin, 
  subscribeToAuthChanges, 
  UnauthorizedAdminError 
} from '../services/authService';

interface AuthContextType extends AuthState {
  loginWithGoogle: () => Promise<AdminUser>;
  logout: () => Promise<void>;
  securityAlert: string | null;
  clearSecurityAlert: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [securityAlert, setSecurityAlert] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  useEffect(() => {
    // Suscripción reactiva al listener con expulsión inmediata para correos no autorizados
    const unsubscribe = subscribeToAuthChanges(
      (validUser) => {
        startTransition(() => {
          setUser(validUser);
          setLoading(false);
        });
      },
      (unauthorizedEmail) => {
        startTransition(() => {
          setUser(null);
          setLoading(false);
          setSecurityAlert(
            `ACCESO DENEGADO POR SEGURIDAD: El correo "${unauthorizedEmail}" no cuenta con privilegios de Super Administrador de Profe Kami. La sesión ha sido revocada de forma inmediata y automática.`
          );
        });
      }
    );

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async (): Promise<AdminUser> => {
    setError(null);
    setLoading(true);
    try {
      const adminUser = await signInWithGoogleAdmin();
      setUser(adminUser);
      setLoading(false);
      return adminUser;
    } catch (err: any) {
      setLoading(false);
      if (err instanceof UnauthorizedAdminError) {
        setSecurityAlert(err.message);
        setError(err.message);
      } else {
        setError(err.message || 'Error al autenticarse con Google');
      }
      throw err;
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOutAdmin();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const clearSecurityAlert = () => setSecurityAlert(null);
  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        rawUser: null,
        loading,
        error,
        securityAlert,
        loginWithGoogle,
        logout,
        clearSecurityAlert,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
  }
  return context;
}
