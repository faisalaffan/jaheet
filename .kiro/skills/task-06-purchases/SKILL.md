---
name: task-06-purchases
description: "Task 6: Purchase management for materials from suppliers with stock integration. Use when implementing purchase features."
---

# Task 6: Purchase Management

## Objective
Implement purchase orders for materials from suppliers.

## Backend
- Purchase repository + service + handler
- Similar pattern to orders but for buying materials
- Auto-generate purchase_number (e.g., PO-YYYYMMDD-NNN)
- Status transitions:
  - draft → confirmed
  - confirmed → received (triggers stock movement IN for each item)
  - draft → cancelled
- On "received": for each purchase_item, find or create stock record for material, create stock_movement (type=in, qty=item.qty, reference=purchase_number)

### API
- `CRUD /api/v1/purchases`
- `POST /api/v1/purchases/{id}/confirm`
- `POST /api/v1/purchases/{id}/receive`
- `POST /api/v1/purchases/{id}/cancel`

## Frontend
- Purchases list page with status badges
- Create form: select supplier, add material item rows (material, qty, unit_price)
- Detail page with status transitions
- Show items with subtotals

## Verification
- Create purchase, confirm, receive
- Verify stock movements created on receive
- Verify stock qty increased
