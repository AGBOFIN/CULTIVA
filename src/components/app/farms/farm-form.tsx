"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, Input, Select, Textarea } from "@/components/ui/input";
import { AREA_UNITS, FARM_TYPES } from "@/lib/labels";
import type { AreaUnit, Farm, FarmInput } from "@/types";

interface FarmFormProps {
  initial?: Farm;
  onSubmit: (input: FarmInput) => Promise<Farm>;
  submitLabel: string;
  submittingLabel: string;
}

export function FarmForm({ initial, onSubmit, submitLabel, submittingLabel }: FarmFormProps) {
  const router = useRouter();
  const [name, setName] = useState(initial?.name ?? "");
  const [location, setLocation] = useState(initial?.location ?? "");
  const [area, setArea] = useState(initial ? String(initial.area) : "");
  const [areaUnit, setAreaUnit] = useState<AreaUnit>(initial?.areaUnit ?? "hectares");
  const [type, setType] = useState<string>(initial?.type ?? FARM_TYPES[0]);
  const [description, setDescription] = useState(initial?.description ?? "");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  function parseArea(): number {
    return Number(area.trim().replace(",", "."));
  }

  function validate(): Record<string, string> {
    const next: Record<string, string> = {};
    if (name.trim().length < 2) next.name = "Le nom de l'exploitation est requis.";
    if (location.trim().length < 2) next.location = "La localisation est requise.";
    const areaValue = parseArea();
    if (area.trim() === "" || Number.isNaN(areaValue) || areaValue <= 0) {
      next.area = "Indiquez une superficie valide (ex : 12 ou 1,5).";
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
      const farm = await onSubmit({
        name,
        location,
        area: parseArea(),
        areaUnit,
        type,
        description,
      });
      router.push(`/farms/${farm.id}`);
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

      <Field label="Nom de l'exploitation" htmlFor="farm-name" error={errors.name}>
        <Input
          id="farm-name"
          name="name"
          type="text"
          required
          placeholder="Ex : Ferme de Koffi"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Field>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Localisation" htmlFor="farm-location" error={errors.location}>
          <Input
            id="farm-location"
            name="location"
            type="text"
            required
            placeholder="Ex : Agou, Togo"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Field>

        <Field label="Type d'exploitation" htmlFor="farm-type">
          <Select
            id="farm-type"
            name="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            {FARM_TYPES.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field
          label="Superficie"
          htmlFor="farm-area"
          error={errors.area}
          hint="Utilisez la virgule pour les décimales (ex : 1,5)."
        >
          <Input
            id="farm-area"
            name="area"
            type="text"
            inputMode="decimal"
            required
            placeholder="Ex : 12"
            value={area}
            onChange={(e) => setArea(e.target.value)}
          />
        </Field>

        <Field label="Unité" htmlFor="farm-area-unit">
          <Select
            id="farm-area-unit"
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

      <Field label="Description" htmlFor="farm-description">
        <Textarea
          id="farm-description"
          name="description"
          rows={3}
          placeholder="Décrivez votre exploitation (optionnel)..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Field>

      <Button type="submit" disabled={submitting}>
        <Save className="w-5 h-5" aria-hidden="true" />
        {submitting ? submittingLabel : submitLabel}
      </Button>
    </form>
  );
}
