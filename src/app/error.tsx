"use client";

import React, { useEffect } from "react";
import { AlertCircle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error to console for client diagnostics
    console.error("[Next.js App Client-Side Exception Caught]:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-black px-4 text-center selection:bg-white selection:text-black">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute h-[400px] w-[400px] rounded-full bg-cyan-500/[0.04] blur-3xl -z-10" />

      {/* Obsidian Glass Error Card */}
      <div className="relative mx-auto w-full max-w-lg rounded-3xl border border-white/15 bg-[#0B0B0B]/95 p-8 shadow-2xl backdrop-blur-2xl">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-rose-500/30 bg-rose-500/10 text-rose-400 shadow-sm">
          <AlertCircle className="h-7 w-7" />
        </div>

        <span className="font-mono text-xs font-bold text-rose-400 uppercase tracking-widest">
          Application Notice
        </span>

        <h1 className="mt-2 text-2xl font-black text-white sm:text-3xl">
          Temporarily Re-aligning System
        </h1>

        <p className="mt-3 text-sm text-neutral-300 leading-relaxed">
          An unexpected interface exception occurred during page initialization.
          The core portfolio telemetry and records remain intact.
        </p>

        {error.message && (
          <div className="mt-4 rounded-xl border border-white/10 bg-black/60 p-3 font-mono text-xs text-neutral-400 overflow-x-auto text-left">
            <span className="text-neutral-500">$ exception: </span>
            {error.message}
          </div>
        )}

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="group flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-xs font-extrabold text-black transition-all hover:bg-neutral-200 shadow-sm"
          >
            <RefreshCw className="h-4 w-4 text-black transition-transform group-hover:rotate-180" />
            <span>Reload Component</span>
          </button>

          <Link
            href="/"
            onClick={() => window.location.reload()}
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/[0.05] px-6 py-3 text-xs font-bold text-white transition-all hover:bg-white hover:text-black"
          >
            <Home className="h-4 w-4" />
            <span>Return to Top</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
