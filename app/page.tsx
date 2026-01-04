export default function HomePage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <div className="rounded-3xl bg-white p-10 shadow-sm ring-1 ring-slate-200">
        <p className="text-sm font-semibold text-skybrand-700">Aviation lounge access</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">
          Scan a card. See your lounges.
        </h1>
        <p className="mt-4 max-w-2xl text-slate-600">
          Add your credit/debit cards or memberships, pick your airport, and instantly see which
          lounges and airport services you can use—by terminal, location, and rules.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="/signup"
            className="rounded-md bg-skybrand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-skybrand-500"
          >
            Get started
          </a>
          <a
            href="/lounges"
            className="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:border-skybrand-300"
          >
            View lounges
          </a>
        </div>
      </div>
    </main>
  );
}

