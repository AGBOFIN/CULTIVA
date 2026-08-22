"use client";

import { motion } from "framer-motion";
import { ArrowRight, CalendarClock } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative py-20 sm:py-28 bg-cultiva-darkGreen overflow-hidden">
      {/* Décor */}
      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />
      <div
        className="absolute -top-32 left-1/3 w-[500px] h-[500px] rounded-full bg-cultiva-green/30 blur-[140px]"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 right-1/4 w-[400px] h-[400px] rounded-full bg-cultiva-yellow/20 blur-[130px]"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-white/5"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/15 px-4 py-2 rounded-full text-xs font-semibold text-cultiva-yellow mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-cultiva-yellow animate-pulse-soft" aria-hidden="true" />
          Rejoignez la révolution AgriTech
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-3xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-white tracking-tight leading-tight max-w-3xl mx-auto"
        >
          Prêt à transformer votre façon de{" "}
          <span className="text-gradient-gold">gérer votre exploitation</span> ?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-5 text-white/70 text-base sm:text-lg max-w-2xl mx-auto"
        >
          Rejoignez des centaines d&apos;agriculteurs qui pilotent déjà leurs exploitations
          avec CULTIVA — simple, moderne et pensé pour le terrain.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href="/register"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cultiva-yellow to-amber-400 text-cultiva-darkGreen-deep px-9 py-4 rounded-full font-bold text-base shadow-[0_16px_40px_-12px_rgb(249_168_37/0.8)] hover:shadow-[0_20px_50px_-12px_rgb(249_168_37/0.95)] transition-shadow"
          >
            Commencer avec CULTIVA
            <ArrowRight className="w-5 h-5" />
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur border border-white/25 text-white px-9 py-4 rounded-full font-semibold hover:bg-white/20 transition-colors"
          >
            <CalendarClock className="w-5 h-5" />
            Demander une démonstration
          </motion.a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.45 }}
          className="mt-8 text-xs text-white/40"
        >
          Gratuit pour démarrer · Sans engagement · Conçu pour l&apos;Afrique
        </motion.p>
      </div>
    </section>
  );
}
