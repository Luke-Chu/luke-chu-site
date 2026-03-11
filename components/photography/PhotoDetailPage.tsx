import Link from "next/link";
import PhotoActionBar from "@/components/photography/PhotoActionBar";
import PhotoImageViewer from "@/components/photography/PhotoImageViewer";
import PhotoMetaPanel from "@/components/photography/PhotoMetaPanel";
import PhotoTagList from "@/components/photography/PhotoTagList";
import type { PhotoDetail } from "@/types/photo";

type PhotoDetailPageProps = {
  photo: PhotoDetail;
};

function isPortraitPhoto(photo: PhotoDetail): boolean {
  if (photo.orientation === "portrait") {
    return true;
  }

  if (photo.orientation === "landscape") {
    return false;
  }

  if (typeof photo.width === "number" && typeof photo.height === "number") {
    return photo.height > photo.width;
  }

  return false;
}

export default function PhotoDetailPage({ photo }: PhotoDetailPageProps) {
  const portraitLayout = isPortraitPhoto(photo);

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-[#fcfcfc] py-6 md:py-10">
      <div className="mx-auto w-full max-w-6xl px-6">
        <Link
          href="/photography"
          className="mb-5 inline-flex h-9 items-center rounded-lg border border-black/20 bg-white px-3 text-sm text-black/75 transition hover:bg-black hover:text-white"
        >
          返回摄影列表
        </Link>

        <div
          className={
            portraitLayout
              ? "flex flex-col gap-6 lg:grid lg:grid-cols-[minmax(0,1.12fr)_minmax(320px,0.88fr)] lg:items-start"
              : "flex flex-col gap-6"
          }
        >
          <PhotoImageViewer photo={photo} />

          <div className="space-y-4">
            <PhotoMetaPanel photo={photo} />
            <PhotoActionBar
              key={photo.uuid}
              photoUuid={photo.uuid}
              likeCount={photo.likeCount}
              viewCount={photo.viewCount}
              downloadCount={photo.downloadCount}
            />
            <section className="rounded-xl border border-black/10 bg-white p-4">
              <h2 className="mb-3 text-sm font-medium text-black/75">标签</h2>
              <PhotoTagList tags={photo.tags} />
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
