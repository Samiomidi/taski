import { TaskBoard } from "../components/task-board";

export default function HomePage() {
  return (
    <main>
      <h1>Taski: Next.js + Node.js</h1>
      <p>Modern monorepo starter with task APIs + user behavior event collection.</p>
      <TaskBoard />
    </main>
  );
}
