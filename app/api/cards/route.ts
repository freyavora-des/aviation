import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const cards = await prisma.card.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ cards });
}

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const url = new URL(req.url);
  const next = url.searchParams.get("next") || "/cards";

  const form = await req.formData();
  const category = String(form.get("category") ?? "").trim();
  const program = String(form.get("program") ?? "").trim();
  const label = String(form.get("label") ?? "").trim() || null;
  const last4Raw = String(form.get("last4") ?? "").trim();
  const source = String(form.get("source") ?? "manual").trim();

  const last4 = last4Raw ? last4Raw.replaceAll(/\D/g, "").slice(-4) : null;
  if (!category) return NextResponse.json({ error: "Missing category" }, { status: 400 });
  if (!program) return NextResponse.json({ error: "Missing program" }, { status: 400 });

  await prisma.card.create({
    data: {
      userId: user.id,
      category,
      program,
      label,
      last4,
      source,
    },
  });

  return NextResponse.redirect(new URL(next, req.url), { status: 303 });
}

