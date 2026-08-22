"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createFarm } from "@/services/farms";
import { Card, CardBody } from "@/components/ui/card";
import { FarmForm } from "@/components/app/farms/farm-form";

export default function NewFarmPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <Link
          href="/farms"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-cultiva-green transition-colors"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Retour aux exploitations
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-3">
          Nouvelle exploitation
        </h1>
        <p className="text-gray-500 mt-1">
          Renseignez les informations de votre exploitation agricole
        </p>
      </div>

      <Card>
        <CardBody>
          <FarmForm
            onSubmit={createFarm}
            submitLabel="Créer l'exploitation"
            submittingLabel="Création..."
          />
        </CardBody>
      </Card>
    </div>
  );
}
