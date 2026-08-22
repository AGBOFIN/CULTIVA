"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getFarm, updateFarm } from "@/services/farms";
import type { Farm } from "@/types";
import { Card, CardBody } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { FarmForm } from "@/components/app/farms/farm-form";

export default function EditFarmPage() {
  const { id } = useParams() as { id: string };
  const [farm, setFarm] = useState<Farm | null | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    getFarm(id)
      .then((data) => {
        if (!cancelled) setFarm(data ?? null);
      })
      .catch(() => {
        if (!cancelled) setFarm(null);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <Link
          href={`/farms/${id}`}
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-cultiva-green transition-colors"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Retour à l&apos;exploitation
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-3">Modifier l&apos;exploitation</h1>
        <p className="text-gray-500 mt-1">Mettez à jour les informations de votre exploitation</p>
      </div>

      {farm === undefined ? (
        <div className="flex justify-center py-16">
          <Spinner />
        </div>
      ) : farm === null ? (
        <Card className="p-10 text-center">
          <h2 className="text-lg font-semibold text-gray-900">Exploitation introuvable</h2>
          <p className="text-sm text-gray-500 mt-1">
            Cette exploitation n&apos;existe pas ou a été supprimée.
          </p>
        </Card>
      ) : (
        <Card>
          <CardBody>
            <FarmForm
              initial={farm}
              onSubmit={(input) => updateFarm(farm.id, input)}
              submitLabel="Enregistrer les modifications"
              submittingLabel="Enregistrement..."
            />
          </CardBody>
        </Card>
      )}
    </div>
  );
}
