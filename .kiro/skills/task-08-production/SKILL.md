---
name: task-08-production
description: "Task 8: Production tracking with worker assignment, BOM-based stock deduction, and stage advancement. Use when implementing production features."
---

# Task 8: Production with Worker Assignment & Auto Stock Deduction

## Objective
Implement production tracking with worker assignment per stage and BOM-based auto stock deduction.

## Backend
- Production repository + service + handler
- Production auto-created when order is confirmed (from order service)
- Worker assignment: assign workers to specific stages

### Stage Advancement Logic
When advancing to next stage:
1. `cutting` → `sewing` → `finishing` → `qc` → `done`
2. On first advance (to cutting / production start):
   - Look up BOM for each product in the order
   - For each BOM item: deduct (BOM item qty × order item qty) from material stock
   - Create stock_movements (type=out, reference=production)
   - If insufficient stock for any material → reject with error
   - Set started_at = now()
3. On advance to `done`:
   - For each order item: add product qty to product stock
   - Create stock_movements (type=in, reference=production)
   - Set finished_at = now()
   - Update order status to `completed`

### API
- `GET /api/v1/productions` — List (filterable by status)
- `GET /api/v1/productions/{id}` — Detail with workers, order info
- `POST /api/v1/productions/{id}/advance` — Advance to next stage
- `POST /api/v1/productions/{id}/workers` — Assign worker to stage
- `DELETE /api/v1/productions/{id}/workers/{workerId}` — Remove worker

## Frontend
- Production list page with status filter/badges
- Production detail: current stage indicator, assigned workers per stage, materials consumed
- "Advance" button to move to next stage (with confirmation)
- Worker assignment: select worker + stage, add/remove

## Verification
- Confirm order → production created automatically
- Advance to cutting → materials deducted from stock
- Advance to done → finished goods added to stock, order marked completed
- Worker assignments persisted and displayed
- Insufficient stock → advance rejected with clear error
