import { seedAds, resetAds } from "../src/services/ads";
import type { StoredAd } from "../src/repositories/adsRepository";

const now = new Date();
const future = new Date(now.getTime() + 1000 * 60 * 60 * 24 * 30);

const baseTimestamps = {
  createdAt: now.toISOString(),
  updatedAt: now.toISOString(),
  startsAt: now.toISOString(),
  endsAt: future.toISOString(),
};

const ads: StoredAd[] = [
  {
    id: "seed-astro-weekend",
    title: "Week-end Astro & Bien-être",
    imageUrl: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=80",
    destinationUrl: "https://example.com/weekend-astro",
    backgroundColor: "#5b21b6",
    label: "Expérience",
    alt: "Séjour bien-être astro",
    isActive: true,
    weight: 5,
    ...baseTimestamps,
  },
  {
    id: "seed-masterclass",
    title: "Masterclass Numérologie 2025",
    imageUrl: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1600&q=80",
    destinationUrl: "https://example.com/masterclass-numerologie",
    backgroundColor: "#0ea5e9",
    label: "Formation",
    alt: "Masterclass numérologie",
    isActive: true,
    weight: 4,
    ...baseTimestamps,
  },
  {
    id: "seed-gifting",
    title: "Carte cadeau Lecture de Couple",
    imageUrl: "https://images.unsplash.com/photo-1518895949257-7621c3c786d4?auto=format&fit=crop&w=1600&q=80",
    destinationUrl: "https://example.com/carte-cadeau",
    backgroundColor: "#f97316",
    label: "Cadeau",
    alt: "Carte cadeau couple",
    isActive: true,
    weight: 3,
    ...baseTimestamps,
  },
];

resetAds();
seedAds(ads);

// eslint-disable-next-line no-console
console.log(`✅ ${ads.length} annonces ont été importées avec succès.`);
