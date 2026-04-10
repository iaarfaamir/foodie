'use client';

import { create } from 'zustand';

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
  loading: boolean;
  setUser: (user: User | null, token: string | null) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  loading: true,
  setUser: (user, token) => {
    if (user && token) {
      localStorage.setItem('foodie_user', JSON.stringify(user));
      localStorage.setItem('foodie_token', token);
    }
    set({ user, token, loading: false });
  },
  logout: () => {
    localStorage.removeItem('foodie_user');
    localStorage.removeItem('foodie_token');
    set({ user: null, token: null, loading: false });
  },
}));
