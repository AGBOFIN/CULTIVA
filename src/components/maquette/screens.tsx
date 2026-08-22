"use client";

import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CloudRain,
  CloudSun,
  Droplets,
  EyeOff,
  FileText,
  Home,
  LayoutDashboard,
  Leaf,
  Lock,
  LogOut,
  MapPin,
  Mail,
  Menu,
  MessageSquare,
  Package,
  PiggyBank,
  Settings,
  ShieldCheck,
  Sprout,
  Sun,
  TrendingUp,
  User,
  Users,
  Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Petits composants partagés (cohérents avec l'identité CULTIVA)      */
/* ------------------------------------------------------------------ */

function ScreenHeader({ title, right }: { title: string; right?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between px-4 pt-3 pb-2">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cultiva-green to-cultiva-darkGreen flex items-center justify-center">
          <Sprout className="w-4 h-4 text-white" />
        </div>
        <div>
          <div className="text-[10px] text-gray-400 font-medium">CULTIVA</div>
          <div className="text-sm font-extrabold text-gray-900 leading-none">{title}</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {right ?? (
          <div className="relative">
            <Bell className="w-5 h-5 text-gray-500" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-red-500" />
          </div>
        )}
        <Menu className="w-5 h-5 text-gray-500" />
      </div>
    </div>
  );
}

function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("bg-white rounded-2xl ring-1 ring-gray-100 shadow-soft p-4", className)}>
      {children}
    </div>
  );
}

function Badge({
  children,
  tone = "green",
}: {
  children: React.ReactNode;
  tone?: "green" | "gold" | "red" | "gray";
}) {
  const tones = {
    green: "bg-cultiva-green/10 text-cultiva-green",
    gold: "bg-cultiva-yellow/15 text-amber-600",
    red: "bg-red-50 text-red-500",
    gray: "bg-gray-100 text-gray-500",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[9px] font-bold",
        tones[tone]
      )}
    >
      {children}
    </span>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between px-4 pt-4 pb-2">
      <span className="text-[11px] font-extrabold uppercase tracking-wider text-gray-400">
        {children}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Écrans                                                              */
/* ------------------------------------------------------------------ */

