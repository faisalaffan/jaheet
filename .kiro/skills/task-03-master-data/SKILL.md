---
name: task-03-master-data-crud
description: "Task 3: Full CRUD for Materials, Customers, Suppliers, Workers — backend handlers/services/repos + frontend shadcn/ui pages. Use when implementing master data modules."
---

# Task 3: Master Data CRUD

## Objective
Implement full CRUD for all master data entities (backend + frontend).

## Backend
For each entity (Material, Customer, Supplier, Worker):
1. Repository interface in `internal/repository/interfaces.go`
2. Postgres implementation in `internal/repository/postgres/{entity}.go`
3. Service in `internal/service/{entity}.go`
4. Handler in `internal/handler/{entity}.go` with Routes() method
5. Mount in `internal/handler/router.go`

### API Endpoints
- `CRUD /api/v1/materials` — name, unit, price
- `CRUD /api/v1/customers` — name, phone, email, address
- `CRUD /api/v1/suppliers` — name, phone, email, address
- `CRUD /api/v1/workers` — name, role, phone

## Frontend
For each entity, create a page in `src/pages/`:
- DataTable with list (shadcn Table component)
- Create/Edit form in Dialog (shadcn Dialog + Input + Button)
- Delete with confirmation
- React Query for data fetching + mutations
- Register route in `App.tsx`

## Verification
- Each entity: create, list, get, update, delete via API
- Frontend pages render and function correctly
