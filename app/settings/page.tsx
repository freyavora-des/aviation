import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth";

export default async function SettingsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <main className="mx-auto max-w-xl px-6 py-12">
      <h1 className="text-2xl font-semibold">Settings</h1>
      <p className="mt-2 text-slate-300">Basic preferences stored on your profile.</p>

      <form className="mt-8 space-y-4" action="/api/settings/airport" method="post">
        <label className="block">
          <span className="text-sm text-slate-200">Selected airport (IATA)</span>
          <input
            name="iata"
            defaultValue={user.selectedAirportIata ?? ""}
            placeholder="e.g. LAX"
            maxLength={3}
            className="mt-1 w-full uppercase rounded-md border border-white/10 bg-black/20 px-3 py-2 text-white outline-none focus:border-skybrand-400"
          />
        </label>
        <button className="w-full rounded-md bg-skybrand-500 px-4 py-2 font-medium text-white hover:bg-skybrand-400">
          Save
        </button>
      </form>
    </main>
  );
}

