"use client";

import { motion } from "framer-motion";
import { Rocket, CloudSun, CreditCard, Store, Brain, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

const versions = [
  {
    version: "Version 1",
    title: "Gestion des exploitations",
    icon: Rocket,
    completed: true,
    tag: "Disponible",
    features: ["Exploitations", "Parcelles", "Cultures", "Calendrier", "Finances"],
  },
  {
    version: "Version 2",
    title: "Météo intelligente",
    icon: CloudSun,
    completed: true,
    tag: "Disponible",
    features: ["Prévisions en direct", "Conseils climatiques", "Historique des données"],
  },
  {
    version: "Version 3",
    title: "Paiement Mobile Money",
    icon: CreditCard,
    completed: false,
    tag: "À venir",
    features: ["Intégration Mobile Money", "Facturation", "Suivi des paiements"],
  },
  {
    version: "Version 4",
    title: "Marketplace agricole",
    icon: Store,
    completed: false,
    tag: "À venir",
    features: ["Achat d'intrants", "Vente de récoltes", "Réseau de fournisseurs"],
  },
  {
    version: "Version 5",
    title: "Intelligence artificielle",
    icon: Brain,
    completed: false,
    tag: "À venir",
    features: ["Conseils personnalisés", "Prédictions de rendement", "Analyse avancée"],
  },
];

export default function Roadmap() {
  return (
    <section id="roadmap" className="py-20 sm:py-28 bg-cultiva-mist overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Feuille de route"
          title={
            <>
              Une vision <span className="text-gradient-green">ambitieuse</span>
            </>
          }
          subtitle="CULTIVA évolue en continu pour répondre aux besoins réels des agriculteurs."
        />

        <div className="relative max-w-3xl mx-auto">
          {/* Ligne verticale */}
          <div
            className="absolute left-6 lg:left-1/2 lg:-translate-x-1/2 top-2 bottom-2 w-0.5 bg-gradient-to-b from-cultiva-green via-cultiva-green/40 to-cultiva-yellow/40 rounded-full"
            aria-hidden="true"
          />

          <div className="space-y-8">
            {versions.map((v, index) => (
              <motion.div
                key={v.version}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={cn(
                  "relative flex items-start gap-5 pl-16 lg:pl-0",
                  index % 2 === 0 ? "lg:pr-[calc(50%+2.5rem)]" : "lg:pl-[calc(50%+2.5rem)] lg:pr-0"
                )}
              >
                {/* Point sur la ligne */}
                <div
                  className={cn(
                    "absolute left-6 lg:left-1/2 -translate-x-1/2 top-6 w-4 h-4 rounded-full ring-4",
                    v.completed ? "bg-cultiva-green ring-cultiva-green/20" : "bg-white ring-cultiva-green/20 border-2 border-cultiva-green"
                  )}
                  aria-hidden="true"
                />

                {/* Carte */}
                <div
                  className={cn(
                    "w-full lg:w-[calc(50%-2.5rem)]",
                    index % 2 === 0 ? "lg:ml-auto" : ""
                  )}
                >
                  <div
                    className={cn(
                      "rounded-2xl p-6 shadow-soft hover:shadow-lift transition-shadow",
                      v.completed
                        ? "bg-white ring-1 ring-cultiva-green/30"
                        : "bg-white/70 backdrop-blur ring-1 ring-gray-200"
                    )}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center",
                          v.completed ? "bg-cultiva-green/10 text-cultiva-green" : "bg-gray-100 text-gray-400"
                        )}
                      >
                        <v.icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold tracking-widest text-gray-500 uppercase">{v.version}</span>
                      <span
                        className={cn(
                          "ml-auto text-[10px] font-bold rounded-full px-2.5 py-1",
                          v.completed
                            ? "bg-cultiva-green/10 text-cultiva-green"
                            : "bg-cultiva-yellow/15 text-amber-600"
                        )}
                      >
                        {v.tag}
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-gray-900 mb-3">{v.title}</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {v.features.map((f) => (
                        <span
                          key={f}
                          className={cn(
                            "text-xs rounded-full px-3 py-1",
                            v.completed ? "bg-cultiva-mist text-gray-700" : "bg-gray-50 text-gray-500"
                          )}
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Fin de timeline */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="relative mt-10 flex justify-center"
          >
            <div className="inline-flex items-center gap-2 bg-cultiva-darkGreen text-white rounded-full px-6 py-3 shadow-lift">
              <Sparkles className="w-4 h-4 text-cultiva-yellow" />
              <span className="text-sm font-semibold">Et bien plus à venir…</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
