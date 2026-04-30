import { render, screen, within } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import AdminLayout, { AdminNotFound } from './AdminLayout'

function renderWithRouter(initialEntry: string) {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<h1>Dashboard</h1>} />
          <Route path="products" element={<h1>Products Page</h1>} />
          <Route path="*" element={<AdminNotFound />} />
        </Route>
      </Routes>
    </MemoryRouter>
  )
}

describe('AdminLayout', () => {
  it('renders the sidebar navigation with all links', () => {
    renderWithRouter('/admin')

    const nav = screen.getByRole('navigation')
    expect(within(nav).getByText('Jaheet')).toBeInTheDocument()
    expect(within(nav).getByText('Dashboard')).toBeInTheDocument()
    expect(within(nav).getByText('Products')).toBeInTheDocument()
    expect(within(nav).getByText('Materials')).toBeInTheDocument()
    expect(within(nav).getByText('Customers')).toBeInTheDocument()
    expect(within(nav).getByText('Suppliers')).toBeInTheDocument()
    expect(within(nav).getByText('Orders')).toBeInTheDocument()
    expect(within(nav).getByText('Stock')).toBeInTheDocument()
    expect(within(nav).getByText('Chart of Accounts')).toBeInTheDocument()
    expect(within(nav).getByText('Journals')).toBeInTheDocument()
    expect(within(nav).getByText('Ledger')).toBeInTheDocument()
    expect(within(nav).getByText('Reports')).toBeInTheDocument()
  })

  it('uses admin-layout className on root div', () => {
    const { container } = renderWithRouter('/admin')
    const wrapper = container.firstElementChild as HTMLElement
    expect(wrapper).toHaveClass('admin-layout')
  })

  it('renders sidebar links with /admin prefix', () => {
    renderWithRouter('/admin')

    const nav = screen.getByRole('navigation')

    const dashboardLink = within(nav).getByText('Dashboard').closest('a')
    expect(dashboardLink).toHaveAttribute('href', '/admin')

    const productsLink = within(nav).getByText('Products').closest('a')
    expect(productsLink).toHaveAttribute('href', '/admin/products')

    const materialsLink = within(nav).getByText('Materials').closest('a')
    expect(materialsLink).toHaveAttribute('href', '/admin/materials')

    const customersLink = within(nav).getByText('Customers').closest('a')
    expect(customersLink).toHaveAttribute('href', '/admin/customers')

    const suppliersLink = within(nav).getByText('Suppliers').closest('a')
    expect(suppliersLink).toHaveAttribute('href', '/admin/suppliers')

    const ordersLink = within(nav).getByText('Orders').closest('a')
    expect(ordersLink).toHaveAttribute('href', '/admin/orders')

    const stockLink = within(nav).getByText('Stock').closest('a')
    expect(stockLink).toHaveAttribute('href', '/admin/stock')

    const coaLink = within(nav).getByText('Chart of Accounts').closest('a')
    expect(coaLink).toHaveAttribute('href', '/admin/accounting/coa')

    const journalsLink = within(nav).getByText('Journals').closest('a')
    expect(journalsLink).toHaveAttribute('href', '/admin/accounting/journals')

    const ledgerLink = within(nav).getByText('Ledger').closest('a')
    expect(ledgerLink).toHaveAttribute('href', '/admin/accounting/ledger')

    const reportsLink = within(nav).getByText('Reports').closest('a')
    expect(reportsLink).toHaveAttribute('href', '/admin/accounting/reports')
  })

  it('renders child route content via Outlet', () => {
    renderWithRouter('/admin')
    const main = document.querySelector('main')!
    expect(within(main).getByRole('heading', { name: 'Dashboard' })).toBeInTheDocument()
  })

  it('renders child route for /admin/products', () => {
    renderWithRouter('/admin/products')
    const main = document.querySelector('main')!
    expect(within(main).getByRole('heading', { name: 'Products Page' })).toBeInTheDocument()
  })

  it('contains a <nav> element for sidebar', () => {
    renderWithRouter('/admin')
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('contains a <main> element for content area', () => {
    renderWithRouter('/admin')
    const main = document.querySelector('main')
    expect(main).toBeInTheDocument()
  })
})

describe('AdminNotFound', () => {
  it('displays "Page Not Found" for undefined admin routes', () => {
    renderWithRouter('/admin/nonexistent-page')
    expect(screen.getByText('Page Not Found')).toBeInTheDocument()
  })

  it('displays "Page Not Found" for deeply nested undefined routes', () => {
    renderWithRouter('/admin/some/deep/path')
    expect(screen.getByText('Page Not Found')).toBeInTheDocument()
  })
})
