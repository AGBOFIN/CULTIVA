"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createField } from "@/services/fields";
import { Card, CardBody } from "@/components/ui/card";
import { FieldForm } from "@/components/app/fields/field-form";

export default function NewFieldPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <Link
          href="/fields"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-cultiva-green transition-colors"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Retour aux parcelles
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-3">Nouvelle parcelle</h1>
        <p className="text-gray-500 mt-1">
          Ajoutez une parcelle à l&apos;une de vos exploitations
        </p>
      </div>

      <Card>
        <CardBody>
          <FieldForm
            onSubmit={createField}
            submitLabel="Créer la parcelle"
            submittingLabel="Création..."
          />
        </CardBody>
      </Card>
    </div>
  );
}
