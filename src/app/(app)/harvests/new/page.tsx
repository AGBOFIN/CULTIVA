"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createHarvest } from "@/services/harvests";
import { Card, CardBody } from "@/components/ui/card";
import { HarvestForm } from "@/components/app/harvests/harvest-form";

export default function NewHarvestPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <Link
          href="/harvests"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-cultiva-green transition-colors"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Retour aux récoltes
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-3">Nouvelle récolte</h1>
        <p className="text-gray-500 mt-1">
          Enregistrez une récolte (quantité, qualité, prix et revenu)
        </p>
      </div>

      <Card>
        <CardBody>
          <HarvestForm
            onSubmit={createHarvest}
            submitLabel="Créer la récolte"
            submittingLabel="Création..."
          />
        </CardBody>
      </Card>
    </div>
  );
}
