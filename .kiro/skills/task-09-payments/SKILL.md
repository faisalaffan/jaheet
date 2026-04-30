---
name: task-09-payments
description: "Task 9: Payment tracking for orders and purchases with partial payment and payment methods. Use when implementing payment features."
---

# Task 9: Payment Tracking

## Objective
Implement payment recording for customer orders (inbound) and supplier purchases (outbound).

## Backend
- Payment repository + service + handler
- Payment linked to order (inbound) or purchase (outbound) via nullable FKs
- Calculate remaining: total_amount - sum(payments.amount)
- Prevent overpayment: if new payment.amount > remaining → reject

### API
- `POST /api/v1/payments` — Create payment
  ```json
  {
    "payment_type": "inbound",
    "order_id": "uuid",
    "amount": 500000,
    "method": "transfer",
    "reference": "TRF-001",
    "payment_date": "2026-04-30"
  }
  ```
- `GET /api/v1/orders/{id}/payments` — List payments for order
- `GET /api/v1/purchases/{id}/payments` — List payments for purchase

### Payment Methods
cash, transfer, giro, check, other

## Frontend
- Payment section on order detail page: payment history table + add payment form
- Payment section on purchase detail page: same pattern
- Show: total amount, paid amount, remaining amount
- Add payment form: amount, method (select), reference, date, notes
- Color indicator: fully paid (green), partial (yellow), unpaid (red)

## Verification
- Record partial payment on order, verify remaining balance
- Record second payment, verify totals
- Cannot exceed total amount (overpayment rejected)
- Same flow works for purchases (outbound)
