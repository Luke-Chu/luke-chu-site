export default function PhotographyLoading() {
  return (
    <main className="min-h-screen bg-[#fcfcfc]">
      <section className="border-b border-black/10 bg-gradient-to-b from-[#f1f5f9] via-[#f8fafc] to-white">
        <div className="mx-auto w-full max-w-6xl px-6 pb-12 pt-16 md:pb-16 md:pt-20">
          <div className="h-5 w-28 animate-pulse rounded bg-black/10" />
          <div className="mt-4 h-10 w-64 animate-pulse rounded bg-black/10" />
          <div className="mt-4 h-4 w-full max-w-xl animate-pulse rounded bg-black/10" />
          <div className="mt-8 h-12 w-full animate-pulse rounded-xl bg-black/10" />
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-8">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="aspect-[4/3] animate-pulse rounded-xl bg-black/10" />
          ))}
        </div>
      </section>
    </main>
  );
}
