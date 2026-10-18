/**
 * Estándar de Cumplimiento Legal Colombiano (SIC - Superintendencia de Industria y Comercio)
 * - Ley 1581 de 2012 (Habeas Data y Tratamiento de Datos Personales)
 * - Ley 1480 de 2011 (Estatuto del Consumidor - Derecho de Retracto Art. 47)
 * - Circular Única de la SIC sobre comercio electrónico
 */

export interface ConsentAuditRecord {
  id?: string;
  userId?: string;
  userEmail?: string;
  userName?: string;
  userPhone?: string;
  
  // Aceptación independiente OBLIGATORIA (prohibido unificar)
  acceptedTerms: boolean;
  termsVersion: string;
  
  acceptedPrivacy: boolean;
  privacyVersion: string;

  // Trazabilidad técnica obligatoria por SIC
  timestamp: string; // ISO 8601
  timestampBogota: string; // Fecha y hora formato Colombia (UTC-5)
  clientIp: string;
  userAgent: string;
  
  // Reconocimiento explícito del Derecho de Retracto (Ley 1480 Art. 47)
  acknowledgedRetracto: boolean;
  retractoDaysNotice: number; // 5 días hábiles
}

export interface LegalDocumentVersion {
  version: string;
  updatedAt: string;
  title: string;
  summary: string;
}
