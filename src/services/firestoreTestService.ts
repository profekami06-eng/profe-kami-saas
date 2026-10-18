import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth, SUPER_ADMIN_EMAIL } from '../firebase';

export interface FirestoreTestResult {
  success: boolean;
  status: 'PERMITIDO' | 'BLOQUEADO_POR_REGLA' | 'ERROR_CONFIGURACION';
  code?: string;
  message: string;
  details?: any;
  executedBy: string | null;
  timestamp: string;
}

/**
 * Ejecuta una prueba de lectura/escritura en Firestore para comprobar
 * en tiempo real el cumplimiento de la regla de seguridad esProfeKami():
 * request.auth != null && request.auth.token.email == 'profekami06@gmail.com'
 */
export async function runFirestoreSecurityCheck(): Promise<FirestoreTestResult> {
  const currentUser = auth.currentUser;
  const userEmail = currentUser?.email || null;
  const timestamp = new Date().toLocaleTimeString('es-CO');

  const testDocRef = doc(db, 'system_diagnostics', 'security_check');

  try {
    // Intento de escritura en Firestore
    await setDoc(testDocRef, {
      testRunAt: serverTimestamp(),
      verifiedEmail: userEmail,
      isSuperAdminEmail: userEmail?.toLowerCase().trim() === SUPER_ADMIN_EMAIL,
      agent: 'Profe Kami Security Validator',
    });

    // Intento de lectura inmediata
    const snapshot = await getDoc(testDocRef);
    const data = snapshot.data();

    return {
      success: true,
      status: 'PERMITIDO',
      message: `Acceso concedido exitosamente. Las reglas de Firestore validaron la identidad de ${userEmail} mediante esProfeKami().`,
      details: data,
      executedBy: userEmail,
      timestamp,
    };
  } catch (error: any) {
    if (error.code === 'permission-denied' || error.message?.includes('Missing or insufficient permissions')) {
      return {
        success: false,
        status: 'BLOQUEADO_POR_REGLA',
        code: error.code || 'permission-denied',
        message: `Regla de seguridad activa: Firestore denegó el acceso (Código: permission-denied). Solo request.auth.token.email == '${SUPER_ADMIN_EMAIL}' tiene permisos de escritura/lectura.`,
        executedBy: userEmail,
        timestamp,
      };
    }

    return {
      success: false,
      status: 'ERROR_CONFIGURACION',
      code: error.code || 'unknown_error',
      message: error.message || 'Error al comunicarse con los servidores de Firestore.',
      executedBy: userEmail,
      timestamp,
    };
  }
}
