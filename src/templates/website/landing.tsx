"use client";

import React, {
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from "react";
import Clock from "@/components/ui/clock";
import { TEMPLATES } from "@/lib/constants/constants";
import { useTemplateActions } from "@/store/hooks";
import { editEditorSettings } from "@/store";
// ...existing code... (dock components removed because they're not used in this template)
import {
  Thermometer,
  Search as SearchIcon,
  Share2,
  Twitter,
  Linkedin,
  GithubIcon,
} from "lucide-react";

type IpInfo = {
  ip: string;
  hostname?: string;
  city?: string;
  region?: string;
  country?: string;
  loc?: string; // "lat,lon"
  postal?: string;
  timezone?: string;
};

type Weather = {
  temperature: number | null;
  apparent: number | null;
  humidity: number | null;
  code?: number | null;
  isDay?: number | null;
};

type OpenMeteoResponse = {
  current?: {
    temperature_2m?: number;
    relative_humidity_2m?: number;
    apparent_temperature?: number;
    is_day?: number;
    weather_code?: number;
  };
};

const codeToText: Record<number, string> = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Drizzle",
  55: "Dense drizzle",
  61: "Slight rain",
  63: "Rain",
  65: "Heavy rain",
  80: "Rain showers",
  95: "Thunderstorm",
};

