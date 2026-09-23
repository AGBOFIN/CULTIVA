import {
  Bell,
  CalendarDays,
  ClipboardList,
  LayoutDashboard,
  Map,
  Package,
  Sprout,
  UserRound,
  Wallet,
  Wheat,
  CloudSun,
  Menu,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const mainNav: NavItem[] = [
  { label: "Tableau de bord", href: "/dashboard", icon: LayoutDashboard },
  { label: "Exploitations", href: "/farms", icon: Sprout },
  { label: "Parcelles", href: "/fields", icon: Map },
  { label: "Cultures", href: "/crops", icon: Wheat },
  { label: "Activités", href: "/activities", icon: ClipboardList },
  { label: "Calendrier", href: "/calendar", icon: CalendarDays },
  { label: "Récoltes", href: "/harvests", icon: Package },
  { label: "Finances", href: "/finances", icon: Wallet },
  { label: "Météo", href: "/weather", icon: CloudSun },
  { label: "Notifications", href: "/notifications", icon: Bell },
  { label: "Profil", href: "/profile", icon: UserRound },
];

/** Destinations fréquentes dans la barre basse sur mobile. */
export const mobileBottomNav: NavItem[] = [
  mainNav[0],
  mainNav[1],
  mainNav[2],
  mainNav[4],
  { label: "Menu", href: "#menu", icon: Menu },
];

/** Modules secondaires, accessibles depuis le menu hamburger sur mobile. */
export const mobileDrawerNav: NavItem[] = mainNav.filter(
  (item) => !mobileBottomNav.some((bottomItem) => bottomItem.href === item.href) && item.href !== "/notifications"
);
