import React from 'react';
import { Menu, Bell, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import type { AdminModule } from './Sidebar';

const MODULE_LABELS: Record<AdminModule, string> = {
  hoy: 'Hoy',
  agenda: 'Mi Agenda',
  finanzas: 'Finanzas',
  estudiantes: 'Estudiantes',
  servicios: 'Servicios',
  reportes: 'Reportes',
  ajustes: 'Ajustes',
};

interface TopBarProps {
  activeModule: AdminModule;
  onMenuToggle: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ activeModule, onMenuToggle }) => {
  const { user } = useAuth();

  return (
    <header className="h-16 bg-white border-b border-calido-200 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-20 shadow-sm">
      {/* Izquierda: Toggle menú + Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="lg:hidden w-9 h-9 rounded-xl border border-calido-200 hover:bg-calido-100 flex items-center justify-center transition-colors cursor-pointer"
        >
          <Menu className="w-4 h-4 text-calido-700" />
        </button>

        <div>
          <div className="flex items-center gap-1.5 text-[11px] text-calido-400">
            <ShieldCheck className="w-3 h-3" />
            <span>Panel Admin</span>
            <span>/</span>
            <span className="text-vino-700 font-semibold">{MODULE_LABELS[activeModule]}</span>
          </div>
          <h2 className="font-outfit font-black text-base text-calido-900 leading-tight hidden sm:block">
            {MODULE_LABELS[activeModule]}
          </h2>
        </div>
      </div>

      {/* Derecha: Notificaciones + Avatar */}
      <div className="flex items-center gap-3">
        <button className="relative w-9 h-9 rounded-xl border border-calido-200 hover:bg-calido-100 flex items-center justify-center transition-colors cursor-pointer">
          <Bell className="w-4 h-4 text-calido-600" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rosa-500 rounded-full border border-white" />
        </button>

        {user?.photoURL ? (
          <img
            src={user.photoURL}
            alt="Avatar"
            className="w-9 h-9 rounded-xl border-2 border-vino-200 object-cover"
          />
        ) : (
          <div className="w-9 h-9 rounded-xl bg-vino-700 text-white flex items-center justify-center font-outfit font-black text-sm">
            PK
          </div>
        )}
      </div>
    </header>
  );
};
