package postgres

import (
	"context"
	"fmt"

	"github.com/faisalaffan/jaheet/backend/internal/domain"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"
)

type ProductRepo struct{ db *pgxpool.Pool }

func NewProductRepo(db *pgxpool.Pool) *ProductRepo { return &ProductRepo{db: db} }

func (r *ProductRepo) List(ctx context.Context) ([]domain.Product, error) {
	rows, err := r.db.Query(ctx,
		`SELECT id,name,sku,description,price,created_at,updated_at FROM products ORDER BY created_at DESC`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var out []domain.Product
	for rows.Next() {
		var p domain.Product
		if err := rows.Scan(&p.ID, &p.Name, &p.SKU, &p.Description, &p.Price, &p.CreatedAt, &p.UpdatedAt); err != nil {
			return nil, err
		}
		out = append(out, p)
	}
	return out, nil
}

func (r *ProductRepo) GetByID(ctx context.Context, id uuid.UUID) (*domain.Product, error) {
	var p domain.Product
	err := r.db.QueryRow(ctx,
		`SELECT id,name,sku,description,price,created_at,updated_at FROM products WHERE id=$1`, id).
		Scan(&p.ID, &p.Name, &p.SKU, &p.Description, &p.Price, &p.CreatedAt, &p.UpdatedAt)
	if err != nil {
		return nil, fmt.Errorf("product not found: %w", err)
	}
	return &p, nil
}

func (r *ProductRepo) Create(ctx context.Context, p *domain.Product) error {
	return r.db.QueryRow(ctx,
		`INSERT INTO products (name,sku,description,price) VALUES ($1,$2,$3,$4)
		 RETURNING id,name,sku,description,price,created_at,updated_at`,
		p.Name, p.SKU, p.Description, p.Price).
		Scan(&p.ID, &p.Name, &p.SKU, &p.Description, &p.Price, &p.CreatedAt, &p.UpdatedAt)
}

func (r *ProductRepo) Update(ctx context.Context, p *domain.Product) error {
	return r.db.QueryRow(ctx,
		`UPDATE products SET name=$1,sku=$2,description=$3,price=$4,updated_at=now() WHERE id=$5
		 RETURNING id,name,sku,description,price,created_at,updated_at`,
		p.Name, p.SKU, p.Description, p.Price, p.ID).
		Scan(&p.ID, &p.Name, &p.SKU, &p.Description, &p.Price, &p.CreatedAt, &p.UpdatedAt)
}

func (r *ProductRepo) Delete(ctx context.Context, id uuid.UUID) error {
	tag, err := r.db.Exec(ctx, `DELETE FROM products WHERE id=$1`, id)
	if err != nil {
		return err
	}
	if tag.RowsAffected() == 0 {
		return fmt.Errorf("product not found")
	}
	return nil
}
