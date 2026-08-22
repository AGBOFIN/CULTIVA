"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Menu } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useUnreadCount } from "@/hooks/use-unread-count";
import { initials } from "@/lib/format";
import { mainNav } from "./nav-items";

export function TopBar({ onMenuClick }: { onMenuClick: () => void }) {
  const pathname = usePathname();
  const { user } = useAuth();
  const unreadCount = useUnreadCount();
  const current = mainNav.find((item) => pathname === item.href);

  return (
    <header className="lg:hidden sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-gray-100">
      <div className="flex items-center justify-between px-4 h-16">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Ouvrir le menu"
          className="p-2 -ml-2 text-gray-700 hover:text-cultiva-green transition-colors"
        >
          <Menu className="w-6 h-6" aria-hidden="true" />
        </button>

        <div className="font-semibold text-gray-900 truncate">
          {current?.label ?? "CULTIVA"}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/notifications"
            aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} non lues)` : ""}`}
            className="relative w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:text-cultiva-green hover:bg-green-50 transition-colors"
          >
            <Bell className="w-5 h-5" aria-hidden="true" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 inline-flex items-center justify-center min-w-4.5 h-4.5 px-1 rounded-full bg-red-500 text-[10px] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </Link>
          <Link
            href="/profile"
            aria-label="Voir mon profil"
            className="w-9 h-9 rounded-full bg-cultiva-green flex items-center justify-center text-sm font-semibold text-white"
          >
            {user ? initials(user.fullName) : "?"}
          </Link>
        </div>
      </div>
    </header>
  );
}
