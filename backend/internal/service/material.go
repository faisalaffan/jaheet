package service

import (
	"context"
	"fmt"

	"github.com/faisalaffan/jaheet/backend/internal/domain"
	"github.com/faisalaffan/jaheet/backend/internal/repository"
	"github.com/google/uuid"
)

type MaterialService struct{ repo repository.MaterialRepository }

func NewMaterialService(repo repository.MaterialRepository) *MaterialService {
	return &MaterialService{repo: repo}
}

func (s *MaterialService) List(ctx context.Context) ([]domain.Material, error) {
	return s.repo.List(ctx)
}
func (s *MaterialService) GetByID(ctx context.Context, id uuid.UUID) (*domain.Material, error) {
	return s.repo.GetByID(ctx, id)
}
func (s *MaterialService) Create(ctx context.Context, m *domain.Material) error {
	if m.Name == "" {
		return fmt.Errorf("name is required")
	}
	return s.repo.Create(ctx, m)
}
func (s *MaterialService) Update(ctx context.Context, m *domain.Material) error {
	return s.repo.Update(ctx, m)
}
func (s *MaterialService) Delete(ctx context.Context, id uuid.UUID) error {
	return s.repo.Delete(ctx, id)
}
