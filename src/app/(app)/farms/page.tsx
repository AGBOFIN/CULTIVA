"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Sprout } from "lucide-react";
import { deleteFarm, getFarms } from "@/services/farms";
import { getFields } from "@/services/fields";
import type { Farm, Field } from "@/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { FarmCard } from "@/components/app/farms/farm-card";

export default function FarmsPage() {
  const [farms, setFarms] = useState<Farm[] | null>(null);
  const [fields, setFields] = useState<Field[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [toDelete, setToDelete] = useState<Farm | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    Promise.all([getFarms(), getFields()])
      .then(([farmsData, fieldsData]) => {
        if (!cancelled) {
          setFarms(farmsData);
          setFields(fieldsData);
        }
      })
      .catch(() => {
        if (!cancelled) setError("Impossible de charger les exploitations.");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleDelete() {
    if (!toDelete) return;
    setDeleting(true);
    try {
      // La cascade (parcelles → cultures/activités → récoltes) est gérée côté serveur.
      await deleteFarm(toDelete.id);
      setFarms((current) => current?.filter((farm) => farm.id !== toDelete.id) ?? current);
      setFields((current) => current.filter((field) => field.farmId !== toDelete.id));
      setToDelete(null);
    } catch {
      setError("Impossible de supprimer cette exploitation.");
    } finally {
      setDeleting(false);
    }
  }

  const fieldCountFor = (farmId: string) =>
    fields.filter((field) => field.farmId === farmId).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Exploitations</h1>
          <p className="text-gray-500 mt-1">Gérez vos exploitations agricoles</p>
        </div>
        <Link href="/farms/new">
          <Button>
            <Plus className="w-5 h-5" aria-hidden="true" />
            Nouvelle exploitation
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

      {farms === null ? (
        <div className="flex justify-center py-20">
          <Spinner />
        </div>
      ) : farms.length === 0 ? (
        <Card className="p-10 text-center">
          <div className="w-14 h-14 bg-cultiva-green/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Sprout className="w-7 h-7 text-cultiva-green" aria-hidden="true" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Aucune exploitation</h2>
          <p className="text-sm text-gray-500 mt-1 mb-6">
            Créez votre première exploitation pour commencer à suivre vos parcelles.
          </p>
          <Link href="/farms/new">
            <Button>
              <Plus className="w-5 h-5" aria-hidden="true" />
              Nouvelle exploitation
            </Button>
          </Link>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {farms.map((farm) => (
            <FarmCard
              key={farm.id}
              farm={farm}
              fieldCount={fieldCountFor(farm.id)}
              onDelete={() => setToDelete(farm)}
            />
          ))}
        </div>
      )}

      <ConfirmDialog
        open={toDelete !== null}
        title="Supprimer l'exploitation"
        message={
          toDelete
            ? `Voulez-vous vraiment supprimer « ${toDelete.name} »${
                fieldCountFor(toDelete.id) > 0
                  ? ` et ses ${fieldCountFor(toDelete.id)} parcelle${fieldCountFor(toDelete.id) > 1 ? "s" : ""}`
                  : ""
              } ? Cette action est irréversible.`
            : ""
        }
        busy={deleting}
        onConfirm={handleDelete}
        onCancel={() => setToDelete(null)}
      />
    </div>
  );
}
