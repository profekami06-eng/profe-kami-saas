import React from 'react';
import { ShieldAlert, XCircle, LogOut } from 'lucide-react';

interface SecurityAlertModalProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
}

export const SecurityAlertModal: React.FC<SecurityAlertModalProps> = ({
  isOpen,
  message,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border-2 border-vino-600 overflow-hidden transform transition-all">
        {/* Header de Alerta de Seguridad */}
        <div className="bg-gradient-to-r from-vino-900 via-vino-800 to-vino-700 px-6 py-4 flex items-center gap-3 text-white">
          <div className="p-2 bg-white/10 rounded-xl">
            <ShieldAlert className="w-7 h-7 text-rosa-300 animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg font-bold font-outfit">ALERTA DE SEGURIDAD ESTRICTA</h3>
            <p className="text-xs text-rosa-200">Protocolo de Protección de Acceso Profe Kami</p>
          </div>
        </div>

        {/* Contenido */}
        <div className="p-6 space-y-4">
          <div className="flex items-start gap-3 bg-vino-50 border border-vino-200 rounded-xl p-4">
            <XCircle className="w-6 h-6 text-vino-600 shrink-0 mt-0.5" />
            <div className="text-sm text-calido-800 space-y-1">
              <p className="font-semibold text-vino-950">Acceso no autorizado restringido</p>
              <p className="leading-relaxed">{message}</p>
            </div>
          </div>

          <div className="bg-calido-50 rounded-xl p-3 text-xs text-calido-700 space-y-1 border border-calido-200">
            <p className="font-medium text-calido-900">📌 Medidas aplicadas automáticamente:</p>
            <ul className="list-disc list-inside space-y-0.5 pl-1">
              <li>Cierre inmediato de sesión (Firebase Auth signOut forzado).</li>
              <li>Bloqueo de token y revocación de permisos de navegación.</li>
              <li>Acceso al panel exclusivo reservado para: <strong className="text-vino-800">profekami06@gmail.com</strong>.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-calido-50 border-t border-calido-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm text-white bg-vino-700 hover:bg-vino-800 transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            <LogOut className="w-4 h-4" />
            Entendido y Salir
          </button>
        </div>
      </div>
    </div>
  );
};
