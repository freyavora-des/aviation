import Link from "next/link";
import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="mt-2 text-slate-300">
        Signed in as <span className="text-slate-100">{user.email}</span>
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <Link
          href="/cards"
          className="rounded-xl border border-white/10 bg-white/5 p-5 hover:bg-white/10"
        >
          <div className="text-sm text-slate-300">Manage</div>
          <div className="mt-1 text-lg font-semibold">Cards</div>
        </Link>
        <Link
          href="/settings"
          className="rounded-xl border border-white/10 bg-white/5 p-5 hover:bg-white/10"
        >
          <div className="text-sm text-slate-300">Update</div>
          <div className="mt-1 text-lg font-semibold">Settings</div>
        </Link>
        <div className="rounded-xl border border-white/10 bg-white/5 p-5">
          <div className="text-sm text-slate-300">Selected airport</div>
          <div className="mt-1 text-lg font-semibold">
            {user.selectedAirportIata ?? "—"}
          </div>
        </div>
      </div>
    </main>
  );
}

