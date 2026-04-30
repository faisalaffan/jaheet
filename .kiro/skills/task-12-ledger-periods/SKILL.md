---
name: task-12-ledger-periods
description: "Task 12: General ledger view and flexible fiscal period closing. Use when implementing ledger or period closing features."
---

# Task 12: General Ledger & Flexible Period Closing

## Objective
Implement ledger view per account and flexible fiscal period management with closing.

## Backend — Ledger

### Query
```sql
SELECT jl.id, je.entry_date, je.description, je.reference,
       jl.debit, jl.credit, jl.description as line_desc
FROM journal_lines jl
JOIN journal_entries je ON je.id = jl.journal_entry_id
WHERE jl.account_id = $1
  AND je.entry_date >= $2 AND je.entry_date <= $3
ORDER BY je.entry_date, je.created_at
```
Calculate running balance in application layer based on account type:
- Asset/Expense: balance = sum(debit) - sum(credit)
- Liability/Equity/Revenue: balance = sum(credit) - sum(debit)

### API
- `GET /api/v1/accounting/ledger?account_id={id}&from={date}&to={date}`

## Backend — Fiscal Periods

### Service Logic
- Create period: validate no overlapping periods
- Close period:
  1. Set is_closed=true, closed_at=now()
  2. Generate closing entries: for each revenue/expense account with balance in period, create journal entry zeroing it to "3100 Laba Ditahan"
  3. After closing, reject any new journal entries with entry_date within closed period range

### API
- `GET /api/v1/accounting/periods` — List periods
- `POST /api/v1/accounting/periods` — Create period (name, start_date, end_date)
- `POST /api/v1/accounting/periods/{id}/close` — Close period

### Journal Validation
In journal service Create(), check: is entry_date within any closed fiscal period? If yes → reject.

## Frontend
- Ledger page: account selector (dropdown) + date range picker → table of journal lines with running balance
- Fiscal periods page: list with name, dates, status (open/closed). Create dialog. Close button with confirmation.

## Verification
- View ledger for an account after transactions, verify running balance
- Create period, close it
- Verify closing entries generated (revenue/expense → retained earnings)
- Verify new journals rejected for closed period dates
