/**
 * Service de gestion des parcelles — API réelle.
 *
 * Les signatures asynchrones sont identiques à l'ancienne version
 * (localStorage) : les pages n'ont pas à changer. La suppression en
 * cascade (cultures, activités, récoltes) est gérée côté serveur.
 */
import { apiFetch } from "@/lib/client";
import type { Field, FieldInput } from "@/types";

export async function getFields(): Promise<Field[]> {
  return apiFetch<Field[]>("/api/fields");
}

export async function getField(id: string): Promise<Field | undefined> {
  return apiFetch<Field>(`/api/fields/${id}`);
}

export async function createField(input: FieldInput): Promise<Field> {
  return apiFetch<Field>("/api/fields", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function updateField(id: string, input: FieldInput): Promise<Field> {
  return apiFetch<Field>(`/api/fields/${id}`, {
    method: "PUT",
    body: JSON.stringify(input),
  });
}

export async function deleteField(id: string): Promise<void> {
  await apiFetch<{ ok: boolean }>(`/api/fields/${id}`, { method: "DELETE" });
}
