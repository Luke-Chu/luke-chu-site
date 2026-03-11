import PhotoCard from "@/components/photography/PhotoCard";
import type { PhotoListItem } from "@/types/photo";

type PhotoGridProps = {
  photos: PhotoListItem[];
};

export default function PhotoGrid({ photos }: PhotoGridProps) {
  if (photos.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-black/20 bg-white px-6 py-16 text-center">
        <p className="text-base font-medium">暂无匹配的图片</p>
        <p className="mt-2 text-sm text-black/55">请尝试调整关键词、排序或筛选条件。</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {photos.map((photo) => (
        <PhotoCard key={photo.uuid} photo={photo} />
      ))}
    </div>
  );
}
