# Jaheet — Clothing & Convection App

Aplikasi manajemen bisnis clothing & konveksi dengan modul accounting.

## Quick Start

### Prerequisites
- Go 1.23+
- Node.js 20+
- PostgreSQL 16 (or Docker)
- [Atlas CLI](https://atlasgo.io/getting-started)

### 1. Start Database
```bash
docker compose up -d
```

### 2. Apply Schema Migration
```bash
cd backend
atlas schema apply --env local
```

### 3. Run Backend
```bash
cd backend
go run ./cmd/api
```

### 4. Run Frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend: http://localhost:5173
Backend API: http://localhost:8080/api/v1

## Project Structure

```
jaheet/
├── backend/
│   ├── cmd/api/main.go          # API entrypoint
│   ├── internal/
│   │   ├── config/              # Environment config
│   │   ├── database/            # DB connection
│   │   ├── domain/              # Domain entities
│   │   └── handler/             # HTTP handlers + router
│   ├── schema.hcl               # Atlas DB schema
│   ├── atlas.hcl                # Atlas config
│   └── Makefile
├── frontend/
│   ├── src/
│   │   ├── lib/api.ts           # Axios client
│   │   ├── types/index.ts       # TypeScript types
│   │   ├── pages/               # Page components
│   │   └── App.tsx              # Root component + routing
│   └── package.json
├── docs/PLANNING.md
└── docker-compose.yml
```
