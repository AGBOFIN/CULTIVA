"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardBody } from "@/components/ui/card";
import { Field, Input } from "@/components/ui/input";

export default function LoginPage() {
  const { login, user } = useAuth();
  const router = useRouter();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user) router.replace("/dashboard");
  }, [user, router]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(identifier, password);
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
          <h1 className="text-2xl font-bold text-gray-900">Connexion</h1>
          <p className="text-sm text-gray-500 mt-1">
            Accédez à votre espace agricole
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
          <Field label="Email ou téléphone" htmlFor="identifier">
            <Input
              id="identifier"
              name="identifier"
              type="text"
              autoComplete="username"
              required
              placeholder="votre@email.com ou +228 ..."
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />
          </Field>

          <Field label="Mot de passe" htmlFor="password">
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Field>

          <Button type="submit" size="lg" className="w-full" disabled={submitting}>
            <LogIn className="w-5 h-5" aria-hidden="true" />
            {submitting ? "Connexion..." : "Se connecter"}
          </Button>
        </form>

        <div className="text-center">
          <Link
            href="/forgot-password"
            className="text-sm text-cultiva-green hover:text-cultiva-darkGreen font-medium"
          >
            Mot de passe oublié ?
          </Link>
        </div>

        <p className="text-sm text-gray-600 text-center">
          Pas encore de compte ?{" "}
          <Link href="/register" className="text-cultiva-green hover:text-cultiva-darkGreen font-medium">
            Créer un compte
          </Link>
        </p>
      </CardBody>
    </Card>
  );
}
