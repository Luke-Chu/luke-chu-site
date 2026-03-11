"use client";

import Link from "next/link";

type PhotographyErrorProps = {
  error: Error;
  reset: () => void;
};

export default function PhotographyError({ error, reset }: PhotographyErrorProps) {
  return (
    <main className="min-h-screen bg-[#fcfcfc] px-6 py-16">
      <section className="mx-auto max-w-3xl rounded-2xl border border-red-200 bg-red-50 p-8">
        <p className="text-sm font-medium text-red-700">Failed to render photography page.</p>
        <p className="mt-3 text-sm text-red-700/90">{error.message || "Unknown error."}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={reset}
            className="h-10 rounded-lg border border-red-300 bg-white px-4 text-sm text-red-700"
          >
            Retry
          </button>

          <Link
            href="/"
            className="inline-flex h-10 items-center rounded-lg border border-red-300 bg-white px-4 text-sm text-red-700"
          >
            Back home
          </Link>
        </div>
      </section>
    </main>
  );
}
