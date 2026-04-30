package postgres

import (
	"context"
	"fmt"

	"github.com/faisalaffan/jaheet/backend/internal/domain"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"
)

type CustomerRepo struct{ db *pgxpool.Pool }

func NewCustomerRepo(db *pgxpool.Pool) *CustomerRepo { return &CustomerRepo{db: db} }

func (r *CustomerRepo) List(ctx context.Context) ([]domain.Customer, error) {
	rows, err := r.db.Query(ctx, `SELECT id,name,phone,email,address,created_at,updated_at FROM customers ORDER BY created_at DESC`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var out []domain.Customer
	for rows.Next() {
		var c domain.Customer
		if err := rows.Scan(&c.ID, &c.Name, &c.Phone, &c.Email, &c.Address, &c.CreatedAt, &c.UpdatedAt); err != nil {
			return nil, err
		}
		out = append(out, c)
	}
	return out, nil
}

func (r *CustomerRepo) GetByID(ctx context.Context, id uuid.UUID) (*domain.Customer, error) {
	var c domain.Customer
	err := r.db.QueryRow(ctx, `SELECT id,name,phone,email,address,created_at,updated_at FROM customers WHERE id=$1`, id).
		Scan(&c.ID, &c.Name, &c.Phone, &c.Email, &c.Address, &c.CreatedAt, &c.UpdatedAt)
	if err != nil {
		return nil, fmt.Errorf("customer not found: %w", err)
	}
	return &c, nil
}

func (r *CustomerRepo) Create(ctx context.Context, c *domain.Customer) error {
	return r.db.QueryRow(ctx,
		`INSERT INTO customers (name,phone,email,address) VALUES ($1,$2,$3,$4) RETURNING id,name,phone,email,address,created_at,updated_at`,
		c.Name, c.Phone, c.Email, c.Address).Scan(&c.ID, &c.Name, &c.Phone, &c.Email, &c.Address, &c.CreatedAt, &c.UpdatedAt)
}

func (r *CustomerRepo) Update(ctx context.Context, c *domain.Customer) error {
	return r.db.QueryRow(ctx,
		`UPDATE customers SET name=$1,phone=$2,email=$3,address=$4,updated_at=now() WHERE id=$5 RETURNING id,name,phone,email,address,created_at,updated_at`,
		c.Name, c.Phone, c.Email, c.Address, c.ID).Scan(&c.ID, &c.Name, &c.Phone, &c.Email, &c.Address, &c.CreatedAt, &c.UpdatedAt)
}

func (r *CustomerRepo) Delete(ctx context.Context, id uuid.UUID) error {
	tag, err := r.db.Exec(ctx, `DELETE FROM customers WHERE id=$1`, id)
	if err != nil {
		return err
	}
	if tag.RowsAffected() == 0 {
		return fmt.Errorf("customer not found")
	}
	return nil
}
