"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CalendarDays, ChevronRight } from "lucide-react";
import { getActivities } from "@/services/activities";
import type { Activity } from "@/types";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Badge } from "@/components/ui/badge";
import { CalendarMonth, DayActivityList } from "@/components/app/calendar/calendar-month";
import { ACTIVITY_STATUS_LABELS, ACTIVITY_STATUS_TONES } from "@/lib/labels";
import { formatDate, isSameDay } from "@/lib/format";

function SectionList({
  title,
  activities,
  accent,
}: {
  title: string;
  activities: Activity[];
  accent: "green" | "red" | "blue";
}) {
  const dotColor =
    accent === "green" ? "bg-green-500" : accent === "red" ? "bg-red-500" : "bg-blue-500";

  return (
    <Card>
      <CardHeader
        title={
          <span className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${dotColor}`} />
            {title}
          </span>
        }
        subtitle={`${activities.length} activité${activities.length > 1 ? "s" : ""}`}
      />
      <CardBody className="pt-2">
        {activities.length === 0 ? (
          <p className="text-sm text-gray-500 py-4 text-center">Rien à afficher.</p>
        ) : (
          <ul className="divide-y divide-gray-50">
            {activities.map((activity) => (
              <li key={activity.id}>
                <Link
                  href={`/activities/${activity.id}`}
                  className="flex items-center justify-between gap-2 py-3 hover:bg-gray-50 -m-1 p-1 rounded-lg transition-colors"
                >
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">
                      {activity.title}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">{formatDate(activity.date)}</div>
                  </div>
                  <Badge tone={ACTIVITY_STATUS_TONES[activity.status]} className="flex-shrink-0">
                    {ACTIVITY_STATUS_LABELS[activity.status]}
                  </Badge>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </CardBody>
    </Card>
  );
}

export default function CalendarPage() {
  const router = useRouter();
  const [activities, setActivities] = useState<Activity[] | null>(null);
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date | null>(today);

  useEffect(() => {
    let cancelled = false;
    getActivities()
      .then((data) => {
        if (!cancelled) setActivities(data);
      })
      .catch(() => {
        if (!cancelled) setActivities([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  function goToMonth(delta: number) {
    const next = new Date(year, month + delta, 1);
    setMonth(next.getMonth());
    setYear(next.getFullYear());
  }

  if (activities === null) {
    return (
      <div className="flex justify-center py-20">
        <Spinner />
      </div>
    );
  }

  const upcoming = activities
    .filter((a) => a.status === "planifiee" && new Date(a.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);
  const overdue = activities
    .filter(
      (a) =>
        (a.status === "planifiee" || a.status === "en_cours") && new Date(a.date) < today
    )
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);
  const completed = activities
    .filter((a) => a.status === "terminee")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const selectedActivities =
    selectedDate === null
      ? []
      : activities.filter((a) => isSameDay(a.date, selectedDate));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
            <CalendarDays className="w-8 h-8 text-cultiva-green" aria-hidden="true" />
            Calendrier
          </h1>
          <p className="text-gray-500 mt-1">
            Vos interventions agricoles jour par jour
          </p>
        </div>
        <Link
          href="/activities/new"
          className="inline-flex items-center gap-1 text-sm font-medium text-cultiva-green hover:text-cultiva-darkGreen transition-colors"
        >
          Planifier une activité
          <ChevronRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>

      <Card>
        <CardBody>
          <CalendarMonth
            month={month}
            year={year}
            activities={activities}
            selectedDate={selectedDate}
            onSelectDate={(date) => {
              setSelectedDate(date);
              setMonth(date.getMonth());
              setYear(date.getFullYear());
            }}
            onPrevMonth={() => goToMonth(-1)}
            onNextMonth={() => goToMonth(1)}
          />
        </CardBody>
      </Card>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card>
          <CardBody>
            <DayActivityList
              date={selectedDate ?? today}
              activities={selectedActivities}
              onSelectActivity={(activity) => router.push(`/activities/${activity.id}`)}
            />
          </CardBody>
        </Card>

        <div className="space-y-4">
          <SectionList title="À venir" activities={upcoming} accent="blue" />
          <SectionList title="En retard" activities={overdue} accent="red" />
          <SectionList title="Terminées" activities={completed} accent="green" />
        </div>
      </div>
    </div>
  );
}
