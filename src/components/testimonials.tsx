"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";

const testimonials = [
  {
    name: "Koffi Mensah",
    role: "Agriculteur",
    location: "Togo",
    content:
      "CULTIVA a transformé ma façon de gérer mon exploitation. Je suis mes cultures et mes finances facilement, depuis mon téléphone.",
    rating: 5,
    avatar: "KM",
  },
  {
    name: "Awa Diallo",
    role: "Coopérative agricole",
    location: "Sénégal",
    content:
      "Grâce à CULTIVA, notre coopérative a amélioré sa productivité de 30%. L'application est simple et parfaitement adaptée à nos besoins.",
    rating: 5,
    avatar: "AD",
  },
  {
    name: "Emmanuel Kouassi",
    role: "Exploitant",
    location: "Côte d'Ivoire",
    content:
      "Les notifications intelligentes m'aident à ne jamais oublier une tâche importante. CULTIVA est un véritable assistant agricole.",
    rating: 5,
    avatar: "EK",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 sm:py-28 bg-cultiva-mist">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Témoignages"
          title={
            <>
              Ils utilisent <span className="text-gradient-green">CULTIVA</span>
            </>
          }
          subtitle="Des agriculteurs et coopératives qui ont choisi de passer au numérique."
        />

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: index * 0.12 }}
              whileHover={{ y: -6 }}
              className="relative bg-white rounded-3xl ring-1 ring-gray-100 shadow-soft hover:shadow-lift transition-shadow p-7 sm:p-8 flex flex-col"
            >
              <Quote className="w-8 h-8 text-cultiva-green/15 mb-4" aria-hidden="true" />

              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-cultiva-yellow text-cultiva-yellow" />
                ))}
              </div>

              <p className="text-gray-700 leading-relaxed text-[15px] mb-7 flex-1">
                &ldquo;{t.content}&rdquo;
              </p>

              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cultiva-green to-cultiva-darkGreen flex items-center justify-center text-white font-bold shadow">
                  {t.avatar}
                </div>
                <div>
                  <div className="font-bold text-gray-900">{t.name}</div>
                  <div className="text-xs text-gray-500">
                    {t.role} · {t.location}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
