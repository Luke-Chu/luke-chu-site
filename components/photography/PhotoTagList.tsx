import type { PhotoTag } from "@/types/photo";

type PhotoTagListProps = {
  tags: PhotoTag[];
};

export default function PhotoTagList({ tags }: PhotoTagListProps) {
  if (tags.length === 0) {
    return <p className="text-sm text-black/50">暂无标签</p>;
  }

  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li
          key={`${tag.tagType}-${tag.id}`}
          className="rounded-full border border-black/15 bg-black/[0.03] px-3 py-1 text-xs text-black/70"
        >
          {tag.name}
        </li>
      ))}
    </ul>
  );
}
