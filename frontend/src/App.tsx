import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ProductsPage from './pages/Products'

const queryClient = new QueryClient()

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <nav style={{ width: 220, padding: 16, background: '#1a1a2e', color: '#fff' }}>
        <h2 style={{ margin: '0 0 24px' }}>Jaheet</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li><Link to="/" style={{ color: '#eee' }}>Dashboard</Link></li>
          <li><Link to="/products" style={{ color: '#eee' }}>Products</Link></li>
          <li><Link to="/materials" style={{ color: '#eee' }}>Materials</Link></li>
          <li><Link to="/customers" style={{ color: '#eee' }}>Customers</Link></li>
          <li><Link to="/suppliers" style={{ color: '#eee' }}>Suppliers</Link></li>
          <li><Link to="/orders" style={{ color: '#eee' }}>Orders</Link></li>
          <li><Link to="/stock" style={{ color: '#eee' }}>Stock</Link></li>
          <li style={{ marginTop: 16, fontWeight: 'bold', color: '#aaa' }}>Accounting</li>
          <li><Link to="/accounting/coa" style={{ color: '#eee' }}>Chart of Accounts</Link></li>
          <li><Link to="/accounting/journals" style={{ color: '#eee' }}>Journals</Link></li>
          <li><Link to="/accounting/ledger" style={{ color: '#eee' }}>Ledger</Link></li>
          <li><Link to="/accounting/reports" style={{ color: '#eee' }}>Reports</Link></li>
        </ul>
      </nav>
      <main style={{ flex: 1, padding: 24 }}>
        {children}
      </main>
    </div>
  )
}

function Dashboard() {
  return <h1>Dashboard</h1>
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<ProductsPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
