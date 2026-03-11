"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { mergePhotoSearchParams } from "@/lib/photo-query";
import type { PhotoListPagination } from "@/types/photo";

type PhotoPaginationProps = {
  pagination: PhotoListPagination;
};

export default function PhotoPagination({ pagination }: PhotoPaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const currentSearchParams = useSearchParams();

  const page = pagination.page > 0 ? pagination.page : 1;
  const totalPages = pagination.totalPages > 0 ? pagination.totalPages : 1;

  const canGoPrev = page > 1;
  const canGoNext = page < totalPages;

  function goToPage(targetPage: number) {
    const merged = mergePhotoSearchParams(
      new URLSearchParams(currentSearchParams.toString()),
      { page: targetPage },
      { resetPage: false },
    );

    const nextQueryString = merged.toString();
    router.push(nextQueryString ? `${pathname}?${nextQueryString}` : pathname);
  }

  return (
    <div className="mt-6 flex items-center justify-between rounded-xl border border-black/10 bg-white px-4 py-3">
      <button
        type="button"
        onClick={() => goToPage(page - 1)}
        disabled={!canGoPrev}
        className="h-9 rounded-lg border border-black/20 px-3 text-sm disabled:cursor-not-allowed disabled:opacity-40"
      >
        Previous
      </button>

      <p className="text-sm text-black/65">
        Page {page} / {totalPages}
      </p>

      <button
        type="button"
        onClick={() => goToPage(page + 1)}
        disabled={!canGoNext}
        className="h-9 rounded-lg border border-black/20 px-3 text-sm disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}
