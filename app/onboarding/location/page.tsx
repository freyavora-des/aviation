import { redirect } from "next/navigation";

import LocationChooser from "./LocationChooser";
import { getCurrentUser } from "@/lib/auth";

export default async function OnboardingLocationPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (user.selectedAirportIata) redirect("/onboarding/cards");

  return (
    <main className="mx-auto max-w-3xl px-6 py-14">
      <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <p className="text-sm font-semibold text-skybrand-700">Onboarding</p>
        <h1 className="mt-2 text-2xl font-semibold text-slate-900">
          Choose your airport
        </h1>
        <p className="mt-2 text-slate-600">
          We use this to show lounges and services in the right terminals.
        </p>

        <LocationChooser />
      </div>
    </main>
  );
}

