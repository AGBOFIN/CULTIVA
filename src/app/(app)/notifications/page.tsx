"use client";

import { useEffect, useState } from "react";
import {
  Bell,
  BellRing,
  CheckCheck,
  CloudSun,
  Info,
  Package,
  Timer,
  TriangleAlert,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { getNotifications, markAllAsRead, markAsRead } from "@/services/notifications";
import type { AppNotification, NotificationType } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardBody } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { formatDateTime } from "@/lib/format";
import { cn } from "@/lib/utils";

const TYPE_ICONS: Record<NotificationType, { icon: LucideIcon; className: string }> = {
  tache: { icon: Bell, className: "bg-blue-50 text-blue-600" },
  retard: { icon: TriangleAlert, className: "bg-red-50 text-red-600" },
  meteo: { icon: CloudSun, className: "bg-yellow-50 text-yellow-600" },
  recolte: { icon: Package, className: "bg-green-50 text-green-600" },
  rappel: { icon: Timer, className: "bg-indigo-50 text-indigo-600" },
  info: { icon: Info, className: "bg-gray-50 text-gray-600" },
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<AppNotification[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    getNotifications()
      .then((data) => {
        if (!cancelled) setNotifications(data);
      })
      .catch(() => {
        if (!cancelled) setError("Impossible de charger les notifications.");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const unreadCount = notifications?.filter((n) => !n.read).length ?? 0;

  async function handleMarkAll() {
    if (!notifications) return;
    try {
      await markAllAsRead();
      setNotifications((current) => current?.map((n) => ({ ...n, read: true })) ?? current);
    } catch {
      setError("Impossible de marquer les notifications comme lues.");
    }
  }

  async function handleMarkOne(notification: AppNotification) {
    try {
      await markAsRead(notification.id);
      setNotifications(
        (current) =>
          current?.map((n) => (n.id === notification.id ? { ...n, read: true } : n)) ?? current
      );
    } catch {
      setError("Impossible de marquer cette notification comme lue.");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
            <BellRing className="w-8 h-8 text-cultiva-green" aria-hidden="true" />
            Notifications
          </h1>
          <p className="text-gray-500 mt-1">
            {unreadCount > 0
              ? `${unreadCount} notification${unreadCount > 1 ? "s" : ""} non lue${unreadCount > 1 ? "s" : ""}`
              : "Tout est à jour"}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={handleMarkAll}>
            <CheckCheck className="w-4 h-4" aria-hidden="true" />
            Tout marquer comme lu
          </Button>
        )}
      </div>

      {error && (
        <div
          role="alert"
          className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3"
        >
          {error}
        </div>
      )}

      {notifications === null ? (
        <div className="flex justify-center py-20">
          <Spinner />
        </div>
      ) : notifications.length === 0 ? (
        <Card className="p-10 text-center">
          <div className="w-14 h-14 bg-cultiva-green/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <BellRing className="w-7 h-7 text-cultiva-green" aria-hidden="true" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Aucune notification</h2>
          <p className="text-sm text-gray-500 mt-1">
            Vous serez prévenu des tâches, retards, météo et récoltes.
          </p>
        </Card>
      ) : (
        <Card>
          <CardBody className="pt-4">
            <ul className="divide-y divide-gray-50">
              {notifications.map((notification) => {
                const info = TYPE_ICONS[notification.type];
                const Icon = info.icon;
                return (
                  <li
                    key={notification.id}
                    className={cn(
                      "flex items-start gap-3 py-4",
                      !notification.read && "bg-cultiva-green/[0.03] -mx-3 px-3 rounded-xl"
                    )}
                  >
                    <div
                      className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
                        info.className
                      )}
                    >
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3
                          className={cn(
                            "text-sm truncate",
                            notification.read
                              ? "text-gray-600 font-medium"
                              : "text-gray-900 font-semibold"
                          )}
                        >
                          {notification.title}
                        </h3>
                        {!notification.read && (
                          <span className="w-2 h-2 rounded-full bg-cultiva-green flex-shrink-0" aria-label="Non lue" />
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mt-0.5 leading-relaxed">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {formatDateTime(notification.date)}
                      </p>
                    </div>
                    {!notification.read && (
                      <button
                        type="button"
                        onClick={() => handleMarkOne(notification)}
                        aria-label={`Marquer « ${notification.title} » comme lue`}
                        className="p-2 rounded-lg text-gray-400 hover:text-cultiva-green hover:bg-green-50 transition-colors flex-shrink-0"
                      >
                        <CheckCheck className="w-4 h-4" aria-hidden="true" />
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
