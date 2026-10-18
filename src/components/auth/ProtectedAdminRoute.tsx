import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { SUPER_ADMIN_EMAIL } from '../../firebase';
import { ShieldAlert, Loader2 } from 'lucide-react';

interface ProtectedAdminRouteProps {
  children?: React.ReactNode;
}

export const ProtectedAdminRoute: React.FC<ProtectedAdminRouteProps> = ({ children }) => {
  const { user, loading, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // Verificación preventiva activa
    if (user && user.email?.toLowerCase().trim() !== SUPER_ADMIN_EMAIL) {
      console.warn(`[Security Alert] Sesión no autorizada detectada (${user.email}). Expulsando de inmediato...`);
      logout();
    }
  }, [user, logout]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-calido-50 text-vino-950 p-4">
        <div className="relative flex items-center justify-center mb-4">
          <div className="w-16 h-16 rounded-full border-4 border-rosa-200 border-t-vino-700 animate-spin" />
          <Loader2 className="w-6 h-6 text-vino-700 absolute animate-pulse" />
        </div>
        <p className="text-sm font-semibold font-outfit text-vino-900 tracking-wide">
          Verificando credenciales de seguridad Profe Kami...
        </p>
        <p className="text-xs text-calido-600 mt-1">
          Validando privilegios de Super Administrador (/admin)
        </p>
      </div>
    );
  }

  // Si no hay usuario autenticado, redirigir al login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si el usuario no es el Super Administrador oficial, denegar y expulsar
  if (user.email?.toLowerCase().trim() !== SUPER_ADMIN_EMAIL) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-calido-50">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border-2 border-vino-600 p-6 text-center space-y-4">
          <div className="mx-auto w-12 h-12 bg-vino-100 text-vino-700 rounded-full flex items-center justify-center">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <h2 className="text-lg font-bold font-outfit text-vino-950">Acceso Restringido</h2>
          <p className="text-xs text-calido-700">
            El correo <strong className="text-vino-800">{user.email}</strong> no tiene permisos de Super Administrador. Tu sesión ha sido revocada automáticamente.
          </p>
          <Navigate to="/login" replace />
        </div>
      </div>
    );
  }

  return children ? <>{children}</> : null;
};
