"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, CalendarDays, Map, Package, Pencil, Trash2, Wallet, Wheat } from "lucide-react";
import { deleteHarvest, getHarvest } from "@/services/harvests";
import { getCrop } from "@/services/crops";
import { getField } from "@/services/fields";
import type { Crop, Field, Harvest } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { QUALITY_LABELS, QUALITY_TONES } from "@/lib/labels";
import { formatCurrency, formatDate, formatNumber } from "@/lib/format";

export default function HarvestDetailPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const [harvest, setHarvest] = useState<Harvest | null | undefined>(undefined);
  const [crop, setCrop] = useState<Crop | undefined>(undefined);
  const [field, setField] = useState<Field | undefined>(undefined);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getHarvest(id)
      .then(async (data) => {
        if (cancelled) return;
        setHarvest(data ?? null);
        if (data) {
          const [linkedCrop, linkedField] = await Promise.all([
            getCrop(data.cropId),
            getField(data.fieldId),
          ]);
          if (!cancelled) {
            setCrop(linkedCrop);
            setField(linkedField);
          }
        }
      })
      .catch(() => {
        if (!cancelled) setHarvest(null);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  async function handleDelete() {
    if (!harvest) return;
    setDeleting(true);
    try {
      await deleteHarvest(harvest.id);
      router.push("/harvests");
    } catch {
      setDeleting(false);
      setConfirmOpen(false);
    }
  }

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
    <div className="space-y-6">
      <Link
        href="/harvests"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-cultiva-green transition-colors"
      >
        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
        Retour aux récoltes
      </Link>

      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-14 h-14 bg-cultiva-green/10 rounded-2xl flex items-center justify-center flex-shrink-0">
            <Package className="w-7 h-7 text-cultiva-green" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 truncate">
              {crop ? crop.cropType : "Récolte"}
            </h1>
            <p className="text-gray-500 mt-1 text-sm">
              {formatNumber(harvest.quantity)} {harvest.unit} récoltés
            </p>
          </div>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <Link href={`/harvests/${harvest.id}/edit`}>
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
        <CardHeader title="Informations" subtitle="Détails de la récolte" />
        <CardBody className="pt-2">
          <dl className="divide-y divide-gray-50">
            <div className="flex items-center justify-between py-3 gap-4">
              <dt className="text-sm text-gray-500 flex items-center gap-2">
                <CalendarDays className="w-4 h-4" aria-hidden="true" /> Date
              </dt>
              <dd className="text-sm font-medium text-gray-900">{formatDate(harvest.date)}</dd>
            </div>
            <div className="flex items-center justify-between py-3 gap-4">
              <dt className="text-sm text-gray-500 flex items-center gap-2">
                <Wheat className="w-4 h-4" aria-hidden="true" /> Culture
              </dt>
              <dd>
                {crop ? (
                  <Link
                    href={`/crops/${crop.id}`}
                    className="text-sm font-medium text-cultiva-green hover:underline"
                  >
                    {crop.cropType}
                  </Link>
                ) : (
                  <span className="text-sm font-medium text-gray-900">—</span>
                )}
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
              <dt className="text-sm text-gray-500">Quantité</dt>
              <dd className="text-sm font-medium text-gray-900">
                {formatNumber(harvest.quantity)} {harvest.unit}
              </dd>
            </div>
            <div className="flex items-center justify-between py-3 gap-4">
              <dt className="text-sm text-gray-500">Qualité</dt>
              <dd>
                <Badge tone={QUALITY_TONES[harvest.quality]}>
                  {QUALITY_LABELS[harvest.quality]}
                </Badge>
              </dd>
            </div>
            <div className="flex items-center justify-between py-3 gap-4">
              <dt className="text-sm text-gray-500">Prix par unité</dt>
              <dd className="text-sm font-medium text-gray-900">
                {formatCurrency(harvest.price)} / {harvest.unit}
              </dd>
            </div>
            <div className="flex items-center justify-between py-3 gap-4">
              <dt className="text-sm text-gray-500 flex items-center gap-2">
                <Wallet className="w-4 h-4" aria-hidden="true" /> Revenu
              </dt>
              <dd className="text-sm font-bold text-cultiva-green">
                {formatCurrency(harvest.revenue)}
              </dd>
            </div>
          </dl>
        </CardBody>
      </Card>

      <ConfirmDialog
        open={confirmOpen}
        title="Supprimer la récolte"
        message={`Voulez-vous vraiment supprimer cette récolte (${harvest.quantity} ${harvest.unit}) ? Cette action est irréversible.`}
        busy={deleting}
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
}
