/**
 * Service de gestion des exploitations — API réelle.
 *
 * Les signatures asynchrones sont identiques à l'ancienne version
 * (localStorage) : les pages n'ont pas à changer.
 */
import { apiFetch } from "@/lib/client";
import type { Farm, FarmInput } from "@/types";

export async function getFarms(): Promise<Farm[]> {
  return apiFetch<Farm[]>("/api/farms");
}

export async function getFarm(id: string): Promise<Farm | undefined> {
  return apiFetch<Farm>(`/api/farms/${id}`);
}

export async function createFarm(input: FarmInput): Promise<Farm> {
  return apiFetch<Farm>("/api/farms", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function updateFarm(id: string, input: FarmInput): Promise<Farm> {
  return apiFetch<Farm>(`/api/farms/${id}`, {
    method: "PUT",
    body: JSON.stringify(input),
  });
}

export async function deleteFarm(id: string): Promise<void> {
  await apiFetch<{ ok: boolean }>(`/api/farms/${id}`, { method: "DELETE" });
}
