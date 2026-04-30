package postgres

import (
	"context"
	"fmt"

	"github.com/faisalaffan/jaheet/backend/internal/domain"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"
)

type WorkerRepo struct{ db *pgxpool.Pool }

func NewWorkerRepo(db *pgxpool.Pool) *WorkerRepo { return &WorkerRepo{db: db} }

func (r *WorkerRepo) List(ctx context.Context) ([]domain.Worker, error) {
	rows, err := r.db.Query(ctx, `SELECT id,name,role,phone,created_at,updated_at FROM workers ORDER BY created_at DESC`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var out []domain.Worker
	for rows.Next() {
		var w domain.Worker
		if err := rows.Scan(&w.ID, &w.Name, &w.Role, &w.Phone, &w.CreatedAt, &w.UpdatedAt); err != nil {
			return nil, err
		}
		out = append(out, w)
	}
	return out, nil
}

func (r *WorkerRepo) GetByID(ctx context.Context, id uuid.UUID) (*domain.Worker, error) {
	var w domain.Worker
	err := r.db.QueryRow(ctx, `SELECT id,name,role,phone,created_at,updated_at FROM workers WHERE id=$1`, id).
		Scan(&w.ID, &w.Name, &w.Role, &w.Phone, &w.CreatedAt, &w.UpdatedAt)
	if err != nil {
		return nil, fmt.Errorf("worker not found: %w", err)
	}
	return &w, nil
}

func (r *WorkerRepo) Create(ctx context.Context, w *domain.Worker) error {
	return r.db.QueryRow(ctx,
		`INSERT INTO workers (name,role,phone) VALUES ($1,$2,$3) RETURNING id,name,role,phone,created_at,updated_at`,
		w.Name, w.Role, w.Phone).Scan(&w.ID, &w.Name, &w.Role, &w.Phone, &w.CreatedAt, &w.UpdatedAt)
}

func (r *WorkerRepo) Update(ctx context.Context, w *domain.Worker) error {
	return r.db.QueryRow(ctx,
		`UPDATE workers SET name=$1,role=$2,phone=$3,updated_at=now() WHERE id=$4 RETURNING id,name,role,phone,created_at,updated_at`,
		w.Name, w.Role, w.Phone, w.ID).Scan(&w.ID, &w.Name, &w.Role, &w.Phone, &w.CreatedAt, &w.UpdatedAt)
}

func (r *WorkerRepo) Delete(ctx context.Context, id uuid.UUID) error {
	tag, err := r.db.Exec(ctx, `DELETE FROM workers WHERE id=$1`, id)
	if err != nil {
		return err
	}
	if tag.RowsAffected() == 0 {
		return fmt.Errorf("worker not found")
	}
	return nil
}
