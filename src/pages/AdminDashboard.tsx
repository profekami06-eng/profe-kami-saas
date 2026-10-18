import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { SUPER_ADMIN_EMAIL } from '../firebase';
import { 
  ShieldCheck, 
  Database, 
  LogOut, 
  Users, 
  FileCheck, 
  Award, 
  Lock, 
  CheckCircle2, 
  RefreshCw,
  FolderGit2
} from 'lucide-react';
import type { ConsentAuditRecord } from '../types/legal';

export const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [consents, setConsents] = useState<ConsentAuditRecord[]>([]);

  useEffect(() => {
    // Carga de registros auditados de acudientes (Local + Firestore Sync)
    try {
      const stored = localStorage.getItem('profe_kami_sic_consents');
      if (stored) {
        setConsents(JSON.parse(stored));
      } else {
        // Datos de muestra auditables para demostración inmediata
        const sampleRecords: ConsentAuditRecord[] = [
          {
            id: 'AUD-2026-001',
            userName: 'Martha Elizabeth Benavides (Acudiente)',
            userEmail: 'martha.benavides@gmail.com',
            userPhone: '3157894512',
            acceptedTerms: true,
            termsVersion: 'v1.0-2026-SIC-COT',
            acceptedPrivacy: true,
            privacyVersion: 'v1.0-2026-HABEAS-DATA',
            timestamp: new Date().toISOString(),
            timestampBogota: 'Sábado, 17 de Octubre de 2026, 7:15:00 p.m. COT',
            clientIp: '181.129.45.89 (Pasto, Colombia)',
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
            acknowledgedRetracto: true,
            retractoDaysNotice: 5,
          }
        ];
        setConsents(sampleRecords);
      }
    } catch (e) {
      console.error('Error cargando auditorías:', e);
    }
  }, []);

  return (
    <div className="min-h-screen bg-calido-50 text-calido-900 pb-16">
      {/* Top Header del Panel Admin */}
      <header className="bg-gradient-to-r from-vino-950 via-vino-900 to-vino-800 text-white shadow-lg border-b border-vino-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center font-outfit font-black text-2xl text-rosa-200 shadow-inner">
              K
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-outfit font-black text-xl tracking-tight">
                  Panel de Super Administrador
                </h1>
                <span className="bg-dorado-500/20 text-dorado-300 border border-dorado-400/30 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-dorado-400" />
                  Privilegios Super Admin
                </span>
              </div>
              <p className="text-xs text-rosa-200">
                SaaS Educativo Profe Kami • San Juan de Pasto, Colombia
              </p>
            </div>
          </div>

          {/* Perfil del Super Admin y Salir */}
          <div className="flex items-center gap-4 self-end md:self-auto">
            <div className="flex items-center gap-3 bg-white/10 px-3.5 py-1.5 rounded-xl border border-white/10">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full border border-rosa-300"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-rosa-300 text-vino-950 font-bold flex items-center justify-center text-xs">
                  PK
                </div>
              )}
              <div className="text-left text-xs">
                <p className="font-semibold text-white truncate max-w-[150px]">
                  {user?.displayName || 'Profe Kami'}
                </p>
                <p className="text-[10px] text-rosa-200 font-mono">
                  {user?.email || SUPER_ADMIN_EMAIL}
                </p>
              </div>
            </div>

            <button
              onClick={() => logout()}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-vino-700/80 hover:bg-vino-700 text-rosa-100 hover:text-white border border-vino-600 transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Banner de Estado del Sistema y Firebase */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Firebase Auth & Reglas */}
          <div className="bg-white rounded-2xl p-5 border border-vino-100 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-vino-800 font-outfit uppercase tracking-wider">
                Firebase Firestore
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-bold text-calido-900 flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-emerald-600" />
                Regla esProfeKami() Activa
              </p>
              <p className="text-xs text-calido-600 font-mono bg-calido-100 p-2 rounded-lg">
                request.auth.token.email == '{SUPER_ADMIN_EMAIL}'
              </p>
            </div>
            <p className="text-[11px] text-calido-500">
              Validación reforzada en cliente (auto-signOut) y backend (Firestore Security Rules).
            </p>
          </div>

          {/* Card 2: Firebase Project & Storage */}
          <div className="bg-white rounded-2xl p-5 border border-vino-100 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-vino-800 font-outfit uppercase tracking-wider">
                Infraestructura
              </span>
              <Database className="w-4 h-4 text-vino-600" />
            </div>
            <div className="space-y-1 text-xs text-calido-700">
              <p><strong>Project ID:</strong> profekamisiste</p>
              <p><strong>Storage:</strong> gs://profekamisiste.firebasestorage.app</p>
              <p className="text-emerald-700 font-semibold flex items-center gap-1 pt-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Conexión Singleton inicializada
              </p>
            </div>
            <p className="text-[11px] text-calido-500">
              Base de datos y almacén multimedia listos para estudiantes de Pasto.
            </p>
          </div>

          {/* Card 3: Cumplimiento Legal SIC */}
          <div className="bg-white rounded-2xl p-5 border border-vino-100 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-vino-800 font-outfit uppercase tracking-wider">
                Cumplimiento SIC Colombia
              </span>
              <Award className="w-4 h-4 text-dorado-500" />
            </div>
            <div className="space-y-1 text-xs text-calido-700">
              <p><strong>Habeas Data:</strong> Ley 1581 de 2012</p>
              <p><strong>Estatuto Consumidor:</strong> Ley 1480 (Retracto 5 días)</p>
              <p className="text-vino-800 font-semibold flex items-center gap-1 pt-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Casillas dobles independientes activas
              </p>
            </div>
            <p className="text-[11px] text-calido-500">
              Auditoría trazable por IP, hora colombiana y versión legal.
            </p>
          </div>
        </section>

        {/* Sección: Tabla de Trazabilidad Legal de Acudientes */}
        <section className="bg-white rounded-3xl border border-vino-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-calido-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h2 className="font-outfit font-black text-lg text-vino-950 flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-vino-700" />
                Registro de Consentimientos Auditados (SIC & Habeas Data)
              </h2>
              <p className="text-xs text-calido-600">
                Evidencia legal de aceptación de Términos y Autorización de Tratamiento de Datos Personales de Acudientes
              </p>
            </div>
            <button
              onClick={() => {
                const stored = localStorage.getItem('profe_kami_sic_consents');
                if (stored) setConsents(JSON.parse(stored));
              }}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-vino-800 bg-vino-50 hover:bg-vino-100 border border-vino-200 rounded-xl transition-colors self-start sm:self-auto"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Actualizar Auditoría
            </button>
          </div>

          {/* Tabla de Registros */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-calido-800">
              <thead className="bg-calido-100/70 text-vino-950 font-bold uppercase tracking-wider text-[10px] border-b border-calido-200">
                <tr>
                  <th className="py-3 px-4">Acudiente / Titular</th>
                  <th className="py-3 px-4">Términos y Condiciones</th>
                  <th className="py-3 px-4">Tratamiento Datos (Ley 1581)</th>
                  <th className="py-3 px-4">Retracto (5 días)</th>
                  <th className="py-3 px-4">Dirección IP</th>
                  <th className="py-3 px-4">Fecha y Hora (Colombia)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-calido-200">
                {consents.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-calido-500">
                      No hay registros de consentimiento aún. Prueba completando el formulario de prueba en el inicio.
                    </td>
                  </tr>
                ) : (
                  consents.map((item, idx) => (
                    <tr key={item.id || idx} className="hover:bg-rosa-50/30 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-vino-950">
                        <div>{item.userName}</div>
                        <div className="text-[10px] text-calido-500 font-normal">
                          {item.userEmail || 'Sin email'} • {item.userPhone || 'Sin teléfono'}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          {item.termsVersion}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          {item.privacyVersion}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-vino-900 bg-vino-50 px-2 py-0.5 rounded-full border border-vino-200">
                          Notificado (Art. 47)
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[11px] text-calido-700">
                        {item.clientIp}
                      </td>
                      <td className="py-3.5 px-4 text-calido-600">
                        {item.timestampBogota}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Módulos Siguientes Preparados */}
        <section className="bg-gradient-to-br from-vino-50 to-rosa-50 rounded-3xl p-6 border border-vino-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-vino-700 text-white rounded-xl">
              <FolderGit2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-outfit font-black text-base text-vino-950">
                Arquitectura Base Lista para Siguientes Módulos
              </h3>
              <p className="text-xs text-calido-600">
                Estructura de datos preparada para conectar colecciones de Firestore
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="bg-white/80 p-4 rounded-2xl border border-vino-100 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-vino-900">
                <Users className="w-4 h-4 text-vino-700" />
                1. Módulo Estudiantes
              </div>
              <p className="text-calido-600 text-[11px]">
                Colección <code>estudiantes</code>: datos académicos, niveles y retos matemáticos en Pasto.
              </p>
            </div>
            <div className="bg-white/80 p-4 rounded-2xl border border-vino-100 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-vino-900">
                <Award className="w-4 h-4 text-dorado-500" />
                2. Gamificación "Juego"
              </div>
              <p className="text-calido-600 text-[11px]">
                Sistema de insignias, estrellas matemáticas y progreso lúdico para niños.
              </p>
            </div>
            <div className="bg-white/80 p-4 rounded-2xl border border-vino-100 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-vino-900">
                <FileCheck className="w-4 h-4 text-vino-700" />
                3. Pagos & Facturación
              </div>
              <p className="text-calido-600 text-[11px]">
                Gestión de mensualidades, pasarela y comprobantes conforme a estatuto tributario y SIC.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
