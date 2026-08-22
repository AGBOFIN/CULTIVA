"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getField, updateField } from "@/services/fields";
import type { Field } from "@/types";
import { Card, CardBody } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { FieldForm } from "@/components/app/fields/field-form";

export default function EditFieldPage() {
  const { id } = useParams() as { id: string };
  const [field, setField] = useState<Field | null | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    getField(id)
      .then((data) => {
        if (!cancelled) setField(data ?? null);
      })
      .catch(() => {
        if (!cancelled) setField(null);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <Link
          href={`/fields/${id}`}
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-cultiva-green transition-colors"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Retour à la parcelle
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-3">Modifier la parcelle</h1>
        <p className="text-gray-500 mt-1">Mettez à jour les informations de votre parcelle</p>
      </div>

      {field === undefined ? (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      ) : field === null ? (
        <Card className="p-10 text-center">
          <h2 className="text-lg font-semibold text-gray-900">Parcelle introuvable</h2>
          <p className="text-sm text-gray-500 mt-1">
            Cette parcelle n&apos;existe pas ou a été supprimée.
          </p>
        </Card>
      ) : (
        <Card>
          <CardBody>
            <FieldForm
              initial={field}
              onSubmit={(input) => updateField(field.id, input)}
              submitLabel="Enregistrer les modifications"
              submittingLabel="Enregistrement..."
            />
          </CardBody>
        </Card>
      )}
    </div>
  );
}
