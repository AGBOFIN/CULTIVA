/**
 * Service de gestion des activités agricoles — API réelle.
 *
 * Les signatures asynchrones sont identiques à l'ancienne version
 * (localStorage) : les pages n'ont pas à changer.
 */
import { apiFetch } from "@/lib/client";
import type { Activity, ActivityInput } from "@/types";

export async function getActivities(): Promise<Activity[]> {
  return apiFetch<Activity[]>("/api/activities");
}

export async function getActivity(id: string): Promise<Activity | undefined> {
  return apiFetch<Activity>(`/api/activities/${id}`);
}

export async function createActivity(input: ActivityInput): Promise<Activity> {
  return apiFetch<Activity>("/api/activities", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function updateActivity(id: string, input: ActivityInput): Promise<Activity> {
  return apiFetch<Activity>(`/api/activities/${id}`, {
    method: "PUT",
    body: JSON.stringify(input),
  });
}

export async function deleteActivity(id: string): Promise<void> {
  await apiFetch<{ ok: boolean }>(`/api/activities/${id}`, { method: "DELETE" });
}
