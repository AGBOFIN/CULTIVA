"use client";

import { Linkedin, Github, Facebook, Twitter } from "lucide-react";
import { logoutAndNavigate } from "@/lib/nav";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    produit: [
      { name: "Fonctionnalités", href: "#features" },
      { name: "Application", href: "#app" },
      { name: "Comment ça marche", href: "#how-it-works" },
      { name: "Feuille de route", href: "#roadmap" },
    ],
    equipe: [
      { name: "L'équipe", href: "#team" },
      { name: "À propos", href: "#about" },
      { name: "FAQ", href: "#faq" },
    ],
    support: [
      { name: "Lancer l'application", href: "/login" },
      { name: "Créer un compte", href: "/register" },
      { name: "Contact", href: "#contact" },
    ],
  };

  // Réseaux sociaux — liens à renseigner dès que les comptes officiels existent
  const socials = [
    { icon: Linkedin, label: "LinkedIn" },
    { icon: Github, label: "GitHub" },
    { icon: Facebook, label: "Facebook" },
    { icon: Twitter, label: "X / Twitter" },
  ];

  return (
    <footer className="bg-[#04170C] text-white relative overflow-hidden">
      <div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cultiva-green/60 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-cultiva-green/10 blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          {/* Logo & description */}
          <div className="lg:col-span-2">
            <div className="mb-5">
              <div className="inline-block rounded-xl border border-white/10 bg-white/5 p-3 shadow-[0_4px_16px_rgba(0,0,0,0.2)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/cultiva-logo.png"
                  alt="CULTIVA"
                  className="h-14 w-auto object-contain"
                />
              </div>
            </div>
            <p className="text-gray-400 max-w-sm leading-relaxed text-sm mb-7">
              La plateforme AgriTech qui aide les agriculteurs à gérer leurs
              exploitations, parcelles, cultures, finances et récoltes — simplement.
            </p>
            <div className="flex items-center gap-2.5">
              {socials.map((social) => (
                <span
                  key={social.label}
                  title={`${social.label} — bientôt disponible`}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 cursor-not-allowed"
                >
                  <social.icon className="w-4 h-4" />
                </span>
              ))}
            </div>
          </div>

          {/* Colonnes */}
          <div>
            <h3 className="font-display font-bold text-sm uppercase tracking-widest text-white/90 mb-5">
              Produit
            </h3>
            <ul className="space-y-3">
              {footerLinks.produit.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-cultiva-yellow transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold text-sm uppercase tracking-widest text-white/90 mb-5">
              Équipe
            </h3>
            <ul className="space-y-3">
              {footerLinks.equipe.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-cultiva-yellow transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold text-sm uppercase tracking-widest text-white/90 mb-5">
              Support
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-cultiva-yellow transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Barre basse */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {currentYear} CULTIVA. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => void logoutAndNavigate("/login")}
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Connexion
            </button>
            <button
              type="button"
              onClick={() => void logoutAndNavigate("/register")}
              className="inline-flex items-center bg-cultiva-green hover:bg-cultiva-green-light text-white text-sm font-semibold rounded-full px-5 py-2.5 transition-colors"
            >
              Inscription
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
