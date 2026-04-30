variable "database_url" {
  type    = string
  default = "postgres://jaheet:jaheet@localhost:5432/jaheet?sslmode=disable"
}

env "local" {
  src = "file://schema.hcl"
  url = var.database_url
  dev = "docker://postgres/16/dev"

  migration {
    dir = "file://migrations"
  }
}
