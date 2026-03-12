import PhotoGrid from "@/components/photography/PhotoGrid";
import PhotoPagination from "@/components/photography/PhotoPagination";
import PhotoToolbar from "@/components/photography/PhotoToolbar";
import PhotographyHero from "@/components/photography/PhotographyHero";
import { getFilters, getPhotos } from "@/lib/photo-api";
import { DEFAULT_PHOTO_LIST_PARAMS, parsePhotoListParams } from "@/lib/photo-query";
import type { FilterData, PhotoListData, PhotoListPagination } from "@/types/photo";

type RawSearchParams = Record<string, string | string[] | undefined>;

type PhotographyPageProps = {
  searchParams?: RawSearchParams | Promise<RawSearchParams>;
};

function getErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
}

async function resolveSearchParams(
  searchParams?: RawSearchParams | Promise<RawSearchParams>,
): Promise<RawSearchParams> {
  if (!searchParams) {
    return {};
  }

  if (typeof (searchParams as Promise<RawSearchParams>).then === "function") {
    return searchParams as Promise<RawSearchParams>;
  }

  return searchParams as RawSearchParams;
}

function buildFallbackPagination(photoPage: number, pageSize: number): PhotoListPagination {
  return {
    page: photoPage,
    pageSize,
    total: 0,
    totalPages: 0,
  };
}

function normalizeOrientationLabel(value: string | null | undefined): string | undefined {
  if (!value) {
    return undefined;
  }

  if (value === "landscape") {
    return "横向";
  }
  if (value === "portrait") {
    return "纵向";
  }
  if (value === "square") {
    return "方形";
  }

  return value;
}

export default async function PhotographyPage({ searchParams }: PhotographyPageProps) {
  const resolvedSearchParams = await resolveSearchParams(searchParams);
  const params = parsePhotoListParams(resolvedSearchParams);

  const [photosResult, filtersResult] = await Promise.allSettled([
    getPhotos(params),
    getFilters(params),
  ]);

  let photoData: PhotoListData | null = null;
  let filterData: FilterData | null = null;
  let photoError: string | null = null;
  let filtersError: string | null = null;

  if (photosResult.status === "fulfilled") {
    photoData = photosResult.value;
  } else {
    photoError = getErrorMessage(photosResult.reason, "加载图片列表失败。");
  }

  if (filtersResult.status === "fulfilled") {
    filterData = filtersResult.value;
  } else {
    filtersError = getErrorMessage(filtersResult.reason, "加载筛选项失败。");
  }

  const selectedOrientation = normalizeOrientationLabel(params.orientation);

  if (photoData && selectedOrientation) {
    const filteredList = photoData.list.filter(
      (photo) => normalizeOrientationLabel(photo.orientation) === selectedOrientation,
    );

    photoData = {
      ...photoData,
      list: filteredList,
      query: {
        ...photoData.query,
        orientation: params.orientation,
      },
    };
  }

  const pagination =
    photoData?.pagination ??
    buildFallbackPagination(
      params.page ?? DEFAULT_PHOTO_LIST_PARAMS.page,
      params.pageSize ?? DEFAULT_PHOTO_LIST_PARAMS.pageSize,
    );

  return (
    <main className="min-h-screen bg-[#fcfcfc]">
      <PhotographyHero initialQuery={params.q ?? ""} />
      <PhotoToolbar params={params} filters={filterData} total={pagination.total} />

      <section className="mx-auto w-full max-w-6xl px-6 py-6 md:py-8">
        {photoError ? (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            图片加载失败：{photoError}
          </div>
        ) : null}

        {filtersError ? (
          <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
            筛选项暂不可用：{filtersError}
          </div>
        ) : null}

        <PhotoGrid photos={photoData?.list ?? []} />
        <PhotoPagination pagination={pagination} />
      </section>
    </main>
  );
}
