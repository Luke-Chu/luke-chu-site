import type {
  PhotoListParams,
  PhotoSortField,
  PhotoSortOrder,
  PhotoTagMode,
} from "@/types/photo";

type RawSearchParams = URLSearchParams | Record<string, string | string[] | undefined>;

const VALID_SORT_FIELDS = new Set<PhotoSortField>([
  "shot_time",
  "like_count",
  "view_count",
  "download_count",
]);

const VALID_SORT_ORDERS = new Set<PhotoSortOrder>(["asc", "desc"]);

const VALID_TAG_MODES = new Set<PhotoTagMode>(["any", "all"]);

const MAX_PAGE_SIZE = 120;

export const DEFAULT_PHOTO_LIST_PARAMS: Required<
  Pick<PhotoListParams, "page" | "pageSize" | "sort" | "order" | "tagMode">
> = {
  page: 1,
  pageSize: 30,
  sort: "shot_time",
  order: "desc",
  tagMode: "any",
};

function asArray(value: string | string[] | undefined): string[] {
  if (!value) {
    return [];
  }

  if (Array.isArray(value)) {
    return value;
  }

  return [value];
}

function getRawSearchParamMap(raw: RawSearchParams): Record<string, string | string[] | undefined> {
  if (!(raw instanceof URLSearchParams)) {
    return raw;
  }

  const map: Record<string, string | string[] | undefined> = {};

  for (const key of raw.keys()) {
    const values = raw.getAll(key);
    map[key] = values.length > 1 ? values : values[0];
  }

  return map;
}

function parsePositiveInt(value: string | undefined): number | undefined {
  if (!value) {
    return undefined;
  }

  const parsed = Number.parseInt(value, 10);

  if (!Number.isFinite(parsed) || parsed < 1) {
    return undefined;
  }

  return parsed;
}

