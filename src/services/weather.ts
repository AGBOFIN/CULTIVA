/**
 * Service météo.
 *
 * Appelle la route serveur `/api/weather` qui interroge **Open-Meteo**
 * (gratuite, sans clé API) et renvoie des données réelles avec
 * `source: "api"`. En cas d'échec réseau, la route renvoie les données de
 * démonstration (`source: "demo"`) — l'interface affiche alors un bandeau.
 *
 * La position peut être fournie par la géolocalisation du navigateur ;
 * sinon, une position par défaut (Lomé) est utilisée.
 */
import { apiFetch } from "@/lib/client";
import type { WeatherData } from "@/types";

export async function getWeather(lat?: number, lon?: number): Promise<WeatherData> {
  const params = new URLSearchParams();
  if (lat !== undefined && lon !== undefined) {
    params.set("lat", String(lat));
    params.set("lon", String(lon));
  }
  const qs = params.toString();
  return apiFetch<WeatherData>(`/api/weather${qs ? `?${qs}` : ""}`);
}
