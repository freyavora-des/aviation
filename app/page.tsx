export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-3xl flex-col gap-6 px-6 py-16">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          Aviation is running
        </h1>
        <p className="text-slate-600">
          Your homepage lives at <code className="font-mono">app/page.tsx</code>.
        </p>
      </header>

      <section className="rounded-2xl border border-slate-200 p-6 shadow-glow">
        <h2 className="text-lg font-medium">Next steps</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
          <li>Edit this file to build your landing page.</li>
          <li>
            Add additional routes as folders:{" "}
            <code className="font-mono">app/dashboard/page.tsx</code>, etc.
          </li>
        </ul>
      </section>
    </main>
  );
}

