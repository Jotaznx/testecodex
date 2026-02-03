'use client';

import { useEffect, useState } from 'react';
import type { User } from '@/lib/types';

const STORAGE_KEY = 'rodizio-auth';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      setUser(JSON.parse(raw));
    }
  }, []);

  const login = (nextUser: User) => {
    setUser(nextUser);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
  };

  const logout = () => {
    setUser(null);
    window.localStorage.removeItem(STORAGE_KEY);
  };

  return { user, login, logout };
}
