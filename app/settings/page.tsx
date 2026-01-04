import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function SettingsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (!user.selectedAirportIata) redirect("/onboarding/location");

  const cardCount = await prisma.card.count({ where: { userId: user.id } });
  if (cardCount === 0) redirect("/onboarding/cards");

  return (
    <main className="mx-auto max-w-xl px-6 py-12">
      <h1 className="text-2xl font-semibold text-slate-900">Settings</h1>
      <p className="mt-2 text-slate-600">Basic preferences stored on your profile.</p>

      <form className="mt-8 space-y-4" action="/api/settings/airport" method="post">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Selected airport (IATA)</span>
          <input
            name="iata"
            defaultValue={user.selectedAirportIata ?? ""}
            placeholder="e.g. LAX"
            maxLength={3}
            className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 outline-none focus:border-skybrand-400"
          />
        </label>
        <button className="w-full rounded-md bg-skybrand-600 px-4 py-2 font-semibold text-white hover:bg-skybrand-500">
          Save
        </button>
      </form>
    </main>
  );
}

