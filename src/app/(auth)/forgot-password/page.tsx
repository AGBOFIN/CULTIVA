"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { KeyRound, MailCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardBody } from "@/components/ui/card";
import { Field, Input } from "@/components/ui/input";
import { requestPasswordReset } from "@/services/auth";

export default function ForgotPasswordPage() {
  const [identifier, setIdentifier] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setSubmitting(true);
    try {
      const result = await requestPasswordReset(identifier);
      setMessage(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Card>
      <CardBody className="space-y-6">
        <div className="text-center">
          <div className="w-12 h-12 bg-cultiva-green/10 rounded-xl flex items-center justify-center mx-auto mb-4">
            <KeyRound className="w-6 h-6 text-cultiva-green" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Récupération du mot de passe</h1>
          <p className="text-sm text-gray-500 mt-1">
            Indiquez votre email ou téléphone pour recevoir un lien de réinitialisation.
          </p>
        </div>

        {message && (
          <div
            role="status"
            className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl px-4 py-3 flex items-start gap-2"
          >
            <MailCheck className="w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
            {message}
          </div>
        )}

        {error && (
          <div
            role="alert"
            className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3"
          >
            {error}
          </div>
        )}

        {!message && (
          <form onSubmit={handleSubmit} className="space-y-5">
            <Field label="Email ou téléphone" htmlFor="identifier">
              <Input
                id="identifier"
                name="identifier"
                type="text"
                required
                placeholder="votre@email.com ou +228 ..."
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
              />
            </Field>
            <Button type="submit" size="lg" className="w-full" disabled={submitting}>
              {submitting ? "Envoi..." : "Envoyer le lien"}
            </Button>
          </form>
        )}

        <p className="text-sm text-gray-600 text-center">
          <Link href="/login" className="text-cultiva-green hover:text-cultiva-darkGreen font-medium">
            Retour à la connexion
          </Link>
        </p>
      </CardBody>
    </Card>
  );
}
