"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { mergePhotoSearchParams } from "@/lib/photo-query";
import type { FilterData, PhotoListParams, PhotoSortField, PhotoSortOrder } from "@/types/photo";

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

          <div className="grid w-full grid-cols-2 gap-2 md:grid-cols-3 lg:w-auto lg:grid-cols-5">
            <label className="flex flex-col gap-1 text-xs text-black/60">
              <span>排序字段</span>
              <select
                value={params.sort}
                onChange={(event) =>
                  pushParams({ sort: event.target.value as PhotoSortField }, true)
                }
                className="h-9 w-full rounded-lg border border-black/15 bg-white px-2 text-sm text-black"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1 text-xs text-black/60">
              <span>排序方向</span>
              <select
                value={params.order}
                onChange={(event) =>
                  pushParams({ order: event.target.value as PhotoSortOrder }, true)
                }
                className="h-9 w-full rounded-lg border border-black/15 bg-white px-2 text-sm text-black"
              >
                {ORDER_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1 text-xs text-black/60">
              <span>构图方向</span>
              <select
                value={params.orientation ?? ""}
                onChange={(event) =>
                  pushParams({ orientation: event.target.value || undefined }, true)
                }
                className="h-9 w-full rounded-lg border border-black/15 bg-white px-2 text-sm text-black"
              >
                <option value="">全部</option>
                {filters?.orientations.map((item) => (
                  <option key={item.name} value={item.name}>
                    {item.name} ({item.count})
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1 text-xs text-black/60">
              <span>年份</span>
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
                className="h-9 w-full rounded-lg border border-black/15 bg-white px-2 text-sm text-black"
              >
                <option value="">全部</option>
                {filters?.years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1 text-xs text-black/60">
              <span>分类</span>
              <select
                value={params.category ?? ""}
                onChange={(event) => pushParams({ category: event.target.value || undefined }, true)}
                className="h-9 w-full rounded-lg border border-black/15 bg-white px-2 text-sm text-black"
              >
                <option value="">全部</option>
                {filters?.categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </div>
    </section>
  );
}
