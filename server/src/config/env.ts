import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.coerce.number().int().positive().default(3000),
  MONGO_URI: z.string(),
  JWT_SECRET: z.string(),
  JWT_LIFETIME: z.string(),
});

export const env = envSchema.parse(process.env);
