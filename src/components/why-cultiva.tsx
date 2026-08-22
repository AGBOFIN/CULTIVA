"use client";

import { motion } from "framer-motion";
import { X, Check, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";

const problems = [
  { text: "Gestion papier", detail: "Cahiers et registres fragiles" },
  { text: "Informations dispersées", detail: "Chaque parcelle dans un coin de tête" },
  { text: "Oubli des tâches", detail: "Irrigations et traitements manqués" },
  { text: "Dépenses difficiles à suivre", detail: "Bénéfice réel inconnu" },
  { text: "Performances invisibles", detail: "Aucune donnée pour décider" },
];

const solutions = [
  { text: "Gestion numérique", detail: "Tout est enregistré, partout" },
  { text: "Informations centralisées", detail: "Exploitations, parcelles, finances" },
  { text: "Notifications automatiques", detail: "Plus aucune tâche oubliée" },
  { text: "Suivi financier complet", detail: "Revenus, dépenses, bénéfice" },
  { text: "Analyse des performances", detail: "Rapports clairs pour progresser" },
];

export default function WhyCultiva() {
  return (
    <section className="py-20 sm:py-28 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Pourquoi CULTIVA ?"
          title={
            <>
              Le changement que chaque agriculteur{" "}
              <span className="text-gradient-green">attendait</span>
            </>
          }
          subtitle="Les mêmes réalités du terrain, mais une toute autre façon de les gérer."
        />

        <div className="relative grid md:grid-cols-2 gap-6 md:gap-10 max-w-5xl mx-auto">
          {/* AVANT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-red-100 bg-gradient-to-br from-red-50 to-rose-50/60 p-7 sm:p-9"
          >
            <div className="flex items-center gap-3 mb-7">
              <span className="w-11 h-11 rounded-2xl bg-red-100 flex items-center justify-center">
                <X className="w-5 h-5 text-red-500" />
              </span>
              <div>
                <div className="text-[11px] font-bold tracking-widest text-red-400 uppercase">Avant</div>
                <h3 className="font-display text-xl font-extrabold text-red-600">Sans CULTIVA</h3>
              </div>
            </div>
            <ul className="space-y-5">
              {problems.map((p, i) => (
                <motion.li
                  key={p.text}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                  className="flex items-start gap-3.5"
                >
                  <span className="mt-0.5 w-7 h-7 rounded-full bg-white border border-red-200 flex items-center justify-center flex-shrink-0">
                    <X className="w-3.5 h-3.5 text-red-400" />
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-gray-800">{p.text}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{p.detail}</div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* AVEC */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="relative rounded-3xl bg-gradient-to-br from-cultiva-darkGreen to-cultiva-green p-7 sm:p-9 text-white shadow-lift overflow-hidden"
          >
            <div
              className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-white/10 blur-2xl"
              aria-hidden="true"
            />
            <div className="relative">
              <div className="flex items-center gap-3 mb-7">
                <span className="w-11 h-11 rounded-2xl bg-white/15 flex items-center justify-center">
                  <Check className="w-5 h-5 text-cultiva-yellow" />
                </span>
                <div>
                  <div className="text-[11px] font-bold tracking-widest text-cultiva-yellow uppercase">Avec</div>
                  <h3 className="font-display text-xl font-extrabold">CULTIVA</h3>
                </div>
              </div>
              <ul className="space-y-5">
                {solutions.map((s, i) => (
                  <motion.li
                    key={s.text}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                    className="flex items-start gap-3.5"
                  >
                    <span className="mt-0.5 w-7 h-7 rounded-full bg-cultiva-yellow flex items-center justify-center flex-shrink-0">
                      <Check className="w-3.5 h-3.5 text-cultiva-darkGreen-deep" />
                    </span>
                    <div>
                      <div className="text-sm font-semibold">{s.text}</div>
                      <div className="text-xs text-white/65 mt-0.5">{s.detail}</div>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Flèche centrale */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
            className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
            aria-hidden="true"
          >
            <div className="w-14 h-14 rounded-full bg-white shadow-lift border border-gray-100 flex items-center justify-center">
              <ArrowRight className="w-6 h-6 text-cultiva-green" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
