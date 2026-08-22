import { Wallet } from "lucide-react";
import type { DashboardFinance } from "@/services/dashboard";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { formatCurrency } from "@/lib/format";
import { cn } from "@/lib/utils";

export function FinanceSummary({ data, className }: { data: DashboardFinance; className?: string }) {
  const rows = [
    { label: "Revenus", value: data.revenue, className: "text-cultiva-green" },
    { label: "Dépenses", value: data.expenses, className: "text-red-600" },
    {
      label: "Bénéfice",
      value: data.profit,
      className: data.profit >= 0 ? "text-cultiva-green" : "text-red-600",
    },
  ];

  return (
    <Card className={className}>
      <CardHeader
        title="Finances"
        subtitle="Vue d'ensemble"
        action={
          <div className="w-9 h-9 bg-cultiva-green/10 rounded-xl flex items-center justify-center">
            <Wallet className="w-5 h-5 text-cultiva-green" aria-hidden="true" />
          </div>
        }
      />
      <CardBody className="pt-3">
        <div className="divide-y divide-gray-50">
          {rows.map((row) => (
            <div key={row.label} className="flex items-center justify-between py-3">
              <span className="text-sm text-gray-600">{row.label}</span>
              <span className={cn("font-semibold", row.className)}>{formatCurrency(row.value)}</span>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
