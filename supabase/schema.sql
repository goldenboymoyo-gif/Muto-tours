-- ---------------------------------------------------------------------------
-- Muto Tours — Supabase schema
-- Run this in the Supabase SQL editor for a new project. Kept deliberately
-- simple per the brief: no microservices, no unnecessary tables — just what
-- the contact/booking flow and admin-managed content actually need.
-- ---------------------------------------------------------------------------

-- Enquiries submitted through the site's contact / "Plan Your Trip" form.
create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  email text not null,
  phone text,
  destination_interest text,       -- optional: destination or experience slug they enquired about
  travel_dates text,                -- free text; keep simple for a first version
  party_size text,
  message text not null,
  status text not null default 'new' check (status in ('new', 'contacted', 'closed'))
);

alter table public.contact_submissions enable row level security;

-- Anyone (anon key, i.e. the public website) may INSERT an enquiry, but may
-- not read, update, or delete any row — that keeps other travelers' contact
-- details private while still letting the public form work without a
-- server-side API route.
create policy "Public can submit enquiries"
  on public.contact_submissions for insert
  to anon
  with check (true);

-- ---------------------------------------------------------------------------
-- Optional: move destinations/experiences content from the static data/*.js
-- files into the database once non-technical staff need to edit it directly.
-- The site currently reads from data/destinations.js and data/experiences.js
-- at build time; these tables are provided so that migration is a drop-in
-- swap (same field names) rather than a redesign.
-- ---------------------------------------------------------------------------

create table if not exists public.destinations (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  country text,
  region text,
  tagline text,
  blurb text,
  description text,
  image_url text,
  image_alt text,
  highlights text[],
  sort_order int not null default 0
);

alter table public.destinations enable row level security;
create policy "Public can read destinations"
  on public.destinations for select
  to anon
  using (true);

create table if not exists public.experiences (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  category text,
  name text not null,
  tagline text,
  location text,
  duration text,
  blurb text,
  description text,
  image_url text,
  image_alt text,
  gallery text[],
  highlights text[],
  included text[],
  excluded text[],
  pricing_note text,
  sort_order int not null default 0
);

alter table public.experiences enable row level security;
create policy "Public can read experiences"
  on public.experiences for select
  to anon
  using (true);
