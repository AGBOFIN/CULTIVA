"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createTransaction } from "@/services/transactions";
import { Card, CardBody } from "@/components/ui/card";
import { TransactionForm } from "@/components/app/finances/transaction-form";

export default function NewTransactionPage() {
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
          Nouvelle transaction
        </h1>
        <p className="text-gray-500 mt-1">Enregistrez une dépense ou un revenu</p>
      </div>

      <Card>
        <CardBody>
          <TransactionForm
            onSubmit={createTransaction}
            submitLabel="Créer la transaction"
            submittingLabel="Création..."
          />
        </CardBody>
      </Card>
    </div>
  );
}
