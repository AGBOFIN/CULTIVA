"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";
import { getFarms } from "@/services/farms";
import { Button } from "@/components/ui/button";
import { Field, Input, Select } from "@/components/ui/input";
import { AREA_UNITS, FIELD_STATUS_OPTIONS, SOIL_TYPES } from "@/lib/labels";
import type { AreaUnit, Farm, Field as FieldType, FieldInput, FieldStatus } from "@/types";

interface FieldFormProps {
  initial?: FieldType;
  onSubmit: (input: FieldInput) => Promise<FieldType>;
  submitLabel: string;
  submittingLabel: string;
}

export function FieldForm({ initial, onSubmit, submitLabel, submittingLabel }: FieldFormProps) {
  const router = useRouter();
  const [farms, setFarms] = useState<Farm[] | null>(null);

  const [farmId, setFarmId] = useState(initial?.farmId ?? "");
  const [name, setName] = useState(initial?.name ?? "");
  const [area, setArea] = useState(initial ? String(initial.area) : "");
  const [areaUnit, setAreaUnit] = useState<AreaUnit>(initial?.areaUnit ?? "hectares");
  const [location, setLocation] = useState(initial?.location ?? "");
  const [soilType, setSoilType] = useState(initial?.soilType ?? "");
  const [currentCrop, setCurrentCrop] = useState(initial?.currentCrop ?? "");
  const [status, setStatus] = useState<FieldStatus>(initial?.status ?? "active");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getFarms()
      .then((data) => {
        if (!cancelled) setFarms(data);
      })
      .catch(() => {
        if (!cancelled) setFarms([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  function parseArea(): number {
    return Number(area.trim().replace(",", "."));
  }

  function validate(): Record<string, string> {
    const next: Record<string, string> = {};
    if (!farmId) next.farmId = "Sélectionnez une exploitation.";
    if (name.trim().length < 2) next.name = "Le nom de la parcelle est requis.";
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
      const field = await onSubmit({
        farmId,
        name,
        area: parseArea(),
        areaUnit,
        location,
        soilType,
        currentCrop,
        status,
      });
      router.push(`/fields/${field.id}`);
    } catch (err) {
      setErrors({ form: err instanceof Error ? err.message : "Une erreur est survenue." });
      setSubmitting(false);
    }
  }

  if (farms === null) {
    return <p className="text-sm text-gray-500 py-4">Chargement des exploitations...</p>;
  }

  if (farms.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-sm text-gray-600 mb-4">
          Créez d&apos;abord une exploitation pour pouvoir y ajouter des parcelles.
        </p>
        <Link href="/farms/new">
          <Button>Créer une exploitation</Button>
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

      <Field label="Exploitation" htmlFor="field-farm" error={errors.farmId}>
        <Select
          id="field-farm"
          name="farmId"
          value={farmId}
          onChange={(e) => setFarmId(e.target.value)}
        >
          <option value="" disabled>
            Sélectionnez une exploitation
          </option>
          {farms.map((farm) => (
            <option key={farm.id} value={farm.id}>
              {farm.name}
            </option>
          ))}
        </Select>
      </Field>

      <Field label="Nom de la parcelle" htmlFor="field-name" error={errors.name}>
        <Input
          id="field-name"
          name="name"
          type="text"
          required
          placeholder="Ex : Parcelle A - Maïs"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Field>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field
          label="Superficie"
          htmlFor="field-area"
          error={errors.area}
          hint="Utilisez la virgule pour les décimales (ex : 1,5)."
        >
          <Input
            id="field-area"
            name="area"
            type="text"
            inputMode="decimal"
            required
            placeholder="Ex : 3"
            value={area}
            onChange={(e) => setArea(e.target.value)}
          />
        </Field>

        <Field label="Unité" htmlFor="field-area-unit">
          <Select
            id="field-area-unit"
            name="areaUnit"
            value={areaUnit}
            onChange={(e) => setAreaUnit(e.target.value as AreaUnit)}
          >
            {AREA_UNITS.map((unit) => (
              <option key={unit.value} value={unit.value}>
                {unit.label}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Localisation" htmlFor="field-location">
          <Input
            id="field-location"
            name="location"
            type="text"
            placeholder="Ex : Versant nord (optionnel)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Field>

        <Field label="Type de sol" htmlFor="field-soil">
          <Select
            id="field-soil"
            name="soilType"
            value={soilType}
            onChange={(e) => setSoilType(e.target.value)}
          >
            <option value="">Non précisé</option>
            {SOIL_TYPES.map((soil) => (
              <option key={soil} value={soil}>
                {soil}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Culture actuelle" htmlFor="field-crop">
          <Input
            id="field-crop"
            name="currentCrop"
            type="text"
            placeholder="Ex : Maïs (optionnel)"
            value={currentCrop}
            onChange={(e) => setCurrentCrop(e.target.value)}
          />
        </Field>

        <Field label="Statut" htmlFor="field-status">
          <Select
            id="field-status"
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as FieldStatus)}
          >
            {FIELD_STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <Button type="submit" disabled={submitting}>
        <Save className="w-5 h-5" aria-hidden="true" />
        {submitting ? submittingLabel : submitLabel}
      </Button>
    </form>
  );
}
