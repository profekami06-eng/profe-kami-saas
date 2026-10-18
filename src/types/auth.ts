import type { User as FirebaseUser } from 'firebase/auth';

export interface AdminUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  isSuperAdmin: boolean;
}

export interface AuthState {
  user: AdminUser | null;
  rawUser: FirebaseUser | null;
  loading: boolean;
  error: string | null;
}
