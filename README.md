# LeadDesk Mini

A lightweight, production-ready lead capture and management application. Built with a React SaaS-style landing page and a live admin dashboard, backed by a Node.js/Express API and a self-contained SQLite database — no external database, no authentication required.

---

## Project Overview

LeadDesk Mini lets visitors submit their details through a polished landing-page form, and lets your team track, search, filter, and update the status of every lead from a real-time admin dashboard.

---

## Features

**Landing Page**
- Responsive navbar, hero, features, "why choose us", contact form, and footer
- Validated lead capture form (name, email, budget, message)
- Toast notifications on success/error

**Admin Dashboard** (`/admin`)
- Live stats cards: Total, New, Contacted, Closed
- Full leads table with search by name/email, filter by budget/status, and sort by latest/oldest
- Inline status dropdown that updates SQLite instantly
- Loading spinner, empty state, and error handling

**Backend**
- REST API built with Express
- SQLite persistence via `better-sqlite3` (zero setup — the `.sqlite` file is created automatically)
- Server-side validation with `express-validator`
- Security middleware: `helmet`, `cors`, `morgan` logging

---

## Tech Stack

**Frontend:** React 19, Vite, Tailwind CSS, React Router, Axios, React Hook Form, React Hot Toast

**Backend:** Node.js, Express.js, SQLite (`better-sqlite3`), express-validator, dotenv, helmet, cors, morgan

---

## Folder Structure

```
leaddesk-mini/
├── frontend/
│   ├── src/
│   │   ├── api/axios.js
│   │   ├── components/
│   │   │   ├── admin/          # StatsCards, LeadsTable, LoadingSpinner, EmptyState
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Features.jsx
│   │   │   ├── WhyChooseUs.jsx
│   │   │   ├── LeadForm.jsx
│   │   │   └── Footer.jsx
│   │   ├── pages/
│   │   │   ├── Landing.jsx
│   │   │   └── Admin.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js
│   ├── vercel.json
│   └── package.json
├── backend/
│   ├── routes/
│   │   ├── leads.js
│   │   └── stats.js
│   ├── db.js
│   ├── server.js
│   ├── render.yaml
│   └── package.json
└── README.md
```

---

## Installation

Clone or unzip the project, then install dependencies for both apps:

```bash
cd backend
npm install

cd ../frontend
npm install
```

---

## Running Locally

**1. Start the backend** (from `backend/`):

```bash
cp .env.example .env
npm run dev
```

The API runs at `http://localhost:5000`. The SQLite database file (`database.sqlite`) and the `Leads` table are created automatically on first run.

**2. Start the frontend** (from `frontend/`, in a separate terminal):

```bash
cp .env.example .env
npm run dev
```

The app runs at `http://localhost:5173`. Visit `/` for the landing page and `/admin` for the dashboard.

---

## API Endpoints

| Method | Endpoint            | Description                          |
|--------|----------------------|---------------------------------------|
| POST   | `/api/leads`          | Create a new lead                     |
| GET    | `/api/leads`          | Get all leads (supports `name`, `email`, `budget`, `status`, `sort` query params) |
| PATCH  | `/api/leads/:id`       | Update a lead's status                |
| GET    | `/api/stats`           | Get lead counts: total, new, contacted, closed |
| GET    | `/api/health`          | Health check                          |

---

## SQLite Database

The database file `backend/database.sqlite` is created automatically the first time the server runs. It contains a single `Leads` table:

```sql
CREATE TABLE Leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  budget TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'New',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

No manual migration or setup step is needed — just run the backend and the schema is created for you.

---

## Deployment

### Backend → Render

1. Push the `backend/` folder to a GitHub repo (or the whole project, with Render's root directory set to `backend`).
2. Create a new **Web Service** on [Render](https://render.com), connect the repo.
3. Render will pick up `render.yaml` automatically, or configure manually:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. Set environment variable `CLIENT_URL` to your deployed frontend URL (e.g. `https://leaddesk-mini.vercel.app`).
5. Note: Render's free tier disks are ephemeral on redeploy — for persistent lead data across deploys, attach a [Render Disk](https://render.com/docs/disks) mounted at the backend directory.

### Frontend → Vercel

1. Push the `frontend/` folder to a GitHub repo (or the whole project, with Vercel's root directory set to `frontend`).
2. Import the repo on [Vercel](https://vercel.com).
3. Framework preset: **Vite**. Build command `npm run build`, output directory `dist` (auto-detected).
4. Add environment variable `VITE_API_URL` set to your deployed backend URL, e.g. `https://leaddesk-mini-backend.onrender.com/api`.
5. Deploy. The included `vercel.json` handles client-side routing for `/admin`.

---

Built for Digital Heroes Training Task — [digitalheroesco.com](https://digitalheroesco.com)
