import fastify, { type FastifyReply, type FastifyRequest } from "fastify";
import cors from "@fastify/cors";
import rateLimit from "@fastify/rate-limit";
import { ZodError } from "zod";
import { env } from "./env";
import { loggerConfig } from "./logger";
import { computeCouple, coupleInputSchema, computePersonal, personalInputSchema } from "./services/numerology";
import {
  createAd,
  deleteAd,
  listActiveAds,
  listAllAds,
  recordClick,
  recordImpression,
  updateAd,
} from "./services/ads";
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

  const adminGuard = async (request: FastifyRequest, reply: FastifyReply) => {
    if (!env.ADMIN_API_TOKEN) {
      return;
    }
    const headerName = "x-admin-token";
    const token = request.headers[headerName] ?? request.headers[headerName.toLowerCase()];
    if (typeof token !== "string" || token !== env.ADMIN_API_TOKEN) {
      reply.status(401).send({ message: "Admin token invalide" });
    }
  };

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

  app.get("/api/ads/active", async () => {
    return listActiveAds();
  });

  app.get(
    "/api/ads",
    {
      preHandler: adminGuard,
    },
    async () => listAllAds(),
  );

  app.post(
    "/api/ads",
    {
      preHandler: adminGuard,
    },
    async (request, reply) => {
      try {
        const ad = createAd(request.body);
        return reply.status(201).send(ad);
      } catch (error) {
        if (error instanceof ZodError) {
          return reply.status(400).send({
            message: "Invalid request body",
            issues: error.issues.map((issue) => ({
              path: issue.path.join("."),
              message: issue.message,
            })),
          });
        }
        request.log.error(error, "Failed to create advertisement");
        return reply.status(500).send({ message: "Failed to create advertisement" });
      }
    },
  );

  app.patch(
    "/api/ads/:id",
    {
      preHandler: adminGuard,
    },
    async (request, reply) => {
      const { id } = request.params as { id?: string };
      if (!id) {
        return reply.status(400).send({ message: "Missing advertisement id" });
      }
      try {
        const updated = updateAd(id, request.body);
        if (!updated) {
          return reply.status(404).send({ message: "Advertisement not found" });
        }
        return reply.status(200).send(updated);
      } catch (error) {
        if (error instanceof ZodError) {
          return reply.status(400).send({
            message: "Invalid request body",
            issues: error.issues.map((issue) => ({
              path: issue.path.join("."),
              message: issue.message,
            })),
          });
        }
        request.log.error(error, "Failed to update advertisement");
        return reply.status(500).send({ message: "Failed to update advertisement" });
      }
    },
  );

  app.delete(
    "/api/ads/:id",
    {
      preHandler: adminGuard,
    },
    async (request, reply) => {
      const { id } = request.params as { id?: string };
      if (!id) {
        return reply.status(400).send({ message: "Missing advertisement id" });
      }
      const deleted = deleteAd(id);
      if (!deleted) {
        return reply.status(404).send({ message: "Advertisement not found" });
      }
      return reply.status(204).send();
    },
  );

  app.post("/api/ads/:id/impression", async (request, reply) => {
    const { id } = request.params as { id?: string };
    if (!id) {
      return reply.status(400).send({ message: "Missing advertisement id" });
    }
    const updated = recordImpression(id);
    if (!updated) {
      return reply.status(404).send({ message: "Advertisement not found" });
    }
    return reply.status(202).send({ message: "Impression recorded" });
  });

  app.post("/api/ads/:id/click", async (request, reply) => {
    const { id } = request.params as { id?: string };
    if (!id) {
      return reply.status(400).send({ message: "Missing advertisement id" });
    }
    const updated = recordClick(id);
    if (!updated) {
      return reply.status(404).send({ message: "Advertisement not found" });
    }
    return reply.status(202).send({ message: "Click recorded" });
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
