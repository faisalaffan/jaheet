import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { describe, it, expect, vi } from 'vitest'
import LandingPage from './LandingPage'

// Mock the api module used by FeaturedProductSection
vi.mock('@/lib/api', () => ({
  default: {
    get: vi.fn().mockResolvedValue({ data: [] }),
  },
}))

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

describe('LandingPage', () => {
  it('renders the Navbar', () => {
    renderWithQuery(<LandingPage />)
    expect(
      screen.getByRole('navigation', { name: 'Main navigation' }),
    ).toBeInTheDocument()
  })

  it('renders the HeroSection with id="home"', () => {
    const { container } = renderWithQuery(<LandingPage />)
    expect(container.querySelector('section#home')).toBeInTheDocument()
  })

  it('renders the BrandDescription with id="about"', () => {
    const { container } = renderWithQuery(<LandingPage />)
    expect(container.querySelector('section#about')).toBeInTheDocument()
  })

  it('renders the FeaturedProductSection with id="products"', () => {
    const { container } = renderWithQuery(<LandingPage />)
    expect(container.querySelector('section#products')).toBeInTheDocument()
  })

  it('renders the CollectionSection with id="collection"', () => {
    const { container } = renderWithQuery(<LandingPage />)
    expect(container.querySelector('section#collection')).toBeInTheDocument()
  })

  it('renders the CategorySection with id="category"', () => {
    const { container } = renderWithQuery(<LandingPage />)
    expect(container.querySelector('section#category')).toBeInTheDocument()
  })

  it('renders the LookSection with id="look"', () => {
    const { container } = renderWithQuery(<LandingPage />)
    expect(container.querySelector('section#look')).toBeInTheDocument()
  })

  it('renders the CatalogSection with id="catalog"', () => {
    const { container } = renderWithQuery(<LandingPage />)
    expect(container.querySelector('section#catalog')).toBeInTheDocument()
  })

  it('renders the Footer with id="contact"', () => {
    const { container } = renderWithQuery(<LandingPage />)
    expect(container.querySelector('footer#contact')).toBeInTheDocument()
  })

  it('renders all sections in correct order', () => {
    const { container } = renderWithQuery(<LandingPage />)
    const sections = container.querySelectorAll('section, nav, footer')
    const ids = Array.from(sections).map((el) => el.id || el.tagName.toLowerCase())

    expect(ids).toEqual([
      'nav',           // Navbar (no id, uses nav tag)
      'home',          // HeroSection
      'about',         // BrandDescription
      'products',      // FeaturedProductSection
      'collection',    // CollectionSection
      'category',      // CategorySection
      'look',          // LookSection
      'catalog',       // CatalogSection
      'contact',       // Footer
    ])
  })

  it('uses semantic HTML structure with nav and footer elements', () => {
    const { container } = renderWithQuery(<LandingPage />)
    expect(container.querySelector('nav')).toBeInTheDocument()
    expect(container.querySelector('footer')).toBeInTheDocument()
  })

  it('renders section elements for content areas', () => {
    const { container } = renderWithQuery(<LandingPage />)
    const sectionElements = container.querySelectorAll('section')
    // HeroSection, BrandDescription, FeaturedProductSection, CollectionSection,
    // CategorySection, LookSection, CatalogSection = 7 sections
    expect(sectionElements.length).toBe(7)
  })
})
