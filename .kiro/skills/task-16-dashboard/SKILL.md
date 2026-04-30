---
name: task-16-dashboard
description: "Task 16: Dashboard with KPIs and final end-to-end integration. Use when implementing dashboard or doing final integration."
---

# Task 16: Dashboard & Final Integration

## Objective
Build a dashboard with key metrics and ensure all modules work end-to-end.

## Backend

### Dashboard Endpoint
`GET /api/v1/dashboard`

### Response
```json
{
  "orders": {
    "draft": 5,
    "confirmed": 3,
    "in_production": 2,
    "completed": 10,
    "cancelled": 1
  },
  "revenue": {
    "current_month": 50000000,
    "previous_month": 45000000
  },
  "outstanding": {
    "ar": 15000000,
    "ap": 8000000
  },
  "low_stock_alerts": [
    {"material_name": "Kain Katun", "qty": 5, "unit": "meter"}
  ],
  "recent_transactions": [
    {"type": "order", "description": "ORD-20260430-001", "amount": 5000000, "date": "2026-04-30"}
  ]
}
```

### Queries
- Orders: `SELECT status, COUNT(*) FROM orders GROUP BY status`
- Revenue: sum of completed order amounts in current/previous month
- Outstanding AR: sum of (order.total - paid) for unpaid orders
- Outstanding AP: sum of (purchase.total - paid) for unpaid purchases
- Low stock: stocks where qty < 10 (or configurable threshold)
- Recent: last 10 orders + payments + purchases ordered by created_at

## Frontend
- Dashboard page (home route `/`)
- shadcn/ui Cards for KPIs: order counts, revenue, AR/AP
- Low stock alerts section
- Recent transactions table
- Quick action buttons: New Order, New Purchase, Record Payment

## End-to-End Flow Verification
1. Create customer, supplier, materials, products, workers
2. Define BOM for product
3. Create purchase → confirm → receive (stock increases)
4. Create order → confirm (auto-journal: AR/revenue, production created)
5. Assign workers to production
6. Advance production through stages (stock deducted on start, added on done)
7. Record customer payment (auto-journal: cash/AR)
8. Record supplier payment (auto-journal: AP/cash)
9. View ledger — all entries present
10. Generate reports — Balance Sheet balances, Income Statement shows profit
11. Create fiscal period → close → closing entries generated
12. Dashboard shows correct KPIs