function useWeather() {
  const [ip, setIp] = useState<IpInfo | null>(null);
  const [weather, setWeather] = useState<Weather>({
    temperature: null,
    apparent: null,
    humidity: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      try {
        const ipRes = await fetch("https://ipinfo.io/json", {
          cache: "no-store",
        });
        const ipData: IpInfo = await ipRes.json();
        if (cancelled) return;
        setIp(ipData);

        const [lat, lon] = (ipData.loc || "").split(",");
        if (lat && lon) {
          const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code`;
          const wRes = await fetch(url, { cache: "no-store" });
          const data: unknown = await wRes.json();
          if (cancelled) return;
          const cur = (data as OpenMeteoResponse)?.current ?? {};
          setWeather({
            temperature:
              typeof cur.temperature_2m === "number"
                ? cur.temperature_2m
                : null,
            apparent:
              typeof cur.apparent_temperature === "number"
                ? cur.apparent_temperature
                : null,
            humidity:
              typeof cur.relative_humidity_2m === "number"
                ? cur.relative_humidity_2m
                : null,
            code:
              typeof cur.weather_code === "number" ? cur.weather_code : null,
            isDay: typeof cur.is_day === "number" ? cur.is_day : null,
          });
        }
      } catch {
        // Swallow errors for template use
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, []);

  const summary = useMemo(() => {
    if (weather.code != null && codeToText[weather.code])
      return codeToText[weather.code];
    return "Local weather";
  }, [weather.code]);

  return { ip, weather, loading, summary };
}

// Small helpers
const getGreeting = (d = new Date()) => {
  const h = d.getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
};

// Memoized subcomponents to avoid useless re-renders -------------------------
const ClockCard = React.memo(function ClockCard({
  city,
  timezone,
  greeting,
}: {
  city?: string | null;
  timezone?: string | null;
  username: string;
  onUsernameChange: (name: string) => void;
  greeting: string;
}) {
  return (
    <section className="card">
      <div className="w-[260px] h-[260px] mx-auto">
        <Clock size={260} />
      </div>
      <div className="mt-6 text-center space-y-1 text-base-content">
        <h2 className="text-2xl font-bold opacity-80">{greeting}</h2>
        <div className="text-xl font-semibold">{city || "Your City"}</div>
        <div className="text-sm opacity-70">{timezone || "Local time"}</div>
        <div className="mt-4"></div>
      </div>
    </section>
  );
});

const WeatherWidget = React.memo(function WeatherWidget({
  city,
  region,
  summary,
  loading,
  temperature,
  humidity,
}: {
  city?: string | null;
  region?: string | null;
  summary: string;
  loading: boolean;
  temperature: number | null;
  humidity: number | null;
}) {
  return (
    <div className="rounded-box bg-base-100 border border-base-300 @md:w-full @lg:w-[600px] shadow-sm p-8">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="text-base-content/70 text-sm">
            {city
              ? `${city}${region ? ", " + region : ""}`
              : "Detecting location..."}
          </div>
          <h2 className="text-xl text-base-content font-semibold mt-1">
            {loading ? "Loading weather…" : summary}
          </h2>
        </div>
        <div className="shrink-0 rounded-2xl bg-base-200 text-base-content size-20 grid place-items-center">
          <Thermometer className="w-6 h-6" />
        </div>
      </div>
      <h6 className="font-extralight text-base-content">Humidity</h6>
      <progress
        className="progress w-full h-10"
        value={humidity ?? 0}
        max="100"
      ></progress>
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-base-content">
          {temperature != null ? `${Math.round(temperature)}°C` : "—"}
        </h3>
      </div>
    </div>
  );
});

const ThemeSearch = React.memo(function ThemeSearch({
  query,
  setQuery,
  results,
  onPick,
  onOpenEditor,
  onShare,
}: {
  query: string;
  setQuery: (v: string) => void;
  results: Array<{ id: string; title: string; description?: string }>;
  onPick: (id: string) => void;
  onOpenEditor: () => void;
  onShare: () => void;
}) {
  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (results.length) onPick(results[0].id);
    },
    [results, onPick],
  );

  return (
    <div className="rounded-box bg-base-100 border border-base-300 shadow-sm p-5 relative">
      <form onSubmit={onSubmit} className="join w-full">
        <div className="join-item flex-1 flex items-center gap-2 bg-base-100 border border-base-300 rounded-field px-4 py-3">
          <SearchIcon className="w-5 h-5 opacity-70" />
          <input
            className="input input-ghost flex-1 min-w-0 focus:outline-none placeholder:text-base-content"
            placeholder="Search themes"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search themes"
          />
        </div>
      </form>
      <br />
      <br />
      <div className="flex items-center justify-center gap-4 w-full flex-nowrap">
        <button
          type="button"
          className=" btn rounded-field p-6 w-1/2"
          onClick={onOpenEditor}
        >
          Open Editor
        </button>
        <button
          type="button"
          className=" btn rounded-field p-6  w-1/2"
          onClick={onShare}
        >
          <Share2 className="w-4 h-4" /> Share
        </button>
      </div>
      <div className="flex items-center justify-center gap-4 w-full flex-nowrap mt-4">
        <GithubIcon />
        <Twitter />
        <Linkedin />
      </div>

      {query && (
        <div className="mt-4 text-base-content absolute w-full left-0 top-20 rounded-2xl border border-base-300 bg-base-200 p-2 max-h-64 overflow-auto">
          {results.length === 0 ? (
            <div className="px-3 py-2 text-sm opacity-70">No themes found</div>
          ) : (
            <ul className="menu bg-transparent p-0">
              {results.slice(0, 8).map((t) => (
                <li key={t.id}>
                  <button
                    className="justify-between"
                    onClick={() => onPick(t.id)}
                  >
                    <span className="truncate text-left">
                      <span className="font-medium">{t.title}</span>
                      <span className="opacity-60 ml-2 hidden @md:inline">
                        {t.description}
                      </span>
                    </span>
                    <span className="badge badge-outline">Select</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
});

export default function Landing() {
  const { setActiveTemplateById } = useTemplateActions();
  const { ip, weather, loading, summary } = useWeather();
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [username, setUsername] = useState<string>("livetheme");
  const [greeting, setGreeting] = useState<string>(getGreeting());

  // username persistence without causing renders mid-typing
  useEffect(() => {
    try {
      const saved = localStorage.getItem("landing-username");
      if (saved) setUsername(saved);
    } catch {}
  }, []);

  const handleUsernameChange = useCallback((name: string) => {
    setUsername(name);
    try {
      localStorage.setItem("landing-username", name);
    } catch {}
  }, []);

  // greeting updates once per minute
  useEffect(() => {
    const i = setInterval(() => setGreeting(getGreeting()), 60_000);
    return () => clearInterval(i);
  }, []);

  const allTemplates = useMemo(() => {
    return TEMPLATES.flatMap((c) => c.options);
  }, []);

  const results = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    if (!q) return [] as typeof allTemplates;
    return allTemplates.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        (t.description || "").toLowerCase().includes(q) ||
        t.id.toLowerCase().includes(q),
    );
  }, [allTemplates, deferredQuery]);

  const share = async () => {
    try {
      const { openShare } = await import("@/store/ui-store");
      openShare();
    } catch {}
  };

  return (
    <div className="min-h-screen bg-base-200 relative @container grid place-items-center w-full">
      <div className="grid gap-6 grid-cols-1 @2xl:grid-cols-1 @5xl:grid-cols-2 items-start">
        <ClockCard
          city={ip?.city}
          timezone={ip?.timezone}
          username={username}
          onUsernameChange={handleUsernameChange}
          greeting={greeting}
        />

        <section className="grid gap-6">
          <WeatherWidget
            city={ip?.city}
            region={ip?.region}
            summary={summary}
            loading={loading}
            temperature={weather.temperature}
            humidity={weather.humidity}
          />

          <ThemeSearch
            query={query}
            setQuery={setQuery}
            results={results}
            onPick={setActiveTemplateById}
            onOpenEditor={() => editEditorSettings({ is_open: true })}
            onShare={share}
          />
        </section>
      </div>
    </div>
  );
}
