# React + Supabase Glassmorphic Portfolio

A premium, state-of-the-art developer portfolio website featuring a secure, authenticated admin dashboard for managing showcase projects and viewing contact submissions. Built with Vite-powered React on the frontend and Supabase for the backend infrastructure.

## Tech Stack & Architecture

- **Frontend:** React (Vite, JavaScript), React Router, Lucide Icons, and modern Vanilla CSS (with CSS variables, native nesting, `@starting-style`, and `:user-invalid` validation).
- **Backend:** Supabase (PostgreSQL, Auth, Storage).
- **Security:** Strict Row Level Security (RLS) policies on database tables and Storage buckets.

---

## Directory Structure

```text
portfolio/
├── public/
├── src/
│   ├── components/
│   │   ├── common/       # Button, Input, Modal, Card (Reusable UI)
│   │   ├── layout/       # Navbar, Footer, Sidebar (Shell navigation wrappers)
│   │   └── forms/        # ProjectForm, ContactForm (Submission templates)
│   ├── pages/
│   │   ├── public/       # Home, Projects, Contact, About, Login
│   │   └── admin/        # Dashboard, ManageProjects, ManageMessages, Profile
│   ├── hooks/            # useAuth (Authentication context subscriber)
│   ├── services/         # supabaseClient.js (Supabase client sdk init)
│   ├── context/          # AuthContext.jsx (Authentication state provider)
│   ├── utils/            # validators.js, helpers.js
│   ├── routes/           # AppRoutes.jsx, ProtectedRoute.jsx
│   ├── styles/           # global.css (Tailored design tokens & themes)
│   └── main.jsx
├── .env
├── supabase/
│   └── migrations/       # Database SQL migrations
├── package.json
└── README.md
```

---

## Setup & Installation

### 1. Prerequisites

- **Node.js:** Ensure Node.js (v20+ recommended) is installed on your machine.

### 2. Configure Environment variables

Copy the `.env.example` file to `.env` and fill in your Supabase details:

```bash
cp .env.example .env
```

Provide your own project credentials:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 3. Initialize the Database & Storage Buckets

Log in to your [Supabase Dashboard](https://supabase.com) and go to the **SQL Editor**:

1. Copy the SQL script inside [supabase/migrations/20260612000000_init_schema.sql](file:///c:/Agalya_01/supabase/migrations/20260612000000_init_schema.sql) and paste it into the editor.
2. Run the script to initialize tables (`profiles`, `projects`, `messages`), set up RLS policies, trigger-based profile initialization, and storage buckets.

### 4. Install Dependencies & Launch

```bash
npm install
npm run dev
```

---

## Admin Authentication Details

1. **Sign Up / Admin Creation:** Signups are handled through standard Supabase Auth mechanisms. Once a user register, the database trigger automatically hooks them to a corresponding biography line item in `profiles`.
2. **Dashboard Management:** Navigate to `/login` to sign in. The private console routes permit authenticated administrators to:
   - Create, edit, and delete showcased projects with automated thumbnail screenshot uploads.
   - Read, toggle read/unread indicators, and purge contact form inbox inquiries.
   - Customize administrative biographical listings and update authentication passwords.
