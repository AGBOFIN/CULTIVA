"use client";

import { useEffect, useState } from "react";
import { ClipboardList, Map, Sprout, Wheat } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { getDashboardData } from "@/services/dashboard";
import type { DashboardData } from "@/services/dashboard";
import { Spinner } from "@/components/ui/spinner";
import { StatCard } from "@/components/app/dashboard/stat-card";
import { FinanceSummary } from "@/components/app/dashboard/finance-summary";
import { ActivityList } from "@/components/app/dashboard/activity-list";
import { HarvestSummary } from "@/components/app/dashboard/harvest-summary";

export default function DashboardPage() {
  const { user } = useAuth();
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    getDashboardData()
      .then((result) => {
        if (!cancelled) setData(result);
      })
      .catch(() => {
        if (!cancelled) setError("Impossible de charger le tableau de bord.");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const firstName = user?.fullName.trim().split(/\s+/)[0] ?? "Agriculteur";
  const todayLabel = new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Bonjour, {firstName} 👋
        </h1>
        <p className="text-gray-500 mt-1 capitalize">{todayLabel}</p>

      </div>

      {error && (
        <div
          role="alert"
          className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3"
        >
          {error}
        </div>
      )}

      {data === null ? (
        <div className="flex justify-center py-20">
          <Spinner />
        </div>
      ) : (
        <>
          {/* Indicateurs clés */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <StatCard icon={Sprout} label="Exploitations" value={data.counts.farms} />
            <StatCard icon={Map} label="Parcelles" value={data.counts.fields} />
            <StatCard icon={Wheat} label="Cultures en cours" value={data.counts.activeCrops} />
            <StatCard
              icon={ClipboardList}
              label="Activités du jour"
              value={data.counts.todayActivities}
              accent="yellow"
              hint={
                data.counts.overdueActivities > 0 ? (
                  <span className="text-red-600 font-medium">
                    {data.counts.overdueActivities} en retard
                  </span>
                ) : (
                  "Aucun retard"
                )
              }
            />
          </div>

          {/* Finances + activités du jour */}
          <div className="grid lg:grid-cols-3 gap-4">
            <FinanceSummary data={data.finance} className="lg:col-span-1" />
            <ActivityList
              title="Activités du jour"
              activities={data.todayActivities}
              emptyMessage="Aucune activité prévue aujourd'hui."
              fieldNames={data.fieldNames}
              className="lg:col-span-2"
            />
          </div>

          {/* Prochaines activités + récoltes */}
          <div className="grid lg:grid-cols-3 gap-4">
            <ActivityList
              title="Prochaines activités"
              subtitle="Les 4 prochaines interventions prévues"
              activities={data.upcomingActivities}
              emptyMessage="Aucune activité à venir."
              fieldNames={data.fieldNames}
              className="lg:col-span-2"
            />
            <HarvestSummary
              data={data.harvests}
              fieldNames={data.fieldNames}
              className="lg:col-span-1"
            />
          </div>
        </>
      )}
    </div>
  );
}
