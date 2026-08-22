"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  ClipboardList,
  Map,
  Pencil,
  Trash2,
  Wallet,
} from "lucide-react";
import { deleteActivity, getActivity } from "@/services/activities";
import { getField } from "@/services/fields";
import type { Activity, Field } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { ACTIVITY_STATUS_LABELS, ACTIVITY_STATUS_TONES, ACTIVITY_TYPE_LABELS } from "@/lib/labels";
import { formatCurrency, formatDateTime } from "@/lib/format";

export default function ActivityDetailPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const [activity, setActivity] = useState<Activity | null | undefined>(undefined);
  const [field, setField] = useState<Field | undefined>(undefined);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getActivity(id)
      .then(async (data) => {
        if (cancelled) return;
        setActivity(data ?? null);
        if (data?.fieldId) {
          const linkedField = await getField(data.fieldId);
          if (!cancelled) setField(linkedField);
        }
      })
      .catch(() => {
        if (!cancelled) setActivity(null);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  async function handleDelete() {
    if (!activity) return;
    setDeleting(true);
    try {
      await deleteActivity(activity.id);
      router.push("/activities");
    } catch {
      setDeleting(false);
      setConfirmOpen(false);
    }
  }

  if (activity === undefined) {
    return (
      <div className="flex justify-center py-20">
        <Spinner />
      </div>
    );
  }

  if (activity === null) {
    return (
      <div className="space-y-4">
        <Link
          href="/activities"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-cultiva-green transition-colors"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Retour aux activités
        </Link>
        <Card className="p-10 text-center">
          <h1 className="text-lg font-semibold text-gray-900">Activité introuvable</h1>
          <p className="text-sm text-gray-500 mt-1">
            Cette activité n&apos;existe pas ou a été supprimée.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link
        href="/activities"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-cultiva-green transition-colors"
      >
        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
        Retour aux activités
      </Link>

      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-14 h-14 bg-cultiva-green/10 rounded-2xl flex items-center justify-center flex-shrink-0">
            <ClipboardList className="w-7 h-7 text-cultiva-green" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 truncate">
              {activity.title}
            </h1>
            <p className="text-gray-500 mt-1 text-sm">{ACTIVITY_TYPE_LABELS[activity.type]}</p>
          </div>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <Link href={`/activities/${activity.id}/edit`}>
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
        <CardHeader title="Informations" subtitle="Détails de l'activité" />
        <CardBody className="pt-2">
          <dl className="divide-y divide-gray-50">
            <div className="flex items-center justify-between py-3 gap-4">
              <dt className="text-sm text-gray-500">Statut</dt>
              <dd>
                <Badge tone={ACTIVITY_STATUS_TONES[activity.status]}>
                  {ACTIVITY_STATUS_LABELS[activity.status]}
                </Badge>
              </dd>
            </div>
            <div className="flex items-center justify-between py-3 gap-4">
              <dt className="text-sm text-gray-500 flex items-center gap-2">
                <CalendarDays className="w-4 h-4" aria-hidden="true" /> Date
              </dt>
              <dd className="text-sm font-medium text-gray-900">
                {formatDateTime(activity.date)}
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
            {activity.cost > 0 && (
              <div className="flex items-center justify-between py-3 gap-4">
                <dt className="text-sm text-gray-500 flex items-center gap-2">
                  <Wallet className="w-4 h-4" aria-hidden="true" /> Coût
                </dt>
                <dd className="text-sm font-medium text-gray-900">
                  {formatCurrency(activity.cost)}
                </dd>
              </div>
            )}
            {activity.description && (
              <div className="py-3">
                <dt className="text-sm text-gray-500 mb-1">Description</dt>
                <dd className="text-sm text-gray-700 leading-relaxed">{activity.description}</dd>
              </div>
            )}
          </dl>
        </CardBody>
      </Card>

      <ConfirmDialog
        open={confirmOpen}
        title="Supprimer l'activité"
        message={`Voulez-vous vraiment supprimer « ${activity.title} » ? Cette action est irréversible.`}
        busy={deleting}
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
}
