"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getCrop, updateCrop } from "@/services/crops";
import type { Crop } from "@/types";
import { Card, CardBody } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { CropForm } from "@/components/app/crops/crop-form";

export default function EditCropPage() {
  const { id } = useParams() as { id: string };
  const [crop, setCrop] = useState<Crop | null | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    getCrop(id)
      .then((data) => {
        if (!cancelled) setCrop(data ?? null);
      })
      .catch(() => {
        if (!cancelled) setCrop(null);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (crop === undefined) {
    return (
      <div className="flex justify-center py-20">
        <Spinner />
      </div>
    );
  }

  if (crop === null) {
    return (
      <div className="space-y-4">
        <Link
          href="/crops"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-cultiva-green transition-colors"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Retour aux cultures
        </Link>
        <Card className="p-10 text-center">
          <h1 className="text-lg font-semibold text-gray-900">Culture introuvable</h1>
          <p className="text-sm text-gray-500 mt-1">
            Cette culture n&apos;existe pas ou a été supprimée.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <Link
          href={`/crops/${crop.id}`}
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-cultiva-green transition-colors"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Retour aux détails
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-3">Modifier la culture</h1>
        <p className="text-gray-500 mt-1">{crop.cropType}</p>
      </div>

      <Card>
        <CardBody>
          <CropForm
            initial={crop}
            onSubmit={(input) => updateCrop(crop.id, input)}
            submitLabel="Enregistrer les modifications"
            submittingLabel="Enregistrement..."
          />
        </CardBody>
      </Card>
    </div>
  );
}
