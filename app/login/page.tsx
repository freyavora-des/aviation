import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="mx-auto max-w-md px-6 py-16">
      <h1 className="text-2xl font-semibold">Log in</h1>
      <p className="mt-2 text-sm text-slate-300">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-skybrand-200 hover:text-white">
          Sign up
        </Link>
      </p>

      <form className="mt-8 space-y-4" action="/api/auth/login" method="post">
        <label className="block">
          <span className="text-sm text-slate-200">Email</span>
          <input
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded-md border border-white/10 bg-black/20 px-3 py-2 text-white outline-none focus:border-skybrand-400"
          />
        </label>
        <label className="block">
          <span className="text-sm text-slate-200">Password</span>
          <input
            name="password"
            type="password"
            required
            className="mt-1 w-full rounded-md border border-white/10 bg-black/20 px-3 py-2 text-white outline-none focus:border-skybrand-400"
          />
        </label>
        <button className="w-full rounded-md bg-skybrand-500 px-4 py-2 font-medium text-white hover:bg-skybrand-400">
          Log in
        </button>
      </form>
    </main>
  );
}

