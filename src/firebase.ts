import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

/**
 * Configuración oficial de Firebase - SaaS Profe Kami
 * Project ID: profekamisiste
 * Regla de seguridad en Firestore: esProfeKami() -> request.auth.token.email == 'profekami06@gmail.com'
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDummyKeyReplaceWithOfficialKeyIfAvailable",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "profekamisiste.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "profekamisiste",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "profekamisiste.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "191692261980",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:191692261980:web:1ec44cb3df0f21ee880cf2",
};

// Singleton de Firebase App
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Servicios oficiales exportados
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Proveedor de autenticación Google con forzado de selección de cuenta
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Correo único autorizado para el rol de Super Administrador
export const SUPER_ADMIN_EMAIL = 'profekami06@gmail.com';
