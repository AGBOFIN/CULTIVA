const numberFormatter = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 });
const decimalFormatter = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 2 });

/** Formate un montant en FCFA (ex : "125 000 FCFA"). */
export function formatCurrency(amount: number): string {
  return `${numberFormatter.format(amount)} FCFA`;
}

export function formatNumber(value: number): string {
  return numberFormatter.format(value);
}

/** Formate une superficie (ex : "12 ha", "1,5 ha", "30 ares"). */
export function formatArea(area: number, unit: "hectares" | "ares"): string {
  const suffix = unit === "hectares" ? "ha" : "ares";
  return `${decimalFormatter.format(area)} ${suffix}`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
}

export function formatDateTime(iso: string): string {
  return `${formatDate(iso)} à ${formatTime(iso)}`;
}

/** Initiales d'un nom complet (ex : "Koffi Mensah" → "KM"). */
export function initials(name: string): string {
  return (
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join("") || "?"
  );
}

export function isSameDay(a: string | Date, b: string | Date): boolean {
  const da = new Date(a);
  const db = new Date(b);
  return (
    da.getFullYear() === db.getFullYear() &&
    da.getMonth() === db.getMonth() &&
    da.getDate() === db.getDate()
  );
}
