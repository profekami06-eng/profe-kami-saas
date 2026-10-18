import React, { useState } from 'react';
import { ShieldCheck, AlertCircle, FileText, Lock, ExternalLink } from 'lucide-react';
import { CURRENT_LEGAL_VERSIONS } from '../../services/legalAuditService';

interface LegalConsentBoxProps {
  acceptedTerms: boolean;
  acceptedPrivacy: boolean;
  onTermsChange: (accepted: boolean) => void;
  onPrivacyChange: (accepted: boolean) => void;
  onOpenTermsModal?: () => void;
  onOpenPrivacyModal?: () => void;
  error?: string | null;
}

export const LegalConsentBox: React.FC<LegalConsentBoxProps> = ({
  acceptedTerms,
  acceptedPrivacy,
  onTermsChange,
  onPrivacyChange,
  onOpenTermsModal,
  onOpenPrivacyModal,
  error,
}) => {
  const [showRetractoDetails, setShowRetractoDetails] = useState(false);

  const isFullyCompliant = acceptedTerms && acceptedPrivacy;

  return (
    <div className="rounded-2xl border border-vino-200 bg-white/90 p-5 shadow-sm space-y-4">
      {/* Encabezado de Cumplimiento Legal SIC */}
      <div className="flex items-center justify-between pb-3 border-b border-vino-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-vino-100 text-vino-800 rounded-lg">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold font-outfit text-vino-950">
              Consentimiento Legal Obligatorio (SIC Colombia)
            </h4>
            <p className="text-xs text-calido-600">
              Ley 1581 de 2012 (Habeas Data) y Ley 1480 de 2011 (Estatuto del Consumidor)
            </p>
          </div>
        </div>
        <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${
          isFullyCompliant 
            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
            : 'bg-amber-100 text-amber-800 border border-amber-200'
        }`}>
          {isFullyCompliant ? '✓ Consentimientos Válidos' : 'Requiere aceptación'}
        </span>
      </div>

      {/* Casillas de Aceptación INDEPENDIENTES (Prohibido unificar en un solo check) */}
      <div className="space-y-3 pt-1">
        {/* Casilla 1: Términos y Condiciones */}
        <div className="flex items-start gap-3 p-3 rounded-xl bg-calido-50/70 border border-calido-200 hover:border-vino-300 transition-colors">
          <input
            id="consent-terms"
            type="checkbox"
            checked={acceptedTerms}
            onChange={(e) => onTermsChange(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-vino-300 text-vino-700 focus:ring-vino-500 cursor-pointer accent-vino-700"
          />
          <label htmlFor="consent-terms" className="text-xs text-calido-800 leading-relaxed cursor-pointer select-none">
            <strong className="text-vino-900">Casilla 1:</strong> He leído, comprendo y acepto los{' '}
            <button
              type="button"
              onClick={onOpenTermsModal}
              className="inline-flex items-center gap-1 font-semibold text-vino-700 hover:text-vino-900 underline underline-offset-2"
            >
              <FileText className="w-3 h-3" />
              Términos y Condiciones del Servicio Educativo
              <ExternalLink className="w-2.5 h-2.5" />
            </button>{' '}
            de Profe Kami en Pasto ({CURRENT_LEGAL_VERSIONS.terms}).
          </label>
        </div>

        {/* Casilla 2: Política de Privacidad y Tratamiento de Datos (Menores de Edad y Acudientes) */}
        <div className="flex items-start gap-3 p-3 rounded-xl bg-calido-50/70 border border-calido-200 hover:border-vino-300 transition-colors">
          <input
            id="consent-privacy"
            type="checkbox"
            checked={acceptedPrivacy}
            onChange={(e) => onPrivacyChange(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-vino-300 text-vino-700 focus:ring-vino-500 cursor-pointer accent-vino-700"
          />
          <label htmlFor="consent-privacy" className="text-xs text-calido-800 leading-relaxed cursor-pointer select-none">
            <strong className="text-vino-900">Casilla 2:</strong> Como acudiente/titular, autorizo de manera previa, expresa e informada el tratamiento de mis datos personales y los del menor a mi cargo conforme a la{' '}
            <button
              type="button"
              onClick={onOpenPrivacyModal}
              className="inline-flex items-center gap-1 font-semibold text-vino-700 hover:text-vino-900 underline underline-offset-2"
            >
              <Lock className="w-3 h-3" />
              Política de Tratamiento de Datos Personales
              <ExternalLink className="w-2.5 h-2.5" />
            </button>{' '}
            y la Ley 1581 de 2012 de Colombia.
          </label>
        </div>
      </div>

      {/* Cláusula Informativa: Derecho de Retracto (Art. 47 Ley 1480 de 2011) */}
      <div className="bg-rosa-50/70 rounded-xl p-3 border border-rosa-200 text-xs text-vino-950">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-vino-600 animate-pulse"></span>
            <span className="font-semibold text-vino-900 font-outfit">
              Garantía Legal: Derecho de Retracto (Art. 47 Ley 1480 de 2011)
            </span>
          </div>
          <button
            type="button"
            onClick={() => setShowRetractoDetails(!showRetractoDetails)}
            className="text-[11px] font-medium text-vino-700 hover:text-vino-900 underline"
          >
            {showRetractoDetails ? 'Ocultar' : 'Ver detalle'}
          </button>
        </div>
        
        {showRetractoDetails && (
          <p className="mt-2 text-calido-700 leading-relaxed pt-2 border-t border-rosa-200">
            En compras de paquetes o cursos mediante métodos a distancia o electrónicos, el acudiente tiene derecho a retractarse dentro de los <strong>cinco (5) días hábiles</strong> siguientes a la fecha de matrícula o pago, solicitando la reversión total del dinero pagado, siempre que el servicio formativo no haya sido consumido en su totalidad.
          </p>
        )}
      </div>

      {/* Error de validación en caso de intento de envío sin aceptación */}
      {error && (
        <div className="flex items-center gap-2 text-xs text-rose-700 bg-rose-50 border border-rose-200 rounded-lg p-2.5 animate-shake">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Nota de auditoría técnica */}
      <div className="text-[10px] text-calido-600 flex items-center justify-between pt-1">
        <span>Trazabilidad: Se auditará fecha, hora (COT Colombia), IP pública y versión legal.</span>
        <span className="font-mono">SIC Compliant v1.0</span>
      </div>
    </div>
  );
};