function sanitizeText(value: string | undefined): string | undefined {
  if (!value) {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function sanitizeTags(value: string | string[] | undefined): string[] {
  const values = asArray(value);

  if (values.length === 0) {
    return [];
  }

  const items = values
    .flatMap((item) => item.split(","))
    .map((item) => item.trim())
    .filter(Boolean);

  return [...new Set(items)];
}

export function normalizePhotoListParams(params: PhotoListParams): PhotoListParams {
  const page = Math.max(params.page ?? DEFAULT_PHOTO_LIST_PARAMS.page, 1);
  const pageSize = Math.min(
    Math.max(params.pageSize ?? DEFAULT_PHOTO_LIST_PARAMS.pageSize, 1),
    MAX_PAGE_SIZE,
  );

  const sort = VALID_SORT_FIELDS.has(params.sort as PhotoSortField)
    ? (params.sort as PhotoSortField)
    : DEFAULT_PHOTO_LIST_PARAMS.sort;

  const order = VALID_SORT_ORDERS.has(params.order as PhotoSortOrder)
    ? (params.order as PhotoSortOrder)
    : DEFAULT_PHOTO_LIST_PARAMS.order;

  const tagMode = VALID_TAG_MODES.has(params.tagMode as PhotoTagMode)
    ? (params.tagMode as PhotoTagMode)
    : DEFAULT_PHOTO_LIST_PARAMS.tagMode;

  const year = params.year && params.year > 0 ? params.year : undefined;
  const month = params.month && params.month >= 1 && params.month <= 12 ? params.month : undefined;

  const tags = sanitizeTags(params.tags);

  return {
    q: sanitizeText(params.q),
    page,
    pageSize,
    sort,
    order,
    tags: tags.length > 0 ? tags : undefined,
    orientation: sanitizeText(params.orientation),
    year,
    month,
    category: sanitizeText(params.category),
    tagMode,
  };
}

export function parsePhotoListParams(raw: RawSearchParams): PhotoListParams {
  const searchParamMap = getRawSearchParamMap(raw);

  const page = parsePositiveInt(asArray(searchParamMap.page)[0]);
  const pageSize = parsePositiveInt(asArray(searchParamMap.pageSize)[0]);
  const year = parsePositiveInt(asArray(searchParamMap.year)[0]);
  const month = parsePositiveInt(asArray(searchParamMap.month)[0]);

  const params: PhotoListParams = {
    q: asArray(searchParamMap.q)[0],
    page,
    pageSize,
    sort: asArray(searchParamMap.sort)[0] as PhotoSortField | undefined,
    order: asArray(searchParamMap.order)[0] as PhotoSortOrder | undefined,
    tags: sanitizeTags(searchParamMap.tags),
    orientation: asArray(searchParamMap.orientation)[0],
    year,
    month,
    category: asArray(searchParamMap.category)[0],
    tagMode: asArray(searchParamMap.tagMode)[0] as PhotoTagMode | undefined,
  };

  return normalizePhotoListParams(params);
}

export function buildPhotoSearchParams(params: PhotoListParams): URLSearchParams {
  const normalized = normalizePhotoListParams(params);
  const searchParams = new URLSearchParams();

  if (normalized.q) {
    searchParams.set("q", normalized.q);
  }

  if (normalized.page && normalized.page !== DEFAULT_PHOTO_LIST_PARAMS.page) {
    searchParams.set("page", String(normalized.page));
  }

  if (normalized.pageSize && normalized.pageSize !== DEFAULT_PHOTO_LIST_PARAMS.pageSize) {
    searchParams.set("pageSize", String(normalized.pageSize));
  }

  if (normalized.sort && normalized.sort !== DEFAULT_PHOTO_LIST_PARAMS.sort) {
    searchParams.set("sort", normalized.sort);
  }

  if (normalized.order && normalized.order !== DEFAULT_PHOTO_LIST_PARAMS.order) {
    searchParams.set("order", normalized.order);
  }

  if (normalized.tags && normalized.tags.length > 0) {
    searchParams.set("tags", normalized.tags.join(","));
  }

  if (normalized.orientation) {
    searchParams.set("orientation", normalized.orientation);
  }

  if (normalized.year) {
    searchParams.set("year", String(normalized.year));
  }

  if (normalized.month) {
    searchParams.set("month", String(normalized.month));
  }

  if (normalized.category) {
    searchParams.set("category", normalized.category);
  }

  if (normalized.tagMode && normalized.tagMode !== DEFAULT_PHOTO_LIST_PARAMS.tagMode) {
    searchParams.set("tagMode", normalized.tagMode);
  }

  return searchParams;
}

export function mergePhotoSearchParams(
  current: URLSearchParams,
  patch: Partial<PhotoListParams>,
  options?: { resetPage?: boolean },
): URLSearchParams {
  const merged = normalizePhotoListParams({
    ...parsePhotoListParams(current),
    ...patch,
  });

  if (options?.resetPage ?? false) {
    merged.page = DEFAULT_PHOTO_LIST_PARAMS.page;
  }

  return buildPhotoSearchParams(merged);
}

export function toPhotoQueryString(params: PhotoListParams): string {
  const query = buildPhotoSearchParams(params).toString();
  return query ? `?${query}` : "";
}

export function toPhotoApiQuery(params: PhotoListParams): Record<string, string | number> {
  const normalized = normalizePhotoListParams(params);

  const query: Record<string, string | number> = {
    page: normalized.page ?? DEFAULT_PHOTO_LIST_PARAMS.page,
    pageSize: normalized.pageSize ?? DEFAULT_PHOTO_LIST_PARAMS.pageSize,
    sort: normalized.sort ?? DEFAULT_PHOTO_LIST_PARAMS.sort,
    order: normalized.order ?? DEFAULT_PHOTO_LIST_PARAMS.order,
    tagMode: normalized.tagMode ?? DEFAULT_PHOTO_LIST_PARAMS.tagMode,
  };

  if (normalized.q) {
    query.q = normalized.q;
  }

  if (normalized.tags && normalized.tags.length > 0) {
    query.tags = normalized.tags.join(",");
  }

  if (normalized.orientation) {
    query.orientation = normalized.orientation;
  }

  if (normalized.year) {
    query.year = normalized.year;
  }

  if (normalized.month) {
    query.month = normalized.month;
  }

  if (normalized.category) {
    query.category = normalized.category;
  }

  return query;
}
