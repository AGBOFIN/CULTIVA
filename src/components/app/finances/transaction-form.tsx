"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, Input, Select } from "@/components/ui/input";
import { EXPENSE_CATEGORY_OPTIONS, INCOME_CATEGORY_OPTIONS } from "@/lib/labels";
import type {
  ExpenseCategory,
  IncomeCategory,
  Transaction as TransactionRecord,
  TransactionInput,
  TransactionType,
} from "@/types";

interface TransactionFormProps {
  initial?: TransactionRecord;
  onSubmit: (input: TransactionInput) => Promise<TransactionRecord>;
  submitLabel: string;
  submittingLabel: string;
}

export function TransactionForm({
  initial,
  onSubmit,
  submitLabel,
  submittingLabel,
}: TransactionFormProps) {
  const router = useRouter();
  const [type, setType] = useState<TransactionType>(initial?.type ?? "depense");
  const [category, setCategory] = useState<string>(initial?.category ?? "semences");
  const [label, setLabel] = useState(initial?.label ?? "");
  const [amount, setAmount] = useState(initial ? String(initial.amount) : "");
  const [date, setDate] = useState(initial?.date?.slice(0, 10) ?? "");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  // Quand le type change, réinitialise la catégorie sur une valeur valide.
  function handleTypeChange(value: string) {
    setType(value as TransactionType);
    setCategory(
      value === "depense"
        ? EXPENSE_CATEGORY_OPTIONS.some((o) => o.value === category)
          ? category
          : EXPENSE_CATEGORY_OPTIONS[0].value
        : INCOME_CATEGORY_OPTIONS.some((o) => o.value === category)
          ? category
          : INCOME_CATEGORY_OPTIONS[0].value
    );
  }

  function parseAmount(): number {
    return Number(amount.trim().replace(",", "."));
  }

  function validate(): Record<string, string> {
    const next: Record<string, string> = {};
    if (label.trim().length < 2) next.label = "Le libellé est requis.";
    const value = parseAmount();
    if (amount.trim() === "" || Number.isNaN(value) || value <= 0) {
      next.amount = "Indiquez un montant valide (ex : 15000).";
    }
    if (!date) next.date = "Indiquez la date de la transaction.";
    return next;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const validation = validate();
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setSubmitting(true);
    try {
      await onSubmit({
        type,
        category: category as ExpenseCategory | IncomeCategory,
        label,
        amount: parseAmount(),
        date: new Date(`${date}T09:00:00`).toISOString(),
      });
      router.push("/finances");
    } catch (err) {
      setErrors({ form: err instanceof Error ? err.message : "Une erreur est survenue." });
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {errors.form && (
        <div
          role="alert"
          className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3"
        >
          {errors.form}
        </div>
      )}

      <Field label="Type" htmlFor="tx-type">
        <Select
          id="tx-type"
          name="type"
          value={type}
          onChange={(e) => handleTypeChange(e.target.value)}
        >
          <option value="depense">Dépense</option>
          <option value="revenu">Revenu</option>
        </Select>
      </Field>

      <Field label="Catégorie" htmlFor="tx-category">
        <Select
          id="tx-category"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {type === "depense"
            ? EXPENSE_CATEGORY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))
            : INCOME_CATEGORY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
        </Select>
      </Field>

      <Field label="Libellé" htmlFor="tx-label" error={errors.label}>
        <Input
          id="tx-label"
          name="label"
          type="text"
          required
          placeholder="Ex : Achat d'engrais NPK"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
      </Field>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field
          label="Montant (FCFA)"
          htmlFor="tx-amount"
          error={errors.amount}
          hint="Utilisez la virgule pour les décimales si besoin."
        >
          <Input
            id="tx-amount"
            name="amount"
            type="text"
            inputMode="decimal"
            required
            placeholder="Ex : 15000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </Field>

        <Field label="Date" htmlFor="tx-date" error={errors.date}>
          <Input
            id="tx-date"
            name="date"
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Field>
      </div>

      <Button type="submit" disabled={submitting}>
        <Save className="w-5 h-5" aria-hidden="true" />
        {submitting ? submittingLabel : submitLabel}
      </Button>
    </form>
  );
}
