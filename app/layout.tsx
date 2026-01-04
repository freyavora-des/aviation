import "./globals.css";

import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

import { getCurrentUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Aviation",
  description: "Local development homepage",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentUser();

  return (
    <html lang="en">
      <body className="min-h-dvh bg-gradient-to-b from-white to-skybrand-50 text-slate-900">
        <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <Link href="/" className="text-sm font-extrabold tracking-wide text-slate-900">
              Aviation
              <span className="ml-2 rounded-full bg-skybrand-50 px-2 py-0.5 text-xs font-semibold text-skybrand-700 ring-1 ring-skybrand-200">
                beta
              </span>
            </Link>
            <nav className="flex items-center gap-4 text-sm text-slate-200">
              {user ? (
                <>
                  <Link href="/lounges" className="text-slate-700 hover:text-slate-900">
                    Lounges
                  </Link>
                  <Link href="/dashboard" className="text-slate-700 hover:text-slate-900">
                    Dashboard
                  </Link>
                  <Link href="/cards" className="text-slate-700 hover:text-slate-900">
                    Cards
                  </Link>
                  <Link href="/settings" className="text-slate-700 hover:text-slate-900">
                    Settings
                  </Link>
                  <form action="/api/auth/logout" method="post">
                    <button className="rounded-md border border-slate-200 bg-white px-3 py-1.5 font-semibold text-slate-900 hover:border-skybrand-300">
                      Log out
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <Link href="/login" className="font-semibold text-slate-700 hover:text-slate-900">
                    Log in
                  </Link>
                  <Link
                    href="/signup"
                    className="rounded-md bg-skybrand-600 px-3 py-1.5 font-semibold text-white hover:bg-skybrand-500"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}

