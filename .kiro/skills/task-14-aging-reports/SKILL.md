---
name: task-14-aging-reports
description: "Task 14: AR and AP Aging reports grouped by age buckets. Use when implementing aging report features."
---

# Task 14: AR/AP Aging Reports

## Objective
Implement Accounts Receivable and Accounts Payable aging reports.

## Backend

### AR Aging (as_of date)
For each customer with unpaid orders:
```sql
SELECT c.id, c.name,
       o.id as order_id, o.order_number, o.created_at,
       o.total_amount,
       COALESCE(SUM(p.amount), 0) as paid_amount
FROM orders o
JOIN customers c ON c.id = o.customer_id
LEFT JOIN payments p ON p.order_id = o.id
WHERE o.status IN ('confirmed', 'in_production', 'completed')
GROUP BY c.id, c.name, o.id
HAVING o.total_amount > COALESCE(SUM(p.amount), 0)
```
Then in application, calculate age = as_of - order.created_at and bucket:
- Current (0-30 days)
- 31-60 days
- 61-90 days
- 90+ days

### AP Aging (as_of date)
Same pattern for suppliers with unpaid purchases.

### API
- `GET /api/v1/accounting/reports/ar-aging?as_of=2026-04-30`
- `GET /api/v1/accounting/reports/ap-aging?as_of=2026-04-30`

### Response Format
```json
{
  "as_of": "2026-04-30",
  "entries": [
    {
      "entity_id": "uuid",
      "entity_name": "Customer A",
      "current": 5000000,
      "days_30": 2000000,
      "days_60": 0,
      "days_90": 1000000,
      "total": 8000000
    }
  ],
  "totals": { "current": 5000000, "days_30": 2000000, ... }
}
```

## Frontend
- AR Aging page: table with customer rows, columns per bucket, totals row
- AP Aging page: same for suppliers
- Color coding: current (normal), 31-60 (yellow), 61-90 (orange), 90+ (red)
- Date picker for as_of date
- Summary cards at top: total outstanding, overdue amount

## Verification
- Create orders with different dates and partial payments
- Verify aging buckets are correct
- Same for purchases/AP
