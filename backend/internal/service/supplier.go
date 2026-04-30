package service

import (
	"context"
	"fmt"

	"github.com/faisalaffan/jaheet/backend/internal/domain"
	"github.com/faisalaffan/jaheet/backend/internal/repository"
	"github.com/google/uuid"
)

type SupplierService struct{ repo repository.SupplierRepository }

func NewSupplierService(repo repository.SupplierRepository) *SupplierService {
	return &SupplierService{repo: repo}
}

func (s *SupplierService) List(ctx context.Context) ([]domain.Supplier, error) {
	return s.repo.List(ctx)
}
func (s *SupplierService) GetByID(ctx context.Context, id uuid.UUID) (*domain.Supplier, error) {
	return s.repo.GetByID(ctx, id)
}
func (s *SupplierService) Create(ctx context.Context, sup *domain.Supplier) error {
	if sup.Name == "" {
		return fmt.Errorf("name is required")
	}
	return s.repo.Create(ctx, sup)
}
func (s *SupplierService) Update(ctx context.Context, sup *domain.Supplier) error {
	return s.repo.Update(ctx, sup)
}
func (s *SupplierService) Delete(ctx context.Context, id uuid.UUID) error {
	return s.repo.Delete(ctx, id)
}
