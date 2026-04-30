---
name: task-10-coa-journals
description: "Task 10: Chart of Accounts and manual journal entries with debit/credit validation. Use when implementing accounting CoA or journal features."
---

# Task 10: Chart of Accounts & Manual Journal Entries

## Objective
Implement CoA management (hierarchical) and manual journal entry with debit/credit validation.

## Backend — Chart of Accounts
- CoA repository + service + handler
- Hierarchical: parent_id (self-referencing FK)
- Types: asset, liability, equity, revenue, expense
- Seed default CoA on app startup (if table empty):

| Code | Name | Type |
|------|------|------|
| 1000 | Kas | asset |
| 1100 | Bank | asset |
| 1200 | Piutang Usaha | asset |
| 1300 | Persediaan Bahan Baku | asset |
| 1400 | Persediaan Barang Jadi | asset |
| 1500 | Barang Dalam Proses (WIP) | asset |
| 2000 | Hutang Usaha | liability |
| 3000 | Modal | equity |
| 3100 | Laba Ditahan | equity |
| 4000 | Pendapatan | revenue |
| 5000 | Harga Pokok Penjualan | expense |
| 6000 | Beban Operasional | expense |

### API
- `CRUD /api/v1/accounting/coa`
- `GET /api/v1/accounting/coa` returns flat list (frontend renders as tree using parent_id)

## Backend — Journal Entries
- Journal service validates: sum(debit) == sum(credit) before saving
- Save journal + lines in single transaction
- `is_auto` field distinguishes manual vs auto-generated journals

### API
- `POST /api/v1/accounting/journals` — Create journal with lines
  ```json
  {
    "entry_date": "2026-04-30",
    "description": "Setoran modal awal",
    "lines": [
      {"account_id": "uuid-kas", "debit": 50000000, "credit": 0},
      {"account_id": "uuid-modal", "debit": 0, "credit": 50000000}
    ]
  }
  ```
- `GET /api/v1/accounting/journals` — List journals
- `GET /api/v1/accounting/journals/{id}` — Get with lines

## Frontend
- CoA page: indented table (indent by depth based on parent_id chain), create/edit dialog
- Journals page: list with date, description, reference, total debit
- Create journal form: dynamic line rows (account picker, debit, credit)
- Running total: show sum debit / sum credit, highlight if unbalanced
- Cannot submit if debit ≠ credit

## Verification
- Seed CoA loads on first run
- Create CoA with parent-child relationship
- Create balanced journal → succeeds
- Create unbalanced journal → rejected with error
