import Link from "next/link";
import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (!user.selectedAirportIata) redirect("/onboarding/location");

  const cardCount = await prisma.card.count({ where: { userId: user.id } });
  if (cardCount === 0) redirect("/onboarding/cards");

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
      <p className="mt-2 text-slate-600">
        Signed in as <span className="font-semibold text-slate-800">{user.email}</span>
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <Link
          href="/lounges"
          className="rounded-xl border border-slate-200 bg-white p-5 hover:border-skybrand-300"
        >
          <div className="text-sm text-slate-500">Explore</div>
          <div className="mt-1 text-lg font-semibold text-slate-900">Lounges & services</div>
        </Link>
        <Link
          href="/cards"
          className="rounded-xl border border-slate-200 bg-white p-5 hover:border-skybrand-300"
        >
          <div className="text-sm text-slate-500">Manage</div>
          <div className="mt-1 text-lg font-semibold text-slate-900">Cards</div>
        </Link>
        <Link
          href="/settings"
          className="rounded-xl border border-slate-200 bg-white p-5 hover:border-skybrand-300"
        >
          <div className="text-sm text-slate-500">Update</div>
          <div className="mt-1 text-lg font-semibold text-slate-900">Settings</div>
        </Link>
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="text-sm text-slate-500">Selected airport</div>
          <div className="mt-1 text-lg font-semibold text-slate-900">
            {user.selectedAirportIata ?? "—"}
          </div>
        </div>
      </div>
    </main>
  );
}

