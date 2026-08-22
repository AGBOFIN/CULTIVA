"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Map, Plus } from "lucide-react";
import { deleteField, getFields } from "@/services/fields";
import { getFarms } from "@/services/farms";
import type { Farm, Field } from "@/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { FieldCard } from "@/components/app/fields/field-card";

export default function FieldsPage() {
  const [fields, setFields] = useState<Field[] | null>(null);
  const [farms, setFarms] = useState<Farm[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [toDelete, setToDelete] = useState<Field | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    Promise.all([getFields(), getFarms()])
      .then(([fieldsData, farmsData]) => {
        if (!cancelled) {
          setFields(fieldsData);
          setFarms(farmsData);
        }
      })
      .catch(() => {
        if (!cancelled) setError("Impossible de charger les parcelles.");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleDelete() {
    if (!toDelete) return;
    setDeleting(true);
    try {
      await deleteField(toDelete.id);
      setFields((current) => current?.filter((field) => field.id !== toDelete.id) ?? current);
      setToDelete(null);
    } catch {
      setError("Impossible de supprimer cette parcelle.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Parcelles</h1>
          <p className="text-gray-500 mt-1">Gérez les parcelles de vos exploitations</p>
        </div>
        <Link href="/fields/new">
          <Button>
            <Plus className="w-5 h-5" aria-hidden="true" />
            Nouvelle parcelle
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

      {fields === null ? (
        <div className="flex justify-center py-20">
          <Spinner />
        </div>
      ) : fields.length === 0 ? (
        <Card className="p-10 text-center">
          <div className="w-14 h-14 bg-cultiva-green/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Map className="w-7 h-7 text-cultiva-green" aria-hidden="true" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Aucune parcelle</h2>
          <p className="text-sm text-gray-500 mt-1 mb-6">
            Ajoutez une parcelle à l&apos;une de vos exploitations pour commencer le suivi.
          </p>
          <Link href="/fields/new">
            <Button>
              <Plus className="w-5 h-5" aria-hidden="true" />
              Nouvelle parcelle
            </Button>
          </Link>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {fields.map((field) => (
            <FieldCard
              key={field.id}
              field={field}
              farm={farms.find((farm) => farm.id === field.farmId)}
              onDelete={() => setToDelete(field)}
            />
          ))}
        </div>
      )}

      <ConfirmDialog
        open={toDelete !== null}
        title="Supprimer la parcelle"
        message={
          toDelete
            ? `Voulez-vous vraiment supprimer « ${toDelete.name} » ? Cette action est irréversible.`
            : ""
        }
        busy={deleting}
        onConfirm={handleDelete}
        onCancel={() => setToDelete(null)}
      />
    </div>
  );
}
