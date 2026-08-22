"use client";

import Link from "next/link";
import { LayoutGrid, MapPin, Pencil, Sprout, Trash2 } from "lucide-react";
import type { Farm } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatArea } from "@/lib/format";

export function FarmCard({
  farm,
  fieldCount,
  onDelete,
}: {
  farm: Farm;
  fieldCount: number;
  onDelete: () => void;
}) {
  return (
    <Card className="p-5 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-11 h-11 bg-cultiva-green/10 rounded-xl flex items-center justify-center flex-shrink-0">
            <Sprout className="w-5 h-5 text-cultiva-green" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-gray-900 truncate">{farm.name}</h3>
            <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
              <MapPin className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
              <span className="truncate">{farm.location}</span>
            </p>
          </div>
        </div>
        <Badge tone="green" className="flex-shrink-0">{farm.type}</Badge>
      </div>

      <div className="flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-100 rounded-full px-2.5 py-1 text-xs text-gray-600">
          <span aria-hidden="true">📐</span> {formatArea(farm.area, farm.areaUnit)}
        </span>
        <span className="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-100 rounded-full px-2.5 py-1 text-xs text-gray-600">
          <LayoutGrid className="w-3.5 h-3.5 text-gray-400" aria-hidden="true" />
          {fieldCount} parcelle{fieldCount > 1 ? "s" : ""}
        </span>
      </div>

      {farm.description && (
        <p className="text-sm text-gray-500 line-clamp-2">{farm.description}</p>
      )}

      <div className="flex items-center justify-between gap-2 mt-auto pt-1">
        <Link
          href={`/farms/${farm.id}`}
          className="text-sm font-medium text-cultiva-green hover:text-cultiva-darkGreen transition-colors"
        >
          Voir les détails
        </Link>
        <div className="flex gap-1">
          <Link
            href={`/farms/${farm.id}/edit`}
            aria-label={`Modifier ${farm.name}`}
            className="p-2 rounded-lg text-gray-500 hover:text-cultiva-green hover:bg-green-50 transition-colors"
          >
            <Pencil className="w-4 h-4" aria-hidden="true" />
          </Link>
          <button
            type="button"
            onClick={onDelete}
            aria-label={`Supprimer ${farm.name}`}
            className="p-2 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
          >
            <Trash2 className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </Card>
  );
}
