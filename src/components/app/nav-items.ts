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
