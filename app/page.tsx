export default function HomePage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-glow">
        <p className="text-sm font-medium tracking-wide text-skybrand-200">Aviation</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">Local app UI</h1>
        <p className="mt-4 text-slate-200/90">
          This is a minimal UI scaffold. Use <span className="text-slate-100">Sign up</span>{" "}
          or <span className="text-slate-100">Log in</span> in the top-right to access the
          dashboard and saved cards.
        </p>
      </div>
    </main>
  );
}

