"use client";

import { useMemo, useState } from "react";

type AirportResult = { iata: string; name: string; city: string; country: string };

export default function LocationChooser() {
  const [mode, setMode] = useState<"auto" | "manual" | null>(null);
  const [status, setStatus] = useState<string>("");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<AirportResult[]>([]);

  const canSearch = useMemo(() => query.trim().length >= 2, [query]);

  async function chooseAuto() {
    setMode("auto");
    setStatus("Requesting location…");
    if (!navigator.geolocation) {
      setStatus("Geolocation not available. Please use manual search.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const url = new URL("/api/airports/nearest", window.location.origin);
          url.searchParams.set("lat", String(pos.coords.latitude));
          url.searchParams.set("lon", String(pos.coords.longitude));
          const resp = await fetch(url);
          const data = (await resp.json()) as { iata?: string; distanceKm?: number; error?: string };
          if (!resp.ok || !data.iata) {
            setStatus(data.error ?? "Could not determine nearest airport.");
            return;
          }

          setStatus(`Nearest airport: ${data.iata} (${data.distanceKm ?? "?"} km). Saving…`);
          const fd = new FormData();
          fd.set("iata", data.iata);
          const save = await fetch("/api/onboarding/airport", { method: "POST", body: fd });
          // The server responds with a redirect.
          if (save.redirected) window.location.href = save.url;
          else window.location.href = "/onboarding/cards";
        } catch {
          setStatus("Something went wrong. Please try manual search.");
        }
      },
      () => setStatus("Permission denied. Please use manual search."),
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 60_000 }
    );
  }

  async function runSearch(nextQuery: string) {
    setQuery(nextQuery);
    if (nextQuery.trim().length < 2) {
      setResults([]);
      return;
    }
    const resp = await fetch(`/api/airports/search?q=${encodeURIComponent(nextQuery.trim())}`);
    const data = (await resp.json()) as { airports: AirportResult[] };
    setResults(data.airports ?? []);
  }

  async function selectAirport(iata: string) {
    setStatus(`Saving ${iata}…`);
    const fd = new FormData();
    fd.set("iata", iata);
    const save = await fetch("/api/onboarding/airport", { method: "POST", body: fd });
    if (save.redirected) window.location.href = save.url;
    else window.location.href = "/onboarding/cards";
  }

  return (
    <div className="mt-8 space-y-6">
      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={chooseAuto}
          className="rounded-xl border border-skybrand-200/40 bg-white px-5 py-4 text-left shadow-sm hover:border-skybrand-300"
        >
          <div className="text-sm font-semibold text-slate-900">Use my location</div>
          <div className="mt-1 text-sm text-slate-600">
            We’ll pick the nearest airport automatically.
          </div>
        </button>
        <button
          type="button"
          onClick={() => setMode("manual")}
          className="rounded-xl border border-skybrand-200/40 bg-white px-5 py-4 text-left shadow-sm hover:border-skybrand-300"
        >
          <div className="text-sm font-semibold text-slate-900">Choose airport manually</div>
          <div className="mt-1 text-sm text-slate-600">Search by city, airport, or IATA.</div>
        </button>
      </div>

      {mode === "manual" ? (
        <div className="rounded-2xl border border-skybrand-200/40 bg-white p-5 shadow-sm">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Search airport</span>
            <input
              value={query}
              onChange={(e) => void runSearch(e.target.value)}
              placeholder="e.g. LAX, Los Angeles, Heathrow…"
              className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-skybrand-400"
            />
          </label>

          <div className="mt-3 space-y-2">
            {canSearch && results.length === 0 ? (
              <div className="text-sm text-slate-500">No matches. Try another search.</div>
            ) : null}
            {results.map((a) => (
              <button
                key={a.iata}
                type="button"
                onClick={() => void selectAirport(a.iata)}
                className="flex w-full items-center justify-between rounded-lg border border-slate-200 px-3 py-3 text-left hover:border-skybrand-300"
              >
                <div>
                  <div className="text-sm font-semibold text-slate-900">{a.iata}</div>
                  <div className="text-sm text-slate-600">
                    {a.city}, {a.country}
                  </div>
                </div>
                <div className="text-xs text-slate-500">{a.name}</div>
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {status ? (
        <div className="rounded-lg border border-skybrand-200/40 bg-skybrand-50 px-4 py-3 text-sm text-slate-700">
          {status}
        </div>
      ) : null}
    </div>
  );
}

