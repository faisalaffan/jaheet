package main

import (
	"context"
	"log"
	"net/http"

	"github.com/faisalaffan/jaheet/backend/internal/config"
	"github.com/faisalaffan/jaheet/backend/internal/database"
	"github.com/faisalaffan/jaheet/backend/internal/handler"
	"github.com/faisalaffan/jaheet/backend/internal/repository/postgres"
	"github.com/faisalaffan/jaheet/backend/internal/service"
)

func main() {
	cfg := config.Load()

	ctx := context.Background()
	db, err := database.Connect(ctx, cfg.DatabaseURL)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	svc := &handler.Services{
		Product:  service.NewProductService(postgres.NewProductRepo(db)),
		Material: service.NewMaterialService(postgres.NewMaterialRepo(db)),
		Customer: service.NewCustomerService(postgres.NewCustomerRepo(db)),
		Supplier: service.NewSupplierService(postgres.NewSupplierRepo(db)),
		Worker:   service.NewWorkerService(postgres.NewWorkerRepo(db)),
	}

	r := handler.NewRouter(svc)

	log.Printf("server starting on :%s", cfg.Port)
	if err := http.ListenAndServe(":"+cfg.Port, r); err != nil {
		log.Fatal(err)
	}
}
