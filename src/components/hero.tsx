"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  PlayCircle,
  Sun,
  Bell,
  TrendingUp,
  Sprout,
  DollarSign,
  CalendarDays,
  BarChart3,
  Leaf,
} from "lucide-react";

function CountUp({
  target,
  suffix,
  label,
}: {
  target: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1600;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  return (
    <div ref={ref} className="text-center sm:text-left">
      <div className="font-display text-3xl sm:text-4xl font-extrabold text-white">
        {value.toLocaleString("fr-FR")}
        <span className="text-cultiva-yellow">{suffix}</span>
      </div>
      <div className="text-sm text-white/60 mt-1">{label}</div>
    </div>
  );
}

const kpis = [
  { icon: Sprout, label: "Exploitations", value: "2", tint: "bg-white/10" },
  { icon: Leaf, label: "Parcelles", value: "5", tint: "bg-white/10" },
  { icon: CalendarDays, label: "Cultures", value: "3", tint: "bg-white/10" },
  { icon: DollarSign, label: "Bénéfice", value: "+125k", tint: "bg-cultiva-yellow/20" },
];

const bars = [38, 55, 42, 70, 58, 85, 66];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-gradient-to-br from-cultiva-darkGreen-deep via-cultiva-darkGreen to-[#0d4d2c] text-white"
    >
      {/* Décor : grille + halos */}
      <div className="absolute inset-0 bg-grid opacity-60" aria-hidden="true" />
      <div
        className="absolute -top-40 right-[-10%] w-[560px] h-[560px] rounded-full bg-cultiva-green/25 blur-[140px]"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[-20%] left-[-10%] w-[480px] h-[480px] rounded-full bg-cultiva-yellow/15 blur-[140px]"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 left-1/2 w-[300px] h-[300px] rounded-full bg-cultiva-green-light/10 blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-10 items-center">
          {/* Colonne gauche */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/15 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold text-cultiva-yellow"
            >
              <span className="w-2 h-2 rounded-full bg-cultiva-yellow animate-pulse-soft" aria-hidden="true" />
              CULTIVA — La technologie au service d&apos;une agriculture plus intelligente
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-display text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold leading-[1.1] tracking-tight"
            >
              Gérez votre exploitation agricole{" "}
              <span className="text-gradient-gold">en toute simplicité</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-base sm:text-lg text-white/70 leading-relaxed max-w-xl"
            >
              CULTIVA réunit vos exploitations, parcelles, cultures, dépenses, récoltes
              et activités dans une seule plateforme intelligente — pensée pour les
              réalités africaines, du téléphone au bureau.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.a
                href="/register"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cultiva-yellow to-amber-400 text-cultiva-darkGreen-deep px-8 py-4 rounded-full font-bold shadow-[0_16px_40px_-12px_rgb(249_168_37/0.8)] hover:shadow-[0_20px_50px_-12px_rgb(249_168_37/0.95)] transition-shadow"
              >
                Découvrir CULTIVA
                <ArrowRight className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#app"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur border border-white/25 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-colors"
              >
                <PlayCircle className="w-5 h-5" />
                Voir la démonstration
              </motion.a>
            </motion.div>

            {/* Statistiques */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="pt-2"
            >
              <div className="flex items-center justify-between sm:justify-start sm:gap-14 border-t border-white/10 pt-8">
                <CountUp target={500} suffix="+" label="Agriculteurs" />
                <CountUp target={1000} suffix="+" label="Parcelles gérées" />
                <CountUp target={99} suffix="%" label="Satisfaction" />
              </div>
            </motion.div>
          </div>

          {/* Colonne droite : mockup navigateur */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.35, ease: "easeOut" }}
            className="relative"
          >
            {/* Halo derrière le mockup */}
            <div
              className="absolute inset-0 -m-8 rounded-[3rem] bg-gradient-to-tr from-cultiva-green/30 via-transparent to-cultiva-yellow/20 blur-2xl"
              aria-hidden="true"
            />

            <div className="relative rounded-2xl ring-1 ring-white/15 bg-white/5 backdrop-blur-xl overflow-hidden shadow-[0_40px_120px_-30px_rgb(0_0_0/0.6)]">
              {/* Barre navigateur */}
              <div className="flex items-center gap-3 px-4 py-3 bg-white/5 border-b border-white/10">
                <div className="flex gap-1.5" aria-hidden="true">
                  <span className="w-3 h-3 rounded-full bg-red-400/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-400/80" />
                  <span className="w-3 h-3 rounded-full bg-green-400/80" />
                </div>
                <div className="flex-1 max-w-xs mx-auto bg-white/10 rounded-lg px-3 py-1.5 text-[11px] text-white/60 text-center">
                  app.cultiva.africa
                </div>
              </div>

              {/* Corps du mockup */}
              <div className="flex">
                {/* Mini sidebar */}
                <div className="hidden sm:flex flex-col gap-1.5 w-36 p-4 bg-cultiva-darkGreen-deep/60">
                  <div className="flex items-center gap-1.5 mb-3">
                    <div className="w-5 h-5 rounded-md bg-cultiva-green flex items-center justify-center">
                      <Sprout className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-[10px] font-bold tracking-widest text-white/80">CULTIVA</span>
                  </div>
                  {["Tableau de bord", "Parcelles", "Cultures", "Finances", "Météo"].map((item, i) => (
                    <div
                      key={item}
                      className={`rounded-lg px-2.5 py-1.5 text-[10px] font-medium ${
                        i === 0
                          ? "bg-white/15 text-white"
                          : "text-white/50"
                      }`}
                    >
                      {item}
                    </div>
                  ))}
                </div>

                {/* Contenu principal */}
                <div className="flex-1 p-4 sm:p-5 space-y-4 bg-white/5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[11px] text-white/50">Bonjour, Koffi 👋</div>
                      <div className="text-sm font-bold text-white">Votre exploitation</div>
                    </div>
                    <div className="hidden sm:flex items-center gap-1.5 bg-cultiva-yellow/90 text-cultiva-darkGreen-deep rounded-full px-3 py-1.5 text-[10px] font-bold">
                      <BarChart3 className="w-3 h-3" />
                      Rapport
                    </div>
                  </div>

                  {/* KPIs */}
                  <div className="grid grid-cols-2 gap-2.5">
                    {kpis.map((kpi) => (
                      <div
                        key={kpi.label}
                        className={`${kpi.tint} rounded-xl p-3 ring-1 ring-white/10`}
                      >
                        <kpi.icon className="w-4 h-4 text-white/70 mb-1.5" />
                        <div className="text-base font-extrabold text-white leading-none">{kpi.value}</div>
                        <div className="text-[10px] text-white/55 mt-1">{kpi.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Graphique */}
                  <div className="rounded-xl p-3.5 bg-white/5 ring-1 ring-white/10">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-semibold text-white/70">Récoltes · 6 derniers mois</span>
                      <span className="text-[10px] text-cultiva-yellow font-bold">+18%</span>
                    </div>
                    <div className="flex items-end gap-1.5 h-16">
                      {bars.map((h, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ duration: 0.8, delay: 0.8 + i * 0.08, ease: "easeOut" }}
                          className={`flex-1 rounded-t-md ${
                            i === bars.length - 1
                              ? "bg-gradient-to-t from-cultiva-yellow to-amber-300"
                              : "bg-gradient-to-t from-cultiva-green to-cultiva-green-light"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Activités */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2.5 rounded-xl bg-white/5 ring-1 ring-white/10 p-2.5">
                      <div className="w-7 h-7 rounded-full bg-cultiva-green/30 flex items-center justify-center">
                        <Leaf className="w-3.5 h-3.5 text-green-300" />
                      </div>
                      <div className="flex-1">
                        <div className="text-[10px] font-semibold text-white">Récolte terminée — Parcelle A</div>
                        <div className="text-[9px] text-white/45">Aujourd&apos;hui · 2,4 t de maïs</div>
                      </div>
                      <span className="text-[9px] bg-cultiva-green/25 text-green-300 rounded-full px-2 py-0.5 font-semibold">Terminée</span>
                    </div>
                    <div className="flex items-center gap-2.5 rounded-xl bg-white/5 ring-1 ring-white/10 p-2.5">
                      <div className="w-7 h-7 rounded-full bg-cultiva-yellow/25 flex items-center justify-center">
                        <CalendarDays className="w-3.5 h-3.5 text-amber-300" />
                      </div>
                      <div className="flex-1">
                        <div className="text-[10px] font-semibold text-white">Irrigation — Parcelle B</div>
                        <div className="text-[9px] text-white/45">Demain · 06:00</div>
                      </div>
                      <span className="text-[9px] bg-cultiva-yellow/20 text-amber-300 rounded-full px-2 py-0.5 font-semibold">À venir</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cartes flottantes */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="absolute -top-5 -right-3 sm:-right-6 animate-float"
            >
              <div className="flex items-center gap-3 bg-white rounded-2xl shadow-lift px-4 py-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-300 to-cultiva-yellow flex items-center justify-center">
                  <Sun className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-sm font-extrabold text-gray-900 leading-none">26°C</div>
                  <div className="text-[11px] text-gray-500">Lomé · Ensoleillé</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.05, duration: 0.6 }}
              className="absolute -bottom-6 -left-3 sm:-left-8 animate-float-slow"
            >
              <div className="flex items-center gap-3 bg-white rounded-2xl shadow-lift px-4 py-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cultiva-green to-cultiva-darkGreen flex items-center justify-center">
                  <Bell className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-sm font-extrabold text-gray-900 leading-none">Rappel</div>
                  <div className="text-[11px] text-gray-500">Irrigation parcelle B — demain</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="absolute top-1/2 -right-4 sm:-right-10 hidden sm:flex animate-float [animation-delay:1.2s]"
            >
              <div className="flex items-center gap-2 bg-cultiva-darkGreen-deep/90 backdrop-blur border border-white/15 rounded-full pl-1.5 pr-4 py-1.5">
                <div className="w-8 h-8 rounded-full bg-cultiva-yellow flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-cultiva-darkGreen-deep" />
                </div>
                <div>
                  <div className="text-xs font-extrabold text-white leading-none">+18% rendement</div>
                  <div className="text-[10px] text-white/50">vs. saison dernière</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Courbe de transition vers la section suivante */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white/10 to-transparent" aria-hidden="true" />
    </section>
  );
}
