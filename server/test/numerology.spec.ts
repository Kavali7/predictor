import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { buildServer } from "../src/server";
import { computeCouple, computePersonal } from "../src/services/numerology";

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

describe("numerology services", () => {
  it("computes personal numerology and returns the related report", () => {
    const result = computePersonal(partnerA);
    expect(result.number).toBe(7);
    expect(result.report.number).toBe(7);
    expect(result.report.id).toBe("individual-7");
  });

  it("computes couple numerology including compatibility score", () => {
    const result = computeCouple({ partnerA, partnerB });

    expect(result.partnerA.number).toBe(7);
    expect(result.partnerB.number).toBe(2);
    expect(result.couple.number).toBe(9);
    expect(result.score).toBe(58);
    expect(result.couple.report.id).toBe("couple-9");
  });
});

describe("numerology endpoints", () => {
  const app = buildServer();

  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("returns personal numerology result", async () => {
    const response = await request(app.server).post("/api/calc/personal").send(partnerA);
    expect(response.status).toBe(200);
    expect(response.body.number).toBe(7);
    expect(response.body.report?.id).toBe("individual-7");
  });

  it("rejects personal numerology requests with invalid payload", async () => {
    const invalidPayload = { ...partnerA, date: "1994-15-99" };
    const response = await request(app.server).post("/api/calc/personal").send(invalidPayload);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid request body");
  });

  it("returns couple numerology result", async () => {
    const response = await request(app.server)
      .post("/api/calc/couple")
      .send({ partnerA, partnerB });

    expect(response.status).toBe(200);
    expect(response.body.partnerA.number).toBe(7);
    expect(response.body.partnerB.number).toBe(2);
    expect(response.body.couple.number).toBe(9);
    expect(response.body.score).toBe(58);
  });
});
