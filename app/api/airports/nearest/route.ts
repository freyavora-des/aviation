import { NextResponse } from "next/server";

import { AIRPORTS } from "@/lib/airports";
import { haversineKm } from "@/lib/geo";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const lat = Number(url.searchParams.get("lat"));
  const lon = Number(url.searchParams.get("lon"));
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    return NextResponse.json({ error: "Missing lat/lon" }, { status: 400 });
  }

  let best: { iata: string; km: number } | null = null;
  for (const a of AIRPORTS) {
    const km = haversineKm({ lat, lon }, { lat: a.lat, lon: a.lon });
    if (!best || km < best.km) best = { iata: a.iata, km };
  }

  if (!best) return NextResponse.json({ error: "No airports available" }, { status: 500 });
  return NextResponse.json({ iata: best.iata, distanceKm: Math.round(best.km * 10) / 10 });
}

