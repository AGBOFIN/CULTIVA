"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getHarvest, updateHarvest } from "@/services/harvests";
import type { Harvest } from "@/types";
import { Card, CardBody } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { HarvestForm } from "@/components/app/harvests/harvest-form";

export default function EditHarvestPage() {
  const { id } = useParams() as { id: string };
  const [harvest, setHarvest] = useState<Harvest | null | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    getHarvest(id)
      .then((data) => {
        if (!cancelled) setHarvest(data ?? null);
      })
      .catch(() => {
        if (!cancelled) setHarvest(null);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (harvest === undefined) {
    return (
      <div className="flex justify-center py-20">
        <Spinner />
      </div>
    );
  }

  if (harvest === null) {
    return (
      <div className="space-y-4">
        <Link
          href="/harvests"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-cultiva-green transition-colors"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Retour aux récoltes
        </Link>
        <Card className="p-10 text-center">
          <h1 className="text-lg font-semibold text-gray-900">Récolte introuvable</h1>
          <p className="text-sm text-gray-500 mt-1">
            Cette récolte n&apos;existe pas ou a été supprimée.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <Link
          href={`/harvests/${harvest.id}`}
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-cultiva-green transition-colors"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Retour aux détails
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-3">Modifier la récolte</h1>
        <p className="text-gray-500 mt-1">
          {harvest.quantity} {harvest.unit}
        </p>
      </div>

      <Card>
        <CardBody>
          <HarvestForm
            initial={harvest}
            onSubmit={(input) => updateHarvest(harvest.id, input)}
            submitLabel="Enregistrer les modifications"
            submittingLabel="Enregistrement..."
          />
        </CardBody>
      </Card>
    </div>
  );
}
