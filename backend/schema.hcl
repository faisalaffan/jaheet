schema "public" {}

// ============================================================
// ENUM TYPES
// ============================================================

enum "account_type" {
  schema = schema.public
  values = ["asset", "liability", "equity", "revenue", "expense"]
}

enum "order_status" {
  schema = schema.public
  values = ["draft", "confirmed", "in_production", "completed", "cancelled"]
}

enum "production_status" {
  schema = schema.public
  values = ["cutting", "sewing", "finishing", "qc", "done"]
}

enum "movement_type" {
  schema = schema.public
  values = ["in", "out"]
}

enum "purchase_status" {
  schema = schema.public
  values = ["draft", "confirmed", "received", "cancelled"]
}

enum "payment_method" {
  schema = schema.public
  values = ["cash", "transfer", "giro", "check", "other"]
}

enum "payment_type" {
  schema = schema.public
  values = ["inbound", "outbound"]
}

// ============================================================
// MASTER DATA
// ============================================================

table "customers" {
  schema = schema.public
  column "id" {
    type    = uuid
    default = sql("gen_random_uuid()")
  }
  column "name" {
    type = varchar(255)
  }
  column "phone" {
    type = varchar(50)
    null = true
  }
  column "email" {
    type = varchar(255)
    null = true
  }
  column "address" {
    type = text
    null = true
  }
  column "created_at" {
    type    = timestamptz
    default = sql("now()")
  }
  column "updated_at" {
    type    = timestamptz
    default = sql("now()")
  }
  primary_key {
    columns = [column.id]
  }
}

table "suppliers" {
  schema = schema.public
  column "id" {
    type    = uuid
    default = sql("gen_random_uuid()")
  }
  column "name" {
    type = varchar(255)
  }
  column "phone" {
    type = varchar(50)
    null = true
  }
  column "email" {
    type = varchar(255)
    null = true
  }
  column "address" {
    type = text
    null = true
  }
  column "created_at" {
    type    = timestamptz
    default = sql("now()")
  }
  column "updated_at" {
    type    = timestamptz
    default = sql("now()")
  }
  primary_key {
    columns = [column.id]
  }
}

table "materials" {
  schema = schema.public
  column "id" {
    type    = uuid
    default = sql("gen_random_uuid()")
  }
  column "name" {
    type = varchar(255)
  }
  column "unit" {
    type = varchar(50)
  }
  column "price" {
    type    = numeric(15, 2)
    default = 0
  }
  column "created_at" {
    type    = timestamptz
    default = sql("now()")
  }
  column "updated_at" {
    type    = timestamptz
    default = sql("now()")
  }
  primary_key {
    columns = [column.id]
  }
}

table "products" {
  schema = schema.public
  column "id" {
    type    = uuid
    default = sql("gen_random_uuid()")
  }
  column "name" {
    type = varchar(255)
  }
  column "sku" {
    type = varchar(100)
    null = true
  }
  column "description" {
    type = text
    null = true
  }
  column "price" {
    type    = numeric(15, 2)
    default = 0
  }
  column "created_at" {
    type    = timestamptz
    default = sql("now()")
  }
  column "updated_at" {
    type    = timestamptz
    default = sql("now()")
  }
  primary_key {
    columns = [column.id]
  }
  index "idx_products_sku" {
    unique  = true
    columns = [column.sku]
  }
}

table "workers" {
  schema = schema.public
  column "id" {
    type    = uuid
    default = sql("gen_random_uuid()")
  }
  column "name" {
    type = varchar(255)
  }
  column "role" {
    type = varchar(100)
    null = true
  }
  column "phone" {
    type = varchar(50)
    null = true
  }
  column "created_at" {
    type    = timestamptz
    default = sql("now()")
  }
  column "updated_at" {
    type    = timestamptz
    default = sql("now()")
  }
  primary_key {
    columns = [column.id]
  }
}

// ============================================================
// BOM (Bill of Materials)
// ============================================================

