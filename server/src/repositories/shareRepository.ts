export interface ShareRecord {
  slug: string;
  payload: unknown;
  metadata?: ShareMetadata;
  shareChannel?: string | null;
  createdAt: Date;
  expiresAt: Date;
}

export interface ShareMetadata {
  channel?: string;
  [key: string]: unknown;
}

class InMemoryShareRepository {
  private records = new Map<string, ShareRecord>();

  create(record: ShareRecord) {
    this.records.set(record.slug, this.clone(record));
    return record;
  }

  upsert(record: ShareRecord) {
    this.records.set(record.slug, this.clone(record));
    return record;
  }

  findBySlug(slug: string) {
    const stored = this.records.get(slug);
    if (!stored) return undefined;
    return this.clone(stored);
  }

  delete(slug: string) {
    this.records.delete(slug);
  }

  cleanupExpired(referenceDate = new Date()) {
    for (const record of this.records.values()) {
      if (record.expiresAt.getTime() <= referenceDate.getTime()) {
        this.records.delete(record.slug);
      }
    }
  }

  clear() {
    this.records.clear();
  }

  private clone(record: ShareRecord): ShareRecord {
    const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value)) as T;
    return {
      slug: record.slug,
      payload: clone(record.payload),
      metadata: record.metadata ? clone(record.metadata) : undefined,
      shareChannel: record.shareChannel ?? record.metadata?.channel ?? null,
      createdAt: new Date(record.createdAt),
      expiresAt: new Date(record.expiresAt),
    };
  }
}

export const shareRepository = new InMemoryShareRepository();
