import { NextResponse } from "next/server";

import { AIRPORTS } from "@/lib/airports";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = (url.searchParams.get("q") ?? "").trim().toLowerCase();
  if (q.length < 1) return NextResponse.json({ airports: [] });

  const results = AIRPORTS.filter((a) => {
    const hay = `${a.iata} ${a.name} ${a.city} ${a.country}`.toLowerCase();
    return hay.includes(q);
  })
    .slice(0, 8)
    .map((a) => ({ iata: a.iata, name: a.name, city: a.city, country: a.country }));

  return NextResponse.json({ airports: results });
}

