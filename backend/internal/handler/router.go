package handler

import (
	"github.com/faisalaffan/jaheet/backend/internal/service"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
)

type Services struct {
	Product  *service.ProductService
	Material *service.MaterialService
	Customer *service.CustomerService
	Supplier *service.SupplierService
	Worker   *service.WorkerService
}

func NewRouter(svc *Services) chi.Router {
	r := chi.NewRouter()

	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(middleware.RequestID)
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type"},
		AllowCredentials: true,
	}))

	r.Route("/api/v1", func(api chi.Router) {
		api.Mount("/products", NewProductHandler(svc.Product).Routes())
		api.Mount("/materials", NewMaterialHandler(svc.Material).Routes())
		api.Mount("/customers", NewCustomerHandler(svc.Customer).Routes())
		api.Mount("/suppliers", NewSupplierHandler(svc.Supplier).Routes())
		api.Mount("/workers", NewWorkerHandler(svc.Worker).Routes())
	})

	return r
}
