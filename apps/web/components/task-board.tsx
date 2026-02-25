"use client";

import { FormEvent, useMemo, useState } from "react";

type Task = {
  id: number;
  title: string;
  description: string | null;
  status: "todo" | "doing" | "done";
  created_at: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const grouped = useMemo(
    () => ({
      todo: tasks.filter((task) => task.status === "todo"),
      doing: tasks.filter((task) => task.status === "doing"),
      done: tasks.filter((task) => task.status === "done")
    }),
    [tasks]
  );

  async function loadTasks() {
    const response = await fetch(`${API_URL}/tasks`, { cache: "no-store" });
    const json = await response.json();
    setTasks(json.tasks);
  }

  async function onCreateTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim()) return;
    setLoading(true);

    await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ title, description })
    });

    await fetch(`${API_URL}/events/batch`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        userId: "demo-user",
        events: [
          {
            eventName: "task_created",
            properties: { source: "nextjs_form" }
          }
        ]
      })
    });

    setTitle("");
    setDescription("");
    await loadTasks();
    setLoading(false);
  }

  return (
    <>
      <div className="card">
        <h2>Quick start</h2>
        <p>
          This is the rewritten Next.js frontend. Connect it to Fastify API on port 4000 and data will
          be persisted in PostgreSQL.
        </p>
        <button onClick={loadTasks}>Load tasks from API</button>
      </div>

      <form className="card" onSubmit={onCreateTask}>
        <h3>Create task</h3>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task title" />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task description"
        />
        <button disabled={loading}>{loading ? "Saving..." : "Create + track event"}</button>
      </form>

      <div className="card">
        <h3>Task snapshot</h3>
        <small>todo: {grouped.todo.length} · doing: {grouped.doing.length} · done: {grouped.done.length}</small>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <strong>{task.title}</strong> ({task.status})
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
