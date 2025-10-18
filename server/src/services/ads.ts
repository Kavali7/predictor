import { nanoid } from "nanoid";
import { z } from "zod";
import { adsRepository, type StoredAd } from "../repositories/adsRepository";

const MAX_LABEL_LENGTH = 60;
const MAX_ALT_LENGTH = 140;
const HEX_COLOR_REGEX = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;

const datetimeSchema = z
  .string()
  .datetime({ offset: true })
  .or(z.string().datetime({ offset: false }))
  .optional()
  .nullable();

const adBaseSchema = z
  .object({
    title: z.string().min(3).max(120),
    imageUrl: z.string().url(),
    destinationUrl: z.string().url(),
    backgroundColor: z
      .string()
      .regex(HEX_COLOR_REGEX, "Le format de couleur doit être hex (#RRGGBB).")
      .optional(),
    label: z.string().trim().max(MAX_LABEL_LENGTH).optional(),
    alt: z.string().trim().max(MAX_ALT_LENGTH).optional(),
    isActive: z.boolean().optional().default(true),
    weight: z.coerce.number().int().min(0).max(100).optional().default(1),
    startsAt: datetimeSchema,
    endsAt: datetimeSchema,
  })
  .strict()
  .superRefine((value, ctx) => {
    if (value.startsAt && value.endsAt) {
      const start = new Date(value.startsAt);
      const end = new Date(value.endsAt);
      if (end.getTime() <= start.getTime()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["endsAt"],
          message: "La date de fin doit être postérieure à la date de début.",
        });
      }
    }
  });

export const adCreateSchema = adBaseSchema;

export const adUpdateSchema = adBaseSchema.partial().refine((value) => Object.keys(value).length > 0, {
  message: "Le corps de la requête ne peut pas être vide.",
});

export type AdCreateInput = z.infer<typeof adCreateSchema>;
export type AdUpdateInput = z.infer<typeof adUpdateSchema>;

export interface AdResponse {
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
  metrics: {
    impressions: number;
    clicks: number;
  };
}

export function listActiveAds(now = new Date()): AdResponse[] {
  return adsRepository
    .listActive(now)
    .sort((a, b) => b.weight - a.weight || a.title.localeCompare(b.title))
    .map(mapStoredAdToResponse);
}

export function listAllAds(): AdResponse[] {
  return adsRepository
    .listAll()
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .map(mapStoredAdToResponse);
}

export function createAd(input: unknown): AdResponse {
  const parsed = adCreateSchema.parse(input);
  const now = new Date().toISOString();
  const stored: StoredAd = {
    id: nanoid(12),
    title: parsed.title,
    imageUrl: parsed.imageUrl,
    destinationUrl: parsed.destinationUrl,
    backgroundColor: parsed.backgroundColor ?? null,
    label: parsed.label ?? null,
    alt: parsed.alt ?? null,
    isActive: parsed.isActive ?? true,
    weight: parsed.weight ?? 1,
    startsAt: parsed.startsAt ?? null,
    endsAt: parsed.endsAt ?? null,
    createdAt: now,
    updatedAt: now,
  };
  adsRepository.save(stored);
  return mapStoredAdToResponse(stored);
}

export function updateAd(id: string, input: unknown): AdResponse | null {
  const existing = adsRepository.findById(id);
  if (!existing) {
    return null;
  }
  const parsed = adUpdateSchema.parse(input);
  const updated: StoredAd = {
    ...existing,
    ...parsed,
    backgroundColor: parsed.backgroundColor ?? existing.backgroundColor ?? null,
    label: parsed.label ?? existing.label ?? null,
    alt: parsed.alt ?? existing.alt ?? null,
    startsAt: parsed.startsAt ?? existing.startsAt ?? null,
    endsAt: parsed.endsAt ?? existing.endsAt ?? null,
    isActive: parsed.isActive ?? existing.isActive,
    weight: parsed.weight ?? existing.weight,
    updatedAt: new Date().toISOString(),
  };
  adsRepository.save(updated);
  return mapStoredAdToResponse(updated);
}

export function deleteAd(id: string) {
  return adsRepository.delete(id);
}

export function recordImpression(adId: string) {
  return recordEvent(adId, "impression");
}

export function recordClick(adId: string) {
  return recordEvent(adId, "click");
}

function recordEvent(adId: string, type: "impression" | "click") {
  const ad = adsRepository.findById(adId);
  if (!ad) {
    return null;
  }
  adsRepository.recordEvent({
    id: nanoid(15),
    adId,
    type,
    createdAt: new Date().toISOString(),
  });
  return mapStoredAdToResponse(ad);
}

function mapStoredAdToResponse(ad: StoredAd): AdResponse {
  const metrics = adsRepository.getAggregatedMetrics(ad.id);
  return {
    ...ad,
    metrics,
  };
}

export function seedAds(data: StoredAd[]) {
  adsRepository.seed(data);
}

export function resetAds() {
  adsRepository.clearAll();
}
