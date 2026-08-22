"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ClipboardList, Plus } from "lucide-react";
import { deleteActivity, getActivities } from "@/services/activities";
import { getFields } from "@/services/fields";
import type { Activity, Field } from "@/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { ActivityCard } from "@/components/app/activities/activity-card";

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[] | null>(null);
  const [fields, setFields] = useState<Field[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [toDelete, setToDelete] = useState<Activity | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    Promise.all([getActivities(), getFields()])
      .then(([activitiesData, fieldsData]) => {
        if (!cancelled) {
          setActivities(activitiesData);
          setFields(fieldsData);
        }
      })
      .catch(() => {
        if (!cancelled) setError("Impossible de charger les activités.");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleDelete() {
    if (!toDelete) return;
    setDeleting(true);
    try {
      await deleteActivity(toDelete.id);
      setActivities(
        (current) => current?.filter((activity) => activity.id !== toDelete.id) ?? current
      );
      setToDelete(null);
    } catch {
      setError("Impossible de supprimer cette activité.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Activités</h1>
          <p className="text-gray-500 mt-1">Planifiez et suivez vos travaux agricoles</p>
        </div>
        <Link href="/activities/new">
          <Button>
            <Plus className="w-5 h-5" aria-hidden="true" />
            Nouvelle activité
          </Button>
        </Link>
      </div>

      {error && (
        <div
          role="alert"
          className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3"
        >
          {error}
        </div>
      )}

      {activities === null ? (
        <div className="flex justify-center py-20">
          <Spinner />
        </div>
      ) : activities.length === 0 ? (
        <Card className="p-10 text-center">
          <div className="w-14 h-14 bg-cultiva-green/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <ClipboardList className="w-7 h-7 text-cultiva-green" aria-hidden="true" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Aucune activité</h2>
          <p className="text-sm text-gray-500 mt-1 mb-6">
            Planifiez votre première intervention agricole pour commencer le suivi.
          </p>
          <Link href="/activities/new">
            <Button>
              <Plus className="w-5 h-5" aria-hidden="true" />
              Nouvelle activité
            </Button>
          </Link>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {activities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              field={fields.find((field) => field.id === activity.fieldId)}
              onDelete={() => setToDelete(activity)}
            />
          ))}
        </div>
      )}

      <ConfirmDialog
        open={toDelete !== null}
        title="Supprimer l'activité"
        message={
          toDelete
            ? `Voulez-vous vraiment supprimer « ${toDelete.title} » ? Cette action est irréversible.`
            : ""
        }
        busy={deleting}
        onConfirm={handleDelete}
        onCancel={() => setToDelete(null)}
      />
    </div>
  );
}
