import Fastify from "fastify";
import cors from "@fastify/cors";
import { ZodError } from "zod";
import { env } from "./lib/env.js";
import { initDatabase, pool } from "./lib/db.js";
import { taskRoutes } from "./routes/tasks.js";
import { eventRoutes } from "./routes/events.js";

const app = Fastify({ logger: true });

await app.register(cors, { origin: env.corsOrigin });

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply.code(400).send({ message: "Validation error", issues: error.issues });
  }

  request.log.error(error);
  return reply.code(500).send({ message: "Internal server error" });
});

app.get("/health", async () => ({ status: "ok" }));
await app.register(taskRoutes);
await app.register(eventRoutes);

async function start() {
  await initDatabase();
  await app.listen({ port: env.port, host: "0.0.0.0" });
}

start().catch(async (error) => {
  app.log.error(error);
  await pool.end();
  process.exit(1);
});