table "boms" {
  schema = schema.public
  column "id" {
    type    = uuid
    default = sql("gen_random_uuid()")
  }
  column "product_id" {
    type = uuid
  }
  column "name" {
    type = varchar(255)
  }
  column "created_at" {
    type    = timestamptz
    default = sql("now()")
  }
  column "updated_at" {
    type    = timestamptz
    default = sql("now()")
  }
  primary_key {
    columns = [column.id]
  }
  foreign_key "fk_bom_product" {
    columns     = [column.product_id]
    ref_columns = [table.products.column.id]
    on_delete   = CASCADE
  }
}

table "bom_items" {
  schema = schema.public
  column "id" {
    type    = uuid
    default = sql("gen_random_uuid()")
  }
  column "bom_id" {
    type = uuid
  }
  column "material_id" {
    type = uuid
  }
  column "qty" {
    type = numeric(15, 4)
  }
  primary_key {
    columns = [column.id]
  }
  foreign_key "fk_bomitem_bom" {
    columns     = [column.bom_id]
    ref_columns = [table.boms.column.id]
    on_delete   = CASCADE
  }
  foreign_key "fk_bomitem_material" {
    columns     = [column.material_id]
    ref_columns = [table.materials.column.id]
    on_delete   = RESTRICT
  }
}

// ============================================================
// ORDERS & PRODUCTION
// ============================================================

table "orders" {
  schema = schema.public
  column "id" {
    type    = uuid
    default = sql("gen_random_uuid()")
  }
  column "customer_id" {
    type = uuid
  }
  column "order_number" {
    type = varchar(50)
  }
  column "status" {
    type    = enum.order_status
    default = "draft"
  }
  column "deadline" {
    type = date
    null = true
  }
  column "notes" {
    type = text
    null = true
  }
  column "total_amount" {
    type    = numeric(15, 2)
    default = 0
  }
  column "created_at" {
    type    = timestamptz
    default = sql("now()")
  }
  column "updated_at" {
    type    = timestamptz
    default = sql("now()")
  }
  primary_key {
    columns = [column.id]
  }
  foreign_key "fk_order_customer" {
    columns     = [column.customer_id]
    ref_columns = [table.customers.column.id]
    on_delete   = RESTRICT
  }
  index "idx_orders_number" {
    unique  = true
    columns = [column.order_number]
  }
}

table "order_items" {
  schema = schema.public
  column "id" {
    type    = uuid
    default = sql("gen_random_uuid()")
  }
  column "order_id" {
    type = uuid
  }
  column "product_id" {
    type = uuid
  }
  column "qty" {
    type = integer
  }
  column "unit_price" {
    type = numeric(15, 2)
  }
  column "subtotal" {
    type = numeric(15, 2)
  }
  primary_key {
    columns = [column.id]
  }
  foreign_key "fk_item_order" {
    columns     = [column.order_id]
    ref_columns = [table.orders.column.id]
    on_delete   = CASCADE
  }
  foreign_key "fk_item_product" {
    columns     = [column.product_id]
    ref_columns = [table.products.column.id]
    on_delete   = RESTRICT
  }
}

table "productions" {
  schema = schema.public
  column "id" {
    type    = uuid
    default = sql("gen_random_uuid()")
  }
  column "order_id" {
    type = uuid
  }
  column "status" {
    type    = enum.production_status
    default = "cutting"
  }
  column "started_at" {
    type = timestamptz
    null = true
  }
  column "finished_at" {
    type = timestamptz
    null = true
  }
  column "notes" {
    type = text
    null = true
  }
  column "created_at" {
    type    = timestamptz
    default = sql("now()")
  }
  column "updated_at" {
    type    = timestamptz
    default = sql("now()")
  }
  primary_key {
    columns = [column.id]
  }
  foreign_key "fk_production_order" {
    columns     = [column.order_id]
    ref_columns = [table.orders.column.id]
    on_delete   = CASCADE
  }
}

table "production_workers" {
  schema = schema.public
  column "id" {
    type    = uuid
    default = sql("gen_random_uuid()")
  }
  column "production_id" {
    type = uuid
  }
  column "worker_id" {
    type = uuid
  }
  column "assigned_stage" {
    type = enum.production_status
  }
  primary_key {
    columns = [column.id]
  }
  foreign_key "fk_pw_production" {
    columns     = [column.production_id]
    ref_columns = [table.productions.column.id]
    on_delete   = CASCADE
  }
  foreign_key "fk_pw_worker" {
    columns     = [column.worker_id]
    ref_columns = [table.workers.column.id]
    on_delete   = RESTRICT
  }
}

