import Image from "next/image";
import Link from "next/link";
import { formatAperture, formatIso, formatNullableText, formatShutterSpeed } from "@/lib/format";
import type { PhotoListItem } from "@/types/photo";

type PhotoCardProps = {
  photo: PhotoListItem;
};

export default function PhotoCard({ photo }: PhotoCardProps) {
  const imageUrl = photo.thumbUrl || photo.displayUrl || "";
  const width = photo.width && photo.width > 0 ? photo.width : 4;
  const height = photo.height && photo.height > 0 ? photo.height : 3;
  const title = photo.titleCn || photo.titleEn || "未命名";

  return (
    <Link
      href={`/photography/${photo.uuid}`}
      className="group relative block overflow-hidden rounded-xl bg-black/5"
      aria-label={`打开图片 ${title}`}
    >
      <div className="relative w-full" style={{ aspectRatio: `${width} / ${height}` }}>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-black/10 text-xs text-black/50">
            图片不可用
          </div>
        )}
      </div>

      <div className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-black/85 via-black/15 to-transparent p-3 opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
        <div className="flex w-full items-end justify-between gap-4 text-white">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{title}</p>
            <p className="truncate text-xs text-white/80">{formatNullableText(photo.filename)}</p>
          </div>

          <div className="shrink-0 text-right text-xs text-white/90">
            <p>{formatAperture(photo.aperture)}</p>
            <p>{formatShutterSpeed(photo.shutterSpeed)}</p>
            <p>{formatIso(photo.iso)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
