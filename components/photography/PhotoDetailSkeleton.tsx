export default function PhotoDetailSkeleton() {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-[#fcfcfc] py-6 md:py-10">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="mb-5 h-9 w-28 animate-pulse rounded-lg bg-black/10" />

        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[minmax(0,1.12fr)_minmax(320px,0.88fr)] lg:items-start">
          <div className="aspect-[4/3] animate-pulse rounded-2xl bg-black/10" />

          <div className="space-y-4">
            <div className="rounded-2xl border border-black/10 bg-white p-5 md:p-6">
              <div className="h-8 w-2/3 animate-pulse rounded bg-black/10" />
              <div className="mt-3 h-4 w-full animate-pulse rounded bg-black/10" />
              <div className="mt-2 h-4 w-5/6 animate-pulse rounded bg-black/10" />
              <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {Array.from({ length: 8 }).map((_, idx) => (
                  <div key={idx} className="h-14 animate-pulse rounded bg-black/10" />
                ))}
              </div>
            </div>

            <div className="h-32 animate-pulse rounded-xl border border-black/10 bg-white" />
          </div>
        </div>
      </div>
    </main>
  );
}
