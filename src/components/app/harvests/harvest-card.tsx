"use client";

import Link from "next/link";
import { CalendarDays, Package, Pencil, Trash2, Wheat } from "lucide-react";
import type { Crop, Harvest } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { QUALITY_LABELS, QUALITY_TONES } from "@/lib/labels";
import { formatCurrency, formatDate, formatNumber } from "@/lib/format";

export function HarvestCard({
  harvest,
  crop,
  onDelete,
}: {
  harvest: Harvest;
  crop?: Crop;
  onDelete: () => void;
}) {
  return (
    <Card className="p-5 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-11 h-11 bg-cultiva-green/10 rounded-xl flex items-center justify-center flex-shrink-0">
            <Package className="w-5 h-5 text-cultiva-green" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-gray-900 truncate">
              {crop ? crop.cropType : "Récolte"}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5 truncate">
              {formatNumber(harvest.quantity)} {harvest.unit}
            </p>
          </div>
        </div>
        <Badge tone={QUALITY_TONES[harvest.quality]} className="flex-shrink-0">
          {QUALITY_LABELS[harvest.quality]}
        </Badge>
      </div>

      <div className="flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-100 rounded-full px-2.5 py-1 text-xs text-gray-600">
          <CalendarDays className="w-3.5 h-3.5" aria-hidden="true" /> {formatDate(harvest.date)}
        </span>
        <span className="inline-flex items-center gap-1.5 bg-cultiva-green/5 border border-cultiva-green/15 rounded-full px-2.5 py-1 text-xs text-cultiva-green">
          <Wheat className="w-3.5 h-3.5" aria-hidden="true" /> {formatCurrency(harvest.revenue)}
        </span>
      </div>

      <div className="flex items-center justify-between gap-2 mt-auto pt-1">
        <Link
          href={`/harvests/${harvest.id}`}
          className="text-sm font-medium text-cultiva-green hover:text-cultiva-darkGreen transition-colors"
        >
          Voir les détails
        </Link>
        <div className="flex gap-1">
          <Link
            href={`/harvests/${harvest.id}/edit`}
            aria-label={`Modifier la récolte`}
            className="p-2 rounded-lg text-gray-500 hover:text-cultiva-green hover:bg-green-50 transition-colors"
          >
            <Pencil className="w-4 h-4" aria-hidden="true" />
          </Link>
          <button
            type="button"
            onClick={onDelete}
            aria-label={`Supprimer la récolte`}
            className="p-2 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
          >
            <Trash2 className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </Card>
  );
}
