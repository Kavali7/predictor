import fastify from "fastify";
import cors from "@fastify/cors";
import rateLimit from "@fastify/rate-limit";
import { env } from "./env";
import { loggerConfig } from "./logger";
import { computeCouple, coupleInputSchema, computePersonal, personalInputSchema } from "./services/numerology";
import { createShare, getShare, shareCreateSchema } from "./services/share";

export function buildServer() {
  const app = fastify({
    logger: loggerConfig,
  });

  app.register(cors, {
    origin: true,
  });

  app.register(rateLimit, {
    max: 100,
    timeWindow: "1 minute",
  });

  app.get("/health", async () => ({ status: "ok", timestamp: new Date().toISOString() }));

  app.post("/api/calc/personal", async (request, reply) => {
    const parsed = personalInputSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.status(400).send({
        message: "Invalid request body",
        issues: parsed.error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      });
    }

    try {
      const result = computePersonal(parsed.data);
      return reply.status(200).send(result);
    } catch (error) {
      request.log.error(error, "Failed to compute personal numerology");
      return reply.status(500).send({ message: "Failed to compute personal numerology" });
    }
  });

  app.post("/api/calc/couple", async (request, reply) => {
    const parsed = coupleInputSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.status(400).send({
        message: "Invalid request body",
        issues: parsed.error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      });
    }

    try {
      const result = computeCouple(parsed.data);
      return reply.status(200).send(result);
    } catch (error) {
      request.log.error(error, "Failed to compute couple numerology");
      return reply.status(500).send({ message: "Failed to compute couple numerology" });
    }
  });

  app.post("/api/share", async (request, reply) => {
    const parsed = shareCreateSchema.safeParse(request.body);
    if (!parsed.success) {
      return reply.status(400).send({
        message: "Invalid request body",
        issues: parsed.error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      });
    }

    try {
      const result = createShare(parsed.data);
      return reply.status(201).send(result);
    } catch (error) {
      request.log.error(error, "Failed to create share");
      return reply.status(500).send({ message: "Failed to create share" });
    }
  });

  app.get("/api/share/:slug", async (request, reply) => {
    const { slug } = request.params as { slug?: string };
    if (!slug) {
      return reply.status(400).send({ message: "Missing slug parameter" });
    }

    const result = getShare(slug);

    if (result.status === "invalid") {
      return reply.status(400).send({ message: "Invalid slug format" });
    }

    if (result.status === "not_found") {
      return reply.status(404).send({ message: "Share not found" });
    }

    if (result.status === "expired") {
      return reply.status(410).send({ message: "Share expired" });
    }

    return reply.status(200).send(result.data);
  });

  return app;
}

export async function start() {
  const app = buildServer();
  try {
    await app.listen({ port: env.PORT, host: "0.0.0.0" });
    app.log.info(`Server listening on port ${env.PORT}`);
  } catch (error) {
    app.log.error(error, "Failed to start server");
    process.exit(1);
  }
}

if (require.main === module) {
  start();
}
