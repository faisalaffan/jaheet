package domain

import (
	"time"

	"github.com/google/uuid"
)

type MovementType string

const (
	MovementIn  MovementType = "in"
	MovementOut MovementType = "out"
)

type Stock struct {
	ID         uuid.UUID  `json:"id"`
	MaterialID *uuid.UUID `json:"material_id,omitempty"`
	ProductID  *uuid.UUID `json:"product_id,omitempty"`
	Qty        float64    `json:"qty"`
	UpdatedAt  time.Time  `json:"updated_at"`
}

type StockMovement struct {
	ID           uuid.UUID    `json:"id"`
	StockID      uuid.UUID    `json:"stock_id"`
	MovementType MovementType `json:"movement_type"`
	Qty          float64      `json:"qty"`
	Reference    *string      `json:"reference,omitempty"`
	Notes        *string      `json:"notes,omitempty"`
	CreatedAt    time.Time    `json:"created_at"`
}
