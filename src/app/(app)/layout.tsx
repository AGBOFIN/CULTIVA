import type { ReactNode } from "react";
import { AuthProvider } from "@/store/auth-context";
import { AppShell } from "@/components/app/app-shell";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <AppShell>{children}</AppShell>
    </AuthProvider>
  );
}
