/**
 * Service de gestion des récoltes — API réelle.
 *
 * Les signatures asynchrones sont identiques à l'ancienne version
 * (localStorage) : les pages n'ont pas à changer. Le revenu est calculé
 * côté serveur (quantité × prix).
 */
import { apiFetch } from "@/lib/client";
import type { Harvest, HarvestInput } from "@/types";

export async function getHarvests(): Promise<Harvest[]> {
  return apiFetch<Harvest[]>("/api/harvests");
}

export async function getHarvest(id: string): Promise<Harvest | undefined> {
  return apiFetch<Harvest>(`/api/harvests/${id}`);
}

export async function createHarvest(input: HarvestInput): Promise<Harvest> {
  return apiFetch<Harvest>("/api/harvests", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function updateHarvest(id: string, input: HarvestInput): Promise<Harvest> {
  return apiFetch<Harvest>(`/api/harvests/${id}`, {
    method: "PUT",
    body: JSON.stringify(input),
  });
}

export async function deleteHarvest(id: string): Promise<void> {
  await apiFetch<{ ok: boolean }>(`/api/harvests/${id}`, { method: "DELETE" });
}