// ============================================================
// PURCHASES
// ============================================================

table "purchases" {
  schema = schema.public
  column "id" {
    type    = uuid
    default = sql("gen_random_uuid()")
  }
  column "supplier_id" {
    type = uuid
  }
  column "purchase_number" {
    type = varchar(50)
  }
  column "status" {
    type    = enum.purchase_status
    default = "draft"
  }
  column "total_amount" {
    type    = numeric(15, 2)
    default = 0
  }
  column "notes" {
    type = text
    null = true
  }
  column "created_at" {
    type    = timestamptz
    default = sql("now()")
  }
  column "updated_at" {
    type    = timestamptz
    default = sql("now()")
  }
  primary_key {
    columns = [column.id]
  }
  foreign_key "fk_purchase_supplier" {
    columns     = [column.supplier_id]
    ref_columns = [table.suppliers.column.id]
    on_delete   = RESTRICT
  }
  index "idx_purchases_number" {
    unique  = true
    columns = [column.purchase_number]
  }
}

table "purchase_items" {
  schema = schema.public
  column "id" {
    type    = uuid
    default = sql("gen_random_uuid()")
  }
  column "purchase_id" {
    type = uuid
  }
  column "material_id" {
    type = uuid
  }
  column "qty" {
    type = numeric(15, 4)
  }
  column "unit_price" {
    type = numeric(15, 2)
  }
  column "subtotal" {
    type = numeric(15, 2)
  }
  primary_key {
    columns = [column.id]
  }
  foreign_key "fk_pi_purchase" {
    columns     = [column.purchase_id]
    ref_columns = [table.purchases.column.id]
    on_delete   = CASCADE
  }
  foreign_key "fk_pi_material" {
    columns     = [column.material_id]
    ref_columns = [table.materials.column.id]
    on_delete   = RESTRICT
  }
}

// ============================================================
// INVENTORY
// ============================================================

table "stocks" {
  schema = schema.public
  column "id" {
    type    = uuid
    default = sql("gen_random_uuid()")
  }
  column "material_id" {
    type = uuid
    null = true
  }
  column "product_id" {
    type = uuid
    null = true
  }
  column "qty" {
    type    = numeric(15, 2)
    default = 0
  }
  column "updated_at" {
    type    = timestamptz
    default = sql("now()")
  }
  primary_key {
    columns = [column.id]
  }
  foreign_key "fk_stock_material" {
    columns     = [column.material_id]
    ref_columns = [table.materials.column.id]
    on_delete   = SET_NULL
  }
  foreign_key "fk_stock_product" {
    columns     = [column.product_id]
    ref_columns = [table.products.column.id]
    on_delete   = SET_NULL
  }
}

table "stock_movements" {
  schema = schema.public
  column "id" {
    type    = uuid
    default = sql("gen_random_uuid()")
  }
  column "stock_id" {
    type = uuid
  }
  column "movement_type" {
    type = enum.movement_type
  }
  column "qty" {
    type = numeric(15, 2)
  }
  column "reference" {
    type = varchar(255)
    null = true
  }
  column "notes" {
    type = text
    null = true
  }
  column "created_at" {
    type    = timestamptz
    default = sql("now()")
  }
  primary_key {
    columns = [column.id]
  }
  foreign_key "fk_movement_stock" {
    columns     = [column.stock_id]
    ref_columns = [table.stocks.column.id]
    on_delete   = CASCADE
  }
}

// ============================================================
// PAYMENTS
// ============================================================

