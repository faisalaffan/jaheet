---
name: task-13-financial-reports
description: "Task 13: Balance Sheet, Income Statement, and Cash Flow reports. Use when implementing financial reporting features."
---

# Task 13: Financial Reports

## Objective
Implement Balance Sheet, Income Statement, and Cash Flow Statement.

## Backend

### Balance Sheet (as_of date)
```sql
SELECT coa.id, coa.code, coa.name, coa.type,
       COALESCE(SUM(jl.debit), 0) as total_debit,
       COALESCE(SUM(jl.credit), 0) as total_credit
FROM chart_of_accounts coa
LEFT JOIN journal_lines jl ON jl.account_id = coa.id
LEFT JOIN journal_entries je ON je.id = jl.journal_entry_id AND je.entry_date <= $1
WHERE coa.type IN ('asset', 'liability', 'equity')
GROUP BY coa.id
```
- Assets: balance = debit - credit
- Liabilities & Equity: balance = credit - debit
- Response groups accounts by type, shows totals, verifies Assets = Liabilities + Equity

### Income Statement (from, to)
Same query pattern but for revenue/expense accounts within date range.
- Revenue: credit - debit
- Expense: debit - credit
- Net Income = Total Revenue - Total Expense

### Cash Flow (from, to)
Analyze journal lines where account_id is Kas (1000) or Bank (1100):
- Categorize by reference prefix:
  - `ORDER-*`, `PAY-IN-*` → Operating (inflow)
  - `PO-*`, `PAY-OUT-*` → Operating (outflow)
  - `PROD-*` → Operating
  - Others → uncategorized
- Sum inflows and outflows per category

### API
- `GET /api/v1/accounting/reports/balance-sheet?as_of=2026-04-30`
- `GET /api/v1/accounting/reports/income-statement?from=2026-01-01&to=2026-04-30`
- `GET /api/v1/accounting/reports/cash-flow?from=2026-01-01&to=2026-04-30`

## Frontend
- Reports page with sub-navigation (Balance Sheet / Income Statement / Cash Flow)
- Date picker(s) per report type
- Formatted tables with account grouping, subtotals, grand totals
- Balance Sheet: two-column (Assets | Liabilities + Equity)
- Income Statement: Revenue section, Expense section, Net Income
- Cash Flow: Operating / Investing / Financing sections with net change

## Verification
- After transactions, Balance Sheet balances (A = L + E)
- Income Statement net income = revenue - expenses
- Cash Flow reflects actual cash movements
