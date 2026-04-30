package service

import (
	"context"
	"fmt"

	"github.com/faisalaffan/jaheet/backend/internal/domain"
	"github.com/faisalaffan/jaheet/backend/internal/repository"
	"github.com/google/uuid"
)

type WorkerService struct{ repo repository.WorkerRepository }

func NewWorkerService(repo repository.WorkerRepository) *WorkerService {
	return &WorkerService{repo: repo}
}

func (s *WorkerService) List(ctx context.Context) ([]domain.Worker, error) {
	return s.repo.List(ctx)
}
func (s *WorkerService) GetByID(ctx context.Context, id uuid.UUID) (*domain.Worker, error) {
	return s.repo.GetByID(ctx, id)
}
func (s *WorkerService) Create(ctx context.Context, w *domain.Worker) error {
	if w.Name == "" {
		return fmt.Errorf("name is required")
	}
	return s.repo.Create(ctx, w)
}
func (s *WorkerService) Update(ctx context.Context, w *domain.Worker) error {
	return s.repo.Update(ctx, w)
}
func (s *WorkerService) Delete(ctx context.Context, id uuid.UUID) error {
	return s.repo.Delete(ctx, id)
}
