"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";
import { getFields } from "@/services/fields";
import { Button } from "@/components/ui/button";
import { Field, Input, Select, Textarea } from "@/components/ui/input";
import { ACTIVITY_STATUS_OPTIONS, ACTIVITY_TYPE_OPTIONS } from "@/lib/labels";
import type {
  Activity as ActivityRecord,
  ActivityInput,
  ActivityStatus,
  ActivityType,
  Field as FieldType,
} from "@/types";

interface ActivityFormProps {
  initial?: ActivityRecord;
  onSubmit: (input: ActivityInput) => Promise<ActivityRecord>;
  submitLabel: string;
  submittingLabel: string;
}

export function ActivityForm({
  initial,
  onSubmit,
  submitLabel,
  submittingLabel,
}: ActivityFormProps) {
  const router = useRouter();
  const [fields, setFields] = useState<FieldType[] | null>(null);

  const [type, setType] = useState<ActivityType>(initial?.type ?? "entretien");
  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [date, setDate] = useState(initial?.date?.slice(0, 10) ?? "");
  const [time, setTime] = useState(initial ? initial.date.slice(11, 16) : "08:00");
  const [fieldId, setFieldId] = useState(initial?.fieldId ?? "");
  const [cost, setCost] = useState(initial ? String(initial.cost) : "");
  const [status, setStatus] = useState<ActivityStatus>(initial?.status ?? "planifiee");
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

  function parseCost(): number {
    if (cost.trim() === "") return 0;
    const value = Number(cost.trim().replace(",", "."));
    return Number.isNaN(value) ? 0 : value;
  }

  function validate(): Record<string, string> {
    const next: Record<string, string> = {};
    if (title.trim().length < 2) next.title = "Le titre de l'activité est requis.";
    if (!date) next.date = "Indiquez la date de l'activité.";
    const costValue = parseCost();
    if (costValue < 0) next.cost = "Le coût ne peut pas être négatif.";
    return next;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const validation = validate();
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setSubmitting(true);
    try {
      const activity = await onSubmit({
        type,
        title,
        description,
        date: new Date(`${date}T${time || "08:00"}:00`).toISOString(),
        fieldId: fieldId || undefined,
        cost: parseCost(),
        status,
      });
      router.push(`/activities/${activity.id}`);
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

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Type d'activité" htmlFor="act-type">
          <Select
            id="act-type"
            name="type"
            value={type}
            onChange={(e) => setType(e.target.value as ActivityType)}
          >
            {ACTIVITY_TYPE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </Field>

        <Field label="Statut" htmlFor="act-status">
          <Select
            id="act-status"
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as ActivityStatus)}
          >
            {ACTIVITY_STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <Field label="Titre" htmlFor="act-title" error={errors.title}>
        <Input
          id="act-title"
          name="title"
          type="text"
          required
          placeholder="Ex : Fertilisation du maïs"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Field>

      <Field label="Description" htmlFor="act-description">
        <Textarea
          id="act-description"
          name="description"
          rows={3}
          placeholder="Détails de l'activité (optionnel)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Field>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Date" htmlFor="act-date" error={errors.date}>
          <Input
            id="act-date"
            name="date"
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Field>

        <Field label="Heure" htmlFor="act-time">
          <Input
            id="act-time"
            name="time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Parcelle" htmlFor="act-field">
          <Select
            id="act-field"
            name="fieldId"
            value={fieldId}
            onChange={(e) => setFieldId(e.target.value)}
          >
            <option value="">Aucune parcelle</option>
            {fields?.map((field) => (
              <option key={field.id} value={field.id}>
                {field.name}
              </option>
            ))}
          </Select>
        </Field>

        <Field
          label="Coût (FCFA)"
          htmlFor="act-cost"
          error={errors.cost}
          hint="0 si l'activité n'entraîne pas de coût."
        >
          <Input
            id="act-cost"
            name="cost"
            type="text"
            inputMode="numeric"
            placeholder="Ex : 12000"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
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
