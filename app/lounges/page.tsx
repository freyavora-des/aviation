import Link from "next/link";
import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { hasAccess, LOUNGES } from "@/lib/lounges";

export default async function LoungesPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (!user.selectedAirportIata) redirect("/onboarding/location");

  const cards = await prisma.card.findMany({
    where: { userId: user.id },
    select: { program: true, category: true },
  });
  if (cards.length === 0) redirect("/onboarding/cards");

  const programs = cards.map((c) => c.program);
  const airportLounges = LOUNGES.filter((l) => l.airportIata === user.selectedAirportIata);

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-skybrand-700">Lounges & services</p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-900">
            {user.selectedAirportIata}
          </h1>
          <p className="mt-2 text-slate-600">
            Matched against your saved cards and memberships.
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/cards"
            className="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:border-skybrand-300"
          >
            My cards
          </Link>
          <Link
            href="/settings"
            className="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:border-skybrand-300"
          >
            Change airport
          </Link>
        </div>
      </div>

      <div className="mt-8 grid gap-4">
        {airportLounges.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-700">
            No lounge data for <span className="font-semibold">{user.selectedAirportIata}</span>{" "}
            yet (demo dataset). Add more airports/lounges in <code>lib/lounges.ts</code>.
          </div>
        ) : (
          airportLounges.map((l) => {
            const access = hasAccess(programs, l.acceptedPrograms);
            return (
              <div key={l.id} className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      {l.type === "lounge" ? "Lounge" : "Service"}
                    </div>
                    <div className="mt-1 text-lg font-semibold text-slate-900">{l.name}</div>
                    <div className="mt-1 text-sm text-slate-600">
                      <span className="font-semibold text-slate-700">{l.terminal}</span> •{" "}
                      {l.locationHint}
                    </div>
                    <div className="mt-1 text-sm text-slate-600">{l.address}</div>
                  </div>
                  <div
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${
                      access
                        ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                        : "bg-slate-50 text-slate-600 ring-1 ring-slate-200"
                    }`}
                  >
                    {access ? "Access: Yes" : "Access: Not matched"}
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {l.acceptedPrograms.map((p) => (
                    <span
                      key={p}
                      className="rounded-full bg-skybrand-50 px-3 py-1 text-xs font-semibold text-skybrand-700 ring-1 ring-skybrand-200"
                    >
                      {p}
                    </span>
                  ))}
                </div>

                <div className="mt-5 grid gap-2 sm:grid-cols-2">
                  {l.rules.map((r) => (
                    <div key={r.label} className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-200">
                      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        {r.label}
                      </div>
                      <div className="mt-1 text-sm font-medium text-slate-800">{r.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </main>
  );
}

