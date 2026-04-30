package postgres

import (
	"context"
	"fmt"

	"github.com/faisalaffan/jaheet/backend/internal/domain"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"
)

type MaterialRepo struct{ db *pgxpool.Pool }

func NewMaterialRepo(db *pgxpool.Pool) *MaterialRepo { return &MaterialRepo{db: db} }

func (r *MaterialRepo) List(ctx context.Context) ([]domain.Material, error) {
	rows, err := r.db.Query(ctx, `SELECT id,name,unit,price,created_at,updated_at FROM materials ORDER BY created_at DESC`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var out []domain.Material
	for rows.Next() {
		var m domain.Material
		if err := rows.Scan(&m.ID, &m.Name, &m.Unit, &m.Price, &m.CreatedAt, &m.UpdatedAt); err != nil {
			return nil, err
		}
		out = append(out, m)
	}
	return out, nil
}

func (r *MaterialRepo) GetByID(ctx context.Context, id uuid.UUID) (*domain.Material, error) {
	var m domain.Material
	err := r.db.QueryRow(ctx, `SELECT id,name,unit,price,created_at,updated_at FROM materials WHERE id=$1`, id).
		Scan(&m.ID, &m.Name, &m.Unit, &m.Price, &m.CreatedAt, &m.UpdatedAt)
	if err != nil {
		return nil, fmt.Errorf("material not found: %w", err)
	}
	return &m, nil
}

func (r *MaterialRepo) Create(ctx context.Context, m *domain.Material) error {
	return r.db.QueryRow(ctx,
		`INSERT INTO materials (name,unit,price) VALUES ($1,$2,$3) RETURNING id,name,unit,price,created_at,updated_at`,
		m.Name, m.Unit, m.Price).Scan(&m.ID, &m.Name, &m.Unit, &m.Price, &m.CreatedAt, &m.UpdatedAt)
}

func (r *MaterialRepo) Update(ctx context.Context, m *domain.Material) error {
	return r.db.QueryRow(ctx,
		`UPDATE materials SET name=$1,unit=$2,price=$3,updated_at=now() WHERE id=$4 RETURNING id,name,unit,price,created_at,updated_at`,
		m.Name, m.Unit, m.Price, m.ID).Scan(&m.ID, &m.Name, &m.Unit, &m.Price, &m.CreatedAt, &m.UpdatedAt)
}

func (r *MaterialRepo) Delete(ctx context.Context, id uuid.UUID) error {
	tag, err := r.db.Exec(ctx, `DELETE FROM materials WHERE id=$1`, id)
	if err != nil {
		return err
	}
	if tag.RowsAffected() == 0 {
		return fmt.Errorf("material not found")
	}
	return nil
}
