'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  email: string | null;
  setSession: (data: { accessToken: string; refreshToken: string; email: string }) => void;
  clear: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      email: null,
      setSession: (data) =>
        set({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          email: data.email,
        }),
      clear: () => set({ accessToken: null, refreshToken: null, email: null }),
    }),
    { name: 'rentacar-admin-auth' },
  ),
);
