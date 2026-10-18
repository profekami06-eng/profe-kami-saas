import React, { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
  Download,
  Filter,
} from 'lucide-react';

type EstadoPago = 'pagado' | 'pendiente' | 'vencido';

interface Pago {
  id: string;
  alumno: string;
  concepto: string;
  monto: number;
  fecha: string;
  estado: EstadoPago;
  metodo?: string;
}

const PAGOS: Pago[] = [
  { id: 'P-001', alumno: 'Valentina Díaz Rosero', concepto: 'Mensualidad Octubre', monto: 150000, fecha: '15/10/2026', estado: 'pagado', metodo: 'Nequi' },
  { id: 'P-002', alumno: 'Mateo Ramos Benavides', concepto: 'Mensualidad Octubre', monto: 150000, fecha: '10/10/2026', estado: 'pagado', metodo: 'Daviplata' },
  { id: 'P-003', alumno: 'Isabella Torres Zambrano', concepto: 'Mensualidad Octubre', monto: 150000, fecha: '20/10/2026', estado: 'pendiente' },
  { id: 'P-004', alumno: 'Samuel Muñoz Arteaga', concepto: 'Mensualidad Octubre', monto: 150000, fecha: '01/10/2026', estado: 'vencido' },
  { id: 'P-005', alumno: 'Luciana Pantoja Coral', concepto: 'Mensualidad Octubre + Material', monto: 195000, fecha: '12/10/2026', estado: 'pagado', metodo: 'Efectivo' },
  { id: 'P-006', alumno: 'Nicolás Eraso López', concepto: 'Mensualidad Octubre', monto: 150000, fecha: '25/10/2026', estado: 'pendiente' },
];

const formatCOP = (n: number) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(n);

const BADGE: Record<EstadoPago, string> = {
  pagado: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  pendiente: 'bg-amber-50 text-amber-700 border-amber-200',
  vencido: 'bg-rose-50 text-rose-700 border-rose-200',
};

const ICONO: Record<EstadoPago, React.FC<{ className?: string }>> = {
  pagado: CheckCircle2,
  pendiente: Clock,
  vencido: AlertCircle,
};

const LABEL: Record<EstadoPago, string> = {
  pagado: 'Pagado',
  pendiente: 'Pendiente',
  vencido: 'Vencido',
};

export const ModuloFinanzas: React.FC = () => {
  const [filtro, setFiltro] = useState<EstadoPago | 'todos'>('todos');

  const pagados = PAGOS.filter((p) => p.estado === 'pagado');
  const pendientes = PAGOS.filter((p) => p.estado === 'pendiente');
  const vencidos = PAGOS.filter((p) => p.estado === 'vencido');
  const totalRecaudado = pagados.reduce((a, p) => a + p.monto, 0);
  const totalPendiente = [...pendientes, ...vencidos].reduce((a, p) => a + p.monto, 0);

  const pagosFiltrados = filtro === 'todos' ? PAGOS : PAGOS.filter((p) => p.estado === filtro);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-outfit font-black text-2xl text-vino-950">Finanzas</h2>
          <p className="text-sm text-calido-600 mt-0.5">Control de pagos y mensualidades — Octubre 2026</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-vino-800 bg-vino-50 hover:bg-vino-100 border border-vino-200 rounded-xl transition-colors cursor-pointer">
            <Download className="w-3.5 h-3.5" />
            Exportar
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-vino-700 hover:bg-vino-800 text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer">
            <Plus className="w-4 h-4" />
            Registrar Pago
          </button>
        </div>
      </div>

      {/* Tarjetas de resumen */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-calido-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
            </div>
            <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
              {pagados.length}/{PAGOS.length} alumnos
            </span>
          </div>
          <p className="text-xl font-outfit font-black text-calido-900">{formatCOP(totalRecaudado)}</p>
          <p className="text-xs font-semibold text-calido-600 mt-1">Total Recaudado</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-calido-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <span className="text-[11px] font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
              {pendientes.length} pendientes
            </span>
          </div>
          <p className="text-xl font-outfit font-black text-calido-900">{formatCOP(totalPendiente)}</p>
          <p className="text-xs font-semibold text-calido-600 mt-1">Por Cobrar</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-calido-100 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 bg-vino-100 rounded-xl flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-vino-600" />
            </div>
            <span className="text-[11px] font-bold text-vino-700 bg-vino-50 border border-vino-200 px-2 py-0.5 rounded-full">
              Meta: $2,000,000
            </span>
          </div>
          <div className="mt-1">
            <p className="text-xl font-outfit font-black text-calido-900">{formatCOP(totalRecaudado)}</p>
            <p className="text-xs font-semibold text-calido-600 mt-1">Recaudado este mes</p>
            <div className="mt-2 h-2 rounded-full bg-calido-100 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-vino-600 to-rosa-500 rounded-full transition-all"
                style={{ width: `${Math.min((totalRecaudado / 2000000) * 100, 100)}%` }}
              />
            </div>
            <p className="text-[10px] text-calido-400 mt-1 text-right">
              {Math.round((totalRecaudado / 2000000) * 100)}% de la meta
            </p>
          </div>
        </div>
      </div>

      {/* Tabla de pagos */}
      <div className="bg-white rounded-3xl border border-calido-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-calido-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="font-outfit font-black text-base text-vino-950 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-vino-700" />
            Registro de Pagos
          </h3>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-calido-500" />
            {(['todos', 'pagado', 'pendiente', 'vencido'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFiltro(f)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-bold capitalize transition-colors cursor-pointer ${
                  filtro === f
                    ? 'bg-vino-700 text-white'
                    : 'bg-calido-100 text-calido-700 hover:bg-calido-200'
                }`}
              >
                {f === 'todos' ? 'Todos' : LABEL[f as EstadoPago]}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-calido-50 text-[10px] font-bold text-calido-600 uppercase tracking-wider border-b border-calido-100">
              <tr>
                <th className="py-3 px-5">Alumno</th>
                <th className="py-3 px-4">Concepto</th>
                <th className="py-3 px-4">Monto</th>
                <th className="py-3 px-4">Fecha</th>
                <th className="py-3 px-4">Método</th>
                <th className="py-3 px-4">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-calido-50">
              {pagosFiltrados.map((p) => {
                const BadgeIcon = ICONO[p.estado];
                return (
                  <tr key={p.id} className="hover:bg-calido-50/50 transition-colors">
                    <td className="py-3.5 px-5">
                      <p className="font-semibold text-calido-900">{p.alumno}</p>
                      <p className="text-[10px] text-calido-400 font-mono">{p.id}</p>
                    </td>
                    <td className="py-3.5 px-4 text-calido-700">{p.concepto}</td>
                    <td className="py-3.5 px-4 font-bold text-calido-900 font-mono">
                      {formatCOP(p.monto)}
                    </td>
                    <td className="py-3.5 px-4 text-calido-600">{p.fecha}</td>
                    <td className="py-3.5 px-4 text-calido-600">{p.metodo || '—'}</td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full border ${BADGE[p.estado]}`}>
                        <BadgeIcon className="w-3 h-3" />
                        {LABEL[p.estado]}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
