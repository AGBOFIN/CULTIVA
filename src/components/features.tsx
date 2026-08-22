"use client";

import { motion } from "framer-motion";
import {
  Sprout,
  MapPin,
  CalendarDays,
  TrendingDown,
  TrendingUp,
  CloudSun,
  Bell,
  Users,
  Package,
  BarChart3,
  Building2,
  Satellite,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

type Feature = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  comingSoon?: boolean;
  featured?: boolean;
  visual: React.ReactNode;
};

const cardVisuals: Record<string, React.ReactNode> = {
  "building2": (
    <div className="flex gap-1.5">
      {[70, 45, 85].map((h, i) => (
        <div key={i} className="w-2 rounded-t-sm bg-white/70" style={{ height: h * 0.28 }} />
      ))}
    </div>
  ),
  "map": (
    <div className="grid grid-cols-3 gap-1">
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <div key={i} className={cn("w-3 h-3 rounded-[3px]", i % 3 === 0 ? "bg-white/50" : "bg-white/25")} />
      ))}
    </div>
  ),
};

function miniBars(heights: number[], tone: string) {
  return (
    <div className="flex items-end gap-1 h-8">
      {heights.map((h, i) => (
        <div key={i} className={cn("flex-1 rounded-t-sm", tone)} style={{ height: `${h}%` }} />
      ))}
    </div>
  );
}

