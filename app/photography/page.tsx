import PhotoGallery from "@/components/PhotoGallery";
import { photos } from "@/data/photos";

export default function PhotographyPage() {
  return (
    <main className="bg-[#fcfcfc]">
      <section className="mx-auto max-w-6xl px-6 pb-14 pt-20">
        <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">摄影作品</h1>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-black/60 md:text-base">
          记录光线、结构与情绪。这里收录的是我在旅行和日常中拍下的片段，它们不是宏大叙事，而是关于当下的微小证据。
        </p>
      </section>

      <section className="border-t border-black/10 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <PhotoGallery photos={photos} />
        </div>
      </section>
    </main>
  );
}
