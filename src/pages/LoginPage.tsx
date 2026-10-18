import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { SUPER_ADMIN_EMAIL } from '../firebase';
import { SecurityAlertModal } from '../components/common/SecurityAlertModal';
import { ShieldCheck, ArrowLeft, Loader2, Sparkles, AlertCircle } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { loginWithGoogle, user, securityAlert, clearSecurityAlert, error, clearError } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/admin';

  // Si ya es el admin autorizado, redirigir directo
  React.useEffect(() => {
    if (user && user.isSuperAdmin) {
      navigate('/admin', { replace: true });
    }
  }, [user, navigate]);

  const handleGoogleLogin = async () => {
    clearError();
    setSubmitting(true);
    try {
      const loggedUser = await loginWithGoogle();
      if (loggedUser && loggedUser.isSuperAdmin) {
        navigate(from, { replace: true });
      }
    } catch {
      // Las alertas de seguridad se controlan reactivamente mediante securityAlert
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-calido-50 via-rosa-50/40 to-vino-50/30 px-4 py-12">
      {/* Botón Volver */}
      <div className="w-full max-w-md mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-calido-700 hover:text-vino-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a la página principal
        </Link>
      </div>

      <div className="w-full max-w-md bg-white/95 rounded-3xl shadow-xl border border-vino-100 p-8 space-y-6 backdrop-blur-md">
        {/* Header con Isotipo */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-vino-900 to-vino-700 text-white shadow-soft-vino mb-2">
            <span className="font-outfit font-black text-3xl">K</span>
          </div>
          <h1 className="font-outfit font-black text-2xl text-vino-950 tracking-tight">
            Portal Administrativo
          </h1>
          <p className="text-xs text-calido-600">
            Acceso exclusivo para la dirección y gestión de Profe Kami en Pasto
          </p>
        </div>

        {/* Banner de Seguridad Informativo */}
        <div className="rounded-2xl bg-vino-50/80 border border-vino-200 p-4 space-y-2">
          <div className="flex items-center gap-2 text-vino-900 font-bold text-xs font-outfit">
            <ShieldCheck className="w-4 h-4 text-vino-700" />
            <span>Seguridad Estricta de Administrador</span>
          </div>
          <p className="text-[11px] text-calido-700 leading-relaxed">
            Por disposición de seguridad, este panel solo permite el acceso a la cuenta oficial{' '}
            <code className="px-1.5 py-0.5 rounded bg-white text-vino-900 font-semibold border border-vino-200">
              {SUPER_ADMIN_EMAIL}
            </code>.
          </p>
          <p className="text-[10px] text-calido-500 italic">
            Cualquier otro correo que intente autenticarse será expulsado y desconectado automáticamente en tiempo real.
          </p>
        </div>

        {/* Error Inline si existe */}
        {error && !securityAlert && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        {/* Botón de Autenticación con Google */}
        <div className="space-y-3 pt-2">
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={submitting}
            className="w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-2xl font-bold text-sm text-calido-900 bg-white border-2 border-calido-300 hover:border-vino-600 hover:bg-rosa-50/40 shadow-sm transition-all active:scale-98 disabled:opacity-60 disabled:cursor-not-allowed group"
          >
            {submitting ? (
              <>
                <Loader2 className="w-5 h-5 text-vino-700 animate-spin" />
                <span>Verificando permisos en Firebase...</span>
              </>
            ) : (
              <>
                {/* Google Icon SVG */}
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span className="group-hover:text-vino-900 transition-colors">
                  Continuar con Google
                </span>
              </>
            )}
          </button>
        </div>

        {/* Footer del Login */}
        <div className="pt-4 border-t border-calido-200 text-center text-[11px] text-calido-600 space-y-1">
          <p className="flex items-center justify-center gap-1">
            <Sparkles className="w-3 h-3 text-dorado-500" />
            <span>Plataforma SaaS Profe Kami | Pasto, Colombia</span>
          </p>
          <p>Autenticación directa contra Firebase Auth & Firestore Rules</p>
        </div>
      </div>

      {/* Modal estricto de Alerta si un correo no autorizado intentó ingresar */}
      <SecurityAlertModal
        isOpen={!!securityAlert}
        message={securityAlert || ''}
        onClose={clearSecurityAlert}
      />
    </div>
  );
};
