"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { logoutAndNavigate } from "@/lib/nav";

const navItems = [
  { name: "Accueil", href: "#hero" },
  { name: "Fonctionnalités", href: "#features" },
  { name: "Application", href: "#app" },
  { name: "FAQ", href: "#faq" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const solid = isScrolled || isMobileMenuOpen;

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        solid ? "bg-white/85 backdrop-blur-xl shadow-[0_4px_30px_-12px_rgb(11_61_36/0.25)]" : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2.5 group" aria-label="CULTIVA — retour à l'accueil">
            <div className="h-10 rounded-xl overflow-hidden border border-white/20 shadow-[0_2px_8px_rgba(0,0,0,0.15)] transition-transform duration-300 group-hover:scale-105">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/cultiva-logo.png"
                alt="CULTIVA"
                className="h-full w-auto object-contain"
              />
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors relative group",
                  solid ? "text-gray-700 hover:text-cultiva-green" : "text-white/85 hover:text-white"
                )}
              >
                {item.name}
                <span className="absolute -bottom-1.5 left-0 h-0.5 w-0 bg-cultiva-green rounded-full transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => void logoutAndNavigate("/login")}
                className={cn(
                  "text-sm font-semibold transition-colors",
                  solid ? "text-gray-700 hover:text-cultiva-green" : "text-white/90 hover:text-white"
                )}
              >
                Se connecter
              </button>
              <motion.button
                type="button"
                onClick={() => void logoutAndNavigate("/register")}
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-1.5 bg-gradient-to-r from-cultiva-yellow to-amber-400 text-cultiva-darkGreen-deep px-5 py-2.5 rounded-full text-sm font-bold shadow-[0_8px_24px_-8px_rgb(249_168_37/0.7)] hover:shadow-[0_10px_30px_-8px_rgb(249_168_37/0.9)] transition-shadow"
              >
                Commencer
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 -mr-2"
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isMobileMenuOpen ? (
              <X className={cn("w-6 h-6", solid ? "text-gray-800" : "text-white")} />
            ) : (
              <Menu className={cn("w-6 h-6", solid ? "text-gray-800" : "text-white")} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden border-t border-gray-100 bg-white/95 backdrop-blur-xl"
          >
            <div className="flex flex-col px-5 py-4 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-xl text-gray-800 hover:bg-cultiva-green/10 hover:text-cultiva-green transition-colors font-medium"
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-3 space-y-3 border-t border-gray-100 mt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    void logoutAndNavigate("/login");
                  }}
                  className="block w-full text-center py-3 rounded-xl border-2 border-cultiva-green text-cultiva-green font-semibold hover:bg-cultiva-green/5 transition-colors"
                >
                  Se connecter
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    void logoutAndNavigate("/register");
                  }}
                  className="block w-full text-center py-3 rounded-xl bg-gradient-to-r from-cultiva-green to-cultiva-darkGreen text-white font-semibold shadow-lg hover:opacity-95 transition-opacity"
                >
                  Commencer
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
