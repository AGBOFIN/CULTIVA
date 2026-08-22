/**
 * Helper client : appelle l'API et lève une Error lisible sur échec.
 */
export async function apiFetch<T>(url: string, options?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers ?? {}),
      },
    });
  } catch {
    throw new Error("Impossible de contacter le serveur. Vérifiez votre connexion.");
  }

  if (!response.ok) {
    let message = "Une erreur est survenue.";
    try {
      const body = (await response.json()) as { error?: string };
      if (body?.error) message = body.error;
    } catch {
      // Corps illisible : on garde le message générique.
    }
    throw new Error(message);
  }

  return (await response.json()) as T;
}
