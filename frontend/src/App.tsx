import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import PublicLayout from './layouts/PublicLayout'
import AdminLayout, { AdminNotFound } from './layouts/AdminLayout'
import LandingPage from './pages/LandingPage'
import ProductsPage from './pages/Products'

const queryClient = new QueryClient()

function Dashboard() {
  return <h1>Dashboard</h1>
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicLayout><LandingPage /></PublicLayout>} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="*" element={<AdminNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
