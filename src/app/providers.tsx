'use client';

import { useState, useEffect, type ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import { AuthContext, STORAGE_KEY, createAuthActions } from '@/hooks/useAuth';
import type { User } from '@/lib/types';

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored) as User);
      }
    } catch {
      // ignore parse errors
    } finally {
      setIsLoading(false);
    }
  }, []);

  const { login, register, logout, updateUser } = createAuthActions(setUser, setIsLoading);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#fff',
            color: '#212121',
            border: '1px solid #E0E0E0',
            borderRadius: '12px',
            padding: '12px 16px',
            fontSize: '14px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
          },
          success: {
            iconTheme: { primary: '#2E7D32', secondary: '#fff' },
          },
          error: {
            iconTheme: { primary: '#D32F2F', secondary: '#fff' },
          },
        }}
      />
    </AuthProvider>
  );
}
