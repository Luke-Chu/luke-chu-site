import Link from "next/link";

type PhotoDetailPageProps = {
  params: { uuid: string } | Promise<{ uuid: string }>;
};

async function resolveParams(
  params: { uuid: string } | Promise<{ uuid: string }>,
): Promise<{ uuid: string }> {
  if (typeof (params as Promise<{ uuid: string }>).then === "function") {
    return params as Promise<{ uuid: string }>;
  }

  return params as { uuid: string };
}

export default async function PhotoDetailPlaceholderPage({ params }: PhotoDetailPageProps) {
  const { uuid } = await resolveParams(params);

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-[#fcfcfc] px-6 py-16">
      <section className="mx-auto max-w-3xl rounded-2xl border border-black/10 bg-white p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-black/50">Photography</p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight">Photo detail page placeholder</h1>
        <p className="mt-4 text-sm text-black/65">This route is ready for phase 2 implementation.</p>

        <div className="mt-6 rounded-lg border border-black/10 bg-black/[0.03] px-4 py-3 text-sm">
          <span className="text-black/50">UUID:</span> {uuid}
        </div>

        <Link
          href="/photography"
          className="mt-6 inline-flex h-10 items-center rounded-lg border border-black/20 px-4 text-sm transition hover:bg-black hover:text-white"
        >
          Back to photography
        </Link>
      </section>
    </main>
  );
}
