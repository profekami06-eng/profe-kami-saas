import React, { useState } from 'react';
import {
  Settings,
  User,
  Bell,
  Shield,
  Palette,
  Database,
  CheckCircle2,
  Lock,
  Mail,
  Globe,
  Sparkles,
} from 'lucide-react';
import { SUPER_ADMIN_EMAIL } from '../../firebase';

interface ToggleProps {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  description?: string;
}

const Toggle: React.FC<ToggleProps> = ({ checked, onChange, label, description }) => (
  <div className="flex items-start justify-between gap-4 py-3">
    <div>
      <p className="text-sm font-semibold text-calido-800">{label}</p>
      {description && <p className="text-xs text-calido-500 mt-0.5">{description}</p>}
    </div>
    <button
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0 cursor-pointer ${checked ? 'bg-vino-600' : 'bg-calido-300'}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`}
      />
    </button>
  </div>
);

export const ModuloAjustes: React.FC = () => {
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifPagos, setNotifPagos] = useState(true);
  const [notifLogros, setNotifLogros] = useState(true);
  const [modoOscuro, setModoOscuro] = useState(false);
  const [backupAuto, setBackupAuto] = useState(true);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="font-outfit font-black text-2xl text-vino-950">Ajustes</h2>
        <p className="text-sm text-calido-600 mt-0.5">Configuración general del sistema</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Perfil del Administrador */}
        <div className="bg-white rounded-3xl border border-calido-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-5">
            <User className="w-5 h-5 text-vino-700" />
            <h3 className="font-outfit font-black text-base text-vino-950">Perfil del Administrador</h3>
          </div>
          <div className="flex items-center gap-4 mb-5 p-4 bg-vino-50 rounded-2xl border border-vino-100">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-vino-600 to-rosa-500 flex items-center justify-center font-outfit font-black text-2xl text-white shadow-md">
              K
            </div>
            <div>
              <p className="font-bold text-calido-900">Profe Kami</p>
              <p className="text-xs text-calido-600 font-mono">{SUPER_ADMIN_EMAIL}</p>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold mt-1 bg-vino-100 text-vino-700 px-2 py-0.5 rounded-full border border-vino-200">
                <Shield className="w-3 h-3" />
                Super Administrador
              </span>
            </div>
          </div>
          <div className="space-y-3 text-xs">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-calido-50 border border-calido-100">
              <Mail className="w-4 h-4 text-vino-500 flex-shrink-0" />
              <div>
                <p className="font-semibold text-calido-800">Correo Electrónico</p>
                <p className="text-calido-500 font-mono">{SUPER_ADMIN_EMAIL}</p>
              </div>
              <CheckCircle2 className="w-4 h-4 text-emerald-500 ml-auto" />
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-calido-50 border border-calido-100">
              <Globe className="w-4 h-4 text-vino-500 flex-shrink-0" />
              <div>
                <p className="font-semibold text-calido-800">Zona Horaria</p>
                <p className="text-calido-500">América/Bogotá (COT, UTC–5)</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-calido-50 border border-calido-100">
              <Lock className="w-4 h-4 text-vino-500 flex-shrink-0" />
              <div>
                <p className="font-semibold text-calido-800">Autenticación</p>
                <p className="text-calido-500">Google Sign-In • Firebase Auth</p>
              </div>
              <CheckCircle2 className="w-4 h-4 text-emerald-500 ml-auto" />
            </div>
          </div>
        </div>

        {/* Notificaciones */}
        <div className="bg-white rounded-3xl border border-calido-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-5">
            <Bell className="w-5 h-5 text-vino-700" />
            <h3 className="font-outfit font-black text-base text-vino-950">Notificaciones</h3>
          </div>
          <div className="divide-y divide-calido-100">
            <Toggle
              checked={notifEmail}
              onChange={setNotifEmail}
              label="Alertas por Email"
              description="Recibir resumen diario de actividad"
            />
            <Toggle
              checked={notifPagos}
              onChange={setNotifPagos}
              label="Notificaciones de Pagos"
              description="Alertas de vencimientos y recibos nuevos"
            />
            <Toggle
              checked={notifLogros}
              onChange={setNotifLogros}
              label="Logros de Estudiantes"
              description="Notificar cuando un alumno obtiene una estrella"
            />
          </div>
        </div>

        {/* Apariencia */}
        <div className="bg-white rounded-3xl border border-calido-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-5">
            <Palette className="w-5 h-5 text-vino-700" />
            <h3 className="font-outfit font-black text-base text-vino-950">Apariencia</h3>
          </div>
          <div className="divide-y divide-calido-100">
            <Toggle
              checked={modoOscuro}
              onChange={setModoOscuro}
              label="Modo Oscuro"
              description="Interfaz con tema oscuro (próximamente)"
            />
          </div>
          <div className="mt-5">
            <p className="text-xs font-bold text-calido-700 mb-3">Paleta de Color Principal</p>
            <div className="flex gap-2">
              {['#9e1c3b', '#6d0f29', '#f4a4bf', '#d4a853', '#4a3728'].map((c) => (
                <button
                  key={c}
                  className="w-8 h-8 rounded-xl border-2 border-white shadow-md hover:scale-110 transition-transform cursor-pointer"
                  style={{ backgroundColor: c }}
                  title={c}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Sistema y Firebase */}
        <div className="bg-white rounded-3xl border border-calido-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-5">
            <Database className="w-5 h-5 text-vino-700" />
            <h3 className="font-outfit font-black text-base text-vino-950">Sistema y Firebase</h3>
          </div>
          <div className="space-y-2 text-xs mb-4">
            {[
              ['Project ID', 'profekamisiste'],
              ['Auth Domain', 'profekamisiste.firebaseapp.com'],
              ['Storage', 'profekamisiste.firebasestorage.app'],
              ['Región Preferida', 'us-central1'],
              ['SDK Version', 'Firebase 10.x'],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between py-2 px-3 bg-calido-50 rounded-xl border border-calido-100">
                <span className="text-calido-600 font-semibold">{k}</span>
                <span className="font-mono text-calido-800 text-[11px]">{v}</span>
              </div>
            ))}
          </div>
          <div className="divide-y divide-calido-100">
            <Toggle
              checked={backupAuto}
              onChange={setBackupAuto}
              label="Backup Automático"
              description="Respaldo diario de Firestore"
            />
          </div>
        </div>
      </div>

      {/* Info legal */}
      <div className="bg-gradient-to-r from-vino-50 to-rosa-50 rounded-3xl border border-vino-100 p-6">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-vino-700" />
          <h3 className="font-outfit font-black text-base text-vino-950">
            Información Legal y Versión
          </h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          {[
            { label: 'Versión', value: 'v1.0.0' },
            { label: 'Ley Habeas Data', value: 'L. 1581/2012' },
            { label: 'Estatuto Consumidor', value: 'L. 1480 • Art. 47' },
            { label: 'Entidad SIC', value: 'Pasto, Nariño' },
          ].map(({ label, value }) => (
            <div key={label} className="bg-white/80 rounded-xl p-3 border border-vino-100">
              <p className="text-calido-500 font-semibold">{label}</p>
              <p className="font-bold text-vino-900 mt-0.5">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
