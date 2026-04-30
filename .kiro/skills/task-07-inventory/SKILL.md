---
name: task-07-inventory
description: "Task 7: Inventory and stock management with movements tracking. Use when implementing stock features."
---

# Task 7: Inventory & Stock Management

## Objective
Implement stock viewing and manual stock movements.

## Backend
- Stock repository + service + handler
- Stock auto-created per material/product on first movement
- `GetOrCreateStock(ctx, materialID, productID)` helper
- List stocks with current qty, joined with material/product name
- Manual stock adjustment: create movement (in/out) + update stock qty
- Movement history per stock item

### API
- `GET /api/v1/stock` — List all stocks with material/product name and qty
- `GET /api/v1/stock/{id}/movements` — Movement history for a stock item
- `POST /api/v1/stock/movements` — Manual adjustment (stock_id, movement_type, qty, notes)

### Stock Movement Logic
```
if movement_type == "in":
    stock.qty += movement.qty
if movement_type == "out":
    if stock.qty < movement.qty: return error "insufficient stock"
    stock.qty -= movement.qty
```

## Frontend
- Stock overview page: table with material/product name, current qty, unit
- Click row → movement history dialog/page
- Manual adjustment form: select stock, type (in/out), qty, notes

## Verification
- After purchase receive (Task 6), stock shows correct qty
- Manual adjustment changes qty correctly
- Cannot deduct more than available
- Movement history shows all entries
