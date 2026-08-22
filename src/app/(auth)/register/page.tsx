"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserPlus } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardBody } from "@/components/ui/card";
import { Field, Input } from "@/components/ui/input";

export default function RegisterPage() {
  const { register, user } = useAuth();
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user) router.replace("/dashboard");
  }, [user, router]);

  function validate(): string | null {
    if (fullName.trim().length < 2) return "Veuillez indiquer votre nom complet.";
    if (phone.trim().length < 8) return "Veuillez indiquer un numéro de téléphone valide.";
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) return "Veuillez indiquer un email valide.";
    if (password.length < 6) return "Le mot de passe doit contenir au moins 6 caractères.";
    if (password !== confirmPassword) return "Les deux mots de passe ne correspondent pas.";
    if (location.trim().length < 2) return "Veuillez indiquer votre localisation.";
    return null;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      await register({
        fullName,
        phone,
        email,
        password,
        location,
        userType: "farmer",
      });
      router.replace("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Card>
      <CardBody className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Créer un compte</h1>
          <p className="text-sm text-gray-500 mt-1">
            Inscription simple et rapide en quelques minutes
          </p>
        </div>

        {error && (
          <div
            role="alert"
            className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <Field label="Nom complet" htmlFor="fullName">
            <Input
              id="fullName"
              name="fullName"
              type="text"
              autoComplete="name"
              required
              placeholder="Ex : Koffi Mensah"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </Field>

          <Field label="Téléphone" htmlFor="phone">
            <Input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              required
              placeholder="+228 XX XX XX XX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Field>

          <Field label="Email" htmlFor="email">
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="votre@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field>

          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Mot de passe" htmlFor="password" hint="6 caractères minimum">
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Field>
            <Field label="Confirmer le mot de passe" htmlFor="confirmPassword">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Field>
          </div>

          <Field label="Localisation" htmlFor="location">
            <Input
              id="location"
              name="location"
              type="text"
              required
              placeholder="Ex : Agou, Togo"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Field>

          <Button type="submit" size="lg" className="w-full" disabled={submitting}>
            <UserPlus className="w-5 h-5" aria-hidden="true" />
            {submitting ? "Création du compte..." : "Créer mon compte"}
          </Button>
        </form>

        <p className="text-sm text-gray-600 text-center">
          Déjà inscrit ?{" "}
          <Link href="/login" className="text-cultiva-green hover:text-cultiva-darkGreen font-medium">
            Se connecter
          </Link>
        </p>
      </CardBody>
    </Card>
  );
}
