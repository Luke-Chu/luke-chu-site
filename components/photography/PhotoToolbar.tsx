"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { mergePhotoSearchParams } from "@/lib/photo-query";
import type {
  CategoryOption,
  FilterData,
  PhotoListParams,
  PhotoSortField,
  PhotoSortOrder,
  YearOption,
} from "@/types/photo";

const SORT_OPTIONS: Array<{ label: string; value: PhotoSortField }> = [
  { label: "拍摄时间", value: "shot_time" },
  { label: "点赞数", value: "like_count" },
  { label: "浏览量", value: "view_count" },
  { label: "下载量", value: "download_count" },
];

const ORDER_OPTIONS: Array<{ label: string; value: PhotoSortOrder }> = [
  { label: "降序", value: "desc" },
  { label: "升序", value: "asc" },
];

function getOrientationLabel(name: string): string {
  if (name === "landscape") {
    return "横向";
  }
  if (name === "portrait") {
    return "纵向";
  }
  if (name === "square") {
    return "方形";
  }
  return name;
}

function parseYearOption(option: YearOption): { value: number } {
  if (typeof option === "number") {
    return { value: option };
  }

  return { value: option.year };
}

function parseCategoryOption(option: CategoryOption): { value: string } {
  if (typeof option === "string") {
    return { value: option };
  }

  return { value: option.name };
}

function ToolbarLabel({ text }: { text: string }) {
  return (
    <span className="inline-flex w-14 shrink-0 justify-between whitespace-nowrap">
      {Array.from(text).map((char, index) => (
        <span key={`${text}-${index}`}>{char}</span>
      ))}
    </span>
  );
}

type PhotoToolbarProps = {
  params: PhotoListParams;
  filters: FilterData | null;
  total: number;
};

export default function PhotoToolbar({ params, filters, total }: PhotoToolbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const currentSearchParams = useSearchParams();

  function pushParams(patch: Partial<PhotoListParams>, resetPage = false) {
    const merged = mergePhotoSearchParams(new URLSearchParams(currentSearchParams.toString()), patch, {
      resetPage,
    });

    const nextQueryString = merged.toString();
    router.push(nextQueryString ? `${pathname}?${nextQueryString}` : pathname);
  }

  return (
    <section className="border-b border-black/10 bg-white">
      <div className="mx-auto w-full max-w-6xl px-6 py-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-sm text-black/60">共 {total} 张</p>

          <div className="grid w-full grid-cols-2 gap-x-4 gap-y-2 lg:w-auto lg:grid-cols-5 lg:gap-x-6">
            <label className="flex items-center gap-1.5 text-xs text-black/60">
              <ToolbarLabel text="排序字段" />
              <select
                value={params.sort}
                onChange={(event) =>
                  pushParams({ sort: event.target.value as PhotoSortField }, true)
                }
                className="h-9 min-w-0 flex-1 rounded-lg border border-black/15 bg-white px-2 text-sm text-black"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex items-center gap-1.5 text-xs text-black/60">
              <ToolbarLabel text="排序方向" />
              <select
                value={params.order}
                onChange={(event) =>
                  pushParams({ order: event.target.value as PhotoSortOrder }, true)
                }
                className="h-9 min-w-0 flex-1 rounded-lg border border-black/15 bg-white px-2 text-sm text-black"
              >
                {ORDER_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex items-center gap-1.5 text-xs text-black/60">
              <ToolbarLabel text="构图方向" />
              <select
                value={params.orientation ?? ""}
                onChange={(event) =>
                  pushParams({ orientation: event.target.value || undefined }, true)
                }
                className="h-9 min-w-0 flex-1 rounded-lg border border-black/15 bg-white px-2 text-sm text-black"
              >
                <option value="">全部</option>
                {filters?.orientations.map((item) => (
                  <option key={item.name} value={item.name}>
                    {getOrientationLabel(item.name)}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex items-center gap-1.5 text-xs text-black/60">
              <ToolbarLabel text="年份" />
              <select
                value={params.year ? String(params.year) : ""}
                onChange={(event) =>
                  pushParams(
                    {
                      year: event.target.value ? Number.parseInt(event.target.value, 10) : undefined,
                    },
                    true,
                  )
                }
                className="h-9 min-w-0 flex-1 rounded-lg border border-black/15 bg-white px-2 text-sm text-black"
              >
                <option value="">全部</option>
                {filters?.years.map((option) => {
                  const yearOption = parseYearOption(option);

                  return (
                    <option key={yearOption.value} value={yearOption.value}>
                      {yearOption.value}
                    </option>
                  );
                })}
              </select>
            </label>

            <label className="flex items-center gap-1.5 text-xs text-black/60">
              <ToolbarLabel text="分类" />
              <select
                value={params.category ?? ""}
                onChange={(event) => pushParams({ category: event.target.value || undefined }, true)}
                className="h-9 min-w-0 flex-1 rounded-lg border border-black/15 bg-white px-2 text-sm text-black"
              >
                <option value="">全部</option>
                {filters?.categories.map((option) => {
                  const categoryOption = parseCategoryOption(option);

                  return (
                    <option key={categoryOption.value} value={categoryOption.value}>
                      {categoryOption.value}
                    </option>
                  );
                })}
              </select>
            </label>
          </div>
        </div>
      </div>
    </section>
  );
}
