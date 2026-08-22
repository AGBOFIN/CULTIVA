import { cn } from "@/lib/utils";
import { Logo } from "@/components/app/logo";

export function Spinner({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "w-9 h-9 border-4 border-cultiva-green/20 border-t-cultiva-green rounded-full animate-spin",
        className
      )}
      role="status"
      aria-label="Chargement"
    />
  );
}

export function FullScreenLoader({ label = "Chargement..." }: { label?: string }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4">
      <Logo />
      <Spinner />
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
}
