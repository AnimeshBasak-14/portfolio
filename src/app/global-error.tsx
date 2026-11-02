"use client";

import React, { useEffect } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Next.js Global Root Exception Caught]:", error);
  }, [error]);

  return (
    <html lang="en" className="dark">
      <body className="bg-black text-white antialiased flex min-h-screen items-center justify-center p-4">
        <div className="relative mx-auto w-full max-w-md rounded-3xl border border-white/15 bg-[#0B0B0B] p-8 text-center shadow-2xl">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-rose-500/30 bg-rose-500/10 text-rose-400">
            <AlertCircle className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-bold text-white">Animesh Basak Portfolio</h2>
          <p className="mt-2 text-xs text-neutral-400">
            A client-side initialization anomaly occurred. Click below to reload.
          </p>
          <div className="mt-6">
            <button
              type="button"
              onClick={() => reset()}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs font-bold text-black hover:bg-neutral-200 transition-colors"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Reload Application</span>
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
