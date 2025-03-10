import { z } from "zod"
import "dotenv/config"

const schemaEnv = z.object({
  JWT_SECRET: z.string(),
  PORT: z.coerce.number().default(3333),
})

const _env = schemaEnv.safeParse(process.env)

if (!_env.success) {
  console.log("Error environment not passed", _env.error)

  throw new Error()
}

export const env = _env.data
