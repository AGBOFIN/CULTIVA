import {
  ClipboardList,
  Droplets,
  FlaskConical,
  Scissors,
  ShieldCheck,
  Sprout,
  Wheat,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Activity, ActivityType } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { ACTIVITY_STATUS_LABELS, ACTIVITY_STATUS_TONES } from "@/lib/labels";
import { formatCurrency, formatTime, isSameDay } from "@/lib/format";

const TYPE_ICONS: Record<ActivityType, LucideIcon> = {
  semis: Sprout,
  fertilisation: FlaskConical,
  traitement: ShieldCheck,
  irrigation: Droplets,
  desherbage: Scissors,
  entretien: Wrench,
  recolte: Wheat,
  autre: ClipboardList,
};

function ActivityItem({
  activity,
  fieldName,
}: {
  activity: Activity;
  fieldName?: string;
}) {
  const Icon = TYPE_ICONS[activity.type];
  const isToday = isSameDay(activity.date, new Date());

  return (
    <li className="flex items-center gap-3 py-3">
      <div className="w-9 h-9 bg-cultiva-green/10 rounded-xl flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-cultiva-green" aria-hidden="true" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-gray-900 truncate">{activity.title}</div>
        <div className="text-xs text-gray-500 mt-0.5">
          {isToday ? `Aujourd'hui à ${formatTime(activity.date)}` : formatTime(activity.date)}
          {fieldName ? ` · ${fieldName}` : ""}
        </div>
      </div>
      <div className="flex flex-col items-end gap-1">
        <Badge tone={ACTIVITY_STATUS_TONES[activity.status]}>
          {ACTIVITY_STATUS_LABELS[activity.status]}
        </Badge>
        {activity.cost > 0 && (
          <span className="text-xs text-gray-500">{formatCurrency(activity.cost)}</span>
        )}
      </div>
    </li>
  );
}

export function ActivityList({
  title,
  subtitle,
  activities,
  emptyMessage,
  fieldNames,
  className,
}: {
  title: string;
  subtitle?: string;
  activities: Activity[];
  emptyMessage: string;
  fieldNames?: Record<string, string>;
  className?: string;
}) {
  return (
    <Card className={className}>
      <CardHeader title={title} subtitle={subtitle} />
      <CardBody className="pt-2">
        {activities.length === 0 ? (
          <p className="text-sm text-gray-500 py-4 text-center">{emptyMessage}</p>
        ) : (
          <ul className="divide-y divide-gray-50">
            {activities.map((activity) => (
              <ActivityItem
                key={activity.id}
                activity={activity}
                fieldName={
                  activity.fieldId ? fieldNames?.[activity.fieldId] : undefined
                }
              />
            ))}
          </ul>
        )}
      </CardBody>
    </Card>
  );
}
