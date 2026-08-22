"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, CalendarDays, Map, Pencil, Ruler, Sprout, Trash2, Wheat } from "lucide-react";
import { deleteCrop, getCrop } from "@/services/crops";
import { getField } from "@/services/fields";
import type { Crop, Field } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { CROP_STATUS_LABELS, CROP_STATUS_TONES } from "@/lib/labels";
import { formatArea, formatDate } from "@/lib/format";

export default function CropDetailPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const [crop, setCrop] = useState<Crop | null | undefined>(undefined);
  const [field, setField] = useState<Field | undefined>(undefined);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getCrop(id)
      .then(async (data) => {
        if (cancelled) return;
        setCrop(data ?? null);
        if (data) {
          const linkedField = await getField(data.fieldId);
          if (!cancelled) setField(linkedField);
        }
      })
      .catch(() => {
        if (!cancelled) setCrop(null);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  async function handleDelete() {
    if (!crop) return;
    setDeleting(true);
    try {
      await deleteCrop(crop.id);
      router.push("/crops");
    } catch {
      setDeleting(false);
      setConfirmOpen(false);
    }
  }

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
    <div className="space-y-6">
      <Link
        href="/crops"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-cultiva-green transition-colors"
      >
        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
        Retour aux cultures
      </Link>

      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-14 h-14 bg-cultiva-green/10 rounded-2xl flex items-center justify-center flex-shrink-0">
            <Wheat className="w-7 h-7 text-cultiva-green" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 truncate">
              {crop.cropType}
            </h1>
            {crop.variety && <p className="text-gray-500 mt-1 text-sm">{crop.variety}</p>}
          </div>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <Link href={`/crops/${crop.id}/edit`}>
            <Button variant="outline" size="sm">
              <Pencil className="w-4 h-4" aria-hidden="true" />
              Modifier
            </Button>
          </Link>
          <Button variant="danger" size="sm" onClick={() => setConfirmOpen(true)}>
            <Trash2 className="w-4 h-4" aria-hidden="true" />
            Supprimer
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader title="Informations" subtitle="Détails de la culture" />
        <CardBody className="pt-2">
          <dl className="divide-y divide-gray-50">
            <div className="flex items-center justify-between py-3 gap-4">
              <dt className="text-sm text-gray-500">Statut</dt>
              <dd>
                <Badge tone={CROP_STATUS_TONES[crop.status]}>
                  {CROP_STATUS_LABELS[crop.status]}
                </Badge>
              </dd>
            </div>
            {field && (
              <div className="flex items-center justify-between py-3 gap-4">
                <dt className="text-sm text-gray-500 flex items-center gap-2">
                  <Map className="w-4 h-4" aria-hidden="true" /> Parcelle
                </dt>
                <dd>
                  <Link
                    href={`/fields/${field.id}`}
                    className="text-sm font-medium text-cultiva-green hover:underline"
                  >
                    {field.name}
                  </Link>
                </dd>
              </div>
            )}
            <div className="flex items-center justify-between py-3 gap-4">
              <dt className="text-sm text-gray-500 flex items-center gap-2">
                <CalendarDays className="w-4 h-4" aria-hidden="true" /> Date de semis
              </dt>
              <dd className="text-sm font-medium text-gray-900">{formatDate(crop.sowingDate)}</dd>
            </div>
            {crop.expectedHarvestDate && (
              <div className="flex items-center justify-between py-3 gap-4">
                <dt className="text-sm text-gray-500 flex items-center gap-2">
                  <Sprout className="w-4 h-4" aria-hidden="true" /> Récolte prévue
                </dt>
                <dd className="text-sm font-medium text-gray-900">
                  {formatDate(crop.expectedHarvestDate)}
                </dd>
              </div>
            )}
            <div className="flex items-center justify-between py-3 gap-4">
              <dt className="text-sm text-gray-500 flex items-center gap-2">
                <Ruler className="w-4 h-4" aria-hidden="true" /> Superficie
              </dt>
              <dd className="text-sm font-medium text-gray-900">
                {formatArea(crop.area, "hectares")}
              </dd>
            </div>
            {crop.seedQuantity !== undefined && (
              <div className="flex items-center justify-between py-3 gap-4">
                <dt className="text-sm text-gray-500">Quantité de semences</dt>
                <dd className="text-sm font-medium text-gray-900">
                  {crop.seedQuantity} {crop.seedUnit}
                </dd>
              </div>
            )}
          </dl>
        </CardBody>
      </Card>

      <ConfirmDialog
        open={confirmOpen}
        title="Supprimer la culture"
        message={`Voulez-vous vraiment supprimer « ${crop.cropType} » ? Cette action est irréversible.`}
        busy={deleting}
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
}
