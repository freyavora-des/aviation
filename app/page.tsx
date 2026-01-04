export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-4xl flex-col justify-center px-6 py-16">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-glow">
        <p className="text-sm font-medium tracking-wide text-skybrand-200">
          Next.js local hosting is working
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">
          Aviation app
        </h1>
        <p className="mt-4 text-slate-200/90">
          This repository was missing an <code className="text-slate-100">app/</code>{" "}
          router entrypoint. You can now run <code className="text-slate-100">npm run dev</code>{" "}
          and open <code className="text-slate-100">http://localhost:3000</code>.
        </p>
      </div>
    </main>
  );
}

