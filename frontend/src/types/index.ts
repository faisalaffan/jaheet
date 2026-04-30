// Master Data
export interface Product {
  id: string
  name: string
  sku?: string
  description?: string
  price: number
  created_at: string
  updated_at: string
}

export interface Material {
  id: string
  name: string
  unit: string
  price: number
  created_at: string
  updated_at: string
}

export interface Customer {
  id: string
  name: string
  phone?: string
  email?: string
  address?: string
  created_at: string
  updated_at: string
}

export interface Supplier {
  id: string
  name: string
  phone?: string
  email?: string
  address?: string
  created_at: string
  updated_at: string
}

// Orders
export type OrderStatus = 'draft' | 'confirmed' | 'in_production' | 'completed' | 'cancelled'
export type ProductionStatus = 'cutting' | 'sewing' | 'finishing' | 'qc' | 'done'

export interface Order {
  id: string
  customer_id: string
  order_number: string
  status: OrderStatus
  deadline?: string
  notes?: string
  total_amount: number
  items?: OrderItem[]
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  qty: number
  unit_price: number
  subtotal: number
}

// Accounting
export type AccountType = 'asset' | 'liability' | 'equity' | 'revenue' | 'expense'

export interface ChartOfAccount {
  id: string
  code: string
  name: string
  type: AccountType
  parent_id?: string
  is_active: boolean
  created_at: string
}

export interface JournalEntry {
  id: string
  entry_date: string
  description: string
  reference?: string
  lines?: JournalLine[]
  created_at: string
}

export interface JournalLine {
  id: string
  journal_entry_id: string
  account_id: string
  debit: number
  credit: number
  description?: string
}
