/**
 * Service de gestion des notifications — API réelle.
 */
import { apiFetch } from "@/lib/client";
import type { AppNotification } from "@/types";

export async function getNotifications(): Promise<AppNotification[]> {
  return apiFetch<AppNotification[]>("/api/notifications");
}

/** Nombre de notifications non lues. */
export async function getUnreadCount(): Promise<number> {
  const notifications = await getNotifications();
  return notifications.filter((notification) => !notification.read).length;
}

export async function markAsRead(id: string): Promise<void> {
  await apiFetch<{ ok: boolean }>(`/api/notifications/${id}/read`, { method: "POST" });
}

export async function markAllAsRead(): Promise<void> {
  await apiFetch<{ ok: boolean }>("/api/notifications/read-all", { method: "POST" });
}
