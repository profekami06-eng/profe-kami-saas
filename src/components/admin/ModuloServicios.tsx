import React from 'react';
import {
  BookOpen,
  Clock,
  Users,
  Star,
  DollarSign,
  Plus,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

interface Servicio {
  id: string;
  nombre: string;
  descripcion: string;
  duracion: string;
  alumnos: number;
  precio: number;
  nivel: string;
  emoji: string;
  color: string;
  bg: string;
  caracteristicas: string[];
}

const SERVICIOS: Servicio[] = [
  {
    id: 'S-001',
    nombre: 'Aritmética Básica',
    descripcion: 'Fundamentos de las operaciones matemáticas de forma lúdica y creativa para niños de primaria.',
    duracion: '2 hrs / semana',
    alumnos: 6,
    precio: 120000,
    nivel: '3°–4° Grado',
    emoji: '🔢',
    color: 'text-vino-700',
    bg: 'bg-vino-50',
    caracteristicas: ['Suma y resta', 'Multiplicación', 'Fichas de juego', 'Medallas de logro'],
  },
  {
    id: 'S-002',
    nombre: 'Álgebra Divertida',
    descripcion: 'Introducción al álgebra y pensamiento algebraico usando estrategias de juego matemático.',
    duracion: '3 hrs / semana',
    alumnos: 8,
    precio: 150000,
    nivel: '5°–6° Grado',
    emoji: '🔡',
    color: 'text-indigo-700',
    bg: 'bg-indigo-50',
    caracteristicas: ['Variables y ecuaciones', 'Factorización', 'Juego de retos', 'Tablero de honor'],
  },
  {
    id: 'S-003',
    nombre: 'Geometría Visual',
    descripcion: 'Exploración del espacio, figuras y medidas con actividades manuales y visuales interactivas.',
    duracion: '2 hrs / semana',
    alumnos: 5,
    precio: 140000,
    nivel: '7°–8° Grado',
    emoji: '📐',
    color: 'text-emerald-700',
    bg: 'bg-emerald-50',
    caracteristicas: ['Figuras planas y sólidos', 'Perímetro y área', 'Construcciones geométricas', 'Taller creativo'],
  },
  {
    id: 'S-004',
    nombre: 'Preicfes Matemáticas',
    descripcion: 'Preparación intensiva para las pruebas Saber 11 con énfasis en pensamiento numérico y espacial.',
    duracion: '4 hrs / semana',
    alumnos: 10,
    precio: 195000,
    nivel: '10°–11° Grado',
    emoji: '🎯',
    color: 'text-dorado-700',
    bg: 'bg-dorado-50',
    caracteristicas: ['Simulacros ICFES', 'Pensamiento numérico', 'Análisis de datos', 'Estadísticas y probabilidad'],
  },
  {
    id: 'S-005',
    nombre: 'Lógica y Retos',
    descripcion: 'Taller especial de pensamiento lógico, olimpiadas matemáticas y resolución de problemas.',
    duracion: '2 hrs / semana',
    alumnos: 7,
    precio: 160000,
    nivel: 'Todos los grados',
    emoji: '🧩',
    color: 'text-rosa-700',
    bg: 'bg-rosa-50',
    caracteristicas: ['Olimpiadas matemáticas', 'Ajedrez matemático', 'Retos semanales', 'Trofeos especiales'],
  },
];

const formatCOP = (n: number) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(n);

export const ModuloServicios: React.FC = () => (
  <div className="space-y-6">
    {/* Header */}
    <div className="flex items-center justify-between">
      <div>
        <h2 className="font-outfit font-black text-2xl text-vino-950">Servicios</h2>
        <p className="text-sm text-calido-600 mt-0.5">Catálogo de cursos y talleres matemáticos</p>
      </div>
      <button className="flex items-center gap-2 px-4 py-2.5 bg-vino-700 hover:bg-vino-800 text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer">
        <Plus className="w-4 h-4" />
        Nuevo Servicio
      </button>
    </div>

    {/* Banner filosófico */}
    <div className="bg-gradient-to-r from-vino-900 to-vino-700 rounded-3xl p-6 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-12 translate-x-12" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-8 -translate-x-8" />
      <div className="relative">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-dorado-300" />
          <span className="text-dorado-300 text-xs font-bold uppercase tracking-widest">Filosofía Profe Kami</span>
        </div>
        <h3 className="font-outfit font-black text-2xl leading-tight mb-1">
          "La matemática es un juego"
        </h3>
        <p className="text-rosa-200 text-sm max-w-lg">
          Cada servicio está diseñado bajo la metodología lúdica de Profe Kami, combinando aprendizaje significativo con diversión y gamificación en Pasto, Colombia.
        </p>
      </div>
    </div>

    {/* Grid de servicios */}
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {SERVICIOS.map((s) => (
        <div
          key={s.id}
          className="bg-white rounded-3xl border border-calido-100 shadow-sm hover:shadow-lg transition-all p-5 flex flex-col group"
        >
          {/* Emoji + título */}
          <div className="flex items-start gap-3 mb-3">
            <div className={`w-14 h-14 ${s.bg} rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 group-hover:scale-110 transition-transform`}>
              {s.emoji}
            </div>
            <div>
              <h3 className={`font-outfit font-black text-base ${s.color}`}>{s.nombre}</h3>
              <span className="text-[11px] text-calido-500 bg-calido-100 px-2 py-0.5 rounded-full font-medium">
                {s.nivel}
              </span>
            </div>
          </div>

          <p className="text-xs text-calido-600 leading-relaxed mb-4 flex-1">{s.descripcion}</p>

          {/* Características */}
          <ul className="space-y-1.5 mb-4">
            {s.caracteristicas.map((c, i) => (
              <li key={i} className="flex items-center gap-2 text-[11px] text-calido-700">
                <CheckCircle2 className={`w-3.5 h-3.5 ${s.color} flex-shrink-0`} />
                {c}
              </li>
            ))}
          </ul>

          {/* Métricas */}
          <div className="grid grid-cols-3 gap-2 mb-4 text-center text-[11px]">
            <div className={`${s.bg} rounded-xl py-2 border border-calido-100`}>
              <Clock className={`w-3.5 h-3.5 ${s.color} mx-auto mb-0.5`} />
              <p className="font-bold text-calido-800">{s.duracion.split(' ')[0]}</p>
              <p className="text-calido-500">hrs/sem</p>
            </div>
            <div className={`${s.bg} rounded-xl py-2 border border-calido-100`}>
              <Users className={`w-3.5 h-3.5 ${s.color} mx-auto mb-0.5`} />
              <p className="font-bold text-calido-800">{s.alumnos}</p>
              <p className="text-calido-500">alumnos</p>
            </div>
            <div className={`${s.bg} rounded-xl py-2 border border-calido-100`}>
              <Star className={`w-3.5 h-3.5 ${s.color} mx-auto mb-0.5`} />
              <p className="font-bold text-calido-800">4.9</p>
              <p className="text-calido-500">rating</p>
            </div>
          </div>

          {/* Precio y CTA */}
          <div className="flex items-center justify-between">
            <div>
              <p className="font-outfit font-black text-base text-calido-900">{formatCOP(s.precio)}</p>
              <p className="text-[10px] text-calido-400">COP / mes</p>
            </div>
            <button className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${s.bg} ${s.color} border-current/20 hover:opacity-80`}>
              <DollarSign className="w-3.5 h-3.5" />
              Matricular
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);
