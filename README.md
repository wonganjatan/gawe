# Gawe

Gawe is a term come from Javanese which is one of the most spoken language in Indonesia. Its a simple project management app where users can create projects, assign members, and track tasks.

# Stack
- Frontend: Vite + React + TypeScript, Tailwind CSS
- Backend: Node.js + Express + TypeScript
- Database: Docker PostgreSQL via Prisma v7 ORM
- Auth: JWT stored in localStorage

# Architecture
N-tier layered architecture style
- Controller: handles HTTP req/res, call the service, and display error to UI
- Service: business logic where validation happen
- Repository: communicte to Prisma

# Setup
## Docker
https://www.docker.com/products/docker-desktop/

## Backend
```
cd backend
npm install
# create .env with  DATABASE_URL, INITIAL_ADMIN_EMAIL, INITIAL_ADMIN_PASSWORD
docker compose up -d
npx prisma migrate dev
npm run dev
```
## Frontend
```
cd frontend
npm install
npm run dev
```