import { nanoid } from "nanoid";
import { z } from "zod";
import { env } from "../env";
import { shareRepository, type ShareMetadata, type ShareRecord } from "../repositories/shareRepository";

const reportSchema = z
  .object({
    id: z.string(),
    type: z.string(),
    locale: z.string(),
    number: z.number(),
    version: z.number(),
    updatedAt: z.string(),
  })
  .passthrough();

const personalResultSchema = z.object({
  number: z.number().int(),
  report: reportSchema,
});

const coupleResultSchema = z.object({
  number: z.number().int(),
  report: z
    .object({
      id: z.string(),
      type: z.string(),
      locale: z.string(),
      number: z.number().int(),
    })
    .passthrough(),
});

const numerologyResultsSchema = z.object({
  partnerA: personalResultSchema,
  partnerB: personalResultSchema,
  couple: coupleResultSchema,
  score: z.number().min(0),
});

const shareMetadataSchema = z
  .object({
    channel: z
      .string()
      .trim()
      .min(1)
      .max(64)
      .optional(),
  })
  .catchall(z.unknown())
  .optional();

export const shareCreateSchema = z
  .object({
    results: numerologyResultsSchema,
    metadata: shareMetadataSchema,
  })
  .strict();

export const shareSlugSchema = z.string().trim().regex(/^[a-zA-Z0-9_-]{6,24}$/);

export type ShareCreateInput = z.infer<typeof shareCreateSchema>;

export interface ShareResponse {
  slug: string;
  url: string;
  expiresAt: string;
}

export interface ShareDetailsResponse {
  slug: string;
  results: unknown;
  metadata?: ShareMetadata;
  createdAt: string;
  expiresAt: string;
}

export function createShare(input: ShareCreateInput): ShareResponse {
  const parsed = shareCreateSchema.parse(input);
  const slug = nanoid(12);
  const now = new Date();
  const expiresAt = new Date(now.getTime() + env.SHARE_TTL_DAYS * 24 * 60 * 60 * 1000);

  const record: ShareRecord = {
    slug,
    payload: parsed.results,
    metadata: parsed.metadata ?? undefined,
    shareChannel: parsed.metadata?.channel ?? null,
    createdAt: now,
    expiresAt,
  };

  shareRepository.upsert(record);

  return {
    slug,
    url: buildShareUrl(slug),
    expiresAt: expiresAt.toISOString(),
  };
}

export function getShare(slug: string) {
  const parsedSlug = shareSlugSchema.safeParse(slug);
  if (!parsedSlug.success) {
    return { status: "invalid" as const } as const;
  }

  const record = shareRepository.findBySlug(parsedSlug.data);
  if (!record) {
    return { status: "not_found" as const } as const;
  }

  if (record.expiresAt.getTime() <= Date.now()) {
    shareRepository.delete(record.slug);
    return { status: "expired" as const } as const;
  }

  return {
    status: "ok" as const,
    data: {
      slug: record.slug,
      results: record.payload,
      metadata: record.metadata,
      createdAt: record.createdAt.toISOString(),
      expiresAt: record.expiresAt.toISOString(),
    } satisfies ShareDetailsResponse,
  };
}

function buildShareUrl(slug: string) {
  const baseUrl = env.PUBLIC_APP_URL ?? "http://localhost:5173";
  return `${baseUrl.replace(/\/+$/, "")}/share/${slug}`;
}
