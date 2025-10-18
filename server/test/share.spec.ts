import { afterAll, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import { buildServer } from "../src/server";
import { computeCouple } from "../src/services/numerology";
import { shareRepository } from "../src/repositories/shareRepository";

const partnerA = {
  firstName: "Alice",
  lastName: "Martin",
  date: "1994-07-16",
};

const partnerB = {
  firstName: "Louis",
  lastName: "Bernard",
  date: "1990-03-22",
};

describe("share endpoints", () => {
  const app = buildServer();

  beforeEach(async () => {
    shareRepository.clear();
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("creates a share and returns slug, url and expiration", async () => {
    const results = computeCouple({ partnerA, partnerB });

    const response = await request(app.server)
      .post("/api/share")
      .send({ results, metadata: { channel: "email" } });

    expect(response.status).toBe(201);
    expect(response.body.slug).toMatch(/^[\w-]+$/);
    expect(response.body.url).toContain(response.body.slug);
    expect(new Date(response.body.expiresAt).getTime()).toBeGreaterThan(Date.now());
  });

  it("retrieves an existing share", async () => {
    const results = computeCouple({ partnerA, partnerB });
    const createResponse = await request(app.server)
      .post("/api/share")
      .send({ results, metadata: { channel: "sms" } });

    expect(createResponse.status).toBe(201);

    const response = await request(app.server).get(`/api/share/${createResponse.body.slug}`);
    expect(response.status).toBe(200);
    expect(response.body.slug).toBe(createResponse.body.slug);
    expect(response.body.results.partnerA.number).toBe(results.partnerA.number);
    expect(response.body.metadata.channel).toBe("sms");
  });

  it("returns 410 when the share is expired", async () => {
    const results = computeCouple({ partnerA, partnerB });
    const now = new Date();
    shareRepository.upsert({
      slug: "expired-share",
      payload: results,
      metadata: { channel: "test" },
      shareChannel: "test",
      createdAt: new Date(now.getTime() - 10 * 60 * 1000),
      expiresAt: new Date(now.getTime() - 5 * 60 * 1000),
    });

    const response = await request(app.server).get("/api/share/expired-share");
    expect(response.status).toBe(410);
  });

  it("returns 404 when share does not exist", async () => {
    const response = await request(app.server).get("/api/share/unknown");
    expect(response.status).toBe(404);
  });

  it("rejects invalid share payload", async () => {
    const response = await request(app.server).post("/api/share").send({ foo: "bar" });
    expect(response.status).toBe(400);
  });
});
