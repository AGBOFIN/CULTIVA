import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { BadgeTone } from "@/lib/labels";

const toneClasses: Record<BadgeTone, string> = {
  green: "bg-cultiva-green/10 text-cultiva-green",
  yellow: "bg-cultiva-yellow/20 text-yellow-800",
  red: "bg-red-100 text-red-700",
  gray: "bg-gray-100 text-gray-600",
  blue: "bg-blue-100 text-blue-700",
};

export function Badge({
  children,
  tone = "gray",
  className,
}: {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
        toneClasses[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
