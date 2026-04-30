package domain

import (
	"time"

	"github.com/google/uuid"
)

type OrderStatus string

const (
	OrderDraft        OrderStatus = "draft"
	OrderConfirmed    OrderStatus = "confirmed"
	OrderInProduction OrderStatus = "in_production"
	OrderCompleted    OrderStatus = "completed"
	OrderCancelled    OrderStatus = "cancelled"
)

type ProductionStatus string

const (
	ProdCutting   ProductionStatus = "cutting"
	ProdSewing    ProductionStatus = "sewing"
	ProdFinishing ProductionStatus = "finishing"
	ProdQC        ProductionStatus = "qc"
	ProdDone      ProductionStatus = "done"
)

type Order struct {
	ID          uuid.UUID   `json:"id"`
	CustomerID  uuid.UUID   `json:"customer_id"`
	OrderNumber string      `json:"order_number"`
	Status      OrderStatus `json:"status"`
	Deadline    *time.Time  `json:"deadline,omitempty"`
	Notes       *string     `json:"notes,omitempty"`
	TotalAmount float64     `json:"total_amount"`
	Items       []OrderItem `json:"items,omitempty"`
	CreatedAt   time.Time   `json:"created_at"`
	UpdatedAt   time.Time   `json:"updated_at"`
}

type OrderItem struct {
	ID        uuid.UUID `json:"id"`
	OrderID   uuid.UUID `json:"order_id"`
	ProductID uuid.UUID `json:"product_id"`
	Qty       int       `json:"qty"`
	UnitPrice float64   `json:"unit_price"`
	Subtotal  float64   `json:"subtotal"`
}

type Production struct {
	ID         uuid.UUID        `json:"id"`
	OrderID    uuid.UUID        `json:"order_id"`
	Status     ProductionStatus `json:"status"`
	StartedAt  *time.Time       `json:"started_at,omitempty"`
	FinishedAt *time.Time       `json:"finished_at,omitempty"`
	Notes      *string          `json:"notes,omitempty"`
	CreatedAt  time.Time        `json:"created_at"`
	UpdatedAt  time.Time        `json:"updated_at"`
}
