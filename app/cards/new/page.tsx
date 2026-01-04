import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth";

export default async function NewCardPage({
  searchParams,
}: {
  searchParams?: { next?: string };
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const next = typeof searchParams?.next === "string" ? searchParams?.next : undefined;
  const action = next ? `/api/cards?next=${encodeURIComponent(next)}` : "/api/cards";

  return (
    <main className="mx-auto max-w-xl px-6 py-12">
      <h1 className="text-2xl font-semibold">Add card</h1>
      <p className="mt-2 text-slate-300">Store only safe metadata (never full PAN).</p>

      <form className="mt-8 space-y-4" action={action} method="post">
        <label className="block">
          <span className="text-sm text-slate-200">Category</span>
          <select
            name="category"
            required
            className="mt-1 w-full rounded-md border border-white/10 bg-black/20 px-3 py-2 text-white outline-none focus:border-skybrand-400"
            defaultValue="credit"
          >
            <option value="credit">credit</option>
            <option value="debit">debit</option>
            <option value="priority-pass">priority-pass</option>
            <option value="other">other</option>
          </select>
        </label>
        <label className="block">
          <span className="text-sm text-slate-200">Program</span>
          <input
            name="program"
            required
            placeholder="e.g. Amex Platinum"
            className="mt-1 w-full rounded-md border border-white/10 bg-black/20 px-3 py-2 text-white outline-none focus:border-skybrand-400"
          />
        </label>
        <label className="block">
          <span className="text-sm text-slate-200">Label (optional)</span>
          <input
            name="label"
            placeholder="e.g. My travel card"
            className="mt-1 w-full rounded-md border border-white/10 bg-black/20 px-3 py-2 text-white outline-none focus:border-skybrand-400"
          />
        </label>
        <label className="block">
          <span className="text-sm text-slate-200">Last 4 (optional)</span>
          <input
            name="last4"
            inputMode="numeric"
            pattern="[0-9]{4}"
            maxLength={4}
            placeholder="1234"
            className="mt-1 w-full rounded-md border border-white/10 bg-black/20 px-3 py-2 text-white outline-none focus:border-skybrand-400"
          />
        </label>
        <input type="hidden" name="source" value="manual" />
        <button className="w-full rounded-md bg-skybrand-500 px-4 py-2 font-medium text-white hover:bg-skybrand-400">
          Save card
        </button>
      </form>
    </main>
  );
}

