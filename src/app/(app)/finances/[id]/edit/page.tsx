"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getTransaction, updateTransaction } from "@/services/transactions";
import type { Transaction } from "@/types";
import { Card, CardBody } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { TransactionForm } from "@/components/app/finances/transaction-form";

export default function EditTransactionPage() {
  const { id } = useParams() as { id: string };
  const [transaction, setTransaction] = useState<Transaction | null | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    getTransaction(id)
      .then((data) => {
        if (!cancelled) setTransaction(data ?? null);
      })
      .catch(() => {
        if (!cancelled) setTransaction(null);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (transaction === undefined) {
    return (
      <div className="flex justify-center py-20">
        <Spinner />
      </div>
    );
  }

  if (transaction === null) {
    return (
      <div className="space-y-4">
        <Link
          href="/finances"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-cultiva-green transition-colors"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Retour aux finances
        </Link>
        <Card className="p-10 text-center">
          <h1 className="text-lg font-semibold text-gray-900">Transaction introuvable</h1>
          <p className="text-sm text-gray-500 mt-1">
            Cette transaction n&apos;existe pas ou a été supprimée.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <Link
          href="/finances"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-cultiva-green transition-colors"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Retour aux finances
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-3">
          Modifier la transaction
        </h1>
        <p className="text-gray-500 mt-1">{transaction.label}</p>
      </div>

      <Card>
        <CardBody>
          <TransactionForm
            initial={transaction}
            onSubmit={(input) => updateTransaction(transaction.id, input)}
            submitLabel="Enregistrer les modifications"
            submittingLabel="Enregistrement..."
          />
        </CardBody>
      </Card>
    </div>
  );
}
