import fs from "node:fs";
import path from "node:path";

export interface StoredAd {
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
}

export interface StoredAdEvent {
  id: string;
  adId: string;
  type: "impression" | "click";
  createdAt: string;
}

const DATA_DIR = path.resolve(__dirname, "..", "..", "data");
const ADS_FILE = path.join(DATA_DIR, "ads.json");
const EVENTS_FILE = path.join(DATA_DIR, "ad-events.json");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(ADS_FILE)) {
    fs.writeFileSync(ADS_FILE, "[]", "utf-8");
  }
  if (!fs.existsSync(EVENTS_FILE)) {
    fs.writeFileSync(EVENTS_FILE, "[]", "utf-8");
  }
}

function loadJsonFile<T>(filePath: string, fallback: T): T {
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch (error) {
    return fallback;
  }
}

function writeJsonFile<T>(filePath: string, payload: T) {
  fs.writeFileSync(filePath, JSON.stringify(payload, null, 2), "utf-8");
}

ensureDataDir();

let adsCache: StoredAd[] = loadJsonFile<StoredAd[]>(ADS_FILE, []);
let eventsCache: StoredAdEvent[] = loadJsonFile<StoredAdEvent[]>(EVENTS_FILE, []);

class AdsRepository {
  listAll() {
    return [...adsCache];
  }

  listActive(now = new Date()) {
    return adsCache.filter((ad) => {
      if (!ad.isActive) return false;
      const startOk = !ad.startsAt || new Date(ad.startsAt).getTime() <= now.getTime();
      const endOk = !ad.endsAt || new Date(ad.endsAt).getTime() >= now.getTime();
      return startOk && endOk;
    });
  }

  findById(id: string) {
    return adsCache.find((ad) => ad.id === id);
  }

  save(ad: StoredAd) {
    const index = adsCache.findIndex((item) => item.id === ad.id);
    if (index >= 0) {
      adsCache[index] = ad;
    } else {
      adsCache.push(ad);
    }
    this.persistAds();
    return ad;
  }

  delete(id: string) {
    const initialLength = adsCache.length;
    adsCache = adsCache.filter((ad) => ad.id !== id);
    if (adsCache.length !== initialLength) {
      this.persistAds();
      return true;
    }
    return false;
  }

  recordEvent(event: StoredAdEvent) {
    eventsCache.push(event);
    this.persistEvents();
  }

  listEventsByAd(adId: string) {
    return eventsCache.filter((event) => event.adId === adId);
  }

  getAggregatedMetrics(adId: string) {
    const events = this.listEventsByAd(adId);
    const impressions = events.filter((event) => event.type === "impression").length;
    const clicks = events.filter((event) => event.type === "click").length;
    return { impressions, clicks };
  }

  seed(ads: StoredAd[]) {
    adsCache = [...ads];
    eventsCache = [];
    this.persistAds();
    this.persistEvents();
  }

  clearAll() {
    adsCache = [];
    eventsCache = [];
    this.persistAds();
    this.persistEvents();
  }

  private persistAds() {
    writeJsonFile(ADS_FILE, adsCache);
  }

  private persistEvents() {
    writeJsonFile(EVENTS_FILE, eventsCache);
  }
}

export const adsRepository = new AdsRepository();
