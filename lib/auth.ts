import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifySessionToken } from "@/lib/session";

export const SESSION_COOKIE_NAME = "session";

export async function getCurrentUser() {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  const payload = verifySessionToken(token);
  if (!payload) return null;
  return prisma.user.findUnique({
    where: { id: payload.sub },
    select: { id: true, email: true, username: true, selectedAirportIata: true },
  });
}

