import React from 'react';
import {
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  Star,
  Trophy,
  Download,
} from 'lucide-react';

const MESES = ['Jul', 'Ago', 'Sep', 'Oct'];
const INGRESOS = [1100000, 1350000, 1280000, 1450000];
const ALUMNOS_MES = [24, 26, 27, 29];
const MAX_INGRESO = Math.max(...INGRESOS);

const TOP_ALUMNOS = [
  { nombre: 'Nicolás Eraso', estrellas: 42, grado: '10°', emoji: '🥇' },
  { nombre: 'Isabella Torres', estrellas: 31, grado: '6°', emoji: '🥈' },
  { nombre: 'Valentina Díaz', estrellas: 24, grado: '5°', emoji: '🥉' },
];

const formatCOP = (n: number) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(n);

export const ModuloReportes: React.FC = () => (
  <div className="space-y-6">
    {/* Header */}
    <div className="flex items-center justify-between">
      <div>
        <h2 className="font-outfit font-black text-2xl text-vino-950">Reportes</h2>
        <p className="text-sm text-calido-600 mt-0.5">Análisis de rendimiento de la academia</p>
      </div>
      <button className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-vino-800 bg-vino-50 hover:bg-vino-100 border border-vino-200 rounded-xl transition-colors cursor-pointer">
        <Download className="w-3.5 h-3.5" />
        Exportar Informe
      </button>
    </div>

    {/* KPI Cards */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { label: 'Ingresos Oct.', value: formatCOP(1450000), icon: DollarSign, color: 'text-emerald-700', bg: 'bg-emerald-100', trend: '+12.9%' },
        { label: 'Estudiantes', value: 29, icon: Users, color: 'text-vino-700', bg: 'bg-vino-100', trend: '+7.4%' },
        { label: 'Estrellas Dadas', value: 139, icon: Star, color: 'text-dorado-600', bg: 'bg-dorado-100', trend: '+23%' },
        { label: 'Asistencia Prom.', value: '90.5%', icon: TrendingUp, color: 'text-indigo-700', bg: 'bg-indigo-100', trend: '+2.1%' },
      ].map((k, i) => {
        const Ic = k.icon;
        return (
          <div key={i} className="bg-white rounded-2xl p-5 border border-calido-100 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 ${k.bg} rounded-xl flex items-center justify-center`}>
                <Ic className={`w-5 h-5 ${k.color}`} />
              </div>
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                {k.trend}
              </span>
            </div>
            <p className="font-outfit font-black text-xl text-calido-900">{k.value}</p>
            <p className="text-xs text-calido-600 font-semibold mt-1">{k.label}</p>
          </div>
        );
      })}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Gráfica de barras: Ingresos por mes */}
      <div className="bg-white rounded-3xl border border-calido-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-vino-700" />
            <h3 className="font-outfit font-black text-base text-vino-950">Ingresos Mensuales</h3>
          </div>
          <span className="text-[11px] text-calido-500">Jul–Oct 2026</span>
        </div>
        <div className="flex items-end gap-3 h-40">
          {MESES.map((m, i) => {
            const pct = (INGRESOS[i] / MAX_INGRESO) * 100;
            const isLast = i === MESES.length - 1;
            return (
              <div key={m} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-[10px] font-bold text-calido-700">{formatCOP(INGRESOS[i]).replace('$', '$').replace(' ', '')}</span>
                <div className="w-full flex items-end" style={{ height: '100px' }}>
                  <div
                    className={`w-full rounded-t-xl transition-all duration-500 ${isLast ? 'bg-gradient-to-t from-vino-700 to-vino-500' : 'bg-vino-200'}`}
                    style={{ height: `${pct}%` }}
                  />
                </div>
                <span className={`text-[11px] font-bold ${isLast ? 'text-vino-700' : 'text-calido-500'}`}>{m}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Crecimiento de alumnos */}
      <div className="bg-white rounded-3xl border border-calido-100 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-6">
          <Users className="w-5 h-5 text-vino-700" />
          <h3 className="font-outfit font-black text-base text-vino-950">Crecimiento de Alumnos</h3>
        </div>
        <div className="space-y-3">
          {MESES.map((m, i) => {
            const pct = (ALUMNOS_MES[i] / 40) * 100;
            const isLast = i === MESES.length - 1;
            return (
              <div key={m}>
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-semibold ${isLast ? 'text-vino-800' : 'text-calido-600'}`}>{m} 2026</span>
                  <span className={`text-xs font-bold ${isLast ? 'text-vino-700' : 'text-calido-700'}`}>{ALUMNOS_MES[i]} alumnos</span>
                </div>
                <div className="h-3 bg-calido-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${isLast ? 'bg-gradient-to-r from-vino-600 to-rosa-500' : 'bg-vino-300'}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
          <p className="text-[11px] text-calido-400 pt-2">Meta: 40 estudiantes activos</p>
        </div>
      </div>
    </div>

    {/* Top Estudiantes */}
    <div className="bg-white rounded-3xl border border-calido-100 shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="w-5 h-5 text-dorado-500" />
        <h3 className="font-outfit font-black text-base text-vino-950">Ranking de Estrellas — Octubre</h3>
      </div>
      <div className="space-y-3">
        {TOP_ALUMNOS.map((a, i) => (
          <div key={i} className="flex items-center gap-4 p-3.5 rounded-2xl bg-calido-50/60 hover:bg-calido-100/60 transition-colors">
            <span className="text-2xl">{a.emoji}</span>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm text-calido-900">{a.nombre}</p>
              <p className="text-xs text-calido-500">Grado {a.grado}</p>
            </div>
            <div className="flex items-center gap-1 bg-dorado-100 text-dorado-700 px-3 py-1 rounded-full border border-dorado-200">
              <Star className="w-3.5 h-3.5 fill-dorado-500 text-dorado-500" />
              <span className="font-outfit font-black text-sm">{a.estrellas}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
