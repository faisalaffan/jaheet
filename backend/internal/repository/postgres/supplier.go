package postgres

import (
	"context"
	"fmt"

	"github.com/faisalaffan/jaheet/backend/internal/domain"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"
)

type SupplierRepo struct{ db *pgxpool.Pool }

func NewSupplierRepo(db *pgxpool.Pool) *SupplierRepo { return &SupplierRepo{db: db} }

func (r *SupplierRepo) List(ctx context.Context) ([]domain.Supplier, error) {
	rows, err := r.db.Query(ctx, `SELECT id,name,phone,email,address,created_at,updated_at FROM suppliers ORDER BY created_at DESC`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var out []domain.Supplier
	for rows.Next() {
		var s domain.Supplier
		if err := rows.Scan(&s.ID, &s.Name, &s.Phone, &s.Email, &s.Address, &s.CreatedAt, &s.UpdatedAt); err != nil {
			return nil, err
		}
		out = append(out, s)
	}
	return out, nil
}

func (r *SupplierRepo) GetByID(ctx context.Context, id uuid.UUID) (*domain.Supplier, error) {
	var s domain.Supplier
	err := r.db.QueryRow(ctx, `SELECT id,name,phone,email,address,created_at,updated_at FROM suppliers WHERE id=$1`, id).
		Scan(&s.ID, &s.Name, &s.Phone, &s.Email, &s.Address, &s.CreatedAt, &s.UpdatedAt)
	if err != nil {
		return nil, fmt.Errorf("supplier not found: %w", err)
	}
	return &s, nil
}

func (r *SupplierRepo) Create(ctx context.Context, s *domain.Supplier) error {
	return r.db.QueryRow(ctx,
		`INSERT INTO suppliers (name,phone,email,address) VALUES ($1,$2,$3,$4) RETURNING id,name,phone,email,address,created_at,updated_at`,
		s.Name, s.Phone, s.Email, s.Address).Scan(&s.ID, &s.Name, &s.Phone, &s.Email, &s.Address, &s.CreatedAt, &s.UpdatedAt)
}

func (r *SupplierRepo) Update(ctx context.Context, s *domain.Supplier) error {
	return r.db.QueryRow(ctx,
		`UPDATE suppliers SET name=$1,phone=$2,email=$3,address=$4,updated_at=now() WHERE id=$5 RETURNING id,name,phone,email,address,created_at,updated_at`,
		s.Name, s.Phone, s.Email, s.Address, s.ID).Scan(&s.ID, &s.Name, &s.Phone, &s.Email, &s.Address, &s.CreatedAt, &s.UpdatedAt)
}

func (r *SupplierRepo) Delete(ctx context.Context, id uuid.UUID) error {
	tag, err := r.db.Exec(ctx, `DELETE FROM suppliers WHERE id=$1`, id)
	if err != nil {
		return err
	}
	if tag.RowsAffected() == 0 {
		return fmt.Errorf("supplier not found")
	}
	return nil
}
