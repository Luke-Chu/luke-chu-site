import { apiGet, apiPost } from "@/lib/api";
import { toPhotoApiQuery } from "@/lib/photo-query";
import type {
  FilterData,
  PhotoDetail,
  PhotoListData,
  PhotoListParams,
  PhotoViewData,
} from "@/types/photo";

export async function getPhotos(params: PhotoListParams): Promise<PhotoListData> {
  return apiGet<PhotoListData>("/photos", toPhotoApiQuery(params));
}

export async function getFilters(): Promise<FilterData> {
  return apiGet<FilterData>("/filters");
}

export async function getPhotoDetail(uuid: string): Promise<PhotoDetail> {
  return apiGet<PhotoDetail>(`/photos/${encodeURIComponent(uuid)}`);
}

export async function viewPhoto(uuid: string): Promise<PhotoViewData> {
  return apiPost<PhotoViewData>(`/photos/${encodeURIComponent(uuid)}/view`);
}