const features: Feature[] = [
  {
    icon: Building2,
    title: "Gestion des exploitations",
    description: "Créez et pilotez vos exploitations : superficie, localisation, type et description.",
    featured: true,
    visual: cardVisuals["building2"],
  },
  {
    icon: MapPin,
    title: "Gestion des parcelles",
    description: "Organisez chaque parcelle avec son sol, sa culture et son statut.",
    visual: cardVisuals["map"],
  },
  {
    icon: Sprout,
    title: "Suivi des cultures",
    description: "Du semis à la récolte, suivez l'évolution de chaque culture.",
    featured: true,
    visual: (
      <div className="flex flex-col gap-1.5 w-full">
        {[82, 46, 64].map((p, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="flex-1 h-1.5 rounded-full bg-white/20 overflow-hidden">
              <div className="h-full rounded-full bg-white/80" style={{ width: `${p}%` }} />
            </div>
            <span className="text-[9px] font-bold text-white/80">{p}%</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: CalendarDays,
    title: "Calendrier agricole",
    description: "Planifiez semis, traitements et récoltes avec un calendrier intelligent.",
    visual: (
      <div className="grid grid-cols-7 gap-0.5">
        {Array.from({ length: 14 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "w-2.5 h-2.5 rounded-[3px]",
              i === 3 || i === 9 ? "bg-cultiva-yellow" : i === 5 ? "bg-cultiva-green-light" : "bg-cultiva-green/15"
            )}
          />
        ))}
      </div>
    ),
  },
  {
    icon: TrendingDown,
    title: "Gestion des dépenses",
    description: "Semences, engrais, main-d'œuvre : chaque dépense est tracée.",
    visual: miniBars([30, 55, 40, 70], "bg-red-300"),
  },
  {
    icon: TrendingUp,
    title: "Gestion des revenus",
    description: "Enregistrez vos ventes et récoltes pour connaître votre bénéfice réel.",
    visual: miniBars([45, 60, 80, 95], "bg-cultiva-green-light"),
  },
  {
    icon: CloudSun,
    title: "Météo en direct",
    description: "Prévisions réelles pour vos parcelles, directement dans l'application.",
    visual: (
      <div className="flex items-center gap-2">
        <CloudSun className="w-6 h-6 text-cultiva-yellow" />
        <div className="text-[10px] font-bold text-gray-700">26° · 6 jours</div>
      </div>
    ),
  },
  {
    icon: Bell,
    title: "Notifications intelligentes",
    description: "Alertes pour vos tâches, retards, météo et échéances importantes.",
    visual: (
      <div className="relative">
        <Bell className="w-6 h-6 text-cultiva-green" />
        <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white" />
      </div>
    ),
  },
  {
    icon: Users,
    title: "Gestion des ouvriers",
    description: "Organisez votre équipe et les travaux de chaque saison.",
    comingSoon: true,
    visual: (
      <div className="flex -space-x-2">
        {["bg-cultiva-green", "bg-cultiva-yellow", "bg-sky-500"].map((c, i) => (
          <div key={i} className={cn("w-7 h-7 rounded-full border-2 border-white", c)} />
        ))}
      </div>
    ),
  },
  {
    icon: Package,
    title: "Gestion des stocks",
    description: "Suivez vos intrants, semences et équipements.",
    comingSoon: true,
    visual: (
      <div className="flex gap-1">
        {["bg-cultiva-green/70", "bg-cultiva-green/50", "bg-cultiva-green/30"].map((c, i) => (
          <div key={i} className={cn("w-4 h-4 rounded-[4px]", c)} />
        ))}
      </div>
    ),
  },
  {
    icon: BarChart3,
    title: "Rapports et statistiques",
    description: "Analysez vos données pour améliorer vos rendements.",
    comingSoon: true,
    visual: miniBars([35, 55, 45, 75, 60], "bg-cultiva-green/40"),
  },
  {
    icon: Satellite,
    title: "Cartographie GPS",
    description: "Localisez et tracez vos parcelles avec précision.",
    comingSoon: true,
    visual: (
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 rounded-full bg-cultiva-green/15 animate-pulse-soft" />
        <div className="absolute inset-2 rounded-full bg-cultiva-green/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <MapPin className="w-4 h-4 text-cultiva-green" />
        </div>
      </div>
    ),
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 sm:py-28 bg-cultiva-mist">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Fonctionnalités"
          title={
            <>
              Tout pour piloter votre exploitation,{" "}
              <span className="text-gradient-green">en un seul endroit</span>
            </>
          }
          subtitle="Des outils simples et puissants, pensés pour les agriculteurs d'aujourd'hui."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
              whileHover={{ y: -6 }}
              className={cn(
                "group relative rounded-2xl p-6 transition-all duration-300",
                feature.featured
                  ? "bg-gradient-to-br from-cultiva-darkGreen to-cultiva-green text-white shadow-soft hover:shadow-lift"
                  : feature.comingSoon
                    ? "bg-white border-2 border-dashed border-gray-200 hover:border-cultiva-green/40"
                    : "bg-white ring-1 ring-gray-100 shadow-soft hover:shadow-lift"
              )}
            >
              {/* Halo au survol */}
              <div
                className={cn(
                  "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none",
                  feature.featured
                    ? "bg-[radial-gradient(300px_at_80%_-20%,rgb(255_255_255/0.25),transparent)]"
                    : "bg-[radial-gradient(300px_at_80%_-20%,rgb(27_138_68/0.08),transparent)]"
                )}
                aria-hidden="true"
              />

              <div className="relative flex flex-col h-full">
                <div className="flex items-start justify-between mb-5">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110",
                      feature.featured
                        ? "bg-white/15"
                        : feature.comingSoon
                          ? "bg-gray-100"
                          : "bg-cultiva-green/10"
                    )}
                  >
                    <feature.icon
                      className={cn(
                        "w-6 h-6",
                        feature.featured ? "text-cultiva-yellow" : feature.comingSoon ? "text-gray-400" : "text-cultiva-green"
                      )}
                    />
                  </div>
                  {feature.comingSoon && (
                    <span className="text-[10px] font-bold bg-cultiva-yellow/15 text-amber-600 border border-cultiva-yellow/40 rounded-full px-2.5 py-1">
                      Bientôt
                    </span>
                  )}
                </div>

                <h3
                  className={cn(
                    "font-display text-lg font-bold mb-1.5",
                    feature.featured ? "text-white" : "text-gray-900"
                  )}
                >
                  {feature.title}
                </h3>
                <p
                  className={cn(
                    "text-sm leading-relaxed mb-5",
                    feature.featured ? "text-white/75" : "text-gray-600"
                  )}
                >
                  {feature.description}
                </p>

                <div className={cn("mt-auto", feature.featured ? "text-white" : "text-cultiva-green")}>
                  {feature.visual}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
