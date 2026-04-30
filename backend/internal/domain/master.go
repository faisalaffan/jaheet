package domain

import (
	"time"

	"github.com/google/uuid"
)

// Master Data

type Customer struct {
	ID        uuid.UUID  `json:"id"`
	Name      string     `json:"name"`
	Phone     *string    `json:"phone,omitempty"`
	Email     *string    `json:"email,omitempty"`
	Address   *string    `json:"address,omitempty"`
	CreatedAt time.Time  `json:"created_at"`
	UpdatedAt time.Time  `json:"updated_at"`
}

type Supplier struct {
	ID        uuid.UUID  `json:"id"`
	Name      string     `json:"name"`
	Phone     *string    `json:"phone,omitempty"`
	Email     *string    `json:"email,omitempty"`
	Address   *string    `json:"address,omitempty"`
	CreatedAt time.Time  `json:"created_at"`
	UpdatedAt time.Time  `json:"updated_at"`
}

type Material struct {
	ID        uuid.UUID  `json:"id"`
	Name      string     `json:"name"`
	Unit      string     `json:"unit"`
	Price     float64    `json:"price"`
	CreatedAt time.Time  `json:"created_at"`
	UpdatedAt time.Time  `json:"updated_at"`
}

type Product struct {
	ID          uuid.UUID  `json:"id"`
	Name        string     `json:"name"`
	SKU         *string    `json:"sku,omitempty"`
	Description *string    `json:"description,omitempty"`
	Price       float64    `json:"price"`
	CreatedAt   time.Time  `json:"created_at"`
	UpdatedAt   time.Time  `json:"updated_at"`
}

type Worker struct {
	ID        uuid.UUID `json:"id"`
	Name      string    `json:"name"`
	Role      *string   `json:"role,omitempty"`
	Phone     *string   `json:"phone,omitempty"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
