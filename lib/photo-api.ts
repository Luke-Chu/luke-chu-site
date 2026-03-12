import { apiGet, apiPost } from "@/lib/api";
import { toPhotoApiQuery } from "@/lib/photo-query";
import type {
  FilterData,
  PhotoDetail,
  PhotoDownloadData,
  PhotoLikeData,
  PhotoListData,
  PhotoListParams,
  PhotoViewData,
} from "@/types/photo";

export async function getPhotos(params: PhotoListParams): Promise<PhotoListData> {
  return apiGet<PhotoListData>("/photos", toPhotoApiQuery(params));
}

function toFilterApiQuery(params?: PhotoListParams): Record<string, string | number> | undefined {
  if (!params) {
    return undefined;
  }

  const query = toPhotoApiQuery(params);
  delete query.page;
  delete query.pageSize;
  delete query.sort;
  delete query.order;
  return query;
}

export async function getFilters(params?: PhotoListParams): Promise<FilterData> {
  return apiGet<FilterData>("/filters", toFilterApiQuery(params));
}

export async function getPhotoDetail(uuid: string): Promise<PhotoDetail> {
  return apiGet<PhotoDetail>(`/photos/${encodeURIComponent(uuid)}`);
}

export async function viewPhoto(uuid: string): Promise<PhotoViewData> {
  return apiPost<PhotoViewData>(`/photos/${encodeURIComponent(uuid)}/view`);
}

export async function likePhoto(uuid: string): Promise<PhotoLikeData> {
  return apiPost<PhotoLikeData>(`/photos/${encodeURIComponent(uuid)}/like`);
}

export async function downloadPhoto(uuid: string): Promise<PhotoDownloadData> {
  return apiPost<PhotoDownloadData>(`/photos/${encodeURIComponent(uuid)}/download`);
}
