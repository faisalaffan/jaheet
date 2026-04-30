---
name: task-01-foundation
description: "Task 1: Project foundation — Tailwind + shadcn/ui setup & backend service layer scaffold. Use when setting up frontend styling or backend architecture layers."
---

# Task 1: Project Foundation

## Objective
Set up Tailwind CSS + shadcn/ui in frontend, and introduce repository interface + service layer pattern in backend.

## Frontend Setup
- Add `tailwindcss`, `@tailwindcss/vite` to devDependencies
- Init shadcn/ui: `npx shadcn@latest init`
- Refactor `App.tsx` layout: replace inline styles with Tailwind classes + shadcn sidebar
- Remove all inline `style={{}}` from existing components

## Backend Setup
- Create `internal/repository/interfaces.go` with interface per entity
- Create `internal/repository/postgres/` with implementations
- Create `internal/service/` with service structs taking repository interfaces
- Refactor `ProductHandler` to accept `*service.ProductService` instead of `*pgxpool.Pool`
- Update `handler/router.go` to accept `*Services` struct
- Update `cmd/api/main.go` to wire repos → services → handlers

## Verification
- `cd backend && go build ./cmd/api` compiles
- `cd frontend && npm run build` succeeds
- Product CRUD works end-to-end through handler → service → repository
