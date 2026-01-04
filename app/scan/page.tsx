import Link from "next/link";
import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth";

export default async function ScanPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (!user.selectedAirportIata) redirect("/onboarding/location");

  return (
    <main className="mx-auto max-w-3xl px-6 py-14">
      <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <h1 className="text-2xl font-semibold text-slate-900">Scan card</h1>
        <p className="mt-2 text-slate-600">
          Camera/OCR scanning is the next step. For now, use manual entry.
        </p>
        <div className="mt-8">
          <Link
            href="/cards/new?next=/lounges"
            className="inline-flex rounded-md bg-skybrand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-skybrand-500"
          >
            Enter manually
          </Link>
        </div>
      </div>
    </main>
  );
}

