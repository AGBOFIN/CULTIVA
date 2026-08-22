"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Calendar, MapPin, Pencil, Ruler, Sprout, Trash2 } from "lucide-react";
import { deleteFarm, getFarm } from "@/services/farms";
import { getFields } from "@/services/fields";
import type { Farm, Field } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { FIELD_STATUS_LABELS } from "@/lib/labels";
import { formatArea, formatDate } from "@/lib/format";

const STATUS_TONES = {
  active: "green",
  en_preparation: "yellow",
  en_jachere: "gray",
} as const;

export default function FarmDetailPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const [farm, setFarm] = useState<Farm | null | undefined>(undefined);
  const [fields, setFields] = useState<Field[]>([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    Promise.all([getFarm(id), getFields()])
      .then(([farmData, fieldsData]) => {
        if (!cancelled) {
          setFarm(farmData ?? null);
          setFields(fieldsData);
        }
      })
      .catch(() => {
        if (!cancelled) setFarm(null);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  async function handleDelete() {
    if (!farm) return;
    setDeleting(true);
    try {
      // La cascade (parcelles → cultures/activités → récoltes) est gérée côté serveur.
      await deleteFarm(farm.id);
      router.push("/farms");
    } catch {
      setDeleting(false);
      setConfirmOpen(false);
    }
  }

  if (farm === undefined) {
    return (
      <div className="flex justify-center py-20">
        <Spinner />
      </div>
    );
  }

  if (farm === null) {
    return (
      <div className="space-y-4">
        <Link
          href="/farms"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-cultiva-green transition-colors"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Retour aux exploitations
        </Link>
        <Card className="p-10 text-center">
          <h1 className="text-lg font-semibold text-gray-900">Exploitation introuvable</h1>
          <p className="text-sm text-gray-500 mt-1">
            Cette exploitation n&apos;existe pas ou a été supprimée.
          </p>
        </Card>
      </div>
    );
  }

  const linkedFields = fields.filter((field) => field.farmId === farm.id);

  return (
    <div className="space-y-6">
      <Link
        href="/farms"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-cultiva-green transition-colors"
      >
        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
        Retour aux exploitations
      </Link>

      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-14 h-14 bg-cultiva-green/10 rounded-2xl flex items-center justify-center flex-shrink-0">
            <Sprout className="w-7 h-7 text-cultiva-green" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 truncate">{farm.name}</h1>
            <p className="text-gray-500 mt-1 flex items-center gap-1">
              <MapPin className="w-4 h-4" aria-hidden="true" /> {farm.location}
            </p>
          </div>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <Link href={`/farms/${farm.id}/edit`}>
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

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader title="Informations" subtitle="Détails de l'exploitation" />
          <CardBody className="pt-2">
            <dl className="divide-y divide-gray-50">
              <div className="flex items-center justify-between py-3 gap-4">
                <dt className="text-sm text-gray-500 flex items-center gap-2">
                  <Ruler className="w-4 h-4" aria-hidden="true" /> Superficie
                </dt>
                <dd className="text-sm font-medium text-gray-900">
                  {formatArea(farm.area, farm.areaUnit)}
                </dd>
              </div>
              <div className="flex items-center justify-between py-3 gap-4">
                <dt className="text-sm text-gray-500">Type d&apos;exploitation</dt>
                <dd>
                  <Badge tone="green">{farm.type}</Badge>
                </dd>
              </div>
              <div className="flex items-center justify-between py-3 gap-4">
                <dt className="text-sm text-gray-500 flex items-center gap-2">
                  <Calendar className="w-4 h-4" aria-hidden="true" /> Créée le
                </dt>
                <dd className="text-sm font-medium text-gray-900">{formatDate(farm.createdAt)}</dd>
              </div>
              {farm.description && (
                <div className="py-3">
                  <dt className="text-sm text-gray-500 mb-1">Description</dt>
                  <dd className="text-sm text-gray-700 leading-relaxed">{farm.description}</dd>
                </div>
              )}
            </dl>
          </CardBody>
        </Card>

        <Card>
          <CardHeader
            title="Parcelles"
            subtitle={`${linkedFields.length} parcelle${linkedFields.length > 1 ? "s" : ""} sur cette exploitation`}
          />
          <CardBody className="pt-2">
            {linkedFields.length === 0 ? (
              <p className="text-sm text-gray-500 py-4 text-center">
                Aucune parcelle pour le moment.
              </p>
            ) : (
              <ul className="divide-y divide-gray-50">
                {linkedFields.map((field) => (
                  <li key={field.id} className="py-3">
                    <Link
                      href={`/fields/${field.id}`}
                      className="flex items-center justify-between gap-2 hover:bg-gray-50 -m-1 p-1 rounded-lg transition-colors"
                    >
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate">
                          {field.name}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          {formatArea(field.area, field.areaUnit)}
                        </div>
                      </div>
                      <Badge
                        tone={STATUS_TONES[field.status]}
                        className="flex-shrink-0"
                      >
                        {FIELD_STATUS_LABELS[field.status]}
                      </Badge>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </CardBody>
        </Card>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title="Supprimer l'exploitation"
        message={`Voulez-vous vraiment supprimer « ${farm.name} »${
          linkedFields.length > 0
            ? ` et ses ${linkedFields.length} parcelle${linkedFields.length > 1 ? "s" : ""}`
            : ""
        } ? Cette action est irréversible.`}
        busy={deleting}
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
}
