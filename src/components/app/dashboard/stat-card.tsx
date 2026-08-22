import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Accent = "green" | "yellow" | "gray";

const accentClasses: Record<Accent, string> = {
  green: "bg-cultiva-green/10 text-cultiva-green",
  yellow: "bg-cultiva-yellow/20 text-yellow-700",
  gray: "bg-gray-100 text-gray-600",
};

export function StatCard({
  icon: Icon,
  label,
  value,
  hint,
  accent = "green",
}: {
  icon: LucideIcon;
  label: string;
  value: number | string;
  hint?: ReactNode;
  accent?: Accent;
}) {
  return (
    <Card className="p-4 sm:p-5">
      <div className="flex items-center gap-3">
        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0", accentClasses[accent])}>
          <Icon className="w-5 h-5" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <div className="text-2xl font-bold text-gray-900 leading-none">{value}</div>
          <div className="text-xs text-gray-500 mt-1 leading-snug line-clamp-2">{label}</div>
        </div>
      </div>
      {hint && <div className="mt-3 text-xs text-gray-500">{hint}</div>}
    </Card>
  );
}
