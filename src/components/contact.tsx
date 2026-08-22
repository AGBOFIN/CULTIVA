"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Mail, Phone, MapPin, Send, Clock } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";

const contactInfos = [
  { icon: Mail, label: "Email", value: "contact@cultiva.africa" },
  { icon: Phone, label: "Téléphone", value: "+228 71 16 84 78" },
  { icon: MapPin, label: "Adresse", value: "Lomé, Togo" },
];

export default function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="py-20 sm:py-28 bg-cultiva-mist">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contact"
          title={
            <>
              Parlons de votre <span className="text-gradient-green">exploitation</span>
            </>
          }
          subtitle="Une question, une démonstration, un projet ? Notre équipe vous répond."
        />

        <div className="grid lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {/* Panneau informations */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 relative rounded-3xl bg-gradient-to-br from-cultiva-darkGreen to-cultiva-green text-white p-8 sm:p-10 overflow-hidden shadow-lift"
          >
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10 blur-2xl" aria-hidden="true" />
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/10 to-transparent" aria-hidden="true" />

            <div className="relative">
              <h3 className="font-display text-2xl font-extrabold mb-2">Contactez-nous</h3>
              <p className="text-white/70 text-sm leading-relaxed mb-8">
                Notre équipe est joignable du lundi au vendredi, de 8h à 18h.
              </p>

              <div className="space-y-5">
                {contactInfos.map((info) => (
                  <div key={info.label} className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-5 h-5 text-cultiva-yellow" />
                    </div>
                    <div>
                      <div className="text-xs text-white/60 uppercase tracking-wide font-semibold">{info.label}</div>
                      <div className="font-semibold mt-0.5">{info.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-2xl bg-white/10 backdrop-blur border border-white/15 p-4 flex items-center gap-3">
                <Clock className="w-5 h-5 text-cultiva-yellow flex-shrink-0" />
                <p className="text-xs text-white/80">
                  Réponse sous 24 h ouvrées.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Formulaire */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 bg-white rounded-3xl ring-1 ring-gray-100 shadow-soft p-8 sm:p-10"
          >
            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-cultiva-green/[0.06] border border-cultiva-green/25 text-cultiva-darkGreen rounded-2xl p-8 text-center"
                  role="status"
                >
                  <CheckCircle2 className="w-12 h-12 mx-auto mb-3 text-cultiva-green" aria-hidden="true" />
                  <p className="font-display text-xl font-extrabold">Message envoyé !</p>
                  <p className="text-sm text-gray-600 mt-2">
                    Merci de nous avoir contactés, nous reviendrons vers vous rapidement.
                  </p>

                </motion.div>
              ) : (
                <>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-name" className="block text-sm font-semibold text-gray-700 mb-2">
                        Nom
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        className="w-full px-4 py-3 bg-cultiva-mist border border-transparent rounded-xl focus:ring-2 focus:ring-cultiva-green focus:bg-white outline-none transition-all"
                        placeholder="Votre nom"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-sm font-semibold text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        className="w-full px-4 py-3 bg-cultiva-mist border border-transparent rounded-xl focus:ring-2 focus:ring-cultiva-green focus:bg-white outline-none transition-all"
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="contact-phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Téléphone
                    </label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      className="w-full px-4 py-3 bg-cultiva-mist border border-transparent rounded-xl focus:ring-2 focus:ring-cultiva-green focus:bg-white outline-none transition-all"
                      placeholder="+228 XX XX XX XX"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-semibold text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      required
                      className="w-full px-4 py-3 bg-cultiva-mist border border-transparent rounded-xl focus:ring-2 focus:ring-cultiva-green focus:bg-white outline-none transition-all resize-none"
                      placeholder="Votre message..."
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-gradient-to-r from-cultiva-green to-cultiva-darkGreen text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lift hover:opacity-95 transition-opacity"
                  >
                    Envoyer le message
                    <Send className="w-5 h-5" />
                  </motion.button>
                </>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
