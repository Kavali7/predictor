import fastify from "fastify";
import cors from "fastify-cors";
import rateLimit from "fastify-rate-limit";
import { env } from "./env";
import logger from "./logger";

export function buildServer() {
  const app = fastify({
    logger,
  });

  app.register(cors, {
    origin: true,
  });

  app.register(rateLimit, {
    max: 100,
    timeWindow: "1 minute",
  });

  app.get("/health", async () => ({ status: "ok", timestamp: new Date().toISOString() }));

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
