import type { ApiResponse } from "@/types/api";

type QueryPrimitive = string | number | boolean;

export type ApiQuery = Record<string, QueryPrimitive | QueryPrimitive[] | null | undefined>;

export class ApiRequestError extends Error {
  status: number;
  code?: number;

  constructor(message: string, status: number, code?: number) {
    super(message);
    this.name = "ApiRequestError";
    this.status = status;
    this.code = code;
  }
}

function getApiBaseUrl(): string {
  if (typeof window !== "undefined") {
    // Client-side requests default to same-origin proxy.
    const clientBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.trim() || "/api/v1";
    return clientBaseUrl.replace(/\/+$/, "");
  }

  const baseUrl = process.env.API_BASE_URL?.trim() || process.env.NEXT_PUBLIC_API_BASE_URL?.trim();

  if (!baseUrl) {
    throw new Error("未配置 API_BASE_URL。服务端请求需要明确后端地址。");
  }

  return baseUrl.replace(/\/+$/, "");
}

function buildQueryString(query?: ApiQuery): string {
  if (!query) {
    return "";
  }

  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === null) {
      continue;
    }

    if (Array.isArray(value)) {
      for (const item of value) {
        searchParams.append(key, String(item));
      }
      continue;
    }

    searchParams.set(key, String(value));
  }

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
}

export function createApiUrl(path: string, query?: ApiQuery): string {
  const normalizedPath = path.replace(/^\/+/, "");
  const baseUrl = getApiBaseUrl();
  const queryString = buildQueryString(query);

  if (/^https?:\/\//i.test(baseUrl)) {
    const url = new URL(normalizedPath, `${baseUrl}/`);
    url.search = queryString ? queryString.slice(1) : "";
    return url.toString();
  }

  const relativeBase = `/${baseUrl.replace(/^\/+|\/+$/g, "")}`;
  return `${relativeBase}/${normalizedPath}${queryString}`;
}

async function parseApiResponse<T>(response: Response): Promise<T> {
  const payload = (await response.json().catch(() => null)) as ApiResponse<T> | null;

  if (!response.ok) {
    const message = payload?.message ?? `请求失败，状态码：${response.status}。`;
    throw new ApiRequestError(message, response.status, payload?.code);
  }

  if (!payload || typeof payload.code !== "number") {
    throw new Error("API 响应数据格式不正确。");
  }

  if (payload.code !== 0) {
    throw new ApiRequestError(
      payload.message || `API 请求失败，错误码：${payload.code}。`,
      response.status,
      payload.code,
    );
  }

  return payload.data;
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

  return parseApiResponse<T>(response);
}

export async function apiPost<T>(path: string, body?: unknown, init?: RequestInit): Promise<T> {
  const url = createApiUrl(path);
  const hasBody = body !== undefined;

  const response = await fetch(url, {
    method: "POST",
    cache: "no-store",
    ...init,
    headers: {
      Accept: "application/json",
      ...(hasBody ? { "Content-Type": "application/json" } : {}),
      ...(init?.headers ?? {}),
    },
    body: hasBody ? JSON.stringify(body) : undefined,
  });

  return parseApiResponse<T>(response);
}
