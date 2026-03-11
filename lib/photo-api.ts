import { apiGet } from "@/lib/api";
import { toPhotoApiQuery } from "@/lib/photo-query";
import type { FilterData, PhotoListData, PhotoListParams } from "@/types/photo";

export async function getPhotos(params: PhotoListParams): Promise<PhotoListData> {
  return apiGet<PhotoListData>("/photos", toPhotoApiQuery(params));
}

export async function getFilters(): Promise<FilterData> {
  return apiGet<FilterData>("/filters");
}
