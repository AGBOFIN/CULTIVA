"use client";

import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import * as authService from "@/services/auth";
import type { ProfileInput, RegisterInput, User } from "@/types";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (identifier: string, password: string) => Promise<User>;
  register: (input: RegisterInput) => Promise<User>;
  logout: () => Promise<void>;
  updateProfile: (input: ProfileInput) => Promise<User>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Lecture de la session (cookie httpOnly) : le premier rendu affiche
    // l'écran de chargement, sans mismatch d'hydratation.
    let cancelled = false;
    authService
      .getSession()
      .then((sessionUser) => {
        if (!cancelled) {
          setUser(sessionUser);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (identifier: string, password: string) => {
    const loggedUser = await authService.login(identifier, password);
    setUser(loggedUser);
    return loggedUser;
  }, []);

  const register = useCallback(async (input: RegisterInput) => {
    const newUser = await authService.register(input);
    setUser(newUser);
    return newUser;
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
  }, []);

  const updateProfile = useCallback(async (input: ProfileInput) => {
    const updated = await authService.updateProfile(input);
    setUser(updated);
    return updated;
  }, []);

  const value = useMemo(
    () => ({ user, loading, login, register, logout, updateProfile }),
    [user, loading, login, register, logout, updateProfile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
