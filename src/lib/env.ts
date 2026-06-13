import { z } from "zod";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const envSchema = z.object({
  TURSO_DATABASE_URL: z.string().url(),
  TURSO_AUTH_TOKEN: z.string().min(1),
  ADMIN_PASSWORD: z.string().min(8),
  ADMIN_SESSION_SECRET: z.string().min(16),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("❌ Invalid environment variables:", _env.error.format());
  throw new Error("Invalid environment variables");
}

export const env = _env.data;
