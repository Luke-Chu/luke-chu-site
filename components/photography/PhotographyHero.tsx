import PhotoSearchBar from "@/components/photography/PhotoSearchBar";

type PhotographyHeroProps = {
  initialQuery?: string;
};

export default function PhotographyHero({ initialQuery }: PhotographyHeroProps) {
  return (
    <section className="border-b border-black/10 bg-gradient-to-b from-[#f1f5f9] via-[#f8fafc] to-white">
      <div className="mx-auto w-full max-w-6xl px-6 pb-12 pt-16 md:pb-16 md:pt-20">
        <h1 className="text-3xl font-semibold tracking-tight text-black md:text-5xl">光影之间，记录此刻</h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-black/60 md:text-base">
          记录光线、结构与情绪。这里收录的是我在旅行和日常中拍下的片段，它们不是宏大叙事，而是关于当下的微小证据。
        </p>

        <div className="mt-8">
          <PhotoSearchBar initialQuery={initialQuery ?? ""} />
        </div>
      </div>
    </section>
  );
}
