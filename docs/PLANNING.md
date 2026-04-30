# Jaheet — Clothing & Convection App

## Overview

Aplikasi untuk mengelola bisnis clothing & konveksi, dengan modul accounting terintegrasi.

## Tech Stack

| Layer       | Choice                        |
| ----------- | ----------------------------- |
| Backend     | Go, Chi router                |
| Frontend    | React, TypeScript, Vite       |
| Database    | PostgreSQL                    |
| Migration   | Atlas (HCL)                   |
| Auth        | JWT                           |

## Domain Modules

### 1. Master Data
- Product — produk jadi (kaos, jaket, hoodie, dll)
- Material — bahan baku (kain, benang, kancing, dll)
- Customer — pelanggan / pemesan konveksi
- Supplier — pemasok bahan baku

### 2. Order & Production
- Order — pesanan dari customer (qty, desain, deadline)
- Order Item — detail item per order
- Production — tracking proses produksi (cutting → sewing → finishing → QC → done)

### 3. Inventory
- Stock — stok bahan baku & barang jadi
- Stock Movement — mutasi masuk/keluar

### 4. Accounting
- Chart of Account (CoA) — daftar akun (asset, liability, equity, revenue, expense)
- Journal Entry — jurnal umum (debit/credit)
- Journal Line — detail baris per jurnal
- Ledger view — buku besar
- Reports: Balance Sheet, Income Statement

## API Endpoints

| Method | Path                                        | Description          |
| ------ | ------------------------------------------- | -------------------- |
| CRUD   | `/api/v1/products`                          | Produk               |
| CRUD   | `/api/v1/materials`                         | Bahan baku           |
| CRUD   | `/api/v1/customers`                         | Pelanggan            |
| CRUD   | `/api/v1/suppliers`                         | Supplier             |
| CRUD   | `/api/v1/orders`                            | Pesanan              |
| PUT    | `/api/v1/orders/:id/production`             | Update produksi      |
| GET    | `/api/v1/stock`                             | Stok                 |
| POST   | `/api/v1/stock/movements`                   | Mutasi stok          |
| CRUD   | `/api/v1/accounting/coa`                    | Chart of Accounts    |
| POST   | `/api/v1/accounting/journals`               | Buat jurnal          |
| GET    | `/api/v1/accounting/ledger`                 | Buku besar           |
| GET    | `/api/v1/accounting/reports/balance-sheet`  | Neraca               |
| GET    | `/api/v1/accounting/reports/income-statement` | Laba Rugi          |
