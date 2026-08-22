"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useUnreadCount } from "@/hooks/use-unread-count";
import { initials } from "@/lib/format";
import { cn } from "@/lib/utils";
import { mainNav } from "./nav-items";

export function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const unreadCount = useUnreadCount();

  return (
    <div className="flex flex-col h-full">
      <nav className="flex-1 overflow-y-auto p-3 space-y-1" aria-label="Navigation principale">
        {mainNav.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors",
                active
                  ? "bg-cultiva-green text-white font-medium"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              )}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.href === "/notifications" && unreadCount > 0 && (
                <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-cultiva-green text-[11px] font-semibold text-white">
                  {unreadCount}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-white/10">
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="w-9 h-9 rounded-full bg-cultiva-green flex items-center justify-center text-sm font-semibold text-white flex-shrink-0">
            {user ? initials(user.fullName) : "?"}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-white truncate">{user?.fullName}</div>
            <div className="text-xs text-white/60 truncate">Agriculteur</div>
          </div>
          <button
            type="button"
            onClick={() => {
              void logout();
              onNavigate?.();
            }}
            aria-label="Se déconnecter"
            className="text-white/60 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <LogOut className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
