import type { ReactNode } from "react";
import { AuthProvider } from "@/store/auth-context";
import { Logo } from "@/components/app/logo";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50 flex flex-col items-center justify-center px-4 py-10">
        <Logo full className="mb-8" />
        <div className="w-full max-w-md">{children}</div>
        <p className="mt-8 text-xs text-gray-400 text-center">
          CULTIVA — La plateforme intelligente de gestion agricole
        </p>
      </div>
    </AuthProvider>
  );
}
