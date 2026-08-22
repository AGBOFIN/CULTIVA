"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { CheckCircle2, Save } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Field, Input, Textarea } from "@/components/ui/input";
import { formatDate, initials } from "@/lib/format";

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();

  const [fullName, setFullName] = useState(user?.fullName ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [location, setLocation] = useState(user?.location ?? "");
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl ?? "");
  const [farmType, setFarmType] = useState(user?.farmType ?? "");
  const [farmInfo, setFarmInfo] = useState(user?.farmInfo ?? "");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [saving, setSaving] = useState(false);

  if (!user) return null;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setSaving(true);
    try {
      await updateProfile({ fullName, phone, email, location, avatarUrl, farmType, farmInfo });
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Mon profil</h1>
        <p className="text-gray-500 mt-1">Gérez vos informations personnelles et agricoles</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Carte d'identité */}
        <Card className="lg:col-span-1 h-fit">
          <CardBody className="text-center">
            {avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={avatarUrl}
                alt={`Photo de ${user.fullName}`}
                className="w-20 h-20 rounded-full object-cover mx-auto"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-cultiva-green flex items-center justify-center text-2xl font-bold text-white mx-auto">
                {initials(user.fullName)}
              </div>
            )}
            <h2 className="font-semibold text-gray-900 mt-4">{user.fullName}</h2>
            <p className="text-sm text-gray-500 mt-0.5">{user.location}</p>
            <div className="mt-3">
              <Badge tone="green">Agriculteur</Badge>
            </div>
            <p className="text-xs text-gray-400 mt-4">
              Membre depuis le {formatDate(user.createdAt)}
            </p>
          </CardBody>
        </Card>

        {/* Formulaire */}
        <Card className="lg:col-span-2">
          <CardHeader title="Informations" subtitle="Vos modifications sont enregistrées sur le serveur" />
          <CardBody className="pt-3">
            {success && (
              <div
                role="status"
                className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl px-4 py-3 flex items-center gap-2 mb-4"
              >
                <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                Profil mis à jour avec succès.
              </div>
            )}
            {error && (
              <div
                role="alert"
                className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-4"
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Nom complet" htmlFor="fullName">
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </Field>
                <Field label="Téléphone" htmlFor="phone">
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Field>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Email" htmlFor="email">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Field>
                <Field label="Localisation" htmlFor="location">
                  <Input
                    id="location"
                    name="location"
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </Field>
              </div>

              <Field
                label="Photo (URL)"
                htmlFor="avatarUrl"
                hint="Collez l'URL d'une image pour votre photo de profil (optionnel)."
              >
                <Input
                  id="avatarUrl"
                  name="avatarUrl"
                  type="url"
                  placeholder="https://..."
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                />
              </Field>

              <div className="border-t border-gray-100 pt-5">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">
                  Informations agricoles
                </h3>
                <div className="space-y-5">
                  <Field label="Type d'exploitation" htmlFor="farmType">
                    <Input
                      id="farmType"
                      name="farmType"
                      type="text"
                      placeholder="Ex : Polyculture, Maraîchage..."
                      value={farmType}
                      onChange={(e) => setFarmType(e.target.value)}
                    />
                  </Field>
                  <Field label="À propos de votre exploitation" htmlFor="farmInfo">
                    <Textarea
                      id="farmInfo"
                      name="farmInfo"
                      rows={3}
                      placeholder="Décrivez votre exploitation..."
                      value={farmInfo}
                      onChange={(e) => setFarmInfo(e.target.value)}
                    />
                  </Field>
                </div>
              </div>

              <Button type="submit" disabled={saving}>
                <Save className="w-5 h-5" aria-hidden="true" />
                {saving ? "Enregistrement..." : "Enregistrer les modifications"}
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
