import { NextRequest } from "next/server";
import { json } from "@/lib/api";
import { mockWeather } from "@/data/mock-weather";
import type { WeatherCondition, WeatherData, WeatherForecastDay } from "@/types";

/**
 * Proxy météo : appelle Open-Meteo (gratuit, sans clé API) et transforme la
 * réponse en `WeatherData`. En cas d'échec réseau, renvoie les données de
 * démonstration avec `source: "demo"` — l'application ne casse jamais.
 *
 * Position par défaut : Lomé, Togo. Peut être surchargée par `lat`/`lon`
 * (géolocalisation du navigateur ou localisation du profil).
 */
const DEFAULT_LAT = 6.1319;
const DEFAULT_LON = 1.2228;
export const runtime = "nodejs";

function mapCondition(code: number): WeatherCondition {
  if (code === 0) return "ensoleille";
  if (code === 1 || code === 2) return "nuageux";
  if (code === 3) return "nuageux";
  if (code === 45 || code === 48) return "brumeux";
  if (code >= 95) return "orageux";
  if (code >= 51) return "pluvieux";
  return "nuageux";
}

export async function GET(request: NextRequest) {
  const lat = Number(request.nextUrl.searchParams.get("lat") ?? DEFAULT_LAT);
  const lon = Number(request.nextUrl.searchParams.get("lon") ?? DEFAULT_LON);

  const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${lat}&longitude=${lon}` +
    `&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m` +
    `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum,wind_speed_10m_max` +
    `&forecast_days=6&timezone=auto`;

  try {
    const response = await fetch(url, { next: { revalidate: 600 } });
    if (!response.ok) throw new Error(`Open-Meteo ${response.status}`);
    const raw = (await response.json()) as {
      current?: {
        temperature_2m?: number;
        relative_humidity_2m?: number;
        apparent_temperature?: number;
        precipitation?: number;
        weather_code?: number;
        wind_speed_10m?: number;
      };
      daily?: {
        time?: string[];
        weather_code?: number[];
        temperature_2m_max?: number[];
        temperature_2m_min?: number[];
        precipitation_probability_max?: number[];
        precipitation_sum?: number[];
        wind_speed_10m_max?: number[];
      };
    };

    if (!raw.current || !raw.daily?.time?.length) {
      throw new Error("Réponse Open-Meteo incomplète");
    }

    const forecast: WeatherForecastDay[] = raw.daily.time.map((date, i) => ({
      date: new Date(date + "T12:00:00").toISOString(),
      condition: mapCondition(raw.daily!.weather_code?.[i] ?? 2),
      tempMin: Math.round(raw.daily!.temperature_2m_min?.[i] ?? 0),
      tempMax: Math.round(raw.daily!.temperature_2m_max?.[i] ?? 0),
      rainChance: Math.round(raw.daily!.precipitation_probability_max?.[i] ?? 0),
      precipitation: Math.round((raw.daily!.precipitation_sum?.[i] ?? 0) * 10) / 10,
      windSpeed: Math.round(raw.daily!.wind_speed_10m_max?.[i] ?? 0),
    }));

    const data: WeatherData = {
      location: "Lomé, Togo",
      current: {
        temperature: Math.round(raw.current.temperature_2m ?? 0),
        feelsLike: Math.round(raw.current.apparent_temperature ?? 0),
        rainChance: Math.round(raw.daily.precipitation_probability_max?.[0] ?? 0),
        precipitation: Math.round((raw.current.precipitation ?? 0) * 10) / 10,
        humidity: Math.round(raw.current.relative_humidity_2m ?? 0),
        windSpeed: Math.round(raw.current.wind_speed_10m ?? 0),
        condition: mapCondition(raw.current.weather_code ?? 2),
      },
      forecast,
      source: "api",
    };

    return json(data);
  } catch {
    // Repli sur les données de démonstration — jamais d'erreur pour l'utilisateur.
    return json({ ...mockWeather, source: "demo" as const });
  }
}
