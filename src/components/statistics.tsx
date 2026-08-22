"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Clock, WifiOff, ShieldCheck, Zap } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";

export default function Statistics() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [counters, setCounters] = useState({ simplicity: 0, available: 0, secure: 0 });

  useEffect(() => {
    if (!isInView) return;
    const duration = 1800;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setCounters({
        simplicity: Math.round(99 * ease),
        available: Math.round(24 * ease),
        secure: Math.round(100 * ease),
      });
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView]);

  const stats = [
    { value: counters.simplicity, suffix: "%", label: "de simplicité", icon: Clock },
    { value: counters.available, suffix: "h/24", label: "Disponibilité", icon: WifiOff },
    { value: counters.secure, suffix: "%", label: "Données sécurisées", icon: ShieldCheck },
  ];

  return (
    <section id="about" className="relative py-20 sm:py-28 bg-cultiva-darkGreen overflow-hidden">
      {/* Motifs décoratifs */}
      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />
      <div className="absolute -top-32 left-1/4 w-96 h-96 rounded-full bg-cultiva-green/25 blur-[130px]" aria-hidden="true" />
      <div className="absolute -bottom-32 right-1/5 w-80 h-80 rounded-full bg-cultiva-yellow/15 blur-[120px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" ref={ref}>
        <SectionHeading
          dark
          eyebrow="Pourquoi choisir CULTIVA"
          title={
            <>
              Des chiffres qui parlent{" "}
              <span className="text-gradient-gold">d&apos;eux-mêmes</span>
            </>
          }
          subtitle="Une plateforme pensée pour être simple, disponible et fiable sur le terrain."
        />

        <div className="grid sm:grid-cols-3 gap-10 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-white/10 backdrop-blur border border-white/15 flex items-center justify-center">
                <stat.icon className="w-7 h-7 text-cultiva-yellow" />
              </div>
              <div className="font-display text-5xl sm:text-6xl font-extrabold mb-2">
                {stat.value}
                <span className="text-2xl font-bold text-cultiva-yellow">{stat.suffix}</span>
              </div>
              <div className="text-base text-white/75">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.45 }}
          className="mt-14 text-center"
        >
          <div className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur border border-white/15 px-6 py-3 rounded-full">
            <Zap className="w-4 h-4 text-cultiva-yellow" />
            <span className="font-semibold text-white">Fonctionne hors ligne et se synchronise automatiquement</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
