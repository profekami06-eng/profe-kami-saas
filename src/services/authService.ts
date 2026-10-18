import { 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
} from 'firebase/auth';
import type { User as FirebaseUser, Unsubscribe } from 'firebase/auth';
import { auth, googleProvider, SUPER_ADMIN_EMAIL } from '../config/firebase';
import type { AdminUser } from '../types/auth';

export class UnauthorizedAdminError extends Error {
  email: string;
  constructor(email: string) {
    super(`Acceso denegado: El correo "${email}" no está autorizado como Super Administrador de Profe Kami. La sesión ha sido revocada de inmediato.`);
    this.name = 'UnauthorizedAdminError';
    this.email = email;
  }
}

/**
 * Verifica si un email corresponde exactamente al Super Administrador
 */
export function isAuthorizedSuperAdmin(email: string | null | undefined): boolean {
  if (!email) return false;
  return email.toLowerCase().trim() === SUPER_ADMIN_EMAIL;
}

/**
 * Transforma un FirebaseUser a AdminUser
 */
export function mapFirebaseUserToAdmin(user: FirebaseUser): AdminUser {
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    isSuperAdmin: isAuthorizedSuperAdmin(user.email),
  };
}

/**
 * Inicia sesión con Google y aplica la regla de restricción estricta de Super Administrador.
 * Si el usuario autenticado en Google no es profekami06@gmail.com, se desconecta inmediatamente
 * y arroja una excepción.
 */
export async function signInWithGoogleAdmin(): Promise<AdminUser> {
  try {
    const credential = await signInWithPopup(auth, googleProvider);
    const user = credential.user;
    const email = user.email || '';

    // REGLA CRÍTICA: Restricción estricta de correo
    if (!isAuthorizedSuperAdmin(email)) {
      // Desconexión forzosa inmediata
      await signOut(auth);
      throw new UnauthorizedAdminError(email);
    }

    return mapFirebaseUserToAdmin(user);
  } catch (error: any) {
    // Si ya es nuestra excepción personalizada, la propagamos
    if (error instanceof UnauthorizedAdminError) {
      throw error;
    }

    // Tratamiento de errores conocidos de Firebase
    if (error.code === 'auth/popup-closed-by-user') {
      throw new Error('El inicio de sesión fue cancelado antes de completarse.');
    } else if (error.code === 'auth/cancelled-popup-request') {
      throw new Error('Se canceló la solicitud de autenticación.');
    } else if (error.code === 'auth/network-request-failed') {
      throw new Error('Error de conexión a internet. Por favor verifica tu red.');
    } else if (error.code === 'auth/invalid-api-key' || error.code === 'auth/api-key-not-valid') {
      throw new Error('La API Key de Firebase no es válida o está en modo de configuración.');
    }

    throw new Error(error.message || 'Ocurrió un error inesperado al intentar autenticarse con Google.');
  }
}

/**
 * Cierre de sesión seguro
 */
export async function signOutAdmin(): Promise<void> {
  await signOut(auth);
}

/**
 * Listener del estado de autenticación con verificación continua de seguridad.
 * Si un token se refresca o entra una sesión no autorizada, se expulsa al instante.
 */
export function subscribeToAuthChanges(
  onValidUser: (user: AdminUser | null) => void,
  onUnauthorizedAttempt: (email: string) => void
): Unsubscribe {
  return onAuthStateChanged(auth, async (firebaseUser) => {
    if (!firebaseUser) {
      onValidUser(null);
      return;
    }

    const email = firebaseUser.email || '';
    if (!isAuthorizedSuperAdmin(email)) {
      // Expulsión de seguridad inmediata
      await signOut(auth);
      onValidUser(null);
      onUnauthorizedAttempt(email);
      return;
    }

    onValidUser(mapFirebaseUserToAdmin(firebaseUser));
  });
}
