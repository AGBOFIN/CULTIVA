import type { Metadata } from "next";
import Maquette from "@/components/maquette/maquette";

export const metadata: Metadata = {
  title: "CULTIVA — Maquette application mobile",
  description:
    "Prototype interactif de l'application mobile CULTIVA : dashboard, parcelles, cultures, activités, finances, météo et plus.",
};

export default function MaquettePage() {
  return <Maquette />;
}
