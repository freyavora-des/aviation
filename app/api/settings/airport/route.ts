import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const form = await req.formData();
  const iataRaw = String(form.get("iata") ?? "").trim().toUpperCase();
  const iata = iataRaw === "" ? null : iataRaw.replaceAll(/[^A-Z]/g, "").slice(0, 3);

  await prisma.user.update({
    where: { id: user.id },
    data: { selectedAirportIata: iata },
  });

  return NextResponse.redirect(new URL("/settings", req.url), { status: 303 });
}

