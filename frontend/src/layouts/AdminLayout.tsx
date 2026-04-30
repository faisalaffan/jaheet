import { Link, Outlet } from 'react-router-dom'

export default function AdminLayout() {
  return (
    <div className="admin-layout" style={{ display: 'flex', minHeight: '100vh' }}>
      <nav style={{ width: 220, padding: 16, background: '#1a1a2e', color: '#fff' }}>
        <h2 style={{ margin: '0 0 24px' }}>Jaheet</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li><Link to="/admin" style={{ color: '#eee' }}>Dashboard</Link></li>
          <li><Link to="/admin/products" style={{ color: '#eee' }}>Products</Link></li>
          <li><Link to="/admin/materials" style={{ color: '#eee' }}>Materials</Link></li>
          <li><Link to="/admin/customers" style={{ color: '#eee' }}>Customers</Link></li>
          <li><Link to="/admin/suppliers" style={{ color: '#eee' }}>Suppliers</Link></li>
          <li><Link to="/admin/orders" style={{ color: '#eee' }}>Orders</Link></li>
          <li><Link to="/admin/stock" style={{ color: '#eee' }}>Stock</Link></li>
          <li style={{ marginTop: 16, fontWeight: 'bold', color: '#aaa' }}>Accounting</li>
          <li><Link to="/admin/accounting/coa" style={{ color: '#eee' }}>Chart of Accounts</Link></li>
          <li><Link to="/admin/accounting/journals" style={{ color: '#eee' }}>Journals</Link></li>
          <li><Link to="/admin/accounting/ledger" style={{ color: '#eee' }}>Ledger</Link></li>
          <li><Link to="/admin/accounting/reports" style={{ color: '#eee' }}>Reports</Link></li>
        </ul>
      </nav>
      <main style={{ flex: 1, padding: 24 }}>
        <Outlet />
      </main>
    </div>
  )
}

export function AdminNotFound() {
  return <h1>Page Not Found</h1>
}
