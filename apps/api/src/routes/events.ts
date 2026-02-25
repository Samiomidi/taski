import { FastifyInstance } from "fastify";
import { z } from "zod";
import { pool } from "../lib/db.js";

const batchSchema = z.object({
  userId: z.string().min(1),
  events: z
    .array(
      z.object({
        eventName: z.string().min(1),
        properties: z.record(z.any()).optional().default({})
      })
    )
    .min(1)
    .max(100)
});

export async function eventRoutes(app: FastifyInstance) {
  app.post("/events/batch", async (request, reply) => {
    const body = batchSchema.parse(request.body);

    const values: string[] = [];
    const args: unknown[] = [];

    body.events.forEach((event, index) => {
      const base = index * 3;
      values.push(`($${base + 1}, $${base + 2}, $${base + 3}::jsonb)`);
      args.push(body.userId, event.eventName, JSON.stringify(event.properties ?? {}));
    });

    await pool.query(
      `INSERT INTO user_events (user_id, event_name, properties)
       VALUES ${values.join(",")}`,
      args
    );

    return reply.code(202).send({ accepted: body.events.length });
  });

  app.get("/analytics/top-events", async () => {
    const { rows } = await pool.query(
      `SELECT event_name, COUNT(*)::int AS total
       FROM user_events
       WHERE created_at > NOW() - INTERVAL '7 days'
       GROUP BY event_name
       ORDER BY total DESC
       LIMIT 20`
    );

    return { range: "7d", events: rows };
  });
}