export function OnboardingScreen() {
  return (
    <div className="h-full flex flex-col relative overflow-hidden">
      {/* Image de fond du cultivateur */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/farmer-hoe.jpg)" }}
      />
      {/* Overlay sombre pour la lisibilité */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-8 text-center">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-cultiva-green-light to-cultiva-yellow flex items-center justify-center shadow-2xl mb-6">
          <Sprout className="w-10 h-10 text-white" />
        </div>
        <h1 className="font-display text-3xl font-extrabold text-white tracking-tight mb-2">
          Bienvenue sur{" "}
          <span className="text-gradient-gold">CULTIVA</span>
        </h1>
        <p className="text-sm text-white/80 leading-relaxed">
          Gérez vos exploitations, parcelles, cultures et finances — tout au même endroit.
        </p>
      </div>
      <div className="relative z-10 px-6 pb-8 space-y-3">
        <div className="flex items-center justify-between bg-white/10 backdrop-blur rounded-2xl px-4 py-3">
          <div className="text-left">
            <div className="text-[10px] text-white/50">Agriculteurs</div>
            <div className="text-lg font-extrabold text-white">500+</div>
          </div>
          <div className="w-px h-8 bg-white/15" />
          <div className="text-left">
            <div className="text-[10px] text-white/50">Parcelles</div>
            <div className="text-lg font-extrabold text-white">1 000+</div>
          </div>
          <div className="w-px h-8 bg-white/15" />
          <div className="text-left">
            <div className="text-[10px] text-white/50">Satisfaction</div>
            <div className="text-lg font-extrabold text-white">99%</div>
          </div>
        </div>
        <button className="w-full bg-gradient-to-r from-cultiva-yellow to-amber-400 text-cultiva-darkGreen-deep rounded-2xl py-3.5 font-extrabold text-sm shadow-lg">
          Créer un compte
        </button>
        <button className="w-full bg-white/10 backdrop-blur border border-white/20 text-white rounded-2xl py-3.5 font-bold text-sm">
          Se connecter
        </button>
      </div>
    </div>
  );
}

export function LoginScreen() {
  return (
    <div className="h-full flex flex-col px-6 pt-10 pb-6 relative overflow-hidden">
      {/* Image de fond du cultivateur (plus subtile) */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-15"
        style={{ backgroundImage: "url(/farmer-hoe.jpg)" }}
      />
      <div className="relative z-10 text-center mb-8">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-cultiva-green to-cultiva-darkGreen flex items-center justify-center shadow-lg mb-4">
          <Sprout className="w-7 h-7 text-white" />
        </div>
        <h1 className="font-display text-2xl font-extrabold text-gray-900">Bon retour 👋</h1>
        <p className="text-xs text-gray-500 mt-1">Connectez-vous pour gérer votre exploitation</p>
      </div>

      <div className="relative z-10 space-y-4">
        <div>
          <label className="text-[11px] font-bold text-gray-600 mb-1.5 block">Email ou téléphone</label>
          <div className="flex items-center gap-2.5 bg-white rounded-xl ring-1 ring-gray-200 px-3.5 py-3">
            <User className="w-4 h-4 text-gray-400" />
            <input
              readOnly
              value="demo@cultiva.africa"
              className="flex-1 text-sm bg-transparent outline-none text-gray-800"
            />
          </div>
        </div>
        <div>
          <label className="text-[11px] font-bold text-gray-600 mb-1.5 block">Mot de passe</label>
          <div className="flex items-center gap-2.5 bg-white rounded-xl ring-1 ring-gray-200 px-3.5 py-3">
            <Lock className="w-4 h-4 text-gray-400" />
            <input readOnly value="••••••••" className="flex-1 text-sm bg-transparent outline-none text-gray-800" />
            <EyeOff className="w-4 h-4 text-gray-400" />
          </div>
        </div>
        <div className="flex justify-end">
          <span className="text-[11px] font-semibold text-cultiva-green">Mot de passe oublié ?</span>
        </div>
        <button className="w-full bg-gradient-to-r from-cultiva-green to-cultiva-darkGreen text-white rounded-2xl py-3.5 font-extrabold text-sm shadow-[0_12px_28px_-10px_rgb(27_138_68/0.7)]">
          Se connecter
        </button>
      </div>

      <div className="relative z-10 mt-auto text-center">
        <p className="text-xs text-gray-500">
          Pas encore de compte ?{" "}
          <span className="font-bold text-cultiva-green">S&apos;inscrire</span>
        </p>
      </div>
    </div>
  );
}

export function RegisterScreen() {
  return (
    <div className="h-full flex flex-col px-6 pt-10 pb-6 relative overflow-hidden">
      {/* Image de fond du cultivateur (subtile) */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-15"
        style={{ backgroundImage: "url(/farmer-hoe.jpg)" }}
      />
      <div className="relative z-10 text-center mb-6">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-cultiva-green to-cultiva-darkGreen flex items-center justify-center shadow-lg mb-4">
          <Sprout className="w-7 h-7 text-white" />
        </div>
        <h1 className="font-display text-2xl font-extrabold text-gray-900">Créez votre compte</h1>
        <p className="text-xs text-gray-500 mt-1">Rejoignez 500+ agriculteurs sur CULTIVA</p>
      </div>

      <div className="relative z-10 space-y-3">
        <div>
          <label className="text-[11px] font-bold text-gray-600 mb-1.5 block">Nom complet</label>
          <div className="flex items-center gap-2.5 bg-white rounded-xl ring-1 ring-gray-200 px-3.5 py-3">
            <User className="w-4 h-4 text-gray-400" />
            <input
              readOnly
              placeholder="Koffi Mensah"
              className="flex-1 text-sm bg-transparent outline-none text-gray-800 placeholder:text-gray-300"
            />
          </div>
        </div>
        <div>
          <label className="text-[11px] font-bold text-gray-600 mb-1.5 block">Email ou téléphone</label>
          <div className="flex items-center gap-2.5 bg-white rounded-xl ring-1 ring-gray-200 px-3.5 py-3">
            <Mail className="w-4 h-4 text-gray-400" />
            <input
              readOnly
              placeholder="email@exemple.com"
              className="flex-1 text-sm bg-transparent outline-none text-gray-800 placeholder:text-gray-300"
            />
          </div>
        </div>
        <div>
          <label className="text-[11px] font-bold text-gray-600 mb-1.5 block">Mot de passe</label>
          <div className="flex items-center gap-2.5 bg-white rounded-xl ring-1 ring-gray-200 px-3.5 py-3">
            <Lock className="w-4 h-4 text-gray-400" />
            <input
              readOnly
              value="••••••••"
              className="flex-1 text-sm bg-transparent outline-none text-gray-800"
            />
            <EyeOff className="w-4 h-4 text-gray-400" />
          </div>
        </div>
        <button className="w-full bg-gradient-to-r from-cultiva-green to-cultiva-darkGreen text-white rounded-2xl py-3.5 font-extrabold text-sm shadow-[0_12px_28px_-10px_rgb(27_138_68/0.7)]">
          S&apos;inscrire
        </button>
      </div>

      <div className="relative z-10 mt-auto text-center">
        <p className="text-xs text-gray-500">
          Déjà un compte ?{" "}
          <span className="font-bold text-cultiva-green">Se connecter</span>
        </p>
      </div>
    </div>
  );
}

export function DashboardScreen() {
  const kpis = [
    { icon: Home, label: "Exploitations", value: "2", tint: "bg-cultiva-green/10 text-cultiva-green" },
    { icon: MapPin, label: "Parcelles", value: "5", tint: "bg-sky-500/10 text-sky-500" },
    { icon: Sprout, label: "Cultures", value: "3", tint: "bg-cultiva-yellow/15 text-amber-600" },
    { icon: TrendingUp, label: "Bénéfice", value: "+1,2M", tint: "bg-red-50 text-red-500" },
  ];
  const bars = [38, 55, 42, 70, 58, 85, 66];

  return (
    <div className="h-full flex flex-col bg-cultiva-mist">
      <ScreenHeader title="Bonjour, Koffi 👋" />
      <div className="px-4">
        <div className="bg-gradient-to-r from-cultiva-green to-cultiva-darkGreen rounded-2xl p-4 text-white shadow-lift">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-[10px] text-white/60">Bénéfice du mois</div>
              <div className="text-2xl font-extrabold">+1 270 000 FCFA</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
              <Wallet className="w-5 h-5" />
            </div>
          </div>
          <div className="flex gap-4 text-[10px] text-white/80">
            <span className="flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" /> Revenus 2,45M
            </span>
            <span className="flex items-center gap-1">
              <ArrowDownRight className="w-3 h-3" /> Dépenses 1,18M
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5 px-4 pt-3">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-2xl ring-1 ring-gray-100 shadow-soft p-3">
            <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center mb-2", kpi.tint)}>
              <kpi.icon className="w-4 h-4" />
            </div>
            <div className="text-lg font-extrabold text-gray-900 leading-none">{kpi.value}</div>
            <div className="text-[10px] text-gray-500 mt-1">{kpi.label}</div>
          </div>
        ))}
      </div>

      <Card className="mx-4 mt-3">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-bold text-gray-700">Récoltes · 6 derniers mois</span>
          <span className="text-[10px] font-extrabold text-cultiva-green">+18%</span>
        </div>
        <div className="flex items-end gap-1.5 h-14">
          {bars.map((h, i) => (
            <div
              key={i}
              style={{ height: `${h}%` }}
              className={cn(
                "flex-1 rounded-t-md",
                i === bars.length - 1
                  ? "bg-gradient-to-t from-cultiva-yellow to-amber-300"
                  : "bg-gradient-to-t from-cultiva-green to-cultiva-green-light"
              )}
            />
          ))}
        </div>
      </Card>

      <SectionLabel>Aujourd&apos;hui</SectionLabel>
      <div className="px-4 space-y-2 pb-4">
        <div className="flex items-center gap-3 bg-white rounded-2xl ring-1 ring-gray-100 shadow-soft p-3">
          <div className="w-8 h-8 rounded-full bg-cultiva-green/10 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4 text-cultiva-green" />
          </div>
          <div className="flex-1">
            <div className="text-xs font-bold text-gray-800">Récolte terminée — Parcelle A</div>
            <div className="text-[10px] text-gray-500">Aujourd&apos;hui · 2,4 t de maïs</div>
          </div>
          <Badge>Terminée</Badge>
        </div>
        <div className="flex items-center gap-3 bg-white rounded-2xl ring-1 ring-gray-100 shadow-soft p-3">
          <div className="w-8 h-8 rounded-full bg-cultiva-yellow/15 flex items-center justify-center">
            <CalendarDays className="w-4 h-4 text-amber-500" />
          </div>
          <div className="flex-1">
            <div className="text-xs font-bold text-gray-800">Irrigation — Parcelle B</div>
            <div className="text-[10px] text-gray-500">Demain · 06:00</div>
          </div>
          <Badge tone="gold">À venir</Badge>
        </div>
      </div>
    </div>
  );
}

