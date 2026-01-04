import Link from "next/link";
import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function CardsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const cards = await prisma.card.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Cards</h1>
          <p className="mt-2 text-slate-300">Saved cards for lounge / benefits tracking.</p>
        </div>
        <Link
          href="/cards/new"
          className="rounded-md bg-skybrand-500 px-4 py-2 text-sm font-medium text-white hover:bg-skybrand-400"
        >
          Add card
        </Link>
      </div>

      <div className="mt-8 grid gap-3">
        {cards.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-slate-300">
            No cards yet. Add your first card.
          </div>
        ) : (
          cards.map((c) => (
            <div
              key={c.id}
              className="rounded-xl border border-white/10 bg-white/5 p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-sm text-slate-300">{c.category}</div>
                  <div className="mt-1 text-lg font-semibold">
                    {c.label ?? c.program}
                    {c.last4 ? (
                      <span className="ml-2 text-sm font-normal text-slate-300">
                        •••• {c.last4}
                      </span>
                    ) : null}
                  </div>
                </div>
                <div className="text-sm text-slate-300">Source: {c.source}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}

