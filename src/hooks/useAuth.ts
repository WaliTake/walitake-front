'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { User } from '@/lib/types';
import { mockUsers } from '@/lib/data/users';
import { MOCK_CREDENTIALS } from '@/lib/constants';
import { delay } from '@/lib/utils/delay';

// ─── Context types ────────────────────────────────────────────────────────────

export interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
export const STORAGE_KEY = 'walitake_user';

// ─── Shared state factory ─────────────────────────────────────────────────────

export function createAuthActions(
  setUser: React.Dispatch<React.SetStateAction<User | null>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    await delay(800);

    const isValidCredentials =
      (email === MOCK_CREDENTIALS.email && password === MOCK_CREDENTIALS.password) ||
      mockUsers.some((u) => u.email === email);

    if (!isValidCredentials) {
      setIsLoading(false);
      return {
        success: false,
        error: 'Email o contraseña incorrectos. Prueba con usuario@walitake.com / eco2024',
      };
    }

    const foundUser = mockUsers.find((u) => u.email === email) ?? mockUsers[0];
    setUser(foundUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(foundUser));
    setIsLoading(false);
    return { success: true };
  };

  const register = async (name: string, email: string, _password: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    await delay(1000);

    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      joinedAt: new Date().toISOString().split('T')[0],
    };

    setUser(newUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    setIsLoading(false);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const updateUser = (updates: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  return { login, register, logout, updateUser };
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}

// ─── Re-export state hooks for use in provider ────────────────────────────────

export { useState, useEffect, useCallback };
