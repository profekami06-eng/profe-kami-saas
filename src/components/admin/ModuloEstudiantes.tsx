import React, { useState } from 'react';
import {
  GraduationCap,
  Star,
  Plus,
  Search,
  Phone,
  Mail,
  Trophy,
  TrendingUp,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

interface Estudiante {
  id: string;
  nombre: string;
  grado: string;
  edad: number;
  acudiente: string;
  telefono: string;
  email: string;
  estrellas: number;
  racha: number;
  asistencia: number;
  estado: 'activo' | 'inactivo';
  nivelMate: string;
}

const ESTUDIANTES: Estudiante[] = [
  { id: 'E-001', nombre: 'Valentina Díaz Rosero', grado: '5° Primaria', edad: 11, acudiente: 'Martha Rosero', telefono: '3157894512', email: 'martha.rosero@gmail.com', estrellas: 24, racha: 8, asistencia: 95, estado: 'activo', nivelMate: '⭐⭐⭐⭐ Avanzado' },
  { id: 'E-002', nombre: 'Mateo Ramos Benavides', grado: '4° Primaria', edad: 10, acudiente: 'Carlos Ramos', telefono: '3102345678', email: 'carlos.ramos@hotmail.com', estrellas: 18, racha: 5, asistencia: 88, estado: 'activo', nivelMate: '⭐⭐⭐ Intermedio' },
  { id: 'E-003', nombre: 'Isabella Torres Zambrano', grado: '6° Primaria', edad: 12, acudiente: 'Ana Zambrano', telefono: '3185671234', email: 'ana.zambrano@gmail.com', estrellas: 31, racha: 12, asistencia: 98, estado: 'activo', nivelMate: '⭐⭐⭐⭐⭐ Experto' },
  { id: 'E-004', nombre: 'Samuel Muñoz Arteaga', grado: '7° Bachillerato', edad: 13, acudiente: 'Pedro Muñoz', telefono: '3219876543', email: 'pedro.munoz@gmail.com', estrellas: 9, racha: 2, asistencia: 72, estado: 'activo', nivelMate: '⭐⭐ Básico' },
  { id: 'E-005', nombre: 'Luciana Pantoja Coral', grado: '3° Primaria', edad: 9, acudiente: 'Gloria Coral', telefono: '3167891234', email: 'gloria.coral@gmail.com', estrellas: 15, racha: 6, asistencia: 91, estado: 'activo', nivelMate: '⭐⭐⭐ Intermedio' },
  { id: 'E-006', nombre: 'Nicolás Eraso López', grado: '10° Bachillerato', edad: 16, acudiente: 'Jorge Eraso', telefono: '3138765432', email: 'jorge.eraso@gmail.com', estrellas: 42, racha: 20, asistencia: 99, estado: 'activo', nivelMate: '⭐⭐⭐⭐⭐ Experto' },
];

export const ModuloEstudiantes: React.FC = () => {
  const [busqueda, setBusqueda] = useState('');
  const [seleccionado, setSeleccionado] = useState<Estudiante | null>(null);

  const filtrados = ESTUDIANTES.filter(
    (e) =>
      e.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      e.grado.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="font-outfit font-black text-2xl text-vino-950">Estudiantes</h2>
          <p className="text-sm text-calido-600 mt-0.5">Gestión académica y gamificación matemática</p>
        </div>
        <button className="self-start sm:self-auto flex items-center gap-2 px-4 py-2.5 bg-vino-700 hover:bg-vino-800 text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer">
          <Plus className="w-4 h-4" />
          Registrar Estudiante
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Activos', value: ESTUDIANTES.filter((e) => e.estado === 'activo').length, icon: GraduationCap, color: 'text-vino-700', bg: 'bg-vino-100' },
          { label: 'Estrella Promedio', value: Math.round(ESTUDIANTES.reduce((a, e) => a + e.estrellas, 0) / ESTUDIANTES.length), icon: Star, color: 'text-dorado-600', bg: 'bg-dorado-100' },
          { label: 'Asistencia Prom.', value: `${Math.round(ESTUDIANTES.reduce((a, e) => a + e.asistencia, 0) / ESTUDIANTES.length)}%`, icon: TrendingUp, color: 'text-emerald-700', bg: 'bg-emerald-100' },
        ].map((s, i) => {
          const Ic = s.icon;
          return (
            <div key={i} className="bg-white rounded-2xl p-4 border border-calido-100 shadow-sm flex items-center gap-3">
              <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                <Ic className={`w-5 h-5 ${s.color}`} />
              </div>
              <div>
                <p className="font-outfit font-black text-lg text-calido-900 leading-none">{s.value}</p>
                <p className="text-[11px] text-calido-600 font-semibold mt-0.5">{s.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Buscador */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-calido-400" />
        <input
          type="text"
          placeholder="Buscar estudiante por nombre o grado..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-white border border-calido-200 rounded-2xl text-sm text-calido-800 focus:outline-none focus:ring-2 focus:ring-vino-300 focus:border-vino-400 placeholder:text-calido-400"
        />
      </div>

      {/* Grid de tarjetas de estudiantes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtrados.map((e) => (
          <button
            key={e.id}
            onClick={() => setSeleccionado(e)}
            className="bg-white rounded-2xl p-5 border border-calido-100 shadow-sm hover:shadow-md hover:border-vino-200 transition-all text-left cursor-pointer group"
          >
            {/* Avatar y nombre */}
            <div className="flex items-start gap-3 mb-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rosa-200 to-vino-200 flex items-center justify-center font-outfit font-black text-xl text-vino-800 flex-shrink-0 group-hover:from-vino-300 group-hover:to-rosa-300 transition-all">
                {e.nombre.charAt(0)}
              </div>
              <div className="min-w-0">
                <p className="font-bold text-sm text-calido-900 truncate">{e.nombre}</p>
                <p className="text-xs text-calido-500">{e.grado} • {e.edad} años</p>
                <span className={`inline-block text-[10px] font-bold mt-1 px-2 py-0.5 rounded-full border ${
                  e.estado === 'activo'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-calido-100 text-calido-500 border-calido-200'
                }`}>
                  {e.estado === 'activo' ? '● Activo' : '○ Inactivo'}
                </span>
              </div>
            </div>

            {/* Nivel matemático */}
            <p className="text-[11px] text-calido-700 mb-3 font-medium">{e.nivelMate}</p>

            {/* Stats de gamificación */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-dorado-50 rounded-xl py-2 border border-dorado-100">
                <p className="font-outfit font-black text-base text-dorado-700">{e.estrellas}</p>
                <p className="text-[10px] text-dorado-600">⭐ Estrellas</p>
              </div>
              <div className="bg-vino-50 rounded-xl py-2 border border-vino-100">
                <p className="font-outfit font-black text-base text-vino-700">{e.racha}</p>
                <p className="text-[10px] text-vino-600">🔥 Racha</p>
              </div>
              <div className="bg-emerald-50 rounded-xl py-2 border border-emerald-100">
                <p className="font-outfit font-black text-base text-emerald-700">{e.asistencia}%</p>
                <p className="text-[10px] text-emerald-600">✓ Asist.</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Modal de detalle del estudiante */}
      {seleccionado && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSeleccionado(null)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 space-y-4 animate-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rosa-200 to-vino-300 flex items-center justify-center font-outfit font-black text-3xl text-vino-800">
                {seleccionado.nombre.charAt(0)}
              </div>
              <div className="flex-1">
                <h3 className="font-outfit font-black text-lg text-vino-950">{seleccionado.nombre}</h3>
                <p className="text-xs text-calido-500">{seleccionado.grado} • {seleccionado.edad} años</p>
                <p className="text-xs mt-1 text-calido-700 font-medium">{seleccionado.nivelMate}</p>
              </div>
              <button onClick={() => setSeleccionado(null)} className="text-calido-400 hover:text-calido-700 cursor-pointer">
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-dorado-50 rounded-2xl py-3 border border-dorado-100">
                <Trophy className="w-5 h-5 text-dorado-500 mx-auto mb-1" />
                <p className="font-outfit font-black text-xl text-dorado-700">{seleccionado.estrellas}</p>
                <p className="text-[10px] text-dorado-600 font-semibold">Estrellas</p>
              </div>
              <div className="bg-vino-50 rounded-2xl py-3 border border-vino-100">
                <p className="text-xl">🔥</p>
                <p className="font-outfit font-black text-xl text-vino-700">{seleccionado.racha}</p>
                <p className="text-[10px] text-vino-600 font-semibold">Días Racha</p>
              </div>
              <div className="bg-emerald-50 rounded-2xl py-3 border border-emerald-100">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
                <p className="font-outfit font-black text-xl text-emerald-700">{seleccionado.asistencia}%</p>
                <p className="text-[10px] text-emerald-600 font-semibold">Asistencia</p>
              </div>
            </div>

            <div className="space-y-2 text-xs border-t border-calido-100 pt-4">
              <p className="font-bold text-calido-800 mb-2">Información del Acudiente</p>
              <div className="flex items-center gap-2 text-calido-700">
                <GraduationCap className="w-4 h-4 text-vino-500" />
                <span>{seleccionado.acudiente}</span>
              </div>
              <div className="flex items-center gap-2 text-calido-700">
                <Phone className="w-4 h-4 text-vino-500" />
                <span>{seleccionado.telefono}</span>
              </div>
              <div className="flex items-center gap-2 text-calido-700">
                <Mail className="w-4 h-4 text-vino-500" />
                <span>{seleccionado.email}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
