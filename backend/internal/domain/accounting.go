package domain

import (
	"time"

	"github.com/google/uuid"
)

type AccountType string

const (
	AccountAsset     AccountType = "asset"
	AccountLiability AccountType = "liability"
	AccountEquity    AccountType = "equity"
	AccountRevenue   AccountType = "revenue"
	AccountExpense   AccountType = "expense"
)

type ChartOfAccount struct {
	ID        uuid.UUID   `json:"id"`
	Code      string      `json:"code"`
	Name      string      `json:"name"`
	Type      AccountType `json:"type"`
	ParentID  *uuid.UUID  `json:"parent_id,omitempty"`
	IsActive  bool        `json:"is_active"`
	CreatedAt time.Time   `json:"created_at"`
}

type JournalEntry struct {
	ID          uuid.UUID     `json:"id"`
	EntryDate   time.Time     `json:"entry_date"`
	Description string        `json:"description"`
	Reference   *string       `json:"reference,omitempty"`
	Lines       []JournalLine `json:"lines,omitempty"`
	CreatedAt   time.Time     `json:"created_at"`
}

type JournalLine struct {
	ID             uuid.UUID `json:"id"`
	JournalEntryID uuid.UUID `json:"journal_entry_id"`
	AccountID      uuid.UUID `json:"account_id"`
	Debit          float64   `json:"debit"`
	Credit         float64   `json:"credit"`
	Description    *string   `json:"description,omitempty"`
}

type LedgerEntry struct {
	AccountID   uuid.UUID `json:"account_id"`
	AccountCode string    `json:"account_code"`
	AccountName string    `json:"account_name"`
	Debit       float64   `json:"debit"`
	Credit      float64   `json:"credit"`
	Balance     float64   `json:"balance"`
}
