import React from 'react';
import {
  TrendingUp,
  Users,
  CalendarCheck,
  DollarSign,
  Clock,
  Star,
  AlertCircle,
  CheckCircle2,
  BookOpen,
  Zap,
  Trophy,
  ArrowRight,
  Bell,
} from 'lucide-react';

/* ─── Tipos de datos del módulo Hoy ─── */
interface StatCardProps {
  icon: React.FC<{ className?: string }>;
  label: string;
  value: string | number;
  sub?: string;
  color: string;
  bg: string;
  trend?: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, label, value, sub, color, bg, trend }) => (
  <div className="bg-white rounded-2xl p-5 border border-calido-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between mb-3">
      <div className={`w-11 h-11 ${bg} rounded-xl flex items-center justify-center shadow-sm`}>
        <Icon className={`w-5 h-5 ${color}`} />
      </div>
      {trend && (
        <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
          <TrendingUp className="w-3 h-3" />
          {trend}
        </span>
      )}
    </div>
    <p className="text-2xl font-outfit font-black text-calido-900 leading-none">{value}</p>
    <p className="text-xs font-semibold text-calido-700 mt-1">{label}</p>
    {sub && <p className="text-[11px] text-calido-500 mt-0.5">{sub}</p>}
  </div>
);

/* ─── Datos de muestra ─── */
const clases_hoy = [
  {
    hora: '7:00 AM',
    grupo: 'Aritmética Básica',
    nivel: '3°–4°',
    alumnos: 6,
    estado: 'completada',
  },
  {
    hora: '9:00 AM',
    grupo: 'Álgebra Divertida',
    nivel: '5°–6°',
    alumnos: 8,
    estado: 'en_curso',
  },
  {
    hora: '11:00 AM',
    grupo: 'Geometría Visual',
    nivel: '7°–8°',
    alumnos: 5,
    estado: 'pendiente',
  },
  {
    hora: '2:00 PM',
    grupo: 'Preicfes Matemáticas',
    nivel: '10°–11°',
    alumnos: 10,
    estado: 'pendiente',
  },
];

const logros_recientes = [
  { alumno: 'Valentina Díaz', logro: '🌟 Primera estrella dorada', hora: '8:32 AM' },
  { alumno: 'Mateo Ramos', logro: '🏆 Reto resuelto: Fracciones', hora: '7:55 AM' },
  { alumno: 'Isabella Torres', logro: '🎯 Racha de 5 días', hora: 'Ayer' },
];

