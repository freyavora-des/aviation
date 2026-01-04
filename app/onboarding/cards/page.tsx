import Link from "next/link";
import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function OnboardingCardsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (!user.selectedAirportIata) redirect("/onboarding/location");

  const existing = await prisma.card.count({ where: { userId: user.id } });
  if (existing > 0) redirect("/lounges");

  return (
    <main className="mx-auto max-w-3xl px-6 py-14">
      <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <p className="text-sm font-semibold text-skybrand-700">Onboarding</p>
        <h1 className="mt-2 text-2xl font-semibold text-slate-900">Add your access card</h1>
        <p className="mt-2 text-slate-600">
          Add your credit/debit card or membership (like Priority Pass). We store only safe metadata.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <Link
            href="/scan"
            className="rounded-xl border border-skybrand-200/40 bg-white px-5 py-4 shadow-sm hover:border-skybrand-300"
          >
            <div className="text-sm font-semibold text-slate-900">Scan a card</div>
            <div className="mt-1 text-sm text-slate-600">
              Use your camera to capture card details (coming next).
            </div>
          </Link>
          <Link
            href="/cards/new?next=/lounges"
            className="rounded-xl border border-skybrand-200/40 bg-white px-5 py-4 shadow-sm hover:border-skybrand-300"
          >
            <div className="text-sm font-semibold text-slate-900">Enter manually</div>
            <div className="mt-1 text-sm text-slate-600">
              Add program + last 4 (optional).
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}

