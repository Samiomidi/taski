import { FastifyInstance } from "fastify";
import { z } from "zod";
import { pool } from "../lib/db.js";

const createTaskSchema = z.object({
  title: z.string().trim().min(1),
  description: z.string().trim().max(1000).optional().nullable()
});

export async function taskRoutes(app: FastifyInstance) {
  app.get("/tasks", async () => {
    const { rows } = await pool.query(
      "SELECT id, title, description, status, created_at FROM tasks ORDER BY created_at DESC LIMIT 100"
    );
    return { tasks: rows };
  });

  app.post("/tasks", async (request, reply) => {
    const body = createTaskSchema.parse(request.body);

    const { rows } = await pool.query(
      `INSERT INTO tasks (title, description)
       VALUES ($1, $2)
       RETURNING id, title, description, status, created_at`,
      [body.title, body.description ?? null]
    );

    return reply.code(201).send({ task: rows[0] });
  });
}