export const ModuloHoy: React.FC = () => {
  const hoy = new Date().toLocaleDateString('es-CO', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'America/Bogota',
  });

  return (
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="font-outfit font-black text-2xl text-vino-950">¡Buenos días, Profe! 👋</h2>
          <p className="text-sm text-calido-600 capitalize mt-0.5">{hoy}</p>
        </div>
        <button className="self-start sm:self-auto flex items-center gap-2 px-4 py-2 bg-vino-700 hover:bg-vino-800 text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer">
          <Bell className="w-3.5 h-3.5" />
          Ver Notificaciones
        </button>
      </div>

      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Users}
          label="Estudiantes Activos"
          value={29}
          sub="Pasto, Nariño"
          color="text-vino-700"
          bg="bg-vino-100"
          trend="+2 este mes"
        />
        <StatCard
          icon={CalendarCheck}
          label="Clases Hoy"
          value={4}
          sub="2 completadas"
          color="text-indigo-700"
          bg="bg-indigo-100"
        />
        <StatCard
          icon={DollarSign}
          label="Ingresos Octubre"
          value="$1.45M"
          sub="COP • Meta: $2M"
          color="text-emerald-700"
          bg="bg-emerald-100"
          trend="+12%"
        />
        <StatCard
          icon={Trophy}
          label="Logros Esta Semana"
          value={7}
          sub="Insignias entregadas"
          color="text-dorado-700"
          bg="bg-dorado-100"
        />
      </div>

      {/* Clases del Día */}
      <div className="bg-white rounded-3xl border border-calido-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-calido-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-vino-700" />
            <h3 className="font-outfit font-black text-base text-vino-950">Clases de Hoy</h3>
          </div>
          <button className="text-xs text-vino-700 hover:text-vino-900 font-semibold flex items-center gap-1 cursor-pointer">
            Ver agenda completa <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="divide-y divide-calido-100">
          {clases_hoy.map((clase, idx) => (
            <div key={idx} className="flex items-center gap-4 px-5 py-4 hover:bg-calido-50/50 transition-colors">
              {/* Hora */}
              <div className="w-16 text-center">
                <p className="text-xs font-bold text-vino-800 font-mono">{clase.hora}</p>
              </div>

              {/* Indicador de estado */}
              <div className="flex-shrink-0">
                {clase.estado === 'completada' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                ) : clase.estado === 'en_curso' ? (
                  <div className="w-5 h-5 rounded-full bg-vino-600 flex items-center justify-center animate-pulse">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-calido-300" />
                )}
              </div>

              {/* Info de clase */}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-calido-900 truncate">{clase.grupo}</p>
                <p className="text-xs text-calido-500">Grado {clase.nivel} • {clase.alumnos} estudiantes</p>
              </div>

              {/* Badge de estado */}
              <span
                className={`text-[11px] font-bold px-2.5 py-1 rounded-full border flex-shrink-0 ${
                  clase.estado === 'completada'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : clase.estado === 'en_curso'
                    ? 'bg-vino-50 text-vino-700 border-vino-200 animate-pulse'
                    : 'bg-calido-100 text-calido-600 border-calido-200'
                }`}
              >
                {clase.estado === 'completada'
                  ? '✓ Completada'
                  : clase.estado === 'en_curso'
                  ? '● En Curso'
                  : '○ Pendiente'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Logros y Gamificación */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Logros Recientes */}
        <div className="bg-white rounded-3xl border border-calido-100 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-5 h-5 text-dorado-500" />
            <h3 className="font-outfit font-black text-base text-vino-950">Logros Recientes</h3>
          </div>
          <div className="space-y-3">
            {logros_recientes.map((l, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-calido-50/60 hover:bg-calido-100/60 transition-colors">
                <div className="w-8 h-8 rounded-full bg-dorado-100 flex items-center justify-center flex-shrink-0 text-base">
                  {l.logro.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-calido-900">{l.alumno}</p>
                  <p className="text-xs text-calido-600 truncate">{l.logro.slice(2)}</p>
                </div>
                <span className="text-[10px] text-calido-400 font-mono flex-shrink-0">{l.hora}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Acciones Rápidas */}
        <div className="bg-gradient-to-br from-vino-50 to-rosa-50 rounded-3xl border border-vino-100 p-5">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-vino-700" />
            <h3 className="font-outfit font-black text-base text-vino-950">Acciones Rápidas</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Registrar Alumno', icon: Users, color: 'text-vino-700', bg: 'bg-vino-100' },
              { label: 'Nueva Clase', icon: BookOpen, color: 'text-indigo-700', bg: 'bg-indigo-100' },
              { label: 'Registrar Pago', icon: DollarSign, color: 'text-emerald-700', bg: 'bg-emerald-100' },
              { label: 'Ver Pendientes', icon: AlertCircle, color: 'text-amber-700', bg: 'bg-amber-100' },
            ].map((acc, i) => {
              const AccIcon = acc.icon;
              return (
                <button
                  key={i}
                  className="flex flex-col items-center gap-2 p-4 bg-white/80 hover:bg-white rounded-2xl border border-vino-100/80 hover:border-vino-200 transition-all shadow-sm hover:shadow-md cursor-pointer"
                >
                  <div className={`w-10 h-10 ${acc.bg} rounded-xl flex items-center justify-center`}>
                    <AccIcon className={`w-5 h-5 ${acc.color}`} />
                  </div>
                  <span className="text-[11px] font-bold text-calido-800 text-center leading-tight">
                    {acc.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
