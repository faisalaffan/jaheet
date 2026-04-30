package service

import (
	"context"
	"fmt"

	"github.com/faisalaffan/jaheet/backend/internal/domain"
	"github.com/faisalaffan/jaheet/backend/internal/repository"
	"github.com/google/uuid"
)

type CustomerService struct{ repo repository.CustomerRepository }

func NewCustomerService(repo repository.CustomerRepository) *CustomerService {
	return &CustomerService{repo: repo}
}

func (s *CustomerService) List(ctx context.Context) ([]domain.Customer, error) {
	return s.repo.List(ctx)
}
func (s *CustomerService) GetByID(ctx context.Context, id uuid.UUID) (*domain.Customer, error) {
	return s.repo.GetByID(ctx, id)
}
func (s *CustomerService) Create(ctx context.Context, c *domain.Customer) error {
	if c.Name == "" {
		return fmt.Errorf("name is required")
	}
	return s.repo.Create(ctx, c)
}
func (s *CustomerService) Update(ctx context.Context, c *domain.Customer) error {
	return s.repo.Update(ctx, c)
}
func (s *CustomerService) Delete(ctx context.Context, id uuid.UUID) error {
	return s.repo.Delete(ctx, id)
}
