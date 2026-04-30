import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CatalogSection from './CatalogSection'

describe('CatalogSection', () => {
  it('renders a section element with id="catalog"', () => {
    render(<CatalogSection />)
    const section = document.getElementById('catalog')
    expect(section).toBeInTheDocument()
    expect(section!.tagName).toBe('SECTION')
  })

  it('renders the title "EXPLORE OUR FASHION CATALOG"', () => {
    render(<CatalogSection />)
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toHaveTextContent('EXPLORE OUR FASHION CATALOG')
  })

  it('renders a subtitle inviting visitors to browse the catalog', () => {
    render(<CatalogSection />)
    expect(
      screen.getByText(/browse our curated collection/i),
    ).toBeInTheDocument()
  })

  it('uses a dark background for visual depth', () => {
    render(<CatalogSection />)
    const section = document.getElementById('catalog')
    expect(section!.className).toContain('bg-gray-900')
  })

  it('has a gradient overlay element for visual depth', () => {
    render(<CatalogSection />)
    const section = document.getElementById('catalog')
    const overlay = section!.querySelector('.bg-linear-to-br')
    expect(overlay).toBeInTheDocument()
  })

  it('is a full-width section', () => {
    render(<CatalogSection />)
    const section = document.getElementById('catalog')
    expect(section!.className).toContain('w-full')
  })

  it('uses aria-labelledby pointing to the heading', () => {
    render(<CatalogSection />)
    const section = document.getElementById('catalog')
    expect(section).toHaveAttribute('aria-labelledby', 'catalog-heading')

    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toHaveAttribute('id', 'catalog-heading')
  })

  it('title uses white text color', () => {
    render(<CatalogSection />)
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading.className).toContain('text-white')
  })

  it('title has bold font weight', () => {
    render(<CatalogSection />)
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading.className).toContain('font-bold')
  })

  it('content is centered within the section', () => {
    render(<CatalogSection />)
    const section = document.getElementById('catalog')
    const contentWrapper = section!.querySelector('.text-center')
    expect(contentWrapper).toBeInTheDocument()
  })
})
