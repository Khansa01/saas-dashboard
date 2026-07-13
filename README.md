# FinTrack — Finance Analytics Dashboard

A full-stack SaaS dashboard for tracking business revenue, expenses, and transactions.

## Features

- 🔐 Authentication with Google OAuth (NextAuth.js)
- 📊 Revenue vs expenses chart (Recharts)
- 💳 Transaction management (CRUD)
- 📱 Responsive layout with sidebar navigation
- 🗄️ PostgreSQL database with Prisma ORM

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Auth**: NextAuth.js v5
- **Database**: PostgreSQL (Neon) + Prisma ORM
- **Deployment**: Vercel

## Getting Started

1. Clone the repository

```bash
   git clone https://github.com/Khansa01/saas-dashboard.git
   cd saas-dashboard
```

2. Install dependencies

```bash
   npm install
```

3. Setup environment variables

```bash
   cp .env.example .env.local
```

Fill in the values in `.env.local`:

- `DATABASE_URL` — PostgreSQL connection string from [Neon](https://neon.tech)
- `NEXTAUTH_SECRET` — Random string (generate with `openssl rand -base64 32`)
- `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET` — From [Google Cloud Console](https://console.cloud.google.com)

4. Push database schema

```bash
   npx prisma db push
```

5. Run the development server

```bash
   npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Live Demo

[View live demo](https://saas-dashboard-red-one.vercel.app/)

## Screenshots

![Dashboard Overview]
