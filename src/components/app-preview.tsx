"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  MapPin,
  Sprout,
  DollarSign,
  CloudSun,
  Bell,
  BarChart3,
  Sun,
  CloudRain,
  Cloud,
  Droplets,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  AlertTriangle,
  Leaf,
  Wallet,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

/* ---------- Mockups d'écrans ---------- */

function DashboardScreen() {
  const kpis = [
    { label: "Exploitations", value: "2", tint: "bg-cultiva-green/10 text-cultiva-green" },
    { label: "Parcelles", value: "5", tint: "bg-cultiva-green/10 text-cultiva-green" },
    { label: "Cultures en cours", value: "3", tint: "bg-cultiva-green/10 text-cultiva-green" },
    { label: "Bénéfice du mois", value: "+125k", tint: "bg-cultiva-yellow/15 text-amber-600" },
  ];
  const bars = [40, 62, 48, 74, 58, 88];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[11px] text-gray-500">Bonjour, Koffi 👋</div>
          <div className="text-sm font-bold text-gray-900">Votre exploitation</div>
        </div>
        <span className="text-[10px] bg-cultiva-green text-white rounded-full px-2.5 py-1 font-semibold">À jour</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {kpis.map((k) => (
          <div key={k.label} className="rounded-xl border border-gray-100 p-2.5 bg-white">
            <div className={cn("text-xs font-extrabold", k.tint)}>{k.value}</div>
            <div className="text-[9px] text-gray-500 mt-0.5">{k.label}</div>
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-gray-100 p-3 bg-white">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-semibold text-gray-700">Revenus / Dépenses</span>
          <span className="text-[10px] text-cultiva-green font-bold">+18%</span>
        </div>
        <div className="flex items-end gap-1.5 h-14">
          {bars.map((h, i) => (
            <div
              key={i}
              style={{ height: `${h}%` }}
              className={cn(
                "flex-1 rounded-t-md",
                i % 2 === 0 ? "bg-cultiva-green/70" : "bg-cultiva-yellow/80"
              )}
            />
          ))}
        </div>
      </div>
      <div className="space-y-1.5">
        {[
          { icon: CheckCircle2, text: "Récolte terminée", sub: "Parcelle A · Maïs", tone: "text-cultiva-green" },
          { icon: AlertTriangle, text: "Irrigation en retard", sub: "Parcelle B · Tomates", tone: "text-amber-500" },
        ].map((row) => (
          <div key={row.text} className="flex items-center gap-2.5 rounded-xl border border-gray-100 p-2.5 bg-white">
            <row.icon className={cn("w-4 h-4", row.tone)} />
            <div className="flex-1">
              <div className="text-[10px] font-semibold text-gray-800">{row.text}</div>
              <div className="text-[9px] text-gray-500">{row.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FieldsScreen() {
  const fields = [
    { name: "Parcelle A", crop: "Maïs", size: "2,5 ha", status: "En croissance", color: "bg-cultiva-green" },
    { name: "Parcelle B", crop: "Tomates", size: "1,2 ha", status: "Prête à récolter", color: "bg-cultiva-yellow" },
    { name: "Parcelle C", crop: "Riz", size: "3,0 ha", status: "Semée", color: "bg-sky-500" },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="text-sm font-bold text-gray-900">Mes parcelles</div>
        <span className="text-[10px] text-cultiva-green font-semibold flex items-center gap-1">
          <MapPin className="w-3 h-3" /> Carte GPS (bientôt)
        </span>
      </div>
      {fields.map((f) => (
        <div key={f.name} className="rounded-xl border border-gray-100 p-3 bg-white flex items-center gap-3">
          <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", f.color === "bg-cultiva-green" && "bg-cultiva-green/15 text-cultiva-green", f.color === "bg-cultiva-yellow" && "bg-cultiva-yellow/20 text-amber-600", f.color === "bg-sky-500" && "bg-sky-100 text-sky-600")}>
            <Leaf className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-900">{f.name}</span>
              <span className="text-[9px] text-gray-400">{f.size}</span>
            </div>
            <div className="text-[10px] text-gray-500">{f.crop}</div>
          </div>
          <span className={cn("text-[9px] font-semibold rounded-full px-2.5 py-1", f.color === "bg-cultiva-green" && "bg-cultiva-green/10 text-cultiva-green", f.color === "bg-cultiva-yellow" && "bg-cultiva-yellow/20 text-amber-600", f.color === "bg-sky-500" && "bg-sky-100 text-sky-600")}>
            {f.status}
          </span>
        </div>
      ))}
    </div>
  );
}

function CropsScreen() {
  const crops = [
    { name: "Maïs", variete: "IKM 15", parcelle: "Parcelle A", progress: 82, tone: "bg-cultiva-green" },
    { name: "Tomates", variete: "UC 82B", parcelle: "Parcelle B", progress: 46, tone: "bg-cultiva-yellow" },
    { name: "Riz", variete: "NERICA 4", parcelle: "Parcelle C", progress: 64, tone: "bg-sky-500" },
  ];

  return (
    <div className="space-y-3">
      <div className="text-sm font-bold text-gray-900">Suivi des cultures</div>
      {crops.map((c) => (
        <div key={c.name} className="rounded-xl border border-gray-100 p-3 bg-white">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-cultiva-green/10 flex items-center justify-center">
                <Sprout className="w-4 h-4 text-cultiva-green" />
              </div>
              <div>
                <div className="text-xs font-bold text-gray-900">{c.name}</div>
                <div className="text-[9px] text-gray-500">{c.variete} · {c.parcelle}</div>
              </div>
            </div>
            <span className="text-[10px] font-extrabold text-gray-700">{c.progress}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
            <div className={cn("h-full rounded-full", c.tone)} style={{ width: `${c.progress}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function FinanceScreen() {
  const rows = [
    { label: "Vente de maïs", amount: "+250 000", type: "in" },
    { label: "Semences", amount: "-45 000", type: "out" },
    { label: "Vente tomates", amount: "+120 000", type: "in" },
    { label: "Main-d'œuvre", amount: "-60 000", type: "out" },
  ];

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2">
        <div className="rounded-xl border border-gray-100 p-2.5 bg-white">
          <div className="text-[9px] text-gray-500">Revenus</div>
          <div className="text-xs font-extrabold text-cultiva-green">1,2M</div>
        </div>
        <div className="rounded-xl border border-gray-100 p-2.5 bg-white">
          <div className="text-[9px] text-gray-500">Dépenses</div>
          <div className="text-xs font-extrabold text-red-500">340k</div>
        </div>
        <div className="rounded-xl border border-cultiva-green/30 p-2.5 bg-cultiva-green/5">
          <div className="text-[9px] text-gray-500">Bénéfice</div>
          <div className="text-xs font-extrabold text-cultiva-green">860k</div>
        </div>
      </div>
      <div className="space-y-1.5">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center gap-2.5 rounded-xl border border-gray-100 p-2.5 bg-white">
            <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center", r.type === "in" ? "bg-cultiva-green/10" : "bg-red-50")}>
              {r.type === "in" ? (
                <TrendingUp className="w-3.5 h-3.5 text-cultiva-green" />
              ) : (
                <TrendingDown className="w-3.5 h-3.5 text-red-500" />
              )}
            </div>
            <div className="flex-1 text-[10px] font-medium text-gray-700">{r.label}</div>
            <span className={cn("text-[10px] font-extrabold", r.type === "in" ? "text-cultiva-green" : "text-red-500")}>
              {r.amount} FCFA
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function WeatherScreen() {
  const days = [
    { day: "Lun", icon: Sun, temp: "28°", hot: true },
    { day: "Mar", icon: Cloud, temp: "27°" },
    { day: "Mer", icon: CloudRain, temp: "25°" },
    { day: "Jeu", icon: CloudRain, temp: "24°" },
    { day: "Ven", icon: Cloud, temp: "26°" },
  ];

  return (
    <div className="space-y-3">
      <div className="rounded-xl bg-gradient-to-br from-cultiva-darkGreen to-cultiva-green p-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] text-white/70">Lomé, Togo</div>
            <div className="text-3xl font-extrabold">26°C</div>
            <div className="text-[10px] text-white/80">Ensoleillé · Humidité 62%</div>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center">
            <Sun className="w-8 h-8 text-cultiva-yellow" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-1.5">
        {days.map((d) => (
          <div key={d.day} className="rounded-xl border border-gray-100 p-2 bg-white text-center">
            <div className="text-[9px] text-gray-500 font-medium">{d.day}</div>
            <d.icon className={cn("w-4 h-4 mx-auto my-1.5", d.hot ? "text-cultiva-yellow" : "text-sky-500")} />
            <div className="text-[10px] font-bold text-gray-800">{d.temp}</div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2.5 rounded-xl bg-cultiva-yellow/10 border border-cultiva-yellow/30 p-3">
        <Droplets className="w-4 h-4 text-amber-600" />
        <div className="text-[10px] text-gray-700">
          <span className="font-bold">Conseil :</span> pluie attendue mercredi — idéal pour le semis du maïs.
        </div>
      </div>
    </div>
  );
}

function NotificationsScreen() {
  const items = [
    { icon: AlertTriangle, text: "Irrigation en retard", sub: "Parcelle B — il y a 2 h", tone: "bg-amber-100 text-amber-600" },
    { icon: CheckCircle2, text: "Récolte terminée", sub: "Parcelle A · 2,4 t de maïs", tone: "bg-cultiva-green/10 text-cultiva-green" },
    { icon: CloudRain, text: "Alerte météo", sub: "Pluie probable mercredi", tone: "bg-sky-100 text-sky-600" },
    { icon: Bell, text: "Rappel", sub: "Fertilisation parcelle C — demain", tone: "bg-cultiva-yellow/15 text-amber-600" },
  ];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="text-sm font-bold text-gray-900">Notifications</div>
        <span className="text-[9px] bg-red-100 text-red-600 font-bold rounded-full px-2 py-0.5">2 nouvelles</span>
      </div>
      {items.map((n) => (
        <div key={n.text} className="flex items-center gap-3 rounded-xl border border-gray-100 p-3 bg-white">
          <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center", n.tone)}>
            <n.icon className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <div className="text-[11px] font-semibold text-gray-800">{n.text}</div>
            <div className="text-[9px] text-gray-500">{n.sub}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ReportsScreen() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-xl border border-gray-100 p-3 bg-white flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ background: "conic-gradient(#1B8A44 0 62%, #E8F6ED 62% 100%)" }}
          >
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-cultiva-green" />
            </div>
          </div>
          <div>
            <div className="text-xs font-extrabold text-gray-900">4,2 t/ha</div>
            <div className="text-[9px] text-gray-500">Rendement maïs</div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-100 p-3 bg-white flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-cultiva-yellow/15 flex items-center justify-center">
            <Wallet className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <div className="text-xs font-extrabold text-gray-900">+18%</div>
            <div className="text-[9px] text-gray-500">Bénéfice vs. saison passée</div>
          </div>
        </div>
      </div>
      <div className="rounded-xl border border-gray-100 p-3 bg-white">
        <div className="text-[10px] font-semibold text-gray-700 mb-2">Dépenses par catégorie</div>
        {[
          { label: "Intrants", pct: 40 },
          { label: "Main-d'œuvre", pct: 30 },
          { label: "Transport", pct: 18 },
          { label: "Autres", pct: 12 },
        ].map((c) => (
          <div key={c.label} className="mb-2 last:mb-0">
            <div className="flex justify-between text-[9px] text-gray-600 mb-1">
              <span>{c.label}</span>
              <span className="font-bold">{c.pct}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-cultiva-green to-cultiva-green-light" style={{ width: `${c.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Définition des onglets ---------- */

const screens = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, render: DashboardScreen },
  { id: "parcelles", label: "Parcelles", icon: MapPin, render: FieldsScreen },
  { id: "cultures", label: "Cultures", icon: Sprout, render: CropsScreen },
  { id: "finances", label: "Finances", icon: DollarSign, render: FinanceScreen },
  { id: "meteo", label: "Météo", icon: CloudSun, render: WeatherScreen },
  { id: "notifications", label: "Notifications", icon: Bell, render: NotificationsScreen },
  { id: "rapports", label: "Rapports", icon: BarChart3, render: ReportsScreen },
];

/* ---------- Section ---------- */

export default function AppPreview() {
  const [activeId, setActiveId] = useState("dashboard");
  const active = screens.find((s) => s.id === activeId) ?? screens[0];
  const Screen = active.render;

  return (
    <section id="app" className="py-20 sm:py-28 bg-gradient-to-b from-white to-cultiva-mist overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Application"
          title={
            <>
              Découvrez l&apos;application{" "}
              <span className="text-gradient-green">en action</span>
            </>
          }
          subtitle="Un aperçu des écrans que les agriculteurs utilisent chaque jour — du tableau de bord aux rapports détaillés."
        />

        {/* Onglets */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
          {screens.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveId(s.id)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-300",
                activeId === s.id
                  ? "bg-cultiva-darkGreen text-white shadow-lift"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-cultiva-green/40 hover:text-cultiva-green"
              )}
            >
              <s.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{s.label}</span>
              <span className="sm:hidden">{s.label}</span>
            </button>
          ))}
        </div>

        {/* Cadre + écran */}
        <div className="relative max-w-4xl mx-auto">
          <div
            className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-tr from-cultiva-green/15 via-transparent to-cultiva-yellow/15 blur-2xl"
            aria-hidden="true"
          />
          <div className="relative rounded-2xl bg-white ring-1 ring-gray-200/80 shadow-[0_30px_80px_-24px_rgb(11_61_36/0.25)] overflow-hidden">
            {/* Barre navigateur */}
            <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 border-b border-gray-100">
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="w-3 h-3 rounded-full bg-red-300" />
                <span className="w-3 h-3 rounded-full bg-amber-300" />
                <span className="w-3 h-3 rounded-full bg-green-300" />
              </div>
              <div className="flex-1 max-w-xs mx-auto bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-[11px] text-gray-400 text-center">
                app.cultiva.africa/{active.id}
              </div>
            </div>
            {/* Écran */}
            <div className="p-4 sm:p-6 md:p-8 min-h-[340px] sm:min-h-[380px] bg-cultiva-mist/60">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <Screen />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
