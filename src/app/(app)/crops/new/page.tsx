"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createCrop } from "@/services/crops";
import { Card, CardBody } from "@/components/ui/card";
import { CropForm } from "@/components/app/crops/crop-form";

export default function NewCropPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <Link
          href="/crops"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-cultiva-green transition-colors"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Retour aux cultures
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-3">Nouvelle culture</h1>
        <p className="text-gray-500 mt-1">
          Enregistrez une culture sur l&apos;une de vos parcelles
        </p>
      </div>

      <Card>
        <CardBody>
          <CropForm
            onSubmit={createCrop}
            submitLabel="Créer la culture"
            submittingLabel="Création..."
          />
        </CardBody>
      </Card>
    </div>
  );
}
