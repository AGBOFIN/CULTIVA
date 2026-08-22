"use client";

import Link from "next/link";
import { CalendarDays, Map, Pencil, Trash2, Wheat } from "lucide-react";
import type { Crop, Field } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CROP_STATUS_LABELS, CROP_STATUS_TONES } from "@/lib/labels";
import { formatArea, formatDate } from "@/lib/format";

export function CropCard({
  crop,
  field,
  onDelete,
}: {
  crop: Crop;
  field?: Field;
  onDelete: () => void;
}) {
  return (
    <Card className="p-5 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-11 h-11 bg-cultiva-green/10 rounded-xl flex items-center justify-center flex-shrink-0">
            <Wheat className="w-5 h-5 text-cultiva-green" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-gray-900 truncate">{crop.cropType}</h3>
            <p className="text-xs text-gray-500 mt-0.5 truncate">
              {crop.variety ? crop.variety : field ? field.name : "Culture"}
            </p>
          </div>
        </div>
        <Badge tone={CROP_STATUS_TONES[crop.status]} className="flex-shrink-0">
          {CROP_STATUS_LABELS[crop.status]}
        </Badge>
      </div>

      <div className="flex flex-wrap gap-2">
        {field && (
          <span className="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-100 rounded-full px-2.5 py-1 text-xs text-gray-600">
            <Map className="w-3.5 h-3.5" aria-hidden="true" /> {field.name}
          </span>
        )}
        <span className="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-100 rounded-full px-2.5 py-1 text-xs text-gray-600">
          <span aria-hidden="true">📐</span> {formatArea(crop.area, "hectares")}
        </span>
        <span className="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-100 rounded-full px-2.5 py-1 text-xs text-gray-600">
          <CalendarDays className="w-3.5 h-3.5" aria-hidden="true" /> Semis :{" "}
          {formatDate(crop.sowingDate)}
        </span>
      </div>

      <div className="flex items-center justify-between gap-2 mt-auto pt-1">
        <Link
          href={`/crops/${crop.id}`}
          className="text-sm font-medium text-cultiva-green hover:text-cultiva-darkGreen transition-colors"
        >
          Voir les détails
        </Link>
        <div className="flex gap-1">
          <Link
            href={`/crops/${crop.id}/edit`}
            aria-label={`Modifier ${crop.cropType}`}
            className="p-2 rounded-lg text-gray-500 hover:text-cultiva-green hover:bg-green-50 transition-colors"
          >
            <Pencil className="w-4 h-4" aria-hidden="true" />
          </Link>
          <button
            type="button"
            onClick={onDelete}
            aria-label={`Supprimer ${crop.cropType}`}
            className="p-2 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
          >
            <Trash2 className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </Card>
  );
}
