.PHONY: run build migrate-apply migrate-diff

run:
	go run ./cmd/api

build:
	go build -o bin/api ./cmd/api

migrate-diff:
	atlas schema diff --env local

migrate-apply:
	atlas schema apply --env local

migrate-inspect:
	atlas schema inspect --env local
