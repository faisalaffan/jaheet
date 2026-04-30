---
name: task-11-auto-journal
description: "Task 11: Auto-journal engine that generates accounting entries from business transactions. Use when implementing automatic journal generation."
---

# Task 11: Auto-Journal Engine

## Objective
Implement automatic journal generation from business transactions.

## Backend
Create `internal/service/autojournal.go` (or package). The auto-journal service:
1. Receives event type + transaction data
2. Looks up CoA accounts by code
3. Creates journal entry with is_auto=true and reference linking to source

### Journal Templates

| Event | Debit Account | Credit Account | Amount |
|-------|--------------|----------------|--------|
| Order confirmed | 1200 Piutang Usaha | 4000 Pendapatan | order.total_amount |
| Payment inbound | 1000 Kas / 1100 Bank | 1200 Piutang Usaha | payment.amount |
| Purchase confirmed | 1300 Persediaan Bahan | 2000 Hutang Usaha | purchase.total_amount |
| Payment outbound | 2000 Hutang Usaha | 1000 Kas / 1100 Bank | payment.amount |
| Production start | 1500 WIP | 1300 Persediaan Bahan | total material cost |
| Production complete | 1400 Persediaan Barang Jadi | 1500 WIP | total material cost |

### Account Selection for Payments
- method == "cash" → use account 1000 (Kas)
- method == "transfer" or "giro" or "check" → use account 1100 (Bank)

### Reference Format
- `ORDER-{order_number}`
- `PAY-IN-{payment_id[:8]}`
- `PAY-OUT-{payment_id[:8]}`
- `PO-{purchase_number}`
- `PROD-START-{production_id[:8]}`
- `PROD-DONE-{production_id[:8]}`

## Integration Points
Wire auto-journal calls into existing services:
- `order.Confirm()` → call autojournal.OnOrderConfirmed(order)
- `payment.Create()` → call autojournal.OnPaymentCreated(payment)
- `purchase.Confirm()` → call autojournal.OnPurchaseConfirmed(purchase)
- `production.Advance()` → call autojournal.OnProductionStarted / OnProductionCompleted

## Verification
- Confirm order → journal created with correct accounts and amounts
- Record payment → journal created
- Confirm purchase → journal created
- Production start/complete → journals created
- All auto-journals have is_auto=true and correct reference
