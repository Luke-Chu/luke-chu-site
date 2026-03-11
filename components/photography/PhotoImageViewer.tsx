import Image from "next/image";
import { getPhotoTitle } from "@/lib/format";
import type { PhotoDetail } from "@/types/photo";

type PhotoImageViewerProps = {
  photo: PhotoDetail;
};

function getAspectRatio(photo: PhotoDetail): string {
  if (typeof photo.width === "number" && typeof photo.height === "number" && photo.width > 0 && photo.height > 0) {
    return `${photo.width} / ${photo.height}`;
  }

  return photo.orientation === "portrait" ? "3 / 4" : "4 / 3";
}

export default function PhotoImageViewer({ photo }: PhotoImageViewerProps) {
  const imageUrl = photo.displayUrl || photo.thumbUrl || "";
  const title = getPhotoTitle(photo.titleCn, photo.titleEn);

  return (
    <div className="overflow-hidden rounded-2xl border border-black/10 bg-black/[0.04]">
      <div className="relative w-full" style={{ aspectRatio: getAspectRatio(photo) }}>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 1024px) 100vw, 68vw"
            priority
            className="object-contain"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-black/50">
            图片资源不可用
          </div>
        )}
      </div>
    </div>
  );
}
