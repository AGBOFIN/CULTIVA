"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useAuth } from "@/hooks/use-auth";
import { FullScreenLoader } from "@/components/ui/spinner";
import { Sidebar } from "./sidebar";
import { TopBar } from "./topbar";
import { Drawer } from "./drawer";

export function AppShell({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return <FullScreenLoader label="Chargement de votre espace agricole..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="lg:pl-64">
        <TopBar onMenuClick={() => setDrawerOpen(true)} />
        <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
          {children}
        </main>
      </div>
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}
