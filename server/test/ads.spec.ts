import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import { buildServer } from "../src/server";
import { resetAds, seedAds } from "../src/services/ads";
import type { StoredAd } from "../src/repositories/adsRepository";

const nowIso = new Date().toISOString();
const futureIso = new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString();

function sampleAds(): StoredAd[] {
  return [
    {
      id: "ad-alpha",
      title: "Retraite Bien-être",
      imageUrl: "https://example.com/ads/retraite.jpg",
      destinationUrl: "https://example.com/retraite",
      backgroundColor: "#5b21b6",
      label: "Nouveauté",
      alt: "Retraite bien-être",
      isActive: true,
      weight: 5,
      startsAt: nowIso,
      endsAt: futureIso,
      createdAt: nowIso,
      updatedAt: nowIso,
    },
    {
      id: "ad-beta",
      title: "Masterclass Numérologie",
      imageUrl: "https://example.com/ads/masterclass.jpg",
      destinationUrl: "https://example.com/masterclass",
      backgroundColor: "#0ea5e9",
      label: "Masterclass",
      alt: "Masterclass numérologie",
      isActive: false,
      weight: 3,
      startsAt: nowIso,
      endsAt: futureIso,
      createdAt: nowIso,
      updatedAt: nowIso,
    },
  ];
}

describe("ads endpoints", () => {
  const app = buildServer();

  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    resetAds();
    seedAds(sampleAds());
  });

  it("returns active ads only", async () => {
    const response = await request(app.server).get("/api/ads/active");
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].id).toBe("ad-alpha");
    expect(response.body[0].metrics.impressions).toBe(0);
    expect(response.body[0].metrics.clicks).toBe(0);
  });

  it("creates an advertisement via admin endpoint", async () => {
    const payload = {
      title: "Astro Coaching",
      imageUrl: "https://example.com/ads/astro.jpg",
      destinationUrl: "https://example.com/astro",
      label: "Coaching",
      alt: "Coaching astrologique",
      isActive: true,
      weight: 2,
    };
    const response = await request(app.server).post("/api/ads").send(payload);
    expect(response.status).toBe(201);
    expect(response.body.title).toBe(payload.title);

    const listResponse = await request(app.server).get("/api/ads");
    expect(listResponse.body).toHaveLength(3);
  });

  it("updates and deletes an advertisement", async () => {
    const updateResponse = await request(app.server)
      .patch("/api/ads/ad-alpha")
      .send({ title: "Retraite Bien-être Premium", isActive: false });
    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.title).toContain("Premium");
    expect(updateResponse.body.isActive).toBe(false);

    const deleteResponse = await request(app.server).delete("/api/ads/ad-beta");
    expect(deleteResponse.status).toBe(204);

    const listResponse = await request(app.server).get("/api/ads");
    expect(listResponse.body).toHaveLength(1);
  });

  it("records impressions and clicks", async () => {
    const impression = await request(app.server).post("/api/ads/ad-alpha/impression");
    expect(impression.status).toBe(202);

    const click = await request(app.server).post("/api/ads/ad-alpha/click");
    expect(click.status).toBe(202);

    const listResponse = await request(app.server).get("/api/ads");
    const ad = listResponse.body.find((item: { id: string }) => item.id === "ad-alpha");
    expect(ad.metrics.impressions).toBe(1);
    expect(ad.metrics.clicks).toBe(1);
  });
});
