package repository

import (
	"context"

	"github.com/faisalaffan/jaheet/backend/internal/domain"
	"github.com/google/uuid"
)

type ProductRepository interface {
	List(ctx context.Context) ([]domain.Product, error)
	GetByID(ctx context.Context, id uuid.UUID) (*domain.Product, error)
	Create(ctx context.Context, p *domain.Product) error
	Update(ctx context.Context, p *domain.Product) error
	Delete(ctx context.Context, id uuid.UUID) error
}

type MaterialRepository interface {
	List(ctx context.Context) ([]domain.Material, error)
	GetByID(ctx context.Context, id uuid.UUID) (*domain.Material, error)
	Create(ctx context.Context, m *domain.Material) error
	Update(ctx context.Context, m *domain.Material) error
	Delete(ctx context.Context, id uuid.UUID) error
}

type CustomerRepository interface {
	List(ctx context.Context) ([]domain.Customer, error)
	GetByID(ctx context.Context, id uuid.UUID) (*domain.Customer, error)
	Create(ctx context.Context, c *domain.Customer) error
	Update(ctx context.Context, c *domain.Customer) error
	Delete(ctx context.Context, id uuid.UUID) error
}

type SupplierRepository interface {
	List(ctx context.Context) ([]domain.Supplier, error)
	GetByID(ctx context.Context, id uuid.UUID) (*domain.Supplier, error)
	Create(ctx context.Context, s *domain.Supplier) error
	Update(ctx context.Context, s *domain.Supplier) error
	Delete(ctx context.Context, id uuid.UUID) error
}

type WorkerRepository interface {
	List(ctx context.Context) ([]domain.Worker, error)
	GetByID(ctx context.Context, id uuid.UUID) (*domain.Worker, error)
	Create(ctx context.Context, w *domain.Worker) error
	Update(ctx context.Context, w *domain.Worker) error
	Delete(ctx context.Context, id uuid.UUID) error
}
