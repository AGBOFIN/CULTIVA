"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Activity } from "@/types";
import { Badge } from "@/components/ui/badge";
import { ACTIVITY_STATUS_LABELS, ACTIVITY_STATUS_TONES } from "@/lib/labels";
import { isSameDay } from "@/lib/format";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

interface CalendarMonthProps {
  /** Mois affiché (0-11). */
  month: number;
  /** Année affichée. */
  year: number;
  activities: Activity[];
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

export function CalendarMonth({
  month,
  year,
  activities,
  selectedDate,
  onSelectDate,
  onPrevMonth,
  onNextMonth,
}: CalendarMonthProps) {
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // Lundi = 0 (getDay: dimanche = 0)
  const leadingBlanks = (firstDay.getDay() + 6) % 7;
  const today = new Date();

  const monthLabel = firstDay.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });

  const days: (number | null)[] = [
    ...Array.from({ length: leadingBlanks }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 capitalize">{monthLabel}</h2>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={onPrevMonth}
            aria-label="Mois précédent"
            className="p-2 rounded-lg text-gray-500 hover:text-cultiva-green hover:bg-green-50 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={onNextMonth}
            aria-label="Mois suivant"
            className="p-2 rounded-lg text-gray-500 hover:text-cultiva-green hover:bg-green-50 transition-colors"
          >
            <ChevronRight className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-gray-400 py-1.5"
          >
            {day}
          </div>
        ))}

        {days.map((dayNumber, index) => {
          if (dayNumber === null) {
            return <div key={`blank-${index}`} className="min-h-16 sm:min-h-20" />;
          }

          const date = new Date(year, month, dayNumber);
          const dayActivities = activities.filter((activity) =>
            isSameDay(activity.date, date)
          );
          const isToday = isSameDay(date, today);
          const isSelected = selectedDate !== null && isSameDay(date, selectedDate);

          return (
            <button
              key={dayNumber}
              type="button"
              onClick={() => onSelectDate(date)}
              className={cn(
                "min-h-16 sm:min-h-20 rounded-xl border p-1.5 text-left transition-colors flex flex-col",
                isSelected
                  ? "border-cultiva-green bg-cultiva-green/5 ring-2 ring-cultiva-green/20"
                  : "border-gray-100 hover:border-cultiva-green/40 hover:bg-green-50/50"
              )}
            >
              <span
                className={cn(
                  "inline-flex w-6 h-6 items-center justify-center rounded-full text-xs font-medium",
                  isToday ? "bg-cultiva-green text-white" : "text-gray-600"
                )}
              >
                {dayNumber}
              </span>
              {dayActivities.length > 0 && (
                <div className="mt-1 space-y-0.5 overflow-hidden">
                  {dayActivities.slice(0, 3).map((activity) => (
                    <span
                      key={activity.id}
                      className="block w-full h-1.5 rounded-full"
                      style={{
                        backgroundColor:
                          {
                            blue: "#3b82f6",
                            green: "#22c55e",
                            yellow: "#f59e0b",
                            red: "#ef4444",
                            gray: "#9ca3af",
                          }[ACTIVITY_STATUS_TONES[activity.status]],
                      }}
                      title={activity.title}
                    />
                  ))}
                  {dayActivities.length > 3 && (
                    <span className="text-[10px] text-gray-400">
                      +{dayActivities.length - 3}
                    </span>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Légende */}
      <div className="flex flex-wrap gap-3 mt-4 text-xs text-gray-500">
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Planifiée
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" /> En cours
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-green-500" /> Terminée
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500" /> En retard
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-gray-400" /> Annulée
        </span>
      </div>
    </div>
  );
}

export function DayActivityList({
  date,
  activities,
  onSelectActivity,
}: {
  date: Date;
  activities: Activity[];
  onSelectActivity: (activity: Activity) => void;
}) {
  const label = date.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-900 capitalize mb-3">{label}</h3>
      {activities.length === 0 ? (
        <p className="text-sm text-gray-500 py-4 text-center">
          Aucune activité ce jour-là.
        </p>
      ) : (
        <ul className="divide-y divide-gray-50">
          {activities.map((activity) => (
            <li key={activity.id}>
              <button
                type="button"
                onClick={() => onSelectActivity(activity)}
                className="w-full flex items-center justify-between gap-2 py-3 text-left hover:bg-gray-50 -m-1 p-1 rounded-lg transition-colors"
              >
                <div className="min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">
                    {activity.title}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {new Date(activity.date).toLocaleTimeString("fr-FR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
                <Badge tone={ACTIVITY_STATUS_TONES[activity.status]} className="flex-shrink-0">
                  {ACTIVITY_STATUS_LABELS[activity.status]}
                </Badge>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
