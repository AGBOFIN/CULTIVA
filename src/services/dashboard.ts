/**
 * Service du tableau de bord : agrège les données de l'API réelle.
 */
import { getActivities } from "./activities";
import { getCrops } from "./crops";
import { getFarms } from "./farms";
import { getFields } from "./fields";
import { getHarvests } from "./harvests";
import { getTransactions } from "./transactions";
import type { Activity, Crop, Harvest } from "@/types";
import { isSameDay } from "@/lib/format";

export interface DashboardCounts {
  farms: number;
  fields: number;
  activeCrops: number;
  todayActivities: number;
  upcomingActivities: number;
  overdueActivities: number;
}

export interface DashboardFinance {
  revenue: number;
  expenses: number;
  profit: number;
}

export interface DashboardHarvests {
  totalQuantity: number;
  unit: string;
  recent: Harvest[];
}

export interface DashboardData {
  counts: DashboardCounts;
  finance: DashboardFinance;
  harvests: DashboardHarvests;
  todayActivities: Activity[];
  upcomingActivities: Activity[];
  overdueActivities: Activity[];
  /** Nom de parcelle par id (pour l'affichage des activités). */
  fieldNames: Record<string, string>;
}

const ACTIVE_CROP_STATUSES: Crop["status"][] = ["semee", "en_croissance", "prete_a_recolter"];

export async function getDashboardData(): Promise<DashboardData> {
  const today = new Date();

  const [activities, crops, fields, farms, harvests, transactions] = await Promise.all([
    getActivities(),
    getCrops(),
    getFields(),
    getFarms(),
    getHarvests(),
    getTransactions(),
  ]);

  const activeCrops = crops.filter((c) => ACTIVE_CROP_STATUSES.includes(c.status));

  const todayActivities = activities.filter((a) => isSameDay(a.date, today));
  const upcomingActivities = activities
    .filter((a) => a.status === "planifiee" && new Date(a.date) > today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 4);
  const overdueActivities = activities.filter(
    (a) => (a.status === "planifiee" || a.status === "en_cours") && new Date(a.date) < today
  );

  const revenue = transactions
    .filter((t) => t.type === "revenu")
    .reduce((sum, t) => sum + t.amount, 0);
  const expenses = transactions
    .filter((t) => t.type === "depense")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalQuantity = harvests.reduce((sum, h) => sum + h.quantity, 0);
  const unit = harvests[0]?.unit ?? "kg";
  const recent = [...harvests]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const fieldNames: Record<string, string> = {};
  for (const field of fields) {
    fieldNames[field.id] = field.name;
  }

  return {
    counts: {
      farms: farms.length,
      fields: fields.length,
      activeCrops: activeCrops.length,
      todayActivities: todayActivities.length,
      upcomingActivities: upcomingActivities.length,
      overdueActivities: overdueActivities.length,
    },
    finance: { revenue, expenses, profit: revenue - expenses },
    harvests: { totalQuantity, unit, recent },
    todayActivities,
    upcomingActivities,
    overdueActivities,
    fieldNames,
  };
}
