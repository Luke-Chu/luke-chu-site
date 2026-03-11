import PhotoSearchBar from "@/components/photography/PhotoSearchBar";

type PhotographyHeroProps = {
  initialQuery?: string;
};

export default function PhotographyHero({ initialQuery }: PhotographyHeroProps) {
  return (
    <section className="border-b border-black/10 bg-gradient-to-b from-[#f1f5f9] via-[#f8fafc] to-white">
      <div className="mx-auto w-full max-w-6xl px-6 pb-12 pt-16 md:pb-16 md:pt-20">
        <p className="text-xs font-semibold uppercase tracking-[0.26em] text-black/50">Photography</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-black md:text-5xl">
          Moments in light and shadow
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-black/60 md:text-base">
          Search by title, tags, or filename and explore photos from the API-powered gallery.
        </p>

        <div className="mt-8">
          <PhotoSearchBar initialQuery={initialQuery ?? ""} />
        </div>
      </div>
    </section>
  );
}
