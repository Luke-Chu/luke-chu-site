export type PhotoTagType = "subject" | "element" | "mood" | (string & {});

export type PhotoSortField = "shot_time" | "like_count" | "view_count" | "download_count";

export type PhotoSortOrder = "asc" | "desc";

export type PhotoOrientation = "landscape" | "portrait" | "square" | (string & {});

export type PhotoTagMode = "any" | "all";

export type PhotoTag = {
  id: number;
  name: string;
  tagType: PhotoTagType;
};

export type PhotoListItem = {
  id: number;
  uuid: string;
  filename: string;
  titleCn: string | null;
  titleEn: string | null;
  thumbUrl: string | null;
  displayUrl: string | null;
  width: number | null;
  height: number | null;
  orientation: PhotoOrientation | null;
  shotTime: string | null;
  aperture: string | null;
  shutterSpeed: string | null;
  iso: number | null;
  likeCount: number;
  viewCount: number;
  downloadCount: number;
  tags: PhotoTag[];
};

export type PhotoListPagination = {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

export type PhotoListQuery = {
  q?: string;
  keywords?: string[];
  sort?: PhotoSortField;
  order?: PhotoSortOrder;
  tags?: string[];
  tagMode?: PhotoTagMode;
  orientation?: PhotoOrientation;
  year?: number;
  month?: number;
  category?: string;
};

export type PhotoListData = {
  list: PhotoListItem[];
  pagination: PhotoListPagination;
  query: PhotoListQuery;
};

export type OrientationOption = {
  name: PhotoOrientation;
  count: number;
};

export type FilterData = {
  years: number[];
  categories: string[];
  orientations: OrientationOption[];
  tagTypes: PhotoTagType[];
  tags: Record<string, PhotoTag[]>;
};

export type PhotoListParams = {
  q?: string;
  page?: number;
  pageSize?: number;
  sort?: PhotoSortField;
  order?: PhotoSortOrder;
  tags?: string[];
  orientation?: PhotoOrientation;
  year?: number;
  month?: number;
  category?: string;
  tagMode?: PhotoTagMode;
};

export type PhotoDetail = {
  id: number;
  uuid: string;
  filename: string;
  titleCn: string | null;
  titleEn: string | null;
  description: string | null;
  category: string | null;
  shotTime: string | null;
  width: number | null;
  height: number | null;
  resolution: string | null;
  orientation: PhotoOrientation | null;
  cameraModel: string | null;
  lensModel: string | null;
  focalLength: number | null;
  focalLength35mm: number | null;
  aperture: string | null;
  shutterSpeed: string | null;
  iso: number | null;
  exposureCompensation: string | null;
  meteringMode: string | null;
  exposureProgram: string | null;
  whiteBalance: string | null;
  flash: string | null;
  thumbUrl: string | null;
  displayUrl: string | null;
  originalUrl: string | null;
  likeCount: number;
  viewCount: number;
  downloadCount: number;
  createdAt: string | null;
  updatedAt: string | null;
  tags: PhotoTag[];
};

export type PhotoViewData = {
  uuid: string;
  viewCount: number;
};

export type PhotoLikeData = {
  uuid: string;
  liked: boolean;
  likeCount: number;
};
