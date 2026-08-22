/**
 * DONNÉES MÉTÉO DE DÉMONSTRATION — CULTIVA.
 *
 * Ces données sont purement fictives et servent à afficher le module météo
 * en attendant le branchement d'une API réelle (voir services/weather.ts).
 * Les dates sont générées relativement à aujourd'hui.
 */
import type { WeatherData } from "@/types";

const now = new Date();

function at(dayOffset: number): string {
  const d = new Date(now);
  d.setDate(d.getDate() + dayOffset);
  return d.toISOString();
}

export const mockWeather: WeatherData = {
  location: "Agou, Togo",
  current: {
    temperature: 28,
    feelsLike: 31,
    rainChance: 40,
    precipitation: 2.5,
    humidity: 78,
    windSpeed: 12,
    condition: "nuageux",
  },
  forecast: [
    {
      date: at(0),
      condition: "nuageux",
      tempMin: 22,
      tempMax: 30,
      rainChance: 40,
      precipitation: 2.5,
      windSpeed: 12,
    },
    {
      date: at(1),
      condition: "pluvieux",
      tempMin: 21,
      tempMax: 27,
      rainChance: 80,
      precipitation: 18,
      windSpeed: 18,
    },
    {
      date: at(2),
      condition: "orageux",
      tempMin: 20,
      tempMax: 26,
      rainChance: 70,
      precipitation: 25,
      windSpeed: 25,
    },
    {
      date: at(3),
      condition: "ensoleille",
      tempMin: 21,
      tempMax: 31,
      rainChance: 10,
      precipitation: 0,
      windSpeed: 10,
    },
    {
      date: at(4),
      condition: "ensoleille",
      tempMin: 22,
      tempMax: 32,
      rainChance: 5,
      precipitation: 0,
      windSpeed: 8,
    },
    {
      date: at(5),
      condition: "brumeux",
      tempMin: 22,
      tempMax: 29,
      rainChance: 30,
      precipitation: 1.5,
      windSpeed: 11,
    },
  ],
  source: "demo",
};
