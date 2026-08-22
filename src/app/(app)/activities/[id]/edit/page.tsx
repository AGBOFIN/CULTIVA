"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getActivity, updateActivity } from "@/services/activities";
import type { Activity } from "@/types";
import { Card, CardBody } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { ActivityForm } from "@/components/app/activities/activity-form";

export default function EditActivityPage() {
  const { id } = useParams() as { id: string };
  const [activity, setActivity] = useState<Activity | null | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    getActivity(id)
      .then((data) => {
        if (!cancelled) setActivity(data ?? null);
      })
      .catch(() => {
        if (!cancelled) setActivity(null);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

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
    <div className="max-w-2xl space-y-6">
      <div>
        <Link
          href={`/activities/${activity.id}`}
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-cultiva-green transition-colors"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Retour aux détails
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-3">Modifier l&apos;activité</h1>
        <p className="text-gray-500 mt-1">{activity.title}</p>
      </div>

      <Card>
        <CardBody>
          <ActivityForm
            initial={activity}
            onSubmit={(input) => updateActivity(activity.id, input)}
            submitLabel="Enregistrer les modifications"
            submittingLabel="Enregistrement..."
          />
        </CardBody>
      </Card>
    </div>
  );
}
