"use client";

import { motion } from "framer-motion";
import { UserPlus, Building2, MapPin, Sprout, Bell, BarChart3 } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

const steps = [
  {
    icon: UserPlus,
    title: "Créez votre compte",
    description: "Inscription simple et rapide, en quelques minutes.",
  },
  {
    icon: Building2,
    title: "Ajoutez votre exploitation",
    description: "Nom, localisation, superficie et type d'exploitation.",
  },
  {
    icon: MapPin,
    title: "Créez vos parcelles",
    description: "Chaque parcelle avec son sol et sa culture actuelle.",
  },
  {
    icon: Sprout,
    title: "Suivez vos cultures",
    description: "Semis, traitements, croissance et récoltes en un geste.",
  },
  {
    icon: Bell,
    title: "Recevez les alertes",
    description: "Notifications pour ne jamais rater une tâche.",
  },
  {
    icon: BarChart3,
    title: "Analysez vos résultats",
    description: "Rapports clairs pour améliorer vos rendements.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Comment ça marche"
          title={
            <>
              Démarrer en <span className="text-gradient-green">6 étapes</span>
            </>
          }
          subtitle="Un parcours simple, pensé pour être opérationnel dès le premier jour."
        />

        <div className="relative grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-5 max-w-6xl mx-auto">
          {/* Ligne de connexion (desktop) */}
          <div
            className="hidden lg:block absolute top-7 left-[16.66%] right-[16.66%] h-0.5 bg-gradient-to-r from-cultiva-green/10 via-cultiva-green/30 to-cultiva-green/10"
            aria-hidden="true"
          />
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
              whileHover={{ y: -5 }}
              className="relative bg-white rounded-2xl ring-1 ring-gray-100 shadow-soft p-6 sm:p-7 hover:shadow-lift transition-shadow"
            >
              <div className="relative mb-5 inline-flex">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cultiva-green to-cultiva-darkGreen flex items-center justify-center shadow-glow">
                  <step.icon className="w-6 h-6 text-white" />
                </div>
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-cultiva-yellow text-cultiva-darkGreen-deep text-[11px] font-extrabold flex items-center justify-center shadow">
                  {index + 1}
                </span>
              </div>
              <h3 className="font-display text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
              <p className={cn("text-sm text-gray-600 leading-relaxed")}>{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
