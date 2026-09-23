"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { mobileBottomNav } from "./nav-items";

export function BottomNavigation({ onMenuClick }: { onMenuClick: () => void }) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navigation mobile"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-gray-200 bg-white/95 px-2 pb-[env(safe-area-inset-bottom)] pt-1 shadow-[0_-8px_24px_rgb(11_61_36_/_0.08)] backdrop-blur lg:hidden"
    >
      <div className="mx-auto grid h-16 max-w-lg grid-cols-5">
        {mobileBottomNav.map((item) => {
          const isMenu = item.href === "#menu";
          const active = !isMenu && pathname === item.href;
          const className = cn(
            "flex min-w-0 flex-col items-center justify-center gap-1 rounded-xl px-1 text-[10px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cultiva-green focus-visible:ring-offset-2",
            active
              ? "bg-cultiva-green-soft text-cultiva-green"
              : "text-gray-500 hover:bg-gray-50 hover:text-cultiva-green active:scale-[0.98]"
          );

          if (isMenu) {
            return (
              <button
                key={item.label}
                type="button"
                onClick={onMenuClick}
                aria-label="Ouvrir les autres rubriques"
                className={className}
              >
                <item.icon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
                <span className="truncate">{item.label}</span>
              </button>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={className}
            >
              <item.icon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
