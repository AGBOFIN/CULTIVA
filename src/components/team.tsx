"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ClipboardList, Code2, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";

type Member = {
  /** Chemin de la photo — remplacez le fichier pour afficher la vraie photo */
  image: string;
  /** Initiales affichées tant que la photo n'est pas disponible */
  initials: string;
  /** Poste affiché comme titre de la carte */
  role: string;
  /** Nom du membre — à renseigner */
  name: string;
  bio: string;
  skills: string[];
  icon: React.ComponentType<{ className?: string }>;
};

const members: Member[] = [
  {
    image: "/images/team/chef-projet.jpg",
    initials: "CP",
    role: "Chef de Projet / Product Manager",
    name: "Agbofin Ahlonko Moise Parfait",
    bio: "Assure la vision globale de CULTIVA et coordonne chaque étape de sa réalisation, des besoins des agriculteurs jusqu'à la mise en production.",
    skills: [
      "Gestion de projet",
      "Analyse des besoins",
      "Conception produit",
      "Coordination d'équipe",
      "Communication",
      "Vision stratégique",
      "Suivi du développement",
    ],
    icon: ClipboardList,
  },
  {
    image: "/images/team/developpeur-fullstack.jpg",
    initials: "DF",
    role: "Développeur Full Stack",
    name: "Segbegno Kossi",
    bio: "Conçoit et développe la plateforme de bout en bout : interfaces modernes, API, bases de données et architecture logicielle.",
    skills: [
      "Frontend",
      "Backend",
      "API REST",
      "Bases de données",
      "Next.js / React",
      "TypeScript",
      "Git / GitHub",
      "Responsive Design",
    ],
    icon: Code2,
  },
  {
    image: "/images/team/admin-reseau.jpg",
    initials: "AR",
    role: "Administrateur Réseau & Cybersécurité",
    name: "",
    bio: "Garantit la sécurité, l'infrastructure et la protection des données de la plateforme, du serveur jusqu'au compte de chaque utilisateur.",
    skills: [
      "Administration réseau",
      "Sécurité informatique",
      "Protection des données",
      "Gestion des accès",
      "Sécurisation des serveurs",
      "Surveillance réseau",
      "Gestion des incidents",
    ],
    icon: ShieldCheck,
  },
];

function MemberPhoto({ member }: { member: Member }) {
  const [failed, setFailed] = useState(false);
  const Icon = member.icon;

  return (
    <div className="relative mx-auto w-32 h-32 mb-6">
      <div
        className="absolute inset-0 rounded-full bg-gradient-to-tr from-cultiva-green via-cultiva-green-light to-cultiva-yellow opacity-20 blur-xl"
        aria-hidden="true"
      />
      <div className="relative w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-cultiva-green to-cultiva-darkGreen shadow-lift">
        {!failed ? (
          <Image
            src={member.image}
            alt={`Photo de ${member.role}`}
            width={128}
            height={128}
            onError={() => setFailed(true)}
            className="w-full h-full object-cover rounded-full bg-cultiva-mist"
          />
        ) : (
          <div className="w-full h-full rounded-full bg-gradient-to-br from-cultiva-darkGreen to-cultiva-green flex items-center justify-center">
            <span className="font-display text-3xl font-extrabold text-white">
              {member.initials}
            </span>
          </div>
        )}
      </div>
      <div className="absolute bottom-1 right-1 w-9 h-9 rounded-xl bg-cultiva-yellow shadow flex items-center justify-center">
        <Icon className="w-4 h-4 text-cultiva-darkGreen-deep" />
      </div>
    </div>
  );
}

export default function Team() {
  return (
    <section id="team" className="py-20 sm:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="L'équipe"
          title={
            <>
              L&apos;équipe derrière <span className="text-gradient-green">CULTIVA</span>
            </>
          }
          subtitle="Une équipe passionnée par la technologie, l'agriculture et l'innovation."
        />

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {members.map((member, index) => (
            <motion.div
              key={member.role}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: index * 0.12 }}
              whileHover={{ y: -6 }}
              className="group relative bg-white rounded-3xl ring-1 ring-gray-100 shadow-soft hover:shadow-lift transition-shadow p-7 sm:p-8 flex flex-col"
            >
              <div
                className="absolute inset-x-0 top-0 h-1.5 rounded-t-3xl bg-gradient-to-r from-cultiva-green via-cultiva-green-light to-cultiva-yellow opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                aria-hidden="true"
              />

              <MemberPhoto member={member} />

              <div className="text-center mb-5">
                <h3 className="font-display text-xl font-extrabold text-gray-900 leading-tight">
                  {member.role}
                </h3>
                <p className="text-sm text-cultiva-green font-semibold mt-1.5">
                  {member.name || "Nom — à venir"}
                </p>
              </div>

              <p className="text-sm text-gray-600 leading-relaxed text-center mb-6">
                {member.bio}
              </p>

              <div className="mt-auto">
                <div className="h-px bg-gray-100 mb-5" />
                <div className="flex flex-wrap justify-center gap-1.5">
                  {member.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[11px] font-medium bg-cultiva-mist text-gray-700 rounded-full px-3 py-1.5"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
