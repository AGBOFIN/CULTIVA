import { cn } from "@/lib/utils";

export function Logo({
  className,
  dark = false,
  full = false,
}: {
  className?: string;
  /** Texte blanc pour les fonds sombres. */
  dark?: boolean;
  /** Logo complet avec image officielle (auth pages). */
  full?: boolean;
}) {
  if (full) {
    return (
      <div className={cn("flex justify-center", className)}>
        <div className="rounded-2xl border-2 border-cultiva-green/20 bg-white shadow-[0_8px_32px_-8px_rgba(27,129,58,0.18)] p-4 sm:p-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/cultiva-logo.png"
            alt="CULTIVA — Gérez votre exploitation agricole en toute simplicité"
            className="w-full max-w-[220px] h-auto"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div
        className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden",
          dark
            ? "border border-white/20 shadow-[0_2px_8px_rgba(0,0,0,0.25)]"
            : "border border-cultiva-green/15 shadow-[0_2px_8px_rgba(27,129,58,0.12)]"
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/cultiva-logo.png"
          alt=""
          className="w-full h-full object-contain"
        />
      </div>
      <span
        className={cn(
          "text-lg font-bold tracking-tight",
          dark ? "text-white" : "text-cultiva-darkGreen"
        )}
      >
        CULTIVA
      </span>
    </div>
  );
}
