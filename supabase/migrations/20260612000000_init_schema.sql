-- Initialize database schema for React + Supabase Portfolio

-- 1. PROFILES TABLE (linked to auth.users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  updated_at timestamp with time zone,
  full_name text,
  title text,
  bio text,
  avatar_url text,
  skills text[] default '{}'::text[]
);

alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone" on public.profiles
  for select using (true);

create policy "Users can update their own profile" on public.profiles
  for update using (auth.uid() = id);

-- Trigger to automatically create a profile when a new user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, title, bio, skills)
  values (
    new.id, 
    coalesce(new.raw_user_meta_data->>'full_name', 'Admin User'), 
    'Full Stack Developer & Designer', 
    'Hello and welcome to my personal space.', 
    array['React', 'JavaScript', 'CSS', 'Node.js', 'Supabase']
  );
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- 2. PROJECTS TABLE
create table if not exists public.projects (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  description text not null,
  content text,
  image_url text,
  live_url text,
  github_url text,
  tags text[] default '{}'::text[],
  featured boolean default false
);

alter table public.projects enable row level security;

create policy "Projects are viewable by everyone" on public.projects
  for select using (true);

create policy "Only authenticated users can manage projects" on public.projects
  for all using (auth.role() = 'authenticated');


-- 3. MESSAGES TABLE (Contact form)
create table if not exists public.messages (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  email text not null,
  message text not null,
  read boolean default false not null
);

alter table public.messages enable row level security;

create policy "Anyone can send a message" on public.messages
  for insert with check (true);

create policy "Only authenticated users can read/write messages" on public.messages
  for all using (auth.role() = 'authenticated');


-- 4. STORAGE BUCKETS & POLICIES
insert into storage.buckets (id, name, public) values ('project-images', 'project-images', true)
  on conflict (id) do nothing;

create policy "Project images are publicly accessible" on storage.objects
  for select using (bucket_id = 'project-images');

create policy "Only authenticated users can manage project images" on storage.objects
  for all using (bucket_id = 'project-images' and auth.role() = 'authenticated');
