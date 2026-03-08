import PhotoGallery from "@/components/PhotoGallery";
import { photos } from "@/data/photos";

export default function PhotographyPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 pb-24 pt-14">
      <section className="border-b border-[#27272a] pb-10">
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Photography</h1>
        <p className="mt-4 text-sm text-[#a1a1aa] md:text-base">
          A collection of moments captured through my lens.
        </p>
      </section>

      <section className="pt-10">
        <PhotoGallery photos={photos} />
      </section>
    </main>
  );
}
