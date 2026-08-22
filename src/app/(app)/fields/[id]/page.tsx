"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Map, MapPin, Pencil, Ruler, Sprout, Trash2, Wheat } from "lucide-react";
import { deleteField, getField } from "@/services/fields";
import { getFarm } from "@/services/farms";
import { getCrops } from "@/services/crops";
import type { Crop, Farm, Field } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { CROP_STATUS_LABELS, CROP_STATUS_TONES, FIELD_STATUS_LABELS } from "@/lib/labels";
import { formatArea } from "@/lib/format";

const STATUS_TONES = {
  active: "green",
  en_preparation: "yellow",
  en_jachere: "gray",
} as const;

export default function FieldDetailPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const [field, setField] = useState<Field | null | undefined>(undefined);
  const [farm, setFarm] = useState<Farm | undefined>(undefined);
  const [crops, setCrops] = useState<Crop[]>([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getField(id)
      .then(async (data) => {
        if (cancelled) return;
        setField(data ?? null);
        if (data) {
          const [linkedFarm, linkedCrops] = await Promise.all([
            getFarm(data.farmId),
            getCrops(),
          ]);
          if (!cancelled) {
            setFarm(linkedFarm);
            setCrops(linkedCrops);
          }
        }
      })
      .catch(() => {
        if (!cancelled) setField(null);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  async function handleDelete() {
    if (!field) return;
    setDeleting(true);
    try {
      await deleteField(field.id);
      router.push("/fields");
    } catch {
      setDeleting(false);
      setConfirmOpen(false);
    }
  }

  if (field === undefined) {
    return (
      <div className="flex justify-center py-20">
        <Spinner />
      </div>
    );
  }

  if (field === null) {
    return (
      <div className="space-y-4">
        <Link
          href="/fields"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-cultiva-green transition-colors"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Retour aux parcelles
        </Link>
        <Card className="p-10 text-center">
          <h1 className="text-lg font-semibold text-gray-900">Parcelle introuvable</h1>
          <p className="text-sm text-gray-500 mt-1">
            Cette parcelle n&apos;existe pas ou a été supprimée.
          </p>
        </Card>
      </div>
    );
  }

  const linkedCrops = crops.filter((crop) => crop.fieldId === field.id);

  return (
    <div className="space-y-6">
      <Link
        href="/fields"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-cultiva-green transition-colors"
      >
        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
        Retour aux parcelles
      </Link>

      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-14 h-14 bg-cultiva-green/10 rounded-2xl flex items-center justify-center flex-shrink-0">
            <Map className="w-7 h-7 text-cultiva-green" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 truncate">{field.name}</h1>
            {farm && (
              <Link
                href={`/farms/${farm.id}`}
                className="text-gray-500 mt-1 text-sm inline-flex items-center gap-1 hover:text-cultiva-green transition-colors"
              >
                <Sprout className="w-3.5 h-3.5" aria-hidden="true" /> {farm.name}
              </Link>
            )}
          </div>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <Link href={`/fields/${field.id}/edit`}>
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
        <CardHeader title="Informations" subtitle="Détails de la parcelle" />
        <CardBody className="pt-2">
          <dl className="divide-y divide-gray-50">
            <div className="flex items-center justify-between py-3 gap-4">
              <dt className="text-sm text-gray-500">Statut</dt>
              <dd>
                <Badge tone={STATUS_TONES[field.status]}>
                  {FIELD_STATUS_LABELS[field.status]}
                </Badge>
              </dd>
            </div>
            <div className="flex items-center justify-between py-3 gap-4">
              <dt className="text-sm text-gray-500 flex items-center gap-2">
                <Ruler className="w-4 h-4" aria-hidden="true" /> Superficie
              </dt>
              <dd className="text-sm font-medium text-gray-900">
                {formatArea(field.area, field.areaUnit)}
              </dd>
            </div>
            {field.location && (
              <div className="flex items-center justify-between py-3 gap-4">
                <dt className="text-sm text-gray-500 flex items-center gap-2">
                  <MapPin className="w-4 h-4" aria-hidden="true" /> Localisation
                </dt>
                <dd className="text-sm font-medium text-gray-900">{field.location}</dd>
              </div>
            )}
            {field.soilType && (
              <div className="flex items-center justify-between py-3 gap-4">
                <dt className="text-sm text-gray-500">Type de sol</dt>
                <dd className="text-sm font-medium text-gray-900">{field.soilType}</dd>
              </div>
            )}
            {field.currentCrop && (
              <div className="flex items-center justify-between py-3 gap-4">
                <dt className="text-sm text-gray-500 flex items-center gap-2">
                  <Sprout className="w-4 h-4" aria-hidden="true" /> Culture actuelle
                </dt>
                <dd className="text-sm font-medium text-cultiva-green">{field.currentCrop}</dd>
              </div>
            )}
          </dl>
        </CardBody>
      </Card>

      <Card>
        <CardHeader
          title="Cultures"
          subtitle={`${linkedCrops.length} culture${linkedCrops.length > 1 ? "s" : ""} sur cette parcelle`}
        />
        <CardBody className="pt-2">
          {linkedCrops.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-sm text-gray-500 mb-4">Aucune culture pour le moment.</p>
              <Link href="/crops/new">
                <Button size="sm" variant="outline">
                  <Wheat className="w-4 h-4" aria-hidden="true" />
                  Ajouter une culture
                </Button>
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-gray-50">
              {linkedCrops.map((crop) => (
                <li key={crop.id} className="py-3">
                  <Link
                    href={`/crops/${crop.id}`}
                    className="flex items-center justify-between gap-2 hover:bg-gray-50 -m-1 p-1 rounded-lg transition-colors"
                  >
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">
                        {crop.cropType}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5 truncate">
                        {crop.variety ?? formatArea(crop.area, "hectares")}
                      </div>
                    </div>
                    <Badge tone={CROP_STATUS_TONES[crop.status]} className="flex-shrink-0">
                      {CROP_STATUS_LABELS[crop.status]}
                    </Badge>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </CardBody>
      </Card>

      <ConfirmDialog
        open={confirmOpen}
        title="Supprimer la parcelle"
        message={`Voulez-vous vraiment supprimer « ${field.name} »${
          linkedCrops.length > 0
            ? ` et ses ${linkedCrops.length} culture${linkedCrops.length > 1 ? "s" : ""}`
            : ""
        } ? Cette action est irréversible.`}
        busy={deleting}
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
}
