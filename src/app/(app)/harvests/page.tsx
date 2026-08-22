"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Package, Plus } from "lucide-react";
import { deleteHarvest, getHarvests } from "@/services/harvests";
import { getCrops } from "@/services/crops";
import type { Crop, Harvest } from "@/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { HarvestCard } from "@/components/app/harvests/harvest-card";

export default function HarvestsPage() {
  const [harvests, setHarvests] = useState<Harvest[] | null>(null);
  const [crops, setCrops] = useState<Crop[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [toDelete, setToDelete] = useState<Harvest | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    Promise.all([getHarvests(), getCrops()])
      .then(([harvestsData, cropsData]) => {
        if (!cancelled) {
          setHarvests(harvestsData);
          setCrops(cropsData);
        }
      })
      .catch(() => {
        if (!cancelled) setError("Impossible de charger les récoltes.");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleDelete() {
    if (!toDelete) return;
    setDeleting(true);
    try {
      await deleteHarvest(toDelete.id);
      setHarvests(
        (current) => current?.filter((harvest) => harvest.id !== toDelete.id) ?? current
      );
      setToDelete(null);
    } catch {
      setError("Impossible de supprimer cette récolte.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Récoltes</h1>
          <p className="text-gray-500 mt-1">Enregistrez vos récoltes et leurs revenus</p>
        </div>
        <Link href="/harvests/new">
          <Button>
            <Plus className="w-5 h-5" aria-hidden="true" />
            Nouvelle récolte
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

      {harvests === null ? (
        <div className="flex justify-center py-20">
          <Spinner />
        </div>
      ) : harvests.length === 0 ? (
        <Card className="p-10 text-center">
          <div className="w-14 h-14 bg-cultiva-green/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Package className="w-7 h-7 text-cultiva-green" aria-hidden="true" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Aucune récolte</h2>
          <p className="text-sm text-gray-500 mt-1 mb-6">
            Enregistrez votre première récolte pour suivre vos quantités et revenus.
          </p>
          <Link href="/harvests/new">
            <Button>
              <Plus className="w-5 h-5" aria-hidden="true" />
              Nouvelle récolte
            </Button>
          </Link>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {harvests.map((harvest) => (
            <HarvestCard
              key={harvest.id}
              harvest={harvest}
              crop={crops.find((crop) => crop.id === harvest.cropId)}
              onDelete={() => setToDelete(harvest)}
            />
          ))}
        </div>
      )}

      <ConfirmDialog
        open={toDelete !== null}
        title="Supprimer la récolte"
        message={
          toDelete
            ? `Voulez-vous vraiment supprimer cette récolte (${toDelete.quantity} ${toDelete.unit}) ? Cette action est irréversible.`
            : ""
        }
        busy={deleting}
        onConfirm={handleDelete}
        onCancel={() => setToDelete(null)}
      />
    </div>
  );
}
