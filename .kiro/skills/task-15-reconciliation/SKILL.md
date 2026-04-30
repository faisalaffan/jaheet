---
name: task-15-reconciliation
description: "Task 15: Bank reconciliation (manual + CSV import) and inter-module reconciliation. Use when implementing reconciliation features."
---

# Task 15: Bank & Inter-Module Reconciliation

## Objective
Implement bank reconciliation and inter-module balance verification.

## Backend — Bank Reconciliation

### Bank Transactions
- Manual entry or CSV import (date, description, amount)
- CSV format: `date,description,amount` (first row header)
- Parse CSV in handler, create bank_transaction records

### Reconciliation Logic
- Match bank_transaction to journal_entry by: amount match + date proximity + reference similarity
- Manual match: user selects bank_transaction + journal_entry → link them
- Mark both as reconciled (bank_transaction.is_reconciled=true, bank_transaction.journal_entry_id=journal_entry.id)
- Unmatch: clear the link

### API
- `GET /api/v1/accounting/bank-transactions` — List (filter: reconciled/unreconciled)
- `POST /api/v1/accounting/bank-transactions` — Manual create
- `POST /api/v1/accounting/bank-transactions/import` — CSV upload (multipart/form-data)
- `POST /api/v1/accounting/reconcile/bank` — Match: `{"bank_transaction_id": "uuid", "journal_entry_id": "uuid"}`
- `DELETE /api/v1/accounting/reconcile/bank/{bankTransactionId}` — Unmatch

## Backend — Inter-Module Reconciliation

### Logic
Compare operational balances vs ledger balances:
1. **AR**: sum of (order.total_amount - paid) for unpaid orders vs ledger balance of account 1200
2. **AP**: sum of (purchase.total_amount - paid) for unpaid purchases vs ledger balance of account 2000
3. **Inventory (materials)**: sum of (stock.qty × material.price) for material stocks vs ledger balance of account 1300
4. **Inventory (products)**: sum of (stock.qty × product.price) for product stocks vs ledger balance of account 1400

### API
- `GET /api/v1/accounting/reconcile/inter-module`

### Response
```json
{
  "items": [
    {"module": "AR", "operational_balance": 5000000, "ledger_balance": 5000000, "difference": 0, "matched": true},
    {"module": "AP", "operational_balance": 3000000, "ledger_balance": 3000000, "difference": 0, "matched": true}
  ]
}
```

## Frontend
- Bank reconciliation page:
  - Import CSV button (file upload)
  - Manual entry form
  - Two-column layout: unreconciled bank transactions | unreconciled journal entries
  - Match button: select one from each side → match
  - Reconciled section below
- Inter-module reconciliation page:
  - Table: module, operational balance, ledger balance, difference, status (match/mismatch)
  - Green check for match, red X for mismatch

## Verification
- Import CSV, verify transactions created
- Match a bank transaction to journal entry, verify reconciled
- Unmatch, verify unreconciled
- Inter-module: after known transactions, all balances match
