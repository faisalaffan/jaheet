---
name: task-05-orders
description: "Task 5: Order management with order items and lifecycle transitions. Use when implementing order features."
---

# Task 5: Order Management

## Objective
Implement order lifecycle — create order with items, confirm, cancel.

## Backend
- Order repository + service + handler
- Create order with items in a DB transaction
- Auto-calculate total_amount = sum(item.qty × item.unit_price)
- Auto-generate order_number (e.g., ORD-YYYYMMDD-NNN)
- Status transitions:
  - draft → confirmed (triggers production creation in Task 8)
  - draft → cancelled
  - Reject invalid transitions

### API
- `GET /api/v1/orders` — List with status filter
- `POST /api/v1/orders` — Create (with items array in body)
- `GET /api/v1/orders/{id}` — Get with items
- `PUT /api/v1/orders/{id}` — Update (only draft)
- `DELETE /api/v1/orders/{id}` — Delete (only draft)
- `POST /api/v1/orders/{id}/confirm` — Confirm order
- `POST /api/v1/orders/{id}/cancel` — Cancel order

## Frontend
- Orders list page with status badges (color-coded)
- Create order form: select customer, add item rows (product, qty, price), auto-calc subtotals
- Order detail page: items table, status, action buttons (confirm/cancel)
- Dynamic item rows: add/remove items in form

## Verification
- Create order with 2 items, verify total
- Confirm order, verify status change
- Cannot confirm already cancelled order
- Cannot edit confirmed order
