import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import FeaturedProductSection from './FeaturedProductSection'

// Mock the api module
vi.mock('@/lib/api', () => ({
  default: {
    get: vi.fn(),
  },
}))

import api from '@/lib/api'

const mockedGet = vi.mocked(api.get)

const mockProducts = [
  { id: '1', name: 'Kemeja Batik', price: 150000, created_at: '', updated_at: '' },
  { id: '2', name: 'Celana Chino', price: 200000, created_at: '', updated_at: '' },
  { id: '3', name: 'Jaket Denim', price: 350000, created_at: '', updated_at: '' },
  { id: '4', name: 'Kaos Polos', price: 75000, created_at: '', updated_at: '' },
  { id: '5', name: 'Rok Plisket', price: 180000, created_at: '', updated_at: '' },
]

function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  })
}

function renderWithQuery(ui: React.ReactElement) {
  const queryClient = createQueryClient()
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  )
}

describe('FeaturedProductSection', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders section title "FEATURED PRODUCT"', async () => {
    mockedGet.mockResolvedValueOnce({ data: mockProducts })
    renderWithQuery(<FeaturedProductSection />)
    expect(screen.getByText('FEATURED PRODUCT')).toBeInTheDocument()
  })

  it('renders filter tabs: All, NEW ARRIVALS, RECOMMENDED PICKS', async () => {
    mockedGet.mockResolvedValueOnce({ data: mockProducts })
    renderWithQuery(<FeaturedProductSection />)
    expect(screen.getByRole('tab', { name: 'All' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'NEW ARRIVALS' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'RECOMMENDED PICKS' })).toBeInTheDocument()
  })

  it('shows "All" tab as active by default', async () => {
    mockedGet.mockResolvedValueOnce({ data: mockProducts })
    renderWithQuery(<FeaturedProductSection />)
    const allTab = screen.getByRole('tab', { name: 'All' })
    expect(allTab).toHaveAttribute('aria-selected', 'true')
  })

  it('changes active tab visual indicator when clicked', async () => {
    mockedGet.mockResolvedValueOnce({ data: mockProducts })
    const user = userEvent.setup()
    renderWithQuery(<FeaturedProductSection />)

    const newArrivalsTab = screen.getByRole('tab', { name: 'NEW ARRIVALS' })
    await user.click(newArrivalsTab)

    expect(newArrivalsTab).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('tab', { name: 'All' })).toHaveAttribute('aria-selected', 'false')
  })

  it('displays loading skeletons while fetching data', () => {
    // Never resolve — keeps loading state
    mockedGet.mockReturnValueOnce(new Promise(() => {}))
    renderWithQuery(<FeaturedProductSection />)

    const skeletons = document.querySelectorAll('.animate-pulse')
    expect(skeletons.length).toBe(4)
  })

  it('displays up to 4 product cards after data loads', async () => {
    mockedGet.mockResolvedValueOnce({ data: mockProducts })
    renderWithQuery(<FeaturedProductSection />)

    await waitFor(() => {
      expect(screen.getByText('Kemeja Batik')).toBeInTheDocument()
    })

    // Should show exactly 4 products (sliced from 5)
    expect(screen.getByText('Kemeja Batik')).toBeInTheDocument()
    expect(screen.getByText('Celana Chino')).toBeInTheDocument()
    expect(screen.getByText('Jaket Denim')).toBeInTheDocument()
    expect(screen.getByText('Kaos Polos')).toBeInTheDocument()
    expect(screen.queryByText('Rok Plisket')).not.toBeInTheDocument()
  })

  it('displays error fallback message when API fails', async () => {
    mockedGet.mockRejectedValueOnce(new Error('Network error'))
    renderWithQuery(<FeaturedProductSection />)

    await waitFor(() => {
      expect(
        screen.getByText('Unable to load products. Please try again later.'),
      ).toBeInTheDocument()
    })
  })

  it('renders error message with alert role for accessibility', async () => {
    mockedGet.mockRejectedValueOnce(new Error('Network error'))
    renderWithQuery(<FeaturedProductSection />)

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })
  })

  it('renders "SEE MORE PRODUCTS →" CTA link', async () => {
    mockedGet.mockResolvedValueOnce({ data: mockProducts })
    renderWithQuery(<FeaturedProductSection />)
    expect(screen.getByText('SEE MORE PRODUCTS →')).toBeInTheDocument()
  })

  it('has id="products" on the section for anchor navigation', async () => {
    mockedGet.mockResolvedValueOnce({ data: mockProducts })
    const { container } = renderWithQuery(<FeaturedProductSection />)
    expect(container.querySelector('section#products')).toBeInTheDocument()
  })

  it('fetches data from /products endpoint', async () => {
    mockedGet.mockResolvedValueOnce({ data: mockProducts })
    renderWithQuery(<FeaturedProductSection />)

    await waitFor(() => {
      expect(mockedGet).toHaveBeenCalledWith('/products')
    })
  })

  it('renders tablist with proper aria label', async () => {
    mockedGet.mockResolvedValueOnce({ data: mockProducts })
    renderWithQuery(<FeaturedProductSection />)
    expect(screen.getByRole('tablist', { name: 'Product filter tabs' })).toBeInTheDocument()
  })
})
