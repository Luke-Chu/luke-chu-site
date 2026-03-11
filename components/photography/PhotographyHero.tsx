import PhotoSearchBar from "@/components/photography/PhotoSearchBar";

type PhotographyHeroProps = {
  initialQuery?: string;
};

export default function PhotographyHero({ initialQuery }: PhotographyHeroProps) {
  return (
    <section className="border-b border-black/10 bg-gradient-to-b from-[#f1f5f9] via-[#f8fafc] to-white">
      <div className="mx-auto w-full max-w-6xl px-6 pb-12 pt-16 md:pb-16 md:pt-20">
        <p className="text-xs font-semibold uppercase tracking-[0.26em] text-black/50">摄影</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-black md:text-5xl">
          光影之间，记录此刻
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-black/60 md:text-base">
          通过标题、标签或文件名搜索，浏览由 API 实时驱动的摄影图库。
        </p>

        <div className="mt-8">
          <PhotoSearchBar initialQuery={initialQuery ?? ""} />
        </div>
      </div>
    </section>
  );
}
