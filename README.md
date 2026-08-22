# Lost and Found Portal

A centralized web platform engineered to streamline the reporting, tracking, and recovery of misplaced property across institutions and communities.

---

## Overview

The Lost and Found Portal eliminates decentralized communication channels by providing a single, structured system for logging lost items and cataloging found belongings. The platform incorporates category-based filtering, direct contact mechanisms, and status lifecycle tracking to facilitate efficient item retrieval.

---

## Key Features

- Structured Ingestion: Standardized input forms for logging both lost and found entries with metadata including category, location, timestamp, and description.
- Media Attachments: Secure upload and rendering of item photographs to assist with visual identification.
- Query and Filter Engine: Filter listings by status (Lost, Found, Claimed), item category, location, and date.
- Authentication and Authorization: Session handling and user profile management integrated with PostgreSQL Row-Level Security (RLS).
- Status Management: Lifecycle tracking allowing users to transition items from Open to Claimed or Resolved upon recovery.
- Responsive Interface: Layout optimized for standard desktop, tablet, and mobile displays.

---

## Technology Stack

| Layer | Technology |
| :--- | :--- |
| Frontend Framework | React 18, Vite |
| Language | TypeScript |
| Styling and Primitives | Tailwind CSS, Radix UI (shadcn/ui) |
| Database and Auth | Supabase (PostgreSQL) |
| File Storage | Supabase Storage Buckets |
| Hosting | Vercel |

---

## Project Structure

```text
LostFound/
├── public/                 # Static assets and media
├── src/
│   ├── components/         # Reusable user interface components
│   ├── hooks/              # Custom application hooks
│   ├── lib/                # Configuration clients and utility helpers
│   ├── pages/              # View routes and page layouts
│   ├── services/           # Supabase client queries and mutation handlers
│   ├── types/              # Type definitions and interfaces
│   ├── App.tsx             # Root routing and context providers
│   └── main.tsx            # Application entry point
├── supabase/               # SQL schema definitions and migrations
├── tailwind.config.ts      # Tailwind CSS configuration
├── vite.config.ts          # Vite build configuration
└── package.json            # Project dependencies and script definitions


```

---

## Getting Started

### Prerequisites

Ensure the following tools are available locally:

* Node.js (version 18.0.0 or higher)
* npm, yarn, or bun package manager
* Configured Supabase project instance

### Installation

1. Clone the repository:
```bash
git clone https://github.com/singhriya2111/LostFound.git
cd LostFound

```


2. Install dependencies:
```bash
npm install

```


3. Configure environment variables:
Create a `.env.local` file in the project root:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

```


4. Start the development server:
```bash
npm run dev

```



---

## Database Schema

```sql
create table public.items (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  description text,
  category text not null,
  type text check (type in ('lost', 'found')) not null,
  location text not null,
  date_occurred date not null,
  image_url text,
  contact_info text not null,
  status text default 'open' check (status in ('open', 'claimed', 'resolved')),
  user_id uuid references auth.users(id) on delete cascade
);

alter table public.items enable row level security;

create policy "Allow public read access"
  on public.items for select
  using (true);

create policy "Allow authenticated users to insert"
  on public.items for insert
  with check (auth.uid() = user_id);

```

---

## Available Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Launches the local development server |
| `npm run build` | Compiles TypeScript and builds production assets |
| `npm run lint` | Runs ESLint to identify code quality and style issues |
| `npm run preview` | Runs a local server to preview the production build |

---