export function FarmsScreen() {
  const farms = [
    {
      name: "Plantation familiale",
      type: "Maraîchage",
      location: "Kpalimé, Togo",
      area: "8 ha",
      color: "from-cultiva-green to-cultiva-darkGreen",
    },
    {
      name: "Champ de riz",
      type: "Riziculture",
      location: "Agou, Togo",
      area: "5 ha",
      color: "from-sky-400 to-cultiva-green",
    },
  ];
  return (
    <div className="h-full flex flex-col bg-cultiva-mist">
      <ScreenHeader title="Exploitations" right={<span className="text-xs font-bold text-cultiva-green">+ Ajouter</span>} />
      <div className="px-4 space-y-3 pb-24">
        {farms.map((farm) => (
          <div key={farm.name} className="bg-white rounded-2xl ring-1 ring-gray-100 shadow-soft p-4 flex items-center gap-3.5">
            <div className={cn("w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center", farm.color)}>
              <Home className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-extrabold text-gray-900 truncate">{farm.name}</div>
              <div className="text-[10px] text-gray-500 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3" /> {farm.location} · {farm.area}
              </div>
              <Badge tone="gray">{farm.type}</Badge>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-300" />
          </div>
        ))}
        <div className="border-2 border-dashed border-cultiva-green/30 rounded-2xl p-4 text-center text-cultiva-green text-xs font-bold">
          + Nouvelle exploitation
        </div>
      </div>
      <div className="absolute bottom-20 right-4 w-12 h-12 rounded-2xl bg-gradient-to-br from-cultiva-green to-cultiva-darkGreen flex items-center justify-center shadow-lift">
        <span className="text-white text-xl font-extrabold">+</span>
      </div>
    </div>
  );
}

