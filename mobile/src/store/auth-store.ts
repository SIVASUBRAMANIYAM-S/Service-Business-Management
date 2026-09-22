import { create } from 'zustand';

type AuthState = {
  userId: string | null;
  email: string | null;
  isSignedIn: boolean;
  signIn: (params: { userId: string; email: string }) => void;
  signOut: () => void;
};

// Placeholder store for now — Phase 2 wires this up to real Supabase Auth
// sessions (see docs/02-mvp-scope.md for the phase breakdown).
export const useAuthStore = create<AuthState>((set) => ({
  userId: null,
  email: null,
  isSignedIn: false,
  signIn: ({ userId, email }) => set({ userId, email, isSignedIn: true }),
  signOut: () => set({ userId: null, email: null, isSignedIn: false }),
}));
