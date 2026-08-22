"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Wheat } from "lucide-react";
import { deleteCrop, getCrops } from "@/services/crops";
import { getFields } from "@/services/fields";
import type { Crop, Field } from "@/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { CropCard } from "@/components/app/crops/crop-card";

export default function CropsPage() {
  const [crops, setCrops] = useState<Crop[] | null>(null);
  const [fields, setFields] = useState<Field[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [toDelete, setToDelete] = useState<Crop | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    Promise.all([getCrops(), getFields()])
      .then(([cropsData, fieldsData]) => {
        if (!cancelled) {
          setCrops(cropsData);
          setFields(fieldsData);
        }
      })
      .catch(() => {
        if (!cancelled) setError("Impossible de charger les cultures.");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleDelete() {
    if (!toDelete) return;
    setDeleting(true);
    try {
      await deleteCrop(toDelete.id);
      setCrops((current) => current?.filter((crop) => crop.id !== toDelete.id) ?? current);
      setToDelete(null);
    } catch {
      setError("Impossible de supprimer cette culture.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Cultures</h1>
          <p className="text-gray-500 mt-1">Suivez vos cultures de la semence à la récolte</p>
        </div>
        <Link href="/crops/new">
          <Button>
            <Plus className="w-5 h-5" aria-hidden="true" />
            Nouvelle culture
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

      {crops === null ? (
        <div className="flex justify-center py-20">
          <Spinner />
        </div>
      ) : crops.length === 0 ? (
        <Card className="p-10 text-center">
          <div className="w-14 h-14 bg-cultiva-green/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Wheat className="w-7 h-7 text-cultiva-green" aria-hidden="true" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Aucune culture</h2>
          <p className="text-sm text-gray-500 mt-1 mb-6">
            Enregistrez une culture sur l&apos;une de vos parcelles pour commencer le suivi.
          </p>
          <Link href="/crops/new">
            <Button>
              <Plus className="w-5 h-5" aria-hidden="true" />
              Nouvelle culture
            </Button>
          </Link>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {crops.map((crop) => (
            <CropCard
              key={crop.id}
              crop={crop}
              field={fields.find((field) => field.id === crop.fieldId)}
              onDelete={() => setToDelete(crop)}
            />
          ))}
        </div>
      )}

      <ConfirmDialog
        open={toDelete !== null}
        title="Supprimer la culture"
        message={
          toDelete
            ? `Voulez-vous vraiment supprimer « ${toDelete.cropType} » ? Cette action est irréversible.`
            : ""
        }
        busy={deleting}
        onConfirm={handleDelete}
        onCancel={() => setToDelete(null)}
      />
    </div>
  );
}
