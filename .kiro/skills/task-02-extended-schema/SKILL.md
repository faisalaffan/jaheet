---
name: task-02-extended-schema
description: "Task 2: Extend Atlas HCL schema with all required tables — workers, BOM, purchases, payments, fiscal periods, bank transactions. Use when modifying database schema."
---

# Task 2: Extended Schema

## Objective
Extend `backend/schema.hcl` with all tables needed for full requirements.

## New Enums
- `payment_method`: cash, transfer, giro, check, other
- `payment_type`: inbound, outbound
- `purchase_status`: draft, confirmed, received, cancelled

## New Tables

### workers
id (uuid PK), name (varchar 255), role (varchar 100 nullable), phone (varchar 50 nullable), created_at, updated_at

### boms
id (uuid PK), product_id (uuid FK products), name (varchar 255), created_at, updated_at

### bom_items
id (uuid PK), bom_id (uuid FK boms CASCADE), material_id (uuid FK materials RESTRICT), qty (numeric 15,4)

### purchases
id (uuid PK), supplier_id (uuid FK suppliers RESTRICT), purchase_number (varchar 50 unique), status (purchase_status default 'draft'), total_amount (numeric 15,2 default 0), notes (text nullable), created_at, updated_at

### purchase_items
id (uuid PK), purchase_id (uuid FK purchases CASCADE), material_id (uuid FK materials RESTRICT), qty (numeric 15,4), unit_price (numeric 15,2), subtotal (numeric 15,2)

### payments
id (uuid PK), payment_type (payment_type enum), order_id (uuid FK orders nullable), purchase_id (uuid FK purchases nullable), amount (numeric 15,2), method (payment_method enum), reference (varchar 255 nullable), notes (text nullable), payment_date (date), created_at

### production_workers
id (uuid PK), production_id (uuid FK productions CASCADE), worker_id (uuid FK workers RESTRICT), assigned_stage (production_status enum)

### fiscal_periods
id (uuid PK), name (varchar 255), start_date (date), end_date (date), is_closed (boolean default false), closed_at (timestamptz nullable), created_at

### bank_transactions
id (uuid PK), transaction_date (date), description (text), amount (numeric 15,2), is_reconciled (boolean default false), journal_entry_id (uuid FK journal_entries nullable), created_at

## Schema Modifications
- Add `is_auto` (boolean default false) column to `journal_entries` table

## Domain Updates
- Add Go structs in `internal/domain/` for all new entities
- Add TypeScript types in `frontend/src/types/index.ts`

## Verification
- `atlas schema apply --env local --dry-run` succeeds
- `go build ./cmd/api` compiles with new domain types
