import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  Users,
  MapPin,
  BookOpen,
} from 'lucide-react';

const DIAS_SEMANA = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
const MESES = [
  'Enero','Febrero','Marzo','Abril','Mayo','Junio',
  'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre',
];

const EVENTOS_MUESTRA = [
  { dia: 20, hora: '7:00', titulo: 'Aritmética Básica', grupo: '3°–4° Grado', color: 'bg-vino-200 text-vino-900 border-vino-300' },
  { dia: 20, hora: '9:00', titulo: 'Álgebra Divertida', grupo: '5°–6° Grado', color: 'bg-indigo-200 text-indigo-900 border-indigo-300' },
  { dia: 21, hora: '8:00', titulo: 'Geometría Visual', grupo: '7°–8° Grado', color: 'bg-emerald-200 text-emerald-900 border-emerald-300' },
  { dia: 22, hora: '10:00', titulo: 'Preicfes Mat.', grupo: '10°–11° Grado', color: 'bg-dorado-200 text-dorado-900 border-dorado-300' },
  { dia: 23, hora: '11:00', titulo: 'Lógica y Retos', grupo: 'Taller Especial', color: 'bg-rosa-200 text-rosa-900 border-rosa-300' },
  { dia: 25, hora: '9:00', titulo: 'Aritmética Básica', grupo: '3°–4° Grado', color: 'bg-vino-200 text-vino-900 border-vino-300' },
];

export const ModuloAgenda: React.FC = () => {
  const hoy = new Date();
  const [mes, setMes] = useState(hoy.getMonth());
  const [anio, setAnio] = useState(hoy.getFullYear());
  const [diaSeleccionado, setDiaSeleccionado] = useState(hoy.getDate());

  const primerDiaMes = new Date(anio, mes, 1).getDay();
  const diasEnMes = new Date(anio, mes + 1, 0).getDate();
  const offset = primerDiaMes === 0 ? 6 : primerDiaMes - 1;

  const navMes = (delta: number) => {
    const d = new Date(anio, mes + delta, 1);
    setMes(d.getMonth());
    setAnio(d.getFullYear());
  };

  const eventosDelDia = EVENTOS_MUESTRA.filter((e) => e.dia === diaSeleccionado);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-outfit font-black text-2xl text-vino-950">Mi Agenda</h2>
          <p className="text-sm text-calido-600 mt-0.5">Planificación de clases y horarios</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-vino-700 hover:bg-vino-800 text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer">
          <Plus className="w-4 h-4" />
          Nueva Clase
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendario */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-calido-100 shadow-sm p-6">
          {/* Navegación de mes */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navMes(-1)}
              className="w-9 h-9 rounded-xl border border-calido-200 hover:bg-calido-100 flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 text-calido-700" />
            </button>
            <h3 className="font-outfit font-black text-base text-vino-950">
              {MESES[mes]} {anio}
            </h3>
            <button
              onClick={() => navMes(1)}
              className="w-9 h-9 rounded-xl border border-calido-200 hover:bg-calido-100 flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4 text-calido-700" />
            </button>
          </div>

          {/* Días de la semana */}
          <div className="grid grid-cols-7 mb-2">
            {DIAS_SEMANA.map((d) => (
              <div key={d} className="text-center text-[11px] font-bold text-calido-500 uppercase py-2">
                {d}
              </div>
            ))}
          </div>

          {/* Grilla de días */}
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: offset }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {Array.from({ length: diasEnMes }).map((_, i) => {
              const dia = i + 1;
              const esHoy =
                dia === hoy.getDate() && mes === hoy.getMonth() && anio === hoy.getFullYear();
              const esSeleccionado = dia === diaSeleccionado;
              const tieneEvento = EVENTOS_MUESTRA.some((e) => e.dia === dia);

              return (
                <button
                  key={dia}
                  onClick={() => setDiaSeleccionado(dia)}
                  className={`
                    relative aspect-square flex flex-col items-center justify-center rounded-xl text-sm font-semibold
                    transition-all duration-150 cursor-pointer
                    ${esSeleccionado ? 'bg-vino-700 text-white shadow-lg shadow-vino-500/30' : ''}
                    ${esHoy && !esSeleccionado ? 'border-2 border-vino-500 text-vino-800' : ''}
                    ${!esSeleccionado && !esHoy ? 'hover:bg-calido-100 text-calido-800' : ''}
                  `}
                >
                  {dia}
                  {tieneEvento && (
                    <span
                      className={`absolute bottom-1 w-1.5 h-1.5 rounded-full ${
                        esSeleccionado ? 'bg-white/70' : 'bg-vino-500'
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Panel de eventos del día seleccionado */}
        <div className="bg-white rounded-3xl border border-calido-100 shadow-sm p-5 flex flex-col">
          <h4 className="font-outfit font-black text-base text-vino-950 mb-1">
            Clases — {diaSeleccionado} de {MESES[mes]}
          </h4>
          <p className="text-xs text-calido-500 mb-4">
            {eventosDelDia.length === 0
              ? 'Sin clases programadas'
              : `${eventosDelDia.length} clase${eventosDelDia.length > 1 ? 's' : ''} programada${eventosDelDia.length > 1 ? 's' : ''}`}
          </p>

          <div className="flex-1 space-y-3">
            {eventosDelDia.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40 text-center">
                <BookOpen className="w-10 h-10 text-calido-300 mb-2" />
                <p className="text-sm text-calido-400 font-medium">Día libre</p>
                <p className="text-xs text-calido-300">Sin clases agendadas</p>
              </div>
            ) : (
              eventosDelDia.map((ev, i) => (
                <div
                  key={i}
                  className={`p-3.5 rounded-2xl border ${ev.color} transition-all hover:scale-[1.02]`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <Clock className="w-3.5 h-3.5 opacity-70" />
                    <span className="text-xs font-bold font-mono">{ev.hora} AM</span>
                  </div>
                  <p className="font-bold text-sm">{ev.titulo}</p>
                  <div className="flex items-center gap-1 mt-1 opacity-70">
                    <Users className="w-3 h-3" />
                    <span className="text-[11px]">{ev.grupo}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-0.5 opacity-70">
                    <MapPin className="w-3 h-3" />
                    <span className="text-[11px]">Academia Profe Kami, Pasto</span>
                  </div>
                </div>
              ))
            )}
          </div>

          <button className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-vino-50 hover:bg-vino-100 text-vino-800 rounded-xl text-xs font-bold border border-vino-200 transition-colors cursor-pointer">
            <Plus className="w-3.5 h-3.5" />
            Agregar Clase
          </button>
        </div>
      </div>
    </div>
  );
};
