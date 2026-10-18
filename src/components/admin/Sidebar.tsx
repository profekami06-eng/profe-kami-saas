import React from 'react';
import {
  LayoutDashboard,
  CalendarDays,
  DollarSign,
  GraduationCap,
  BookOpen,
  BarChart3,
  Settings,
  LogOut,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export type AdminModule =
  | 'hoy'
  | 'agenda'
  | 'finanzas'
  | 'estudiantes'
  | 'servicios'
  | 'reportes'
  | 'ajustes';

interface NavItem {
  id: AdminModule;
  label: string;
  icon: React.FC<{ className?: string }>;
  badge?: string | number;
  color: string;
  bgColor: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    id: 'hoy',
    label: 'Hoy',
    icon: LayoutDashboard,
    color: 'text-vino-700',
    bgColor: 'bg-vino-100',
  },
  {
    id: 'agenda',
    label: 'Mi Agenda',
    icon: CalendarDays,
    color: 'text-indigo-700',
    bgColor: 'bg-indigo-100',
  },
  {
    id: 'finanzas',
    label: 'Finanzas',
    icon: DollarSign,
    color: 'text-emerald-700',
    bgColor: 'bg-emerald-100',
  },
  {
    id: 'estudiantes',
    label: 'Estudiantes',
    icon: GraduationCap,
    color: 'text-dorado-700',
    bgColor: 'bg-dorado-100',
  },
  {
    id: 'servicios',
    label: 'Servicios',
    icon: BookOpen,
    color: 'text-rosa-700',
    bgColor: 'bg-rosa-100',
  },
  {
    id: 'reportes',
    label: 'Reportes',
    icon: BarChart3,
    color: 'text-purple-700',
    bgColor: 'bg-purple-100',
  },
  {
    id: 'ajustes',
    label: 'Ajustes',
    icon: Settings,
    color: 'text-calido-700',
    bgColor: 'bg-calido-200',
  },
];

interface SidebarProps {
  activeModule: AdminModule;
  onModuleChange: (module: AdminModule) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeModule,
  onModuleChange,
  isOpen,
  onClose,
}) => {
  const { user, logout } = useAuth();

  const handleNav = (module: AdminModule) => {
    onModuleChange(module);
    onClose();
  };

  return (
    <>
      {/* Overlay para móvil */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-72 z-40
          bg-gradient-to-b from-vino-950 via-vino-900 to-vino-950
          border-r border-vino-800/50
          flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:z-auto
          shadow-2xl
        `}
      >
        {/* Logo / Header */}
        <div className="p-6 border-b border-vino-800/60">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-rosa-300 to-vino-600 flex items-center justify-center shadow-lg shadow-vino-950/50">
              <span className="font-outfit font-black text-xl text-white drop-shadow">K</span>
            </div>
            <div>
              <h1 className="font-outfit font-black text-white text-base leading-tight">
                Profe Kami
              </h1>
              <p className="text-[11px] text-rosa-300 font-medium flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                La matemática es un juego
              </p>
            </div>
          </div>
        </div>

        {/* Navegación */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto scrollbar-thin scrollbar-track-vino-900 scrollbar-thumb-vino-700">
          <p className="px-3 pt-2 pb-1 text-[10px] font-bold text-vino-400 uppercase tracking-widest">
            Módulos
          </p>
          {NAV_ITEMS.map((item) => {
            const isActive = activeModule === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left
                  transition-all duration-200 group cursor-pointer
                  ${
                    isActive
                      ? 'bg-white/15 text-white shadow-lg shadow-black/20'
                      : 'text-vino-300 hover:bg-white/8 hover:text-white'
                  }
                `}
              >
                {/* Ícono con fondo dinámico */}
                <div
                  className={`
                    w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0
                    transition-all duration-200
                    ${isActive ? `${item.bgColor} shadow-md` : 'bg-white/10 group-hover:bg-white/15'}
                  `}
                >
                  <Icon
                    className={`w-4.5 h-4.5 ${isActive ? item.color : 'text-vino-300 group-hover:text-white'}`}
                  />
                </div>

                <span className="flex-1 font-semibold text-sm">{item.label}</span>

                {item.badge !== undefined && (
                  <span className="text-[10px] font-bold bg-rosa-500 text-white px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}

                {isActive && (
                  <ChevronRight className="w-4 h-4 text-white/60 flex-shrink-0" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer del Sidebar: perfil + salir */}
        <div className="p-4 border-t border-vino-800/60">
          {/* Perfil Mini */}
          <div className="flex items-center gap-3 px-2 pb-3 mb-2">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt="Perfil"
                className="w-9 h-9 rounded-full border-2 border-rosa-400/60 flex-shrink-0"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-rosa-400/30 border border-rosa-400/40 flex items-center justify-center text-rosa-200 font-bold text-sm flex-shrink-0">
                PK
              </div>
            )}
            <div className="min-w-0">
              <p className="text-white text-xs font-semibold truncate">
                {user?.displayName || 'Profe Kami'}
              </p>
              <p className="text-vino-400 text-[10px] truncate font-mono">
                {user?.email}
              </p>
            </div>
          </div>

          <button
            onClick={() => logout()}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-rosa-200 border border-vino-700 hover:bg-vino-700/50 hover:text-white transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            Cerrar Sesión
          </button>
        </div>
      </aside>
    </>
  );
};
