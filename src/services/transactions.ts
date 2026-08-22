/**
 * Service de gestion des transactions financières — API réelle.
 *
 * Les signatures asynchrones sont identiques à l'ancienne version
 * (localStorage) : les pages n'ont pas à changer.
 */
import { apiFetch } from "@/lib/client";
import type { Transaction, TransactionInput } from "@/types";

export async function getTransactions(): Promise<Transaction[]> {
  return apiFetch<Transaction[]>("/api/transactions");
}

export async function getTransaction(id: string): Promise<Transaction | undefined> {
  return apiFetch<Transaction>(`/api/transactions/${id}`);
}

export async function createTransaction(input: TransactionInput): Promise<Transaction> {
  return apiFetch<Transaction>("/api/transactions", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function updateTransaction(
  id: string,
  input: TransactionInput
): Promise<Transaction> {
  return apiFetch<Transaction>(`/api/transactions/${id}`, {
    method: "PUT",
    body: JSON.stringify(input),
  });
}

export async function deleteTransaction(id: string): Promise<void> {
  await apiFetch<{ ok: boolean }>(`/api/transactions/${id}`, { method: "DELETE" });
}
