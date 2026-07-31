# Savora

An AI-powered cooking assistant. Two independent, separately deployable projects:

```
savora/
├── frontend/   Next.js (TypeScript, App Router) + Tailwind + Framer Motion — UI only
└── backend/    Node.js + Express (TypeScript) — recipe generation, business logic, mock data
```

The frontend contains no business logic — it only calls the backend's HTTP API
(`src/lib/api-client.ts`) and renders the result. The backend currently uses
mock services (`backend/src/services/*`) that mimic the shape of a real
OpenAI-backed response; swapping in the real integration later only means
writing a new class that satisfies `RecipeService`/`ImageService` and
pointing each service's `index.ts` at it.

## Running locally

Each project is run independently, in its own terminal:

```bash
cd backend && npm install && npm run dev   # http://localhost:4000
cd frontend && npm install && npm run dev  # http://localhost:3000
```

Copy `backend/.env.example` to `backend/.env` and `frontend/.env.local.example`
to `frontend/.env.local` if you need to override the defaults (backend port,
CORS origin, or the API URL the frontend calls).
