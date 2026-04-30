---
name: task-04-bom
description: "Task 4: Bill of Materials management — define materials and quantities needed per product. Use when implementing BOM features."
---

# Task 4: BOM (Bill of Materials)

## Objective
Implement BOM CRUD — define which materials (and quantities) are needed to produce a product.

## Backend
- BOM repository + service + handler
- A BOM belongs to a product (product_id FK)
- BOM items: material_id + qty per unit of product
- Calculate total material cost per product unit (sum of item.qty × material.price)

### API
- `GET /api/v1/products/{id}/bom` — Get BOM for product (with items + material details)
- `POST /api/v1/products/{id}/bom` — Create BOM for product
- `POST /api/v1/bom/{id}/items` — Add item to BOM
- `PUT /api/v1/bom/{id}/items/{itemId}` — Update BOM item qty
- `DELETE /api/v1/bom/{id}/items/{itemId}` — Remove BOM item

## Frontend
- BOM section on Product detail page (or separate /products/{id}/bom route)
- Table of BOM items: material name, unit, qty, unit cost, line cost
- Add item form: select material, enter qty
- Show total material cost per product unit
- Edit qty inline or via dialog

## Verification
- Create BOM for a product with 3 materials
- Verify retrieval returns all items with correct quantities
- Verify total cost calculation