table "payments" {
  schema = schema.public
  column "id" {
    type    = uuid
    default = sql("gen_random_uuid()")
  }
  column "payment_type" {
    type = enum.payment_type
  }
  column "order_id" {
    type = uuid
    null = true
  }
  column "purchase_id" {
    type = uuid
    null = true
  }
  column "amount" {
    type = numeric(15, 2)
  }
  column "method" {
    type = enum.payment_method
  }
  column "reference" {
    type = varchar(255)
    null = true
  }
  column "notes" {
    type = text
    null = true
  }
  column "payment_date" {
    type = date
  }
  column "created_at" {
    type    = timestamptz
    default = sql("now()")
  }
  primary_key {
    columns = [column.id]
  }
  foreign_key "fk_payment_order" {
    columns     = [column.order_id]
    ref_columns = [table.orders.column.id]
    on_delete   = SET_NULL
  }
  foreign_key "fk_payment_purchase" {
    columns     = [column.purchase_id]
    ref_columns = [table.purchases.column.id]
    on_delete   = SET_NULL
  }
}

// ============================================================
// ACCOUNTING
// ============================================================

table "chart_of_accounts" {
  schema = schema.public
  column "id" {
    type    = uuid
    default = sql("gen_random_uuid()")
  }
  column "code" {
    type = varchar(20)
  }
  column "name" {
    type = varchar(255)
  }
  column "type" {
    type = enum.account_type
  }
  column "parent_id" {
    type = uuid
    null = true
  }
  column "is_active" {
    type    = boolean
    default = true
  }
  column "created_at" {
    type    = timestamptz
    default = sql("now()")
  }
  primary_key {
    columns = [column.id]
  }
  foreign_key "fk_coa_parent" {
    columns     = [column.parent_id]
    ref_columns = [table.chart_of_accounts.column.id]
    on_delete   = SET_NULL
  }
  index "idx_coa_code" {
    unique  = true
    columns = [column.code]
  }
}

table "journal_entries" {
  schema = schema.public
  column "id" {
    type    = uuid
    default = sql("gen_random_uuid()")
  }
  column "entry_date" {
    type = date
  }
  column "description" {
    type = text
  }
  column "reference" {
    type = varchar(255)
    null = true
  }
  column "is_auto" {
    type    = boolean
    default = false
  }
  column "created_at" {
    type    = timestamptz
    default = sql("now()")
  }
  primary_key {
    columns = [column.id]
  }
}

table "journal_lines" {
  schema = schema.public
  column "id" {
    type    = uuid
    default = sql("gen_random_uuid()")
  }
  column "journal_entry_id" {
    type = uuid
  }
  column "account_id" {
    type = uuid
  }
  column "debit" {
    type    = numeric(15, 2)
    default = 0
  }
  column "credit" {
    type    = numeric(15, 2)
    default = 0
  }
  column "description" {
    type = text
    null = true
  }
  primary_key {
    columns = [column.id]
  }
  foreign_key "fk_line_journal" {
    columns     = [column.journal_entry_id]
    ref_columns = [table.journal_entries.column.id]
    on_delete   = CASCADE
  }
  foreign_key "fk_line_account" {
    columns     = [column.account_id]
    ref_columns = [table.chart_of_accounts.column.id]
    on_delete   = RESTRICT
  }
}

table "fiscal_periods" {
  schema = schema.public
  column "id" {
    type    = uuid
    default = sql("gen_random_uuid()")
  }
  column "name" {
    type = varchar(255)
  }
  column "start_date" {
    type = date
  }
  column "end_date" {
    type = date
  }
  column "is_closed" {
    type    = boolean
    default = false
  }
  column "closed_at" {
    type = timestamptz
    null = true
  }
  column "created_at" {
    type    = timestamptz
    default = sql("now()")
  }
  primary_key {
    columns = [column.id]
  }
}

table "bank_transactions" {
  schema = schema.public
  column "id" {
    type    = uuid
    default = sql("gen_random_uuid()")
  }
  column "transaction_date" {
    type = date
  }
  column "description" {
    type = text
  }
  column "amount" {
    type = numeric(15, 2)
  }
  column "is_reconciled" {
    type    = boolean
    default = false
  }
  column "journal_entry_id" {
    type = uuid
    null = true
  }
  column "created_at" {
    type    = timestamptz
    default = sql("now()")
  }
  primary_key {
    columns = [column.id]
  }
  foreign_key "fk_bt_journal" {
    columns     = [column.journal_entry_id]
    ref_columns = [table.journal_entries.column.id]
    on_delete   = SET_NULL
  }
}
