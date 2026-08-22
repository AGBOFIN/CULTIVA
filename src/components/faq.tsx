"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "Comment fonctionne CULTIVA ?",
    answer:
      "Créez votre compte, ajoutez votre exploitation puis vos parcelles et cultures. Ensuite, planifiez vos activités, enregistrez vos dépenses et récoltes, et recevez des alertes automatiques. Tout est centralisé dans un tableau de bord unique, accessible depuis n'importe quel appareil.",
  },
  {
    question: "Mes données sont-elles sécurisées ?",
    answer:
      "Absolument. Vos données sont stockées sur des serveurs sécurisés, votre session est protégée et l'accès à votre compte est contrôlé par mot de passe. La protection de vos informations agricoles et financières est une priorité de la plateforme.",
  },
  {
    question: "Puis-je gérer plusieurs parcelles ?",
    answer:
      "Oui. CULTIVA est conçu pour gérer un nombre illimité d'exploitations et de parcelles. Chaque parcelle peut avoir ses propres cultures, activités, coûts et historique de récoltes.",
  },
  {
    question: "Comment recevoir les notifications ?",
    answer:
      "CULTIVA envoie des rappels pour vos tâches agricoles, les activités en retard, les alertes météo, les récoltes et les échéances importantes. Vous pouvez personnaliser vos préférences depuis la section Notifications de l'application.",
  },
  {
    question: "L'application fonctionne-t-elle hors connexion ?",
    answer:
      "CULTIVA est conçu pour rester utilisable sur le terrain, même avec une connexion instable. Vos données se synchronisent automatiquement dès que la connexion revient.",
  },
  {
    question: "Quels sont les tarifs ?",
    answer:
      "CULTIVA propose un plan gratuit avec les fonctionnalités essentielles de gestion. Des plans premium pour les agriculteurs et coopératives seront disponibles avec des fonctionnalités avancées (rapports détaillés, GPS, équipe élargie).",
  },
  {
    question: "Où CULTIVA est-il disponible ?",
    answer:
      "CULTIVA est conçu pour les agriculteurs africains et disponible partout avec une connexion internet. Il se déploie d'abord au Togo et en Afrique de l'Ouest, avec une extension prévue à tout le continent.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 sm:py-28 bg-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="FAQ"
          title={
            <>
              Questions <span className="text-gradient-green">fréquentes</span>
            </>
          }
          subtitle="Tout ce que vous devez savoir sur CULTIVA."
        />

        <div className="space-y-3.5">
          {faqs.map((faq, index) => {
            const open = openIndex === index;
            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                className={cn(
                  "rounded-2xl border transition-all duration-300 overflow-hidden",
                  open
                    ? "border-cultiva-green/30 bg-cultiva-green/[0.04] shadow-soft"
                    : "border-gray-200 bg-white hover:border-cultiva-green/30"
                )}
              >
                <button
                  onClick={() => setOpenIndex(open ? null : index)}
                  aria-expanded={open}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-semibold text-gray-900 text-[15px] sm:text-base">
                    {faq.question}
                  </span>
                  <span
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300",
                      open
                        ? "bg-cultiva-green text-white rotate-45"
                        : "bg-cultiva-mist text-cultiva-green"
                    )}
                  >
                    <Plus className="w-4 h-4" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-gray-600 leading-relaxed text-sm sm:text-[15px]">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
