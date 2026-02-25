# Taski Full-stack Rewrite (Next.js + Node.js)

این ریپو الان به یک **monorepo** تبدیل شده که شامل این دو اپ است:

- `apps/web`: فرانت‌اند با **Next.js 14**
- `apps/api`: بک‌اند با **Fastify + PostgreSQL**

## Stack نهایی پیشنهادی

- **Frontend:** Next.js (App Router)
- **Backend:** Node.js + Fastify
- **Primary DB:** PostgreSQL
- **Behavior analytics (phase-2):** Redis Queue + ClickHouse (اختیاری)

---

## Quick start

### 1) پیش‌نیازها

- Node.js 20+
- Docker + Docker Compose

### 2) نصب پکیج‌ها

```bash
npm install
```

### 3) اجرای دیتابیس‌ها

```bash
docker compose up -d
```

### 4) تنظیم env

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.local.example apps/web/.env.local
```

### 5) اجرای full-stack

```bash
npm run dev
```

- Web: http://localhost:3000
- API: http://localhost:4000
- Health check: http://localhost:4000/health

---

## API endpoints

### Tasks

- `GET /tasks` → لیست آخرین تسک‌ها
- `POST /tasks` → ساخت تسک جدید

Body:

```json
{
  "title": "Plan Q2 roadmap",
  "description": "Align with product and data teams"
}
```

### Events (User behavior)

- `POST /events/batch` → ثبت batch از رفتار کاربر

Body:

```json
{
  "userId": "u_123",
  "events": [
    {
      "eventName": "task_created",
      "properties": {
        "source": "web"
      }
    }
  ]
}
```

- `GET /analytics/top-events` → top eventها در ۷ روز اخیر

---

## Scripts

```bash
npm run dev        # web + api together
npm run dev:web    # only nextjs
npm run dev:api    # only fastify
npm run build      # build all apps
npm run typecheck  # typecheck all apps
npm run lint       # lint web app
```

---

## Notes for scaling

- ایندکس ترکیبی روی `user_id, event_name, created_at` اضافه شده.
- ثبت eventها به‌صورت batch پیاده‌سازی شده تا فشار API کمتر شود.
- برای scale تحلیلی در آینده می‌توانید pipeline به ClickHouse اضافه کنید.
