package service

import (
	"context"
	"fmt"

	"github.com/faisalaffan/jaheet/backend/internal/domain"
	"github.com/faisalaffan/jaheet/backend/internal/repository"
	"github.com/google/uuid"
)

type ProductService struct {
	repo repository.ProductRepository
}

func NewProductService(repo repository.ProductRepository) *ProductService {
	return &ProductService{repo: repo}
}

func (s *ProductService) List(ctx context.Context) ([]domain.Product, error) {
	return s.repo.List(ctx)
}

func (s *ProductService) GetByID(ctx context.Context, id uuid.UUID) (*domain.Product, error) {
	return s.repo.GetByID(ctx, id)
}

func (s *ProductService) Create(ctx context.Context, p *domain.Product) error {
	if p.Name == "" {
		return fmt.Errorf("name is required")
	}
	return s.repo.Create(ctx, p)
}

func (s *ProductService) Update(ctx context.Context, p *domain.Product) error {
	if p.Name == "" {
		return fmt.Errorf("name is required")
	}
	return s.repo.Update(ctx, p)
}

func (s *ProductService) Delete(ctx context.Context, id uuid.UUID) error {
	return s.repo.Delete(ctx, id)
}
