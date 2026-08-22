"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Pencil, Plus, Trash2, Wallet } from "lucide-react";
import { deleteTransaction, getTransactions } from "@/services/transactions";
import type { Transaction } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { EXPENSE_CATEGORY_LABELS, INCOME_CATEGORY_LABELS } from "@/lib/labels";
import { formatCurrency, formatDate } from "@/lib/format";

function categoryLabel(transaction: Transaction): string {
  return transaction.type === "depense"
    ? EXPENSE_CATEGORY_LABELS[transaction.category as keyof typeof EXPENSE_CATEGORY_LABELS]
    : INCOME_CATEGORY_LABELS[transaction.category as keyof typeof INCOME_CATEGORY_LABELS];
}

export default function FinancesPage() {
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [toDelete, setToDelete] = useState<Transaction | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getTransactions()
      .then((data) => {
        if (!cancelled) setTransactions(data);
      })
      .catch(() => {
        if (!cancelled) setError("Impossible de charger les finances.");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const revenue = useMemo(
    () => (transactions ?? []).filter((t) => t.type === "revenu").reduce((s, t) => s + t.amount, 0),
    [transactions]
  );
  const expenses = useMemo(
    () => (transactions ?? []).filter((t) => t.type === "depense").reduce((s, t) => s + t.amount, 0),
    [transactions]
  );
  const profit = revenue - expenses;

  // Évolution mensuelle sur les 6 derniers mois (revenus vs dépenses).
  const monthly = useMemo(() => {
    const now = new Date();
    const months: { key: string; label: string; revenue: number; expenses: number }[] = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push({
        key: `${date.getFullYear()}-${date.getMonth()}`,
        label: date.toLocaleDateString("fr-FR", { month: "short" }),
        revenue: 0,
        expenses: 0,
      });
    }
    for (const transaction of transactions ?? []) {
      const date = new Date(transaction.date);
      const key = `${date.getFullYear()}-${date.getMonth()}`;
      const bucket = months.find((m) => m.key === key);
      if (!bucket) continue;
      if (transaction.type === "revenu") bucket.revenue += transaction.amount;
      else bucket.expenses += transaction.amount;
    }
    return months;
  }, [transactions]);

  const maxMonthly = Math.max(
    ...monthly.map((m) => Math.max(m.revenue, m.expenses)),
    1
  );

  const sorted = useMemo(
    () =>
      [...(transactions ?? [])].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      ),
    [transactions]
  );

  async function handleDelete() {
    if (!toDelete) return;
    setDeleting(true);
    try {
      await deleteTransaction(toDelete.id);
      setTransactions(
        (current) => current?.filter((transaction) => transaction.id !== toDelete.id) ?? current
      );
      setToDelete(null);
    } catch {
      setError("Impossible de supprimer cette transaction.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Wallet className="w-8 h-8 text-cultiva-green" aria-hidden="true" />
            Finances
          </h1>
          <p className="text-gray-500 mt-1">Suivez vos revenus et dépenses</p>
        </div>
        <Link href="/finances/new">
          <Button>
            <Plus className="w-5 h-5" aria-hidden="true" />
            Nouvelle transaction
          </Button>
        </Link>
      </div>

      {error && (
        <div
          role="alert"
          className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3"
        >
          {error}
        </div>
      )}

      {transactions === null ? (
        <div className="flex justify-center py-20">
          <Spinner />
        </div>
      ) : (
        <>
          {/* Indicateurs */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            <Card className="p-4 sm:p-5">
              <div className="flex items-center gap-2 text-green-600 mb-2">
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                <span className="text-xs font-medium uppercase tracking-wide">Revenus</span>
              </div>
              <p className="text-base sm:text-xl font-bold text-gray-900 leading-tight">
                {formatCurrency(revenue)}
              </p>
            </Card>
            <Card className="p-4 sm:p-5">
              <div className="flex items-center gap-2 text-red-600 mb-2">
                <ArrowDownRight className="w-4 h-4" aria-hidden="true" />
                <span className="text-xs font-medium uppercase tracking-wide">Dépenses</span>
              </div>
              <p className="text-base sm:text-xl font-bold text-gray-900 leading-tight">
                {formatCurrency(expenses)}
              </p>
            </Card>
            <Card className="p-4 sm:p-5">
              <div className="flex items-center gap-2 text-cultiva-green mb-2">
                <span className="text-xs font-medium uppercase tracking-wide">Bénéfice</span>
              </div>
              <p
                className={`text-base sm:text-xl font-bold leading-tight ${
                  profit >= 0 ? "text-cultiva-green" : "text-red-600"
                }`}
              >
                {formatCurrency(profit)}
              </p>
            </Card>
          </div>

          {/* Graphique évolution mensuelle */}
          <Card>
            <CardHeader title="Évolution mensuelle" subtitle="Revenus et dépenses des 6 derniers mois" />
            <CardBody>
              <div className="flex items-end gap-3 sm:gap-6 h-40 sm:h-48">
                {monthly.map((month) => (
                  <div
                    key={month.key}
                    className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end"
                  >
                    <div className="flex flex-col justify-end gap-1 w-full max-w-10">
                      <div
                        className="w-full rounded-t-md bg-cultiva-green/80"
                        style={{ height: `${(month.revenue / maxMonthly) * 100}%` }}
                        title={`Revenus : ${formatCurrency(month.revenue)}`}
                      />
                      <div
                        className="w-full rounded-t-md bg-red-400"
                        style={{ height: `${(month.expenses / maxMonthly) * 100}%` }}
                        title={`Dépenses : ${formatCurrency(month.expenses)}`}
                      />
                    </div>
                    <span className="text-[10px] sm:text-xs text-gray-500 capitalize">
                      {month.label}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 mt-4 text-xs text-gray-500">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-cultiva-green/80" /> Revenus
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-red-400" /> Dépenses
                </span>
              </div>
            </CardBody>
          </Card>

          {/* Liste des transactions */}
          <Card>
            <CardHeader
              title="Transactions"
              subtitle="Les plus récentes d'abord"
            />
            <CardBody className="pt-2">
              {sorted.length === 0 ? (
                <p className="text-sm text-gray-500 py-4 text-center">
                  Aucune transaction pour le moment.
                </p>
              ) : (
                <ul className="divide-y divide-gray-50">
                  {sorted.map((transaction) => (
                    <li key={transaction.id} className="flex items-center gap-3 py-3">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          transaction.type === "revenu"
                            ? "bg-green-50 text-green-600"
                            : "bg-red-50 text-red-500"
                        }`}
                      >
                        {transaction.type === "revenu" ? (
                          <ArrowUpRight className="w-5 h-5" aria-hidden="true" />
                        ) : (
                          <ArrowDownRight className="w-5 h-5" aria-hidden="true" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate">
                          {transaction.label}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          {categoryLabel(transaction)} · {formatDate(transaction.date)}
                        </div>
                      </div>
                      <span
                        className={`text-sm font-semibold flex-shrink-0 ${
                          transaction.type === "revenu" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {transaction.type === "revenu" ? "+" : "−"}{" "}
                        {formatCurrency(transaction.amount)}
                      </span>
                      <div className="flex gap-0.5 flex-shrink-0">
                        <Link
                          href={`/finances/${transaction.id}/edit`}
                          aria-label={`Modifier ${transaction.label}`}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-cultiva-green hover:bg-green-50 transition-colors"
                        >
                          <Pencil className="w-4 h-4" aria-hidden="true" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => setToDelete(transaction)}
                          aria-label={`Supprimer ${transaction.label}`}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" aria-hidden="true" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardBody>
          </Card>
        </>
      )}

      <ConfirmDialog
        open={toDelete !== null}
        title="Supprimer la transaction"
        message={
          toDelete
            ? `Voulez-vous vraiment supprimer « ${toDelete.label} » ? Cette action est irréversible.`
            : ""
        }
        busy={deleting}
        onConfirm={handleDelete}
        onCancel={() => setToDelete(null)}
      />
    </div>
  );
}
