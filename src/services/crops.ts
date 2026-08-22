/**
 * Service de gestion des cultures — API réelle.
 *
 * Les signatures asynchrones sont identiques à l'ancienne version
 * (localStorage) : les pages n'ont pas à changer. La suppression en
 * cascade des récoltes est gérée côté serveur.
 */
import { apiFetch } from "@/lib/client";
import type { Crop, CropInput } from "@/types";

export async function getCrops(): Promise<Crop[]> {
  return apiFetch<Crop[]>("/api/crops");
}

export async function getCrop(id: string): Promise<Crop | undefined> {
  return apiFetch<Crop>(`/api/crops/${id}`);
}

export async function createCrop(input: CropInput): Promise<Crop> {
  return apiFetch<Crop>("/api/crops", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function updateCrop(id: string, input: CropInput): Promise<Crop> {
  return apiFetch<Crop>(`/api/crops/${id}`, {
    method: "PUT",
    body: JSON.stringify(input),
  });
}

export async function deleteCrop(id: string): Promise<void> {
  await apiFetch<{ ok: boolean }>(`/api/crops/${id}`, { method: "DELETE" });
}
