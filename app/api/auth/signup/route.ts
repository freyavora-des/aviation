import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { SESSION_COOKIE_NAME } from "@/lib/auth";
import { createSessionToken } from "@/lib/session";

export async function POST(req: Request) {
  const form = await req.formData();
  const username = String(form.get("username") ?? "").trim();
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  const password = String(form.get("password") ?? "");

  if (username.length < 3) return NextResponse.json({ error: "Invalid username" }, { status: 400 });
  if (!email.includes("@")) return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  if (password.length < 8) return NextResponse.json({ error: "Password too short" }, { status: 400 });

  const passwordHash = await bcrypt.hash(password, 12);

  try {
    const user = await prisma.user.create({
      data: { username, email, passwordHash },
      select: { id: true },
    });

    const token = createSessionToken(user.id);
    const res = NextResponse.redirect(new URL("/dashboard", req.url), { status: 303 });
    res.cookies.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env["NODE_ENV"] === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  } catch {
    return NextResponse.json({ error: "Account already exists" }, { status: 409 });
  }
}

