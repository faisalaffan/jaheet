import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import api from '@/lib/api'
import type { Product } from '@/types'

export default function ProductsPage() {
  const queryClient = useQueryClient()
  const [form, setForm] = useState({ name: '', sku: '', description: '', price: 0 })

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: () => api.get('/products').then(r => r.data),
  })

  const create = useMutation({
    mutationFn: (data: typeof form) => api.post('/products', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      setForm({ name: '', sku: '', description: '', price: 0 })
    },
  })

  const remove = useMutation({
    mutationFn: (id: string) => api.delete(`/products/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  })

  if (isLoading) return <p>Loading...</p>

  return (
    <div>
      <h1>Products</h1>

      <form onSubmit={e => { e.preventDefault(); create.mutate(form) }} style={{ marginBottom: 24 }}>
        <input placeholder="Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
        <input placeholder="SKU" value={form.sku} onChange={e => setForm(f => ({ ...f, sku: e.target.value }))} />
        <input placeholder="Price" type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: +e.target.value }))} />
        <button type="submit">Add Product</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>SKU</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products?.map(p => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.sku}</td>
              <td>{p.price.toLocaleString('id-ID')}</td>
              <td><button onClick={() => remove.mutate(p.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
