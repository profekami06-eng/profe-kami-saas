import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Sparkles, Shield, LogIn, LogOut, LayoutDashboard } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-vino-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo & Slogan */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-vino-800 to-vino-600 flex items-center justify-center text-white shadow-soft-vino group-hover:scale-105 transition-transform">
            <span className="font-outfit font-black text-2xl tracking-tight">K</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-outfit font-extrabold text-2xl text-vino-950 tracking-tight">
                Profe Kami
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-rosa-100 text-vino-700 px-2 py-0.5 rounded-full border border-rosa-200">
                Pasto
              </span>
            </div>
            <span className="text-xs font-medium text-calido-600 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-dorado-500" />
              La matemática es un juego
            </span>
          </div>
        </Link>

        {/* Navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-calido-800">
          <Link to="/" className="hover:text-vino-700 transition-colors">
            Inicio
          </Link>
          <a href="/#metodologia" className="hover:text-vino-700 transition-colors">
            Metodología Lúdica
          </a>
          <a href="/#inscripcion" className="hover:text-vino-700 transition-colors">
            Admisiones & Matrícula
          </a>
          <a href="/#legal" className="hover:text-vino-700 transition-colors flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 text-vino-600" />
            Marco Legal SIC
          </a>
        </nav>

        {/* Action Button: Portal Admin */}
        <div className="flex items-center gap-3">
          {user && user.isSuperAdmin ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/admin')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-vino-900 bg-rosa-100 hover:bg-rosa-200 border border-rosa-200 transition-all shadow-sm"
              >
                <LayoutDashboard className="w-4 h-4 text-vino-700" />
                <span className="hidden sm:inline">Panel Admin</span>
              </button>
              <button
                onClick={() => logout()}
                title="Cerrar sesión"
                className="p-2 rounded-xl text-calido-600 hover:text-vino-700 hover:bg-calido-100 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-vino-800 to-vino-600 hover:from-vino-900 hover:to-vino-700 transition-all shadow-md hover:shadow-glow-vino active:scale-95"
            >
              <LogIn className="w-4 h-4" />
              <span>Acceso Administrativo</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
