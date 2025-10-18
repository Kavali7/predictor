import { config } from "dotenv";
import { z } from "zod";

config();

const envSchema = z.object({
  NODE_ENV: z.string().default("development"),
  PORT: z.coerce.number().int().positive().default(4000),
  DATABASE_URL: z.string().url().optional(),
  JWT_SECRET: z.string().min(16, "JWT_SECRET doit contenir au moins 16 caract��res.").optional(),
  LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"]).default("info"),
  SHARE_TTL_DAYS: z.coerce.number().int().positive().max(365).default(30),
  PUBLIC_APP_URL: z.string().url().optional(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  // eslint-disable-next-line no-console
  console.error("�?O Variables d'environnement invalides", parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;
