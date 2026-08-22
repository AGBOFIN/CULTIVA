"use client";

import { useContext } from "react";
import { AuthContext } from "@/store/auth-context";

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth doit être utilisé à l'intérieur d'un <AuthProvider>.");
  }
  return ctx;
}
