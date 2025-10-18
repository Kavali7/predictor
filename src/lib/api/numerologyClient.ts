export interface IndividualReport {
  id: string;
  type: string;
  locale: string;
  number: number;
  version: number;
  updatedAt: string;
  title: string;
  summary: string;
  love: string;
  work: string;
  money: string;
  health: string;
  shadow: string;
  overallAdvice: string;
  luckyMonths: string[];
  keywords: string[];
  [key: string]: unknown;
}

export interface CoupleReport {
  id: string;
  type: string;
  locale: string;
  number: number;
  version: number;
  updatedAt: string;
  archetype: string;
  dynamic: string;
  strengths: string[];
  blindspots: string[];
  conflicts: string[];
  rituals: string[];
  advice: string;
  [key: string]: unknown;
}

export interface PersonalNumerologyResponse {
  number: number;
  report: IndividualReport;
}

export interface CoupleNumerologyResponse {
  partnerA: PersonalNumerologyResponse;
  partnerB: PersonalNumerologyResponse;
  couple: {
    number: number;
    report: CoupleReport;
  };
  score: number;
}

export interface ShareMetadata {
  channel?: string;
  [key: string]: unknown;
}

export interface ShareCreateRequest {
  results: CoupleNumerologyResponse;
  metadata?: ShareMetadata;
}

export interface ShareCreateResponse {
  slug: string;
  url: string;
  expiresAt: string;
}

export interface ShareDetailsResponse {
  slug: string;
  results: CoupleNumerologyResponse;
  metadata?: ShareMetadata;
  createdAt: string;
  expiresAt: string;
}

export interface AdvertisementMetrics {
  impressions: number;
  clicks: number;
}

export interface AdvertisementResponse {
  id: string;
  title: string;
  imageUrl: string;
  destinationUrl: string;
  backgroundColor?: string | null;
  label?: string | null;
  alt?: string | null;
  isActive: boolean;
  weight: number;
  startsAt?: string | null;
  endsAt?: string | null;
  createdAt: string;
  updatedAt: string;
  metrics: AdvertisementMetrics;
}

interface RequestOptions {
  signal?: AbortSignal;
}

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000").replace(/\/+$/, "");

export async function fetchPersonalNumerology(
  payload: { firstName: string; lastName: string; date: string },
  options: RequestOptions = {},
) {
  return request<PersonalNumerologyResponse>("/api/calc/personal", {
    method: "POST",
    body: JSON.stringify(payload),
    signal: options.signal,
  });
}

export async function fetchCoupleNumerology(
  partnerA: { firstName: string; lastName: string; date: string },
  partnerB: { firstName: string; lastName: string; date: string },
  options: RequestOptions = {},
) {
  return request<CoupleNumerologyResponse>("/api/calc/couple", {
    method: "POST",
    body: JSON.stringify({ partnerA, partnerB }),
    signal: options.signal,
  });
}

export async function createShareLink(payload: ShareCreateRequest, options: RequestOptions = {}) {
  return request<ShareCreateResponse>("/api/share", {
    method: "POST",
    body: JSON.stringify(payload),
    signal: options.signal,
  });
}

export async function fetchShareDetails(slug: string, options: RequestOptions = {}) {
  return request<ShareDetailsResponse>(`/api/share/${slug}`, {
    method: "GET",
    signal: options.signal,
  });
}

export async function fetchActiveAdvertisements(options: RequestOptions = {}) {
  return request<AdvertisementResponse[]>("/api/ads/active", {
    method: "GET",
    signal: options.signal,
  });
}

export async function logAdvertisementImpression(adId: string, options: RequestOptions = {}) {
  return request<{ message: string }>(`/api/ads/${adId}/impression`, {
    method: "POST",
    signal: options.signal,
  });
}

export async function logAdvertisementClick(adId: string, options: RequestOptions = {}) {
  return request<{ message: string }>(`/api/ads/${adId}/click`, {
    method: "POST",
    signal: options.signal,
  });
}

async function request<T>(path: string, init: RequestInit): Promise<T> {
  const headers = new Headers(init.headers ?? {});
  if (!headers.has("Content-Type") && init.body) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers,
  });

  const text = await response.text();
  const hasBody = text.length > 0;
  const data = hasBody ? safeParseJson(text) : null;

  if (!response.ok) {
    const error = new Error((data as Record<string, unknown>)?.message as string ?? `API request failed (${response.status})`);
    (error as Error & { status?: number; details?: unknown }).status = response.status;
    (error as Error & { status?: number; details?: unknown }).details = data;
    throw error;
  }

  return (data ?? ({} as T)) as T;
}

function safeParseJson(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}
