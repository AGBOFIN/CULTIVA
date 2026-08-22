"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createActivity } from "@/services/activities";
import { Card, CardBody } from "@/components/ui/card";
import { ActivityForm } from "@/components/app/activities/activity-form";

export default function NewActivityPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <Link
          href="/activities"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-cultiva-green transition-colors"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Retour aux activités
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-3">Nouvelle activité</h1>
        <p className="text-gray-500 mt-1">
          Planifiez une intervention agricole (semis, fertilisation, irrigation...)
        </p>
      </div>

      <Card>
        <CardBody>
          <ActivityForm
            onSubmit={createActivity}
            submitLabel="Créer l'activité"
            submittingLabel="Création..."
          />
        </CardBody>
      </Card>
    </div>
  );
}
