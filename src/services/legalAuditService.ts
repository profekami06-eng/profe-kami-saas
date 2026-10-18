import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import type { ConsentAuditRecord } from '../types/legal';

export const CURRENT_LEGAL_VERSIONS = {
  terms: 'v1.0-2026-SIC-COT',
  privacy: 'v1.0-2026-HABEAS-DATA',
  retractoLaw: 'Ley 1480 de 2011 Art. 47 (5 días hábiles)',
};

/**
 * Obtiene la dirección IP pública del cliente para trazabilidad exigida por la SIC
 */
export async function fetchClientIp(): Promise<string> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    const response = await fetch('https://api.ipify.org?format=json', {
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    if (!response.ok) throw new Error('Ipify response not ok');
    const data = await response.json();
    return data.ip || '127.0.0.1';
  } catch {
    return 'IP_LOCAL_O_PROTEGIDA';
  }
}

/**
 * Obtiene la fecha y hora formateada en la zona horaria oficial de Colombia (UTC-5)
 */
export function getColombiaTimestamp(): string {
  return new Intl.DateTimeFormat('es-CO', {
    timeZone: 'America/Bogota',
    dateStyle: 'full',
    timeStyle: 'long',
  }).format(new Date());
}

/**
 * Registra y audita la aceptación de consentimiento legal con estricta trazabilidad SIC
 */
export async function recordConsentAudit(params: {
  userName?: string;
  userEmail?: string;
  userPhone?: string;
  userId?: string;
  acceptedTerms: boolean;
  acceptedPrivacy: boolean;
  acknowledgedRetracto?: boolean;
}): Promise<ConsentAuditRecord> {
  // Verificación legal obligatoria: No se puede registrar sin ambas aceptaciones individuales
  if (!params.acceptedTerms) {
    throw new Error('Debe aceptar de manera explícita e independiente los Términos y Condiciones.');
  }
  if (!params.acceptedPrivacy) {
    throw new Error('Debe aceptar de manera explícita e independiente la Política de Tratamiento de Datos Personales.');
  }

  const clientIp = await fetchClientIp();
  const now = new Date();

  const auditRecord: ConsentAuditRecord = {
    userId: params.userId,
    userName: params.userName || 'Usuario Web',
    userEmail: params.userEmail,
    userPhone: params.userPhone,
    acceptedTerms: params.acceptedTerms,
    termsVersion: CURRENT_LEGAL_VERSIONS.terms,
    acceptedPrivacy: params.acceptedPrivacy,
    privacyVersion: CURRENT_LEGAL_VERSIONS.privacy,
    timestamp: now.toISOString(),
    timestampBogota: getColombiaTimestamp(),
    clientIp,
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown',
    acknowledgedRetracto: params.acknowledgedRetracto ?? true,
    retractoDaysNotice: 5,
  };

  // 1. Guardado en Firestore
  try {
    const docRef = await addDoc(collection(db, 'audit_consents'), {
      ...auditRecord,
      createdAtServer: serverTimestamp(),
    });
    auditRecord.id = docRef.id;
  } catch (err) {
    console.warn('[SIC Audit] No se pudo guardar en Firestore directamente (modo offline/reglas en desarrollo), usando persistencia local:', err);
    auditRecord.id = 'LOCAL_' + Date.now();
  }

  // 2. Backup en LocalStorage para redundancia legal
  try {
    const currentLogs = JSON.parse(localStorage.getItem('profe_kami_sic_consents') || '[]');
    currentLogs.unshift(auditRecord);
    localStorage.setItem('profe_kami_sic_consents', JSON.stringify(currentLogs.slice(0, 50)));
  } catch {
    // Si localStorage no está disponible, continuar
  }

  return auditRecord;
}