export function FieldsScreen() {
  const fields = [
    { name: "Parcelle A", crop: "Maïs", soil: "Fertile", status: "En croissance", tone: "green" as const, progress: 82 },
    { name: "Parcelle B", crop: "Tomates", soil: "Sablonneux", status: "Prête à récolter", tone: "gold" as const, progress: 64 },
    { name: "Parcelle C", crop: "Riz", soil: "Argileux", status: "Semée", tone: "gray" as const, progress: 46 },
  ];
  return (
    <div className="h-full flex flex-col bg-cultiva-mist">
      <ScreenHeader title="Parcelles" right={<span className="text-xs font-bold text-cultiva-green">+ Ajouter</span>} />
      <div className="px-4 space-y-3 pb-24">
        {fields.map((field) => (
          <div key={field.name} className="bg-white rounded-2xl ring-1 ring-gray-100 shadow-soft p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cultiva-green/10 flex items-center justify-center">
                  <Leaf className="w-4 h-4 text-cultiva-green" />
                </div>
                <div>
                  <div className="text-sm font-extrabold text-gray-900">{field.name}</div>
                  <div className="text-[10px] text-gray-500">
                    {field.crop} · Sol {field.soil}
                  </div>
                </div>
              </div>
              <Badge tone={field.tone}>{field.status}</Badge>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={cn(
                  "h-full rounded-full",
                  field.tone === "gold"
                    ? "bg-gradient-to-r from-cultiva-yellow to-amber-400"
                    : "bg-gradient-to-r from-cultiva-green to-cultiva-green-light"
                )}
                style={{ width: `${field.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CropsScreen() {
  const crops = [
    { name: "Maïs", variety: "IK 9904", field: "Parcelle A", status: "En croissance", tone: "green" as const, progress: 82, date: "Récolte prévue · 12 oct" },
    { name: "Tomates", variety: "Cobra", field: "Parcelle B", status: "Prête à récolter", tone: "gold" as const, progress: 64, date: "Récolte prévue · 21 août" },
    { name: "Riz", variety: "IR 841", field: "Parcelle C", status: "Semée", tone: "gray" as const, progress: 46, date: "Récolte prévue · 15 déc" },
  ];
  return (
    <div className="h-full flex flex-col bg-cultiva-mist">
      <ScreenHeader title="Cultures" right={<span className="text-xs font-bold text-cultiva-green">+ Ajouter</span>} />
      <div className="px-4 space-y-3 pb-24">
        {crops.map((crop) => (
          <div key={crop.name} className="bg-white rounded-2xl ring-1 ring-gray-100 shadow-soft p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cultiva-green/10 flex items-center justify-center">
                  <Sprout className="w-4 h-4 text-cultiva-green" />
                </div>
                <div>
                  <div className="text-sm font-extrabold text-gray-900">{crop.name}</div>
                  <div className="text-[10px] text-gray-500">
                    {crop.variety} · {crop.field}
                  </div>
                </div>
              </div>
              <Badge tone={crop.tone}>{crop.status}</Badge>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-2">
              <div
                className={cn(
                  "h-full rounded-full",
                  crop.tone === "gold"
                    ? "bg-gradient-to-r from-cultiva-yellow to-amber-400"
                    : "bg-gradient-to-r from-cultiva-green to-cultiva-green-light"
                )}
                style={{ width: `${crop.progress}%` }}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold text-cultiva-green">{crop.progress}%</span>
              <span className="text-[10px] text-gray-400">{crop.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ActivitiesScreen() {
  const activities = [
    { icon: CheckCircle2, title: "Récolte du maïs", field: "Parcelle A", time: "Aujourd'hui · 08:00", status: "Terminée", tone: "green" as const },
    { icon: Droplets, title: "Irrigation des tomates", field: "Parcelle B", time: "Demain · 06:00", status: "À venir", tone: "gold" as const },
    { icon: CloudRain, title: "Traitement fongicide", field: "Parcelle C", time: "En retard · hier", status: "En retard", tone: "red" as const },
    { icon: Sun, title: "Fertilisation", field: "Parcelle A", time: "Ven. · 17:00", status: "Planifiée", tone: "gray" as const },
  ];
  return (
    <div className="h-full flex flex-col bg-cultiva-mist">
      <ScreenHeader title="Activités" right={<span className="text-xs font-bold text-cultiva-green">+ Ajouter</span>} />
      <div className="px-4 space-y-2.5 pb-24">
        {activities.map((a) => (
          <div key={a.title} className="bg-white rounded-2xl ring-1 ring-gray-100 shadow-soft p-3.5 flex items-center gap-3">
            <div className={cn("w-9 h-9 rounded-full flex items-center justify-center", a.tone === "red" ? "bg-red-50" : a.tone === "gold" ? "bg-cultiva-yellow/15" : "bg-cultiva-green/10")}>
              <a.icon className={cn("w-4 h-4", a.tone === "red" ? "text-red-500" : a.tone === "gold" ? "text-amber-500" : "text-cultiva-green")} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-gray-800 truncate">{a.title}</div>
              <div className="text-[10px] text-gray-500">{a.field} · {a.time}</div>
            </div>
            <Badge tone={a.tone}>{a.status}</Badge>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CalendarScreen() {
  const days = ["L", "M", "M", "J", "V", "S", "D"];
  const grid = [26, 27, 28, 29, 30, 31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
  const tasks = [
    { day: "Aujourd'hui", title: "Irrigation parcelle B", time: "06:00", tone: "gold" as const },
    { day: "Demain", title: "Fertilisation maïs", time: "08:00", tone: "green" as const },
    { day: "Samedi 16", title: "Récolte tomates", time: "07:30", tone: "green" as const },
  ];
  return (
    <div className="h-full flex flex-col bg-cultiva-mist">
      <ScreenHeader title="Calendrier" />
      <Card className="mx-4 mt-1">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-extrabold text-gray-900">Août 2026</span>
          <div className="flex gap-1.5">
            <span className="w-6 h-6 rounded-lg bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500">‹</span>
            <span className="w-6 h-6 rounded-lg bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500">›</span>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center">
          {days.map((d, i) => (
            <span key={i} className="text-[9px] font-bold text-gray-400 py-1">{d}</span>
          ))}
          {grid.map((d, i) => (
            <span
              key={i}
              className={cn(
                "text-[10px] font-semibold py-1.5 rounded-lg",
                d === 14
                  ? "bg-gradient-to-br from-cultiva-green to-cultiva-darkGreen text-white"
                  : d === 11
                  ? "bg-cultiva-yellow/20 text-amber-600"
                  : "text-gray-700"
              )}
            >
              {d}
            </span>
          ))}
        </div>
      </Card>
      <SectionLabel>Prochaines interventions</SectionLabel>
      <div className="px-4 space-y-2 pb-24">
        {tasks.map((t) => (
          <div key={t.title} className="bg-white rounded-2xl ring-1 ring-gray-100 shadow-soft p-3.5 flex items-center gap-3">
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", t.tone === "gold" ? "bg-cultiva-yellow/15" : "bg-cultiva-green/10")}>
              <CalendarDays className={cn("w-4 h-4", t.tone === "gold" ? "text-amber-500" : "text-cultiva-green")} />
            </div>
            <div className="flex-1">
              <div className="text-xs font-bold text-gray-800">{t.title}</div>
              <div className="text-[10px] text-gray-500">{t.day} · {t.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FinancesScreen() {
  const txns = [
    { label: "Vente maïs — 2,4 t", cat: "Revenu", amount: "+1 200 000", tone: "green" as const, date: "12 août" },
    { label: "Semences maïs", cat: "Dépense", amount: "-185 000", tone: "red" as const, date: "10 août" },
    { label: "Main-d'œuvre saison", cat: "Dépense", amount: "-300 000", tone: "red" as const, date: "8 août" },
    { label: "Vente tomates", cat: "Revenu", amount: "+450 000", tone: "green" as const, date: "5 août" },
  ];
  return (
    <div className="h-full flex flex-col bg-cultiva-mist">
      <ScreenHeader title="Finances" right={<span className="text-xs font-bold text-cultiva-green">+ Ajouter</span>} />
      <div className="px-4">
        <div className="bg-gradient-to-br from-cultiva-darkGreen-deep to-cultiva-green rounded-2xl p-4 text-white shadow-lift">
          <div className="text-[10px] text-white/60 mb-1">Bénéfice net · Août 2026</div>
          <div className="text-2xl font-extrabold mb-3">+1 270 000 FCFA</div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white/10 rounded-xl p-2.5">
              <div className="flex items-center gap-1 text-[9px] text-white/60">
                <ArrowUpRight className="w-3 h-3" /> REVENUS
              </div>
              <div className="text-sm font-extrabold">2 450 000</div>
            </div>
            <div className="bg-white/10 rounded-xl p-2.5">
              <div className="flex items-center gap-1 text-[9px] text-white/60">
                <ArrowDownRight className="w-3 h-3" /> DÉPENSES
              </div>
              <div className="text-sm font-extrabold">1 180 000</div>
            </div>
          </div>
        </div>
      </div>
      <SectionLabel>Transactions récentes</SectionLabel>
      <div className="px-4 space-y-2 pb-24">
        {txns.map((t) => (
          <div key={t.label} className="bg-white rounded-2xl ring-1 ring-gray-100 shadow-soft p-3.5 flex items-center gap-3">
            <div className={cn("w-9 h-9 rounded-full flex items-center justify-center", t.tone === "green" ? "bg-cultiva-green/10" : "bg-red-50")}>
              {t.tone === "green" ? <ArrowUpRight className="w-4 h-4 text-cultiva-green" /> : <ArrowDownRight className="w-4 h-4 text-red-500" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-gray-800 truncate">{t.label}</div>
              <div className="text-[10px] text-gray-500">{t.cat} · {t.date}</div>
            </div>
            <span className={cn("text-xs font-extrabold", t.tone === "green" ? "text-cultiva-green" : "text-red-500")}>{t.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function WeatherScreen() {
  const forecast = [
    { day: "Ven", icon: Sun, temp: "30°", cond: "Ensoleillé" },
    { day: "Sam", icon: CloudSun, temp: "28°", cond: "Nuageux" },
    { day: "Dim", icon: CloudRain, temp: "25°", cond: "Pluie" },
    { day: "Lun", icon: CloudSun, temp: "27°", cond: "Nuageux" },
    { day: "Mar", icon: Sun, temp: "31°", cond: "Ensoleillé" },
    { day: "Mer", icon: CloudRain, temp: "26°", cond: "Averses" },
  ];
  return (
    <div className="h-full flex flex-col bg-cultiva-mist">
      <ScreenHeader title="Météo" />
      <div className="px-4">
        <div className="bg-gradient-to-br from-sky-400 via-cultiva-green to-cultiva-darkGreen rounded-2xl p-5 text-white shadow-lift">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] text-white/70">Lomé, Togo</div>
              <div className="text-4xl font-extrabold mt-1">28°</div>
              <div className="text-xs font-semibold mt-1">Nuageux</div>
            </div>
            <div className="w-16 h-16 rounded-full bg-white/15 backdrop-blur flex items-center justify-center">
              <CloudSun className="w-9 h-9" />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 mt-5">
            <div className="bg-white/10 rounded-xl p-2 text-center">
              <div className="text-[9px] text-white/60">Humidité</div>
              <div className="text-xs font-extrabold">70%</div>
            </div>
            <div className="bg-white/10 rounded-xl p-2 text-center">
              <div className="text-[9px] text-white/60">Vent</div>
              <div className="text-xs font-extrabold">16 km/h</div>
            </div>
            <div className="bg-white/10 rounded-xl p-2 text-center">
              <div className="text-[9px] text-white/60">Pluie</div>
              <div className="text-xs font-extrabold">73%</div>
            </div>
            <div className="bg-white/10 rounded-xl p-2 text-center">
              <div className="text-[9px] text-white/60">UV</div>
              <div className="text-xs font-extrabold">Élevé</div>
            </div>
          </div>
        </div>
      </div>
      <SectionLabel>Prévisions 6 jours</SectionLabel>
      <div className="px-4 pb-24">
        <div className="bg-white rounded-2xl ring-1 ring-gray-100 shadow-soft divide-y divide-gray-50">
          {forecast.map((f) => (
            <div key={f.day} className="flex items-center gap-3 px-4 py-3">
              <span className="w-8 text-xs font-extrabold text-gray-800">{f.day}</span>
              <f.icon className="w-4 h-4 text-cultiva-green" />
              <span className="flex-1 text-[11px] text-gray-500">{f.cond}</span>
              <span className="text-xs font-extrabold text-gray-900">{f.temp}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function NotificationsScreen() {
  const notifs = [
    { icon: CalendarDays, title: "Irrigation parcelle B", msg: "Prévue demain à 06:00", time: "il y a 2 h", unread: true, tone: "gold" as const },
    { icon: CloudRain, title: "Pluie attendue dimanche", msg: "Prévoyez de protéger la parcelle C", time: "il y a 5 h", unread: true, tone: "sky" as const },
    { icon: CheckCircle2, title: "Récolte du maïs terminée", msg: "2,4 t enregistrées — bravo !", time: "hier", unread: false, tone: "green" as const },
    { icon: PiggyBank, title: "Dépense enregistrée", msg: "Semences maïs — 185 000 FCFA", time: "hier", unread: false, tone: "green" as const },
    { icon: AlertTriangle, title: "Traitement en retard", msg: "Parcelle C — prévu hier", time: "il y a 2 j", unread: false, tone: "red" as const },
  ];
  return (
    <div className="h-full flex flex-col bg-cultiva-mist">
      <ScreenHeader title="Notifications" right={<span className="text-[10px] font-bold text-cultiva-green">Tout marquer lu</span>} />
      <div className="px-4 space-y-2.5 pb-24">
        {notifs.map((n) => (
          <div key={n.title} className={cn("bg-white rounded-2xl ring-1 shadow-soft p-3.5 flex items-start gap-3", n.unread ? "ring-cultiva-green/25" : "ring-gray-100")}>
            <div className={cn("w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0", n.tone === "gold" ? "bg-cultiva-yellow/15" : n.tone === "sky" ? "bg-sky-500/10" : n.tone === "red" ? "bg-red-50" : "bg-cultiva-green/10")}>
              <n.icon className={cn("w-4 h-4", n.tone === "gold" ? "text-amber-500" : n.tone === "sky" ? "text-sky-500" : n.tone === "red" ? "text-red-500" : "text-cultiva-green")} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-gray-800 truncate">{n.title}</span>
                {n.unread && <span className="w-1.5 h-1.5 rounded-full bg-cultiva-green flex-shrink-0" />}
              </div>
              <div className="text-[10px] text-gray-500 mt-0.5">{n.msg}</div>
              <div className="text-[9px] text-gray-400 mt-1">{n.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProfileScreen() {
  const stats = [
    { value: "2", label: "Exploitations" },
    { value: "5", label: "Parcelles" },
    { value: "3", label: "Cultures" },
  ];
  const menu = [
    { icon: Settings, label: "Paramètres" },
    { icon: ShieldCheck, label: "Sécurité & confidentialité" },
    { icon: Users, label: "Gérer les ouvriers" },
    { icon: Package, label: "Stocks & intrants" },
    { icon: FileText, label: "Rapports PDF" },
    { icon: MessageSquare, label: "Support & aide" },
    { icon: LogOut, label: "Se déconnecter", danger: true },
  ];
  return (
    <div className="h-full flex flex-col bg-cultiva-mist">
      <ScreenHeader title="Profil" />
      <div className="px-4">
        <div className="bg-white rounded-2xl ring-1 ring-gray-100 shadow-soft p-5 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cultiva-green to-cultiva-darkGreen flex items-center justify-center ring-4 ring-cultiva-green/15">
            <span className="font-display text-xl font-extrabold text-white">KM</span>
          </div>
          <div className="flex-1">
            <div className="text-sm font-extrabold text-gray-900">Koffi Mensah</div>
            <div className="text-[11px] text-gray-500">Agriculteur · Agou, Togo</div>
            <div className="flex items-center gap-1 mt-1.5">
              <Badge tone="green">Vérifié</Badge>
              <Badge tone="gray">Membre depuis 2024</Badge>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2.5 px-4 pt-3">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl ring-1 ring-gray-100 shadow-soft p-3 text-center">
            <div className="text-lg font-extrabold text-cultiva-green">{s.value}</div>
            <div className="text-[9px] text-gray-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>
      <SectionLabel>Compte</SectionLabel>
      <div className="px-4 pb-24">
        <div className="bg-white rounded-2xl ring-1 ring-gray-100 shadow-soft divide-y divide-gray-50">
          {menu.map((m) => (
            <div key={m.label} className={cn("flex items-center gap-3 px-4 py-3", m.danger ? "text-red-500" : "text-gray-700")}>
              <m.icon className="w-4 h-4" />
              <span className="flex-1 text-xs font-semibold">{m.label}</span>
              <ChevronRight className="w-4 h-4 text-gray-300" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Registre des écrans                                                 */
/* ------------------------------------------------------------------ */

export type ScreenId =
  | "onboarding"
  | "login"
  | "register"
  | "dashboard"
  | "farms"
  | "fields"
  | "crops"
  | "activities"
  | "calendar"
  | "finances"
  | "weather"
  | "notifications"
  | "profile";

export const SCREENS: { id: ScreenId; label: string; icon: LucideIcon; component: () => React.JSX.Element }[] = [
  { id: "onboarding", label: "Onboarding", icon: Sprout, component: OnboardingScreen },
  { id: "login", label: "Connexion", icon: Lock, component: LoginScreen },
  { id: "register", label: "Inscription", icon: User, component: RegisterScreen },
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, component: DashboardScreen },
  { id: "farms", label: "Exploitations", icon: Home, component: FarmsScreen },
  { id: "fields", label: "Parcelles", icon: Leaf, component: FieldsScreen },
  { id: "crops", label: "Cultures", icon: Sprout, component: CropsScreen },
  { id: "activities", label: "Activités", icon: CalendarDays, component: ActivitiesScreen },
  { id: "calendar", label: "Calendrier", icon: CalendarDays, component: CalendarScreen },
  { id: "finances", label: "Finances", icon: Wallet, component: FinancesScreen },
  { id: "weather", label: "Météo", icon: CloudSun, component: WeatherScreen },
  { id: "notifications", label: "Notifications", icon: Bell, component: NotificationsScreen },
  { id: "profile", label: "Profil", icon: User, component: ProfileScreen },
];

export const BOTTOM_TABS: { id: ScreenId; label: string; icon: LucideIcon }[] = [
  { id: "dashboard", label: "Accueil", icon: Home },
  { id: "fields", label: "Parcelles", icon: Leaf },
  { id: "finances", label: "Finances", icon: BarChart3 },
  { id: "weather", label: "Météo", icon: CloudSun },
  { id: "profile", label: "Profil", icon: User },
];
