import { Package } from "lucide-react";
import type { DashboardHarvests } from "@/services/dashboard";
import { Badge } from "@/components/ui/badge";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { QUALITY_LABELS } from "@/lib/labels";
import { formatCurrency, formatDate, formatNumber } from "@/lib/format";

export function HarvestSummary({
  data,
  fieldNames,
  className,
}: {
  data: DashboardHarvests;
  fieldNames?: Record<string, string>;
  className?: string;
}) {
  return (
    <Card className={className}>
      <CardHeader
        title="Récoltes"
        subtitle="Résumé des dernières récoltes"
        action={
          <div className="w-9 h-9 bg-cultiva-yellow/20 rounded-xl flex items-center justify-center">
            <Package className="w-5 h-5 text-yellow-700" aria-hidden="true" />
          </div>
        }
      />
      <CardBody className="pt-3">
        <div className="bg-cultiva-green/5 rounded-xl p-4 text-center mb-4">
          <div className="text-2xl font-bold text-cultiva-green">
            {formatNumber(data.totalQuantity)} {data.unit}
          </div>
          <div className="text-xs text-gray-500 mt-0.5">Quantité totale récoltée</div>
        </div>

        {data.recent.length === 0 ? (
          <p className="text-sm text-gray-500 py-2 text-center">Aucune récolte enregistrée.</p>
        ) : (
          <ul className="divide-y divide-gray-50">
            {data.recent.map((harvest) => (
              <li key={harvest.id} className="py-2.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">
                      {formatNumber(harvest.quantity)} {harvest.unit}
                      <span className="text-gray-400 font-normal">
                        {" "}
                        · {fieldNames?.[harvest.fieldId] ?? "—"}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">{formatDate(harvest.date)}</div>
                  </div>
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <Badge tone={harvest.quality === "excellente" ? "green" : harvest.quality === "bonne" ? "blue" : harvest.quality === "moyenne" ? "yellow" : "red"}>
                      {QUALITY_LABELS[harvest.quality]}
                    </Badge>
                    <span className="text-xs font-medium text-cultiva-green">
                      {formatCurrency(harvest.revenue)}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardBody>
    </Card>
  );
}
