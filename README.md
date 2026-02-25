# Great Task Management App

![Vercel](https://vercelbadge.vercel.app/api/Samiomidi/taski)

[![Great Task Management App](taski-screenshot.png?raw=true "Great Task Management App")](https://taski-seven.vercel.app/)

### <a href="https://taski-seven.vercel.app/">LIVE DEMO</a>

## Task Management Pack Description

This application has designed as a React-Typescript app and has the ability to define the Boards and Tasks in an unlimited way with drag and drop capability.

## 1. Make sure you have NODE installed!

Firstly, you will need to download the latest version of Node by <a href="https://nodejs.org/en/download/">CLICKING HERE</a>

## 2. Clone the repo!

Next, you will need to run the following command in the Terminal to clone the repo onto your machine.

`git clone https://github.com/Samiomidi/taski.git`

## 3. Install Dependancies

Next, you need to install all the dependancies using:

`npm install`

## 4.Getting Started

First, run the development server:

```bash
npm run start
# or
yarn start
```

## Copyright

Feel free to use for learning or your portfolio. Don't claim as your own.

---

## پیشنهاد معماری برای بازنویسی (Next.js + Backend)

### 1) آیا Node.js یا Python برای بک‌اند بهتر است؟

برای سناریویی که گفتی (حجم دیتای زیاد، ذخیره رفتار کاربر، سرعت بالا، تحلیل‌پذیری)، در این پروژه **Node.js** انتخاب بهتری است؛ چون:

- با Next.js هم‌خانواده است و توسعه Full-stack یکپارچه‌تر می‌شود.
- برای APIهای real-time و event-driven بسیار مناسب است.
- اکوسیستم کامل برای ابزارهای تحلیلی، صف، و استریم داده دارد.

> اگر بعداً تحلیل‌های ML/AI سنگین خواستی، می‌توانی یک سرویس جداگانه Python (مثلاً FastAPI) کنار Node اضافه کنی، نه اینکه کل بک‌اند را Python کنی.

### 2) معماری پیشنهادی سریع و مقیاس‌پذیر

1. **Frontend + BFF:** Next.js (App Router)
2. **API Layer:** Node.js (NestJS یا Fastify)
3. **Primary DB (دیتای عملیاتی):** PostgreSQL
4. **Cache / Session / Queue:** Redis
5. **Event Tracking:** جدول event در PostgreSQL + صف Redis (BullMQ)
6. **Analytics Layer (اختیاری فاز 2):** ClickHouse برای کوئری‌های تحلیلی سنگین

### 3) دیتابیس پیشنهادی (رایگان + سریع + قابل اعتماد)

اگر یک گزینه بخواهی که همه‌چیز را خوب پوشش بدهد:

- **PostgreSQL** (پیشنهاد اصلی)
  - متن‌باز و رایگان
  - ACID و بسیار قابل اعتماد
  - ایندکس‌گذاری قوی، JSONB برای داده نیمه‌ساخت‌یافته
  - مناسب شروع تا مقیاس متوسط/بالا

برای سرعت بیشتر در خواندن و کنترل فشار:

- **Redis** کنار PostgreSQL
  - کش نتایج پرتکرار
  - نگهداری session/token
  - صف jobها (event processing)

برای تحلیل خیلی سنگین در آینده:

- **ClickHouse** (اختیاری)
  - بسیار سریع برای analytics روی میلیاردها رکورد
  - بهتر است به‌عنوان analytical DB دوم استفاده شود، نه جایگزین DB اصلی

### 4) پیشنهاد اجرایی مرحله‌ای

- **فاز 1 (MVP سریع):** Next.js + Node.js + PostgreSQL + Redis
- **فاز 2 (تحلیل رفتاری):** event pipeline + dashboard تحلیلی
- **فاز 3 (مقیاس بالا):** افزودن ClickHouse و data retention policy

### 5) نکات مهم برای ذخیره رفتار کاربر

- مدل event استاندارد تعریف کن (`user_id`, `event_name`, `timestamp`, `properties`).
- از batching برای ثبت eventها استفاده کن تا API کند نشود.
- حتماً policy حریم خصوصی و retention داشته باش.
- ایندکس درست روی `user_id`, `event_name`, `timestamp` بگذار.

### 6) جمع‌بندی پیشنهادی نهایی

- **Frontend:** Next.js
- **Backend:** Node.js (NestJS/Fastify)
- **DB اصلی:** PostgreSQL
- **Cache/Queue:** Redis
- **Analytics آینده:** ClickHouse (در صورت نیاز)

این ترکیب هم **رایگان/متن‌باز** است، هم سریع، هم برای رشد آینده و تحلیل داده مسیر خوبی می‌دهد.
