"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";
import { getFields } from "@/services/fields";
import { Button } from "@/components/ui/button";
import { Field, Input, Select } from "@/components/ui/input";
import { CROP_STATUS_OPTIONS, CROP_TYPES, SEED_UNITS } from "@/lib/labels";
import type {
  Crop as CropType,
  CropInput,
  CropStatus,
  Field as FieldType,
} from "@/types";

interface CropFormProps {
  initial?: CropType;
  onSubmit: (input: CropInput) => Promise<CropType>;
  submitLabel: string;
  submittingLabel: string;
}

export function CropForm({ initial, onSubmit, submitLabel, submittingLabel }: CropFormProps) {
  const router = useRouter();
  const [fields, setFields] = useState<FieldType[] | null>(null);

  const [fieldId, setFieldId] = useState(initial?.fieldId ?? "");
  const [cropType, setCropType] = useState(initial?.cropType ?? "");
  const [variety, setVariety] = useState(initial?.variety ?? "");
  const [sowingDate, setSowingDate] = useState(initial?.sowingDate?.slice(0, 10) ?? "");
  const [expectedHarvestDate, setExpectedHarvestDate] = useState(
    initial?.expectedHarvestDate?.slice(0, 10) ?? ""
  );
  const [area, setArea] = useState(initial ? String(initial.area) : "");
  const [seedQuantity, setSeedQuantity] = useState(
    initial?.seedQuantity ? String(initial.seedQuantity) : ""
  );
  const [seedUnit, setSeedUnit] = useState(initial?.seedUnit ?? "kg");
  const [status, setStatus] = useState<CropStatus>(initial?.status ?? "planifiee");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getFields()
      .then((data) => {
        if (!cancelled) setFields(data);
      })
      .catch(() => {
        if (!cancelled) setFields([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  function parseArea(): number {
    return Number(area.trim().replace(",", "."));
  }

  function parseSeedQuantity(): number | undefined {
    if (seedQuantity.trim() === "") return undefined;
    const value = Number(seedQuantity.trim().replace(",", "."));
    return Number.isNaN(value) ? undefined : value;
  }

  function validate(): Record<string, string> {
    const next: Record<string, string> = {};
    if (!fieldId) next.fieldId = "Sélectionnez une parcelle.";
    if (cropType.trim().length < 2) next.cropType = "Indiquez le type de culture.";
    if (!sowingDate) next.sowingDate = "Indiquez la date de semis.";
    const areaValue = parseArea();
    if (area.trim() === "" || Number.isNaN(areaValue) || areaValue <= 0) {
      next.area = "Indiquez une superficie valide (ex : 3 ou 1,5).";
    }
    return next;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const validation = validate();
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setSubmitting(true);
    try {
      const crop = await onSubmit({
        fieldId,
        cropType,
        variety,
        sowingDate: new Date(`${sowingDate}T09:00:00`).toISOString(),
        expectedHarvestDate: expectedHarvestDate
          ? new Date(`${expectedHarvestDate}T09:00:00`).toISOString()
          : undefined,
        area: parseArea(),
        seedQuantity: parseSeedQuantity(),
        seedUnit,
        status,
      });
      router.push(`/crops/${crop.id}`);
    } catch (err) {
      setErrors({ form: err instanceof Error ? err.message : "Une erreur est survenue." });
      setSubmitting(false);
    }
  }

  if (fields === null) {
    return <p className="text-sm text-gray-500 py-4">Chargement des parcelles...</p>;
  }

  if (fields.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-sm text-gray-600 mb-4">
          Créez d&apos;abord une parcelle pour pouvoir y enregistrer des cultures.
        </p>
        <Link href="/fields/new">
          <Button>Créer une parcelle</Button>
        </Link>
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

      <Field label="Parcelle" htmlFor="crop-field" error={errors.fieldId}>
        <Select
          id="crop-field"
          name="fieldId"
          value={fieldId}
          onChange={(e) => setFieldId(e.target.value)}
        >
          <option value="" disabled>
            Sélectionnez une parcelle
          </option>
          {fields.map((field) => (
            <option key={field.id} value={field.id}>
              {field.name}
            </option>
          ))}
        </Select>
      </Field>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Culture" htmlFor="crop-type" error={errors.cropType}>
          <Input
            id="crop-type"
            name="cropType"
            type="text"
            required
            list="crop-types-list"
            placeholder="Ex : Maïs"
            value={cropType}
            onChange={(e) => setCropType(e.target.value)}
          />
          <datalist id="crop-types-list">
            {CROP_TYPES.map((crop) => (
              <option key={crop} value={crop} />
            ))}
          </datalist>
        </Field>

        <Field label="Variété" htmlFor="crop-variety">
          <Input
            id="crop-variety"
            name="variety"
            type="text"
            placeholder="Ex : Maïs jaune (optionnel)"
            value={variety}
            onChange={(e) => setVariety(e.target.value)}
          />
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Date de semis" htmlFor="crop-sowing" error={errors.sowingDate}>
          <Input
            id="crop-sowing"
            name="sowingDate"
            type="date"
            required
            value={sowingDate}
            onChange={(e) => setSowingDate(e.target.value)}
          />
        </Field>

        <Field label="Date prévue de récolte" htmlFor="crop-harvest">
          <Input
            id="crop-harvest"
            name="expectedHarvestDate"
            type="date"
            value={expectedHarvestDate}
            onChange={(e) => setExpectedHarvestDate(e.target.value)}
          />
        </Field>
      </div>

      <div className="grid sm:grid-cols-3 gap-5">
        <Field
          label="Superficie (ha)"
          htmlFor="crop-area"
          error={errors.area}
          hint="Utilisez la virgule pour les décimales (ex : 1,5)."
        >
          <Input
            id="crop-area"
            name="area"
            type="text"
            inputMode="decimal"
            required
            placeholder="Ex : 3"
            value={area}
            onChange={(e) => setArea(e.target.value)}
          />
        </Field>

        <Field label="Quantité de semences" htmlFor="crop-seed-qty">
          <Input
            id="crop-seed-qty"
            name="seedQuantity"
            type="text"
            inputMode="decimal"
            placeholder="Ex : 30 (optionnel)"
            value={seedQuantity}
            onChange={(e) => setSeedQuantity(e.target.value)}
          />
        </Field>

        <Field label="Unité" htmlFor="crop-seed-unit">
          <Select
            id="crop-seed-unit"
            name="seedUnit"
            value={seedUnit}
            onChange={(e) => setSeedUnit(e.target.value)}
          >
            {SEED_UNITS.map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <Field label="Statut" htmlFor="crop-status">
        <Select
          id="crop-status"
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as CropStatus)}
        >
          {CROP_STATUS_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </Field>

      <Button type="submit" disabled={submitting}>
        <Save className="w-5 h-5" aria-hidden="true" />
        {submitting ? submittingLabel : submitLabel}
      </Button>
    </form>
  );
}
