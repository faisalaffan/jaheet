# Jaheet — Project Requirements

## Overview

Jaheet adalah aplikasi manajemen bisnis clothing & konveksi dengan modul accounting terintegrasi.

## Tech Stack

- Backend: Go 1.23+, Chi router, pgx (PostgreSQL)
- Frontend: React 19, TypeScript, Vite, Tailwind CSS, shadcn/ui
- Database: PostgreSQL 16
- Migration: Atlas HCL
- Auth: Single user, no auth required

## Architecture

```
Frontend (React + Tailwind + shadcn/ui)
  └── Pages → API Client (Axios + React Query) → Backend API

Backend (Go + Chi)
  └── Handlers → Services (Business Logic) → Repositories (SQL) → PostgreSQL
                    └── Auto-Journal Engine → Repositories
```

### Backend Layers

- `cmd/api/main.go` — Entrypoint, wiring
- `internal/handler/` — HTTP handlers, request/response mapping
- `internal/service/` — Business logic, validation, orchestration
- `internal/repository/` — Interfaces
- `internal/repository/postgres/` — PostgreSQL implementations
- `internal/domain/` — Domain entities (structs, enums)

### Frontend Structure

- `src/lib/api.ts` — Axios client with proxy to backend
- `src/types/` — TypeScript types mirroring backend domain
- `src/pages/` — Page components per module
- `src/components/` — Shared UI components (shadcn/ui based)

## Domain Modules

### 1. Master Data (R5)
- Products, Materials, Customers, Suppliers, Workers — full CRUD

### 2. BOM — Bill of Materials (R7)
- Define materials + quantities needed per product
- BOM belongs to a product, has multiple BOM items (material + qty)

### 3. Orders (R6)
- Order lifecycle: draft → confirmed → in_production → completed → cancelled
- Order has items (product + qty + price)
- Auto-calculate total_amount from items

### 4. Purchases (R9)
- Purchase orders for materials from suppliers
- Lifecycle: draft → confirmed → received → cancelled
- On "received": auto-create stock movements (in)

### 5. Production (R7)
- Created when order is confirmed
- Status tracking: cutting → sewing → finishing → qc → done
- Worker assignment per stage
- On start (cutting): auto-deduct materials from stock via BOM × order qty
- On done: auto-add finished product stock

### 6. Inventory (R8)
- Stock per material and per product
- Stock movements (in/out) with reference tracking
- Auto-created on first movement
- Manual stock adjustments supported

### 7. Payments (R9)
- Inbound (customer → order) and outbound (→ supplier purchase)
- Partial payment supported
- Payment methods: cash, transfer, giro, check, other
- Prevent overpayment (total - sum of payments)

### 8. Accounting — CoA & Journals (R10)
- Chart of Accounts: hierarchical (parent_id), types: asset/liability/equity/revenue/expense
- Manual journal entry with debit/credit validation (total debit = total credit)
- Seed default CoA: Kas, Bank, Piutang Usaha, Persediaan Bahan, Persediaan Barang Jadi, WIP, Hutang Usaha, Modal, Pendapatan, HPP, Beban Operasional

### 9. Accounting — Auto Journal (R11)
- Order confirmed → DR Piutang Usaha, CR Pendapatan
- Payment received (inbound) → DR Kas/Bank, CR Piutang Usaha
- Purchase confirmed → DR Persediaan Bahan, CR Hutang Usaha
- Supplier payment (outbound) → DR Hutang Usaha, CR Kas/Bank
- Production start (material usage) → DR WIP, CR Persediaan Bahan
- Production complete → DR Persediaan Barang Jadi, CR WIP

### 10. Accounting — Ledger (R12)
- General ledger view per account
- Filterable by date range
- Running balance calculation

### 11. Accounting — Period Closing (R13)
- Flexible period: user-defined date range (name, start_date, end_date)
- Close period: locks journals in that range
- Generates closing entries (revenue/expense → retained earnings)

### 12. Accounting — Reports (R14)
- Balance Sheet (as_of date): assets = liabilities + equity
- Income Statement (date range): revenue - expenses = net income
- Cash Flow (date range): cash/bank journal lines categorized by operating/investing/financing

### 13. Accounting — Aging (R15)
- AR Aging: unpaid orders per customer, buckets: current, 1-30d, 31-60d, 61-90d, 90d+
- AP Aging: unpaid purchases per supplier, same buckets

### 14. Accounting — Reconciliation (R16)
- Bank reconciliation: manual input or CSV import of bank transactions, match to journal entries
- Inter-module reconciliation: compare operational balances vs ledger balances (AR, AP, inventory)

### 15. Dashboard
- KPIs: total orders by status, revenue, outstanding AR/AP, low stock alerts
- Recent transactions
