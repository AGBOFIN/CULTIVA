"use client";

import { useEffect, useState } from "react";
import {
  Cloud,
  CloudLightning,
  CloudRain,
  CloudSun,
  Droplets,
  MapPin,
  Sun,
  Thermometer,
  Wind,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { getWeather } from "@/services/weather";
import type { WeatherData } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardBody, CardHeader } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { formatNumber } from "@/lib/format";

type WeatherCondition = WeatherData["current"]["condition"];

const CONDITION_ICONS: Record<WeatherCondition, { icon: LucideIcon; label: string; color: string }> = {
  ensoleille: { icon: Sun, label: "Ensoleillé", color: "text-yellow-500" },
  nuageux: { icon: CloudSun, label: "Nuageux", color: "text-gray-500" },
  pluvieux: { icon: CloudRain, label: "Pluvieux", color: "text-blue-500" },
  orageux: { icon: CloudLightning, label: "Orageux", color: "text-indigo-500" },
  brumeux: { icon: Cloud, label: "Brumeux", color: "text-gray-400" },
};

function dayLabel(date: string, index: number): string {
  if (index === 0) return "Aujourd'hui";
  const d = new Date(date);
  return d.toLocaleDateString("fr-FR", { weekday: "long" });
}

export default function WeatherPage() {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = (lat?: number, lon?: number) => {
      getWeather(lat, lon)
        .then((data) => {
          if (!cancelled) setWeather(data);
        })
        .catch(() => {
          if (!cancelled) setWeather(null);
        });
    };

    // Géolocalisation du navigateur si l'utilisateur l'autorise, sinon position par défaut.
    if (typeof navigator !== "undefined" && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => load(pos.coords.latitude, pos.coords.longitude),
        () => load(),
        { timeout: 5000, maximumAge: 600_000 }
      );
    } else {
      load();
    }

    return () => {
      cancelled = true;
    };
  }, []);

  if (weather === null) {
    return (
      <div className="flex justify-center py-20">
        <Spinner />
      </div>
    );
  }

  const current = CONDITION_ICONS[weather.current.condition];
  const CurrentIcon = current.icon;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Météo</h1>
          <p className="text-gray-500 mt-1 flex items-center gap-1.5">
            <MapPin className="w-4 h-4" aria-hidden="true" />
            {weather.location}
          </p>
        </div>
        <Badge tone={weather.source === "demo" ? "yellow" : "green"}>
          {weather.source === "demo" ? "Données de démonstration" : "Données en direct"}
        </Badge>
      </div>

      {/* Conditions actuelles */}
      <Card className="bg-gradient-to-br from-cultiva-green to-cultiva-darkGreen border-none text-white overflow-hidden">
        <CardBody>
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-sm opacity-80">{current.label}</p>
              <p className="text-5xl sm:text-6xl font-bold mt-1">
                {formatNumber(weather.current.temperature)}°
              </p>
              <p className="text-sm opacity-80 mt-1">
                Ressenti {formatNumber(weather.current.feelsLike)}°
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center">
                <CurrentIcon className={`w-12 h-12 ${current.color}`} aria-hidden="true" />
              </div>
              <span className="text-xs opacity-80">Maintenant</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-6">
            <div className="bg-white/10 rounded-xl p-3 text-center">
              <Droplets className="w-5 h-5 mx-auto mb-1" aria-hidden="true" />
              <p className="text-lg font-semibold">{weather.current.rainChance}%</p>
              <p className="text-xs opacity-80">Risque de pluie</p>
            </div>
            <div className="bg-white/10 rounded-xl p-3 text-center">
              <Thermometer className="w-5 h-5 mx-auto mb-1" aria-hidden="true" />
              <p className="text-lg font-semibold">{weather.current.humidity}%</p>
              <p className="text-xs opacity-80">Humidité</p>
            </div>
            <div className="bg-white/10 rounded-xl p-3 text-center">
              <Wind className="w-5 h-5 mx-auto mb-1" aria-hidden="true" />
              <p className="text-lg font-semibold">{formatNumber(weather.current.windSpeed)}</p>
              <p className="text-xs opacity-80">Vent (km/h)</p>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Prévisions */}
      <Card>
        <CardHeader title="Prévisions" subtitle="Les 5 prochains jours" />
        <CardBody className="pt-2">
          <ul className="divide-y divide-gray-50">
            {weather.forecast.map((day, index) => {
              const info = CONDITION_ICONS[day.condition];
              const DayIcon = info.icon;
              return (
                <li key={day.date} className="flex items-center gap-3 py-3">
                  <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <DayIcon className={`w-5 h-5 ${info.color}`} aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 capitalize">
                      {dayLabel(day.date, index)}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {formatNumber(day.tempMin)}° / {formatNumber(day.tempMax)}°
                      <span className="mx-1.5">·</span>
                      Pluie : {day.rainChance}%
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-sm font-semibold text-gray-900">
                      {formatNumber(day.tempMax)}°
                    </div>
                    {day.precipitation > 0 && (
                      <div className="text-xs text-blue-500 mt-0.5">
                        {day.precipitation} mm
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </CardBody>
      </Card>

      <p className="text-xs text-gray-400 leading-relaxed">
        Données fournies par Open-Meteo (gratuit, sans clé API). En cas d&apos;indisponibilité
        du service, des données de démonstration sont affichées à la place.
      </p>
    </div>
  );
}
