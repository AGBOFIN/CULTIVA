"use client";

import { useState } from "react";
import { Sprout, Signal, Wifi, BatteryFull } from "lucide-react";
import { cn } from "@/lib/utils";
import { SCREENS, BOTTOM_TABS, type ScreenId } from "./screens";

export default function Maquette() {
  const [active, setActive] = useState<ScreenId>("dashboard");
  const current = SCREENS.find((s) => s.id === active)!;
  const ActiveScreen = current.component;
  const tabActive = BOTTOM_TABS.some((t) => t.id === active);

  return (
    <div className="min-h-screen bg-cultiva-mist">
      {/* En-tête */}
      <header className="sticky top-0 z-20 bg-white/85 backdrop-blur-xl border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cultiva-green to-cultiva-darkGreen flex items-center justify-center shadow-soft">
              <Sprout className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-display text-lg font-extrabold text-cultiva-darkGreen leading-none">
                CULTIVA
              </div>
              <div className="text-[11px] text-gray-500">Maquette application mobile</div>
            </div>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-semibold text-cultiva-green bg-cultiva-green/10 rounded-full px-3 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cultiva-green animate-pulse-soft" />
            Prototype interactif
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 lg:py-12">
        {/* Sélecteur mobile (chips) */}
        <div className="lg:hidden flex gap-2 overflow-x-auto pb-4 -mx-4 px-4">
          {SCREENS.map((s) => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className={cn(
                "flex items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-2 text-xs font-bold transition-colors",
                active === s.id
                  ? "bg-cultiva-green text-white shadow-soft"
                  : "bg-white text-gray-600 ring-1 ring-gray-200 hover:text-cultiva-green"
              )}
            >
              <s.icon className="w-3.5 h-3.5" />
              {s.label}
            </button>
          ))}
        </div>

        <div className="lg:grid lg:grid-cols-[260px_1fr] gap-10 items-start">
          {/* Sélecteur desktop */}
          <aside className="hidden lg:block sticky top-24">
            <p className="text-[11px] font-extrabold uppercase tracking-wider text-gray-400 mb-3">
              Écrans de l&apos;application
            </p>
            <div className="space-y-1">
              {SCREENS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActive(s.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors text-left",
                    active === s.id
                      ? "bg-cultiva-green text-white shadow-soft"
                      : "text-gray-600 hover:bg-white hover:text-cultiva-green ring-1 ring-transparent hover:ring-gray-100"
                  )}
                >
                  <s.icon className="w-4 h-4" />
                  {s.label}
                </button>
              ))}
            </div>
            <div className="mt-6 bg-cultiva-green/5 border border-cultiva-green/15 rounded-2xl p-4 text-xs text-gray-600 leading-relaxed">
              💡 Cliquez sur un écran pour le visualiser dans le téléphone. Les onglets
              du bas fonctionnent aussi.
            </div>
          </aside>

          {/* Téléphone */}
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              <span>{current.label}</span>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <span>iPhone 16 · 393 × 852</span>
            </div>

            <div className="relative w-full max-w-[340px] aspect-[9/19]">
              {/* Halo */}
              <div
                className="absolute -inset-6 rounded-[4rem] bg-gradient-to-tr from-cultiva-green/20 via-transparent to-cultiva-yellow/15 blur-2xl"
                aria-hidden="true"
              />
              {/* Cadre téléphone */}
              <div className="absolute inset-0 bg-gray-900 rounded-[3rem] p-2.5 shadow-[0_40px_120px_-30px_rgb(11_61_36/0.5)]">
                <div className="relative w-full h-full bg-white rounded-[2.4rem] overflow-hidden">
                  {/* Barre de statut */}
                  <div className="relative z-10 flex items-center justify-between px-7 pt-3.5 pb-1.5">
                    <span className="text-[11px] font-bold text-gray-900">09:41</span>
                    <div className="absolute left-1/2 -translate-x-1/2 top-2 w-24 h-6 bg-gray-900 rounded-full" />
                    <div className="flex items-center gap-1 text-gray-900">
                      <Signal className="w-3.5 h-3.5" />
                      <Wifi className="w-3.5 h-3.5" />
                      <BatteryFull className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Écran actif */}
                  <div className="absolute inset-0 pt-12">
                    <div className="h-full overflow-y-auto no-scrollbar">
                      <ActiveScreen />
                    </div>
                  </div>

                  {/* Barre d'onglets bas (masquée sur onboarding & login) */}
                  {active !== "onboarding" && active !== "login" && active !== "register" && (
                    <>
                      <div className="absolute bottom-0 inset-x-0 bg-white/95 backdrop-blur border-t border-gray-100 flex items-center justify-around px-2 pb-4 pt-2">
                        {BOTTOM_TABS.map((tab) => {
                          const isActive = active === tab.id;
                          return (
                            <button
                              key={tab.id}
                              onClick={() => setActive(tab.id)}
                              className="flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl"
                            >
                              <tab.icon
                                className={cn(
                                  "w-5 h-5",
                                  isActive ? "text-cultiva-green" : "text-gray-400"
                                )}
                              />
                              <span
                                className={cn(
                                  "text-[9px] font-bold",
                                  isActive ? "text-cultiva-green" : "text-gray-400"
                                )}
                              >
                                {tab.label}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                      {/* Indicateur d'onglet actif (lorsque l'écran est hors tabs) */}
                      {!tabActive && (
                        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-24 h-4">
                          <div className="mx-auto mt-1.5 w-8 h-1 rounded-full bg-gray-200" />
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
