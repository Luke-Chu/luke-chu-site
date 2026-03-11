import type { ApiResponse } from "@/types/api";

type QueryPrimitive = string | number | boolean;

export type ApiQuery = Record<string, QueryPrimitive | QueryPrimitive[] | null | undefined>;

function getApiBaseUrl(): string {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();

  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not configured.");
  }

  return baseUrl.replace(/\/+$/, "");
}

function appendQuery(url: URL, query?: ApiQuery): void {
  if (!query) {
    return;
  }

  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === null) {
      continue;
    }

    if (Array.isArray(value)) {
      for (const item of value) {
        url.searchParams.append(key, String(item));
      }
      continue;
    }

    url.searchParams.set(key, String(value));
  }
}

export function createApiUrl(path: string, query?: ApiQuery): URL {
  const normalizedPath = path.replace(/^\/+/, "");
  const baseUrl = getApiBaseUrl();
  const url = new URL(normalizedPath, `${baseUrl}/`);

  appendQuery(url, query);

  return url;
}

export async function apiGet<T>(path: string, query?: ApiQuery, init?: RequestInit): Promise<T> {
  const url = createApiUrl(path, query);

  const response = await fetch(url, {
    method: "GET",
    cache: "no-store",
    ...init,
    headers: {
      Accept: "application/json",
      ...(init?.headers ?? {}),
    },
  });

  const payload = (await response.json().catch(() => null)) as ApiResponse<T> | null;

  if (!response.ok) {
    const message = payload?.message ?? `Request failed with status ${response.status}.`;
    throw new Error(message);
  }

  if (!payload || typeof payload.code !== "number") {
    throw new Error("Invalid API response payload.");
  }

  if (payload.code !== 0) {
    throw new Error(payload.message || `API request failed with code ${payload.code}.`);
  }

  return payload.data;
}
