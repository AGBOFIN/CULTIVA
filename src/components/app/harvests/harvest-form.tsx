"use client";

import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";
import { getCrops } from "@/services/crops";
import { getFields } from "@/services/fields";
import { Button } from "@/components/ui/button";
import { Field, Input, Select } from "@/components/ui/input";
import { HARVEST_UNITS, QUALITY_OPTIONS } from "@/lib/labels";
import { formatCurrency } from "@/lib/format";
import type {
  Crop as CropType,
  Harvest as HarvestType,
  HarvestInput,
  HarvestQuality,
  Field as FieldType,
} from "@/types";

interface HarvestFormProps {
  initial?: HarvestType;
  onSubmit: (input: HarvestInput) => Promise<HarvestType>;
  submitLabel: string;
  submittingLabel: string;
}

export function HarvestForm({
  initial,
  onSubmit,
  submitLabel,
  submittingLabel,
}: HarvestFormProps) {
  const router = useRouter();
  const [crops, setCrops] = useState<CropType[] | null>(null);
  const [fields, setFields] = useState<FieldType[]>([]);

  const [cropId, setCropId] = useState(initial?.cropId ?? "");
  const [date, setDate] = useState(initial?.date?.slice(0, 10) ?? "");
  const [quantity, setQuantity] = useState(initial ? String(initial.quantity) : "");
  const [unit, setUnit] = useState(initial?.unit ?? "kg");
  const [quality, setQuality] = useState<HarvestQuality>(initial?.quality ?? "bonne");
  const [price, setPrice] = useState(initial ? String(initial.price) : "");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    Promise.all([getCrops(), getFields()])
      .then(([cropsData, fieldsData]) => {
        if (!cancelled) {
          setCrops(cropsData);
          setFields(fieldsData);
        }
      })
      .catch(() => {
        if (!cancelled) setCrops([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const selectedCrop = crops?.find((crop) => crop.id === cropId);

  const computedRevenue = useMemo(() => {
    const qty = Number(quantity.trim().replace(",", "."));
    const p = Number(price.trim().replace(",", "."));
    if (Number.isNaN(qty) || Number.isNaN(p) || qty <= 0 || p < 0) return null;
    return qty * p;
  }, [quantity, price]);

  function parseNumber(value: string): number {
    return Number(value.trim().replace(",", "."));
  }

  function validate(): Record<string, string> {
    const next: Record<string, string> = {};
    if (!cropId) next.cropId = "Sélectionnez une culture.";
    if (!date) next.date = "Indiquez la date de la récolte.";
    const qty = parseNumber(quantity);
    if (quantity.trim() === "" || Number.isNaN(qty) || qty <= 0) {
      next.quantity = "Indiquez une quantité valide (ex : 120).";
    }
    const p = parseNumber(price);
    if (price.trim() === "" || Number.isNaN(p) || p < 0) {
      next.price = "Indiquez un prix par unité valide (ex : 500).";
    }
    return next;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const validation = validate();
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;
    if (!selectedCrop) return;

    setSubmitting(true);
    try {
      const harvest = await onSubmit({
        cropId,
        fieldId: selectedCrop.fieldId,
        date: new Date(`${date}T09:00:00`).toISOString(),
        quantity: parseNumber(quantity),
        unit,
        quality,
        price: parseNumber(price),
      });
      router.push(`/harvests/${harvest.id}`);
    } catch (err) {
      setErrors({ form: err instanceof Error ? err.message : "Une erreur est survenue." });
      setSubmitting(false);
    }
  }

  if (crops === null) {
    return <p className="text-sm text-gray-500 py-4">Chargement des cultures...</p>;
  }

  if (crops.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-sm text-gray-600">
          Créez d&apos;abord une culture pour pouvoir enregistrer une récolte.
        </p>
      </div>
    );
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

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Culture" htmlFor="harvest-crop" error={errors.cropId}>
          <Select
            id="harvest-crop"
            name="cropId"
            value={cropId}
            onChange={(e) => setCropId(e.target.value)}
          >
            <option value="" disabled>
              Sélectionnez une culture
            </option>
            {crops.map((crop) => (
              <option key={crop.id} value={crop.id}>
                {crop.cropType}
                {crop.variety ? ` (${crop.variety})` : ""}
              </option>
            ))}
          </Select>
        </Field>

        <Field label="Date de la récolte" htmlFor="harvest-date" error={errors.date}>
          <Input
            id="harvest-date"
            name="date"
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Field>
      </div>

      <div className="grid sm:grid-cols-3 gap-5">
        <Field label="Quantité" htmlFor="harvest-qty" error={errors.quantity}>
          <Input
            id="harvest-qty"
            name="quantity"
            type="text"
            inputMode="decimal"
            required
            placeholder="Ex : 120"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </Field>

        <Field label="Unité" htmlFor="harvest-unit">
          <Select
            id="harvest-unit"
            name="unit"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          >
            {HARVEST_UNITS.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </Select>
        </Field>

        <Field label="Qualité" htmlFor="harvest-quality">
          <Select
            id="harvest-quality"
            name="quality"
            value={quality}
            onChange={(e) => setQuality(e.target.value as HarvestQuality)}
          >
            {QUALITY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <Field
        label="Prix par unité (FCFA)"
        htmlFor="harvest-price"
        error={errors.price}
        hint="Le revenu est calculé automatiquement (quantité × prix)."
      >
        <Input
          id="harvest-price"
          name="price"
          type="text"
          inputMode="decimal"
          required
          placeholder="Ex : 500"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </Field>

      {selectedCrop && (
        <div className="bg-cultiva-green/5 border border-cultiva-green/15 rounded-xl px-4 py-3 flex items-center justify-between gap-3">
          <span className="text-sm text-gray-600">Parcelle : {fields.find((f) => f.id === selectedCrop.fieldId)?.name ?? "—"}</span>
        </div>
      )}

      {computedRevenue !== null && (
        <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 flex items-center justify-between gap-3">
          <span className="text-sm font-medium text-gray-700">Revenu estimé</span>
          <span className="text-sm font-bold text-cultiva-green">
            {formatCurrency(computedRevenue)}
          </span>
        </div>
      )}

      <Button type="submit" disabled={submitting}>
        <Save className="w-5 h-5" aria-hidden="true" />
        {submitting ? submittingLabel : submitLabel}
      </Button>
    </form>
  );
}
