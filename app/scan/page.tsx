import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth";
import ScanClient from "./scan-client";

export default async function ScanPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (!user.selectedAirportIata) redirect("/onboarding/location");

  return (
    <main className="mx-auto max-w-3xl px-6 py-14">
      <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <h1 className="text-2xl font-semibold text-slate-900">Scan card</h1>
        <p className="mt-2 text-slate-600">
          Point your camera at the card text. We’ll detect common lounge programs (like Priority
          Pass) and save only safe metadata (no full card numbers).
        </p>
        <ScanClient />
      </div>
    </main>
  );
}

