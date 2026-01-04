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
      <body className="min-h-dvh bg-slate-950 text-slate-50">
        <header className="border-b border-white/10 bg-black/20">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <Link href="/" className="text-sm font-semibold tracking-wide">
              Aviation
            </Link>
            <nav className="flex items-center gap-4 text-sm text-slate-200">
              {user ? (
                <>
                  <Link href="/dashboard" className="hover:text-white">
                    Dashboard
                  </Link>
                  <Link href="/cards" className="hover:text-white">
                    Cards
                  </Link>
                  <Link href="/settings" className="hover:text-white">
                    Settings
                  </Link>
                  <form action="/api/auth/logout" method="post">
                    <button className="rounded-md border border-white/10 px-3 py-1.5 hover:bg-white/5">
                      Log out
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <Link href="/login" className="hover:text-white">
                    Log in
                  </Link>
                  <Link
                    href="/signup"
                    className="rounded-md bg-skybrand-500 px-3 py-1.5 text-white hover:bg-skybrand-400"
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

