import React from 'react';
import { X, Shield, FileCheck } from 'lucide-react';
import { CURRENT_LEGAL_VERSIONS } from '../../services/legalAuditService';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-vino-200 overflow-hidden flex flex-col max-h-[85vh]">
        <div className="bg-gradient-to-r from-vino-900 to-vino-700 px-6 py-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-rosa-300" />
            <h3 className="font-bold font-outfit text-lg">Términos y Condiciones del Servicio Formativo</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4 text-xs text-calido-800 leading-relaxed">
          <div className="p-3 bg-vino-50 rounded-xl text-vino-900 font-medium">
            Versión: {CURRENT_LEGAL_VERSIONS.terms} | Entidad: Academia de Matemáticas Profe Kami | Pasto, Nariño, Colombia.
          </div>

          <section className="space-y-1.5">
            <h4 className="font-bold text-sm text-vino-950 font-outfit">1. Objeto y Filosofía Pedagógica</h4>
            <p>
              Profe Kami ofrece servicios de refuerzo, nivelación y estimulación del pensamiento lógico-matemático para niños y jóvenes bajo la metodología activa "La matemática es un juego". Las sesiones se imparten de manera presencial en la ciudad de Pasto y virtualmente según el plan contratado.
            </p>
          </section>

          <section className="space-y-1.5">
            <h4 className="font-bold text-sm text-vino-950 font-outfit">2. Responsabilidades del Acudiente</h4>
            <p>
              El padre, madre o tutor legal garantiza la veracidad de la información del menor y se compromete a acompañar el proceso educativo, garantizando la puntualidad y la asistencia en las sesiones programadas.
            </p>
          </section>

          <section className="space-y-1.5">
            <h4 className="font-bold text-sm text-vino-950 font-outfit">3. Derecho de Retracto (Estatuto del Consumidor Ley 1480 de 2011)</h4>
            <p>
              De conformidad con el Artículo 47 de la Ley 1480 de 2011, en las ventas mediante canales no tradicionales o a distancia, el acudiente podrá ejercer el derecho de retracto dentro de los <strong>cinco (5) días hábiles</strong> siguientes a la fecha de pago o matrícula. Profe Kami devolverá el 100% de los dineros pagados sin deducciones de ninguna índole en un plazo máximo de 30 días calendario.
            </p>
          </section>

          <section className="space-y-1.5">
            <h4 className="font-bold text-sm text-vino-950 font-outfit">4. Políticas de Reagendamiento y Cancelación</h4>
            <p>
              Las clases particulares canceladas con al menos 12 horas de antelación podrán ser reprogramadas dentro del mismo mes calendario según disponibilidad del docente.
            </p>
          </section>

          <section className="space-y-1.5">
            <h4 className="font-bold text-sm text-vino-950 font-outfit">5. Jurisdicción y Ley Aplicable</h4>
            <p>
              Cualquier controversia se regirá bajo las leyes de la República de Colombia y la supervisión de la Superintendencia de Industria y Comercio (SIC).
            </p>
          </section>
        </div>

        <div className="px-6 py-3 bg-calido-50 border-t border-calido-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-vino-700 hover:bg-vino-800 text-white rounded-xl text-xs font-semibold transition-all"
          >
            Cerrar Lectura
          </button>
        </div>
      </div>
    </div>
  );
};

export const PrivacyModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-vino-200 overflow-hidden flex flex-col max-h-[85vh]">
        <div className="bg-gradient-to-r from-vino-900 to-vino-700 px-6 py-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-rosa-300" />
            <h3 className="font-bold font-outfit text-lg">Política de Tratamiento de Datos (Ley 1581 de 2012)</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4 text-xs text-calido-800 leading-relaxed">
          <div className="p-3 bg-rosa-50 border border-rosa-200 rounded-xl text-vino-900 font-medium">
            Cumplimiento Circular Única SIC | Habeas Data Colombia | Versión: {CURRENT_LEGAL_VERSIONS.privacy}
          </div>

          <section className="space-y-1.5">
            <h4 className="font-bold text-sm text-vino-950 font-outfit">1. Responsable del Tratamiento</h4>
            <p>
              Profe Kami, con sede de operaciones en Pasto (Nariño, Colombia), es el Responsable del tratamiento de los datos personales recolectados a través de esta plataforma web.
            </p>
          </section>

          <section className="space-y-1.5">
            <h4 className="font-bold text-sm text-vino-950 font-outfit">2. Tratamiento Especial de Datos de Menores de Edad</h4>
            <p>
              En estricto cumplimiento del Artículo 7 de la Ley 1581 de 2012 y el Artículo 12 del Decreto 1377 de 2013, Profe Kami vela por el interés superior de los niños, niñas y adolescentes. Los datos de menores recolectados se limitan exclusivamente a fines académicos, de progreso pedagógico y contacto directo con sus acudientes autorizados.
            </p>
          </section>

          <section className="space-y-1.5">
            <h4 className="font-bold text-sm text-vino-950 font-outfit">3. Finalidades Autorizadas</h4>
            <ul className="list-disc list-inside space-y-1 pl-1">
              <li>Gestión de matrícula, seguimiento académico y reporte de avances lúdico-matemáticos.</li>
              <li>Envío de notificaciones de clases, horarios y material didáctico vía WhatsApp o correo.</li>
              <li>Emisión de comprobantes de pago y facturación.</li>
              <li>Auditoría de cumplimiento legal ante requerimientos de autoridades competentes.</li>
            </ul>
          </section>

          <section className="space-y-1.5">
            <h4 className="font-bold text-sm text-vino-950 font-outfit">4. Derechos del Titular (Habeas Data)</h4>
            <p>
              El titular o su representante legal puede conocer, actualizar, rectificar o solicitar la supresión de sus datos mediante solicitud dirigida al canal oficial: <strong className="text-vino-800">profekami06@gmail.com</strong>.
            </p>
          </section>
        </div>

        <div className="px-6 py-3 bg-calido-50 border-t border-calido-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-vino-700 hover:bg-vino-800 text-white rounded-xl text-xs font-semibold transition-all"
          >
            Cerrar Lectura
          </button>
        </div>
      </div>
    </div>
  );
};
