import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import CollectionSection from './CollectionSection'

describe('CollectionSection', () => {
  it('renders a section element with id="collection"', () => {
    render(<CollectionSection />)
    const section = document.getElementById('collection')
    expect(section).toBeInTheDocument()
    expect(section!.tagName).toBe('SECTION')
  })

  it('renders the title text', () => {
    render(<CollectionSection />)
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toHaveTextContent(
      'ELEVATE YOUR STYLE WITH OUR NEW COLLECTION',
    )
  })

  it('renders a descriptive paragraph about the new collection', () => {
    render(<CollectionSection />)
    expect(
      screen.getByText(/discover our latest collection/i),
    ).toBeInTheDocument()
  })

  it('renders the CTA button with correct text', () => {
    render(<CollectionSection />)
    const cta = screen.getByRole('link', { name: /DISCOVER COLLECTION →/i })
    expect(cta).toBeInTheDocument()
    expect(cta).toHaveAttribute('href', '#products')
  })

  it('renders a placeholder collection image with alt text', () => {
    render(<CollectionSection />)
    const img = screen.getByRole('img', {
      name: /new collection showcase image/i,
    })
    expect(img).toBeInTheDocument()
  })

  it('uses beige/tan background color', () => {
    render(<CollectionSection />)
    const section = document.getElementById('collection')
    expect(section!.className).toContain('bg-[#f5f0eb]')
  })

  it('uses aria-labelledby pointing to the heading', () => {
    render(<CollectionSection />)
    const section = document.getElementById('collection')
    expect(section).toHaveAttribute('aria-labelledby', 'collection-heading')

    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toHaveAttribute('id', 'collection-heading')
  })

  it('CTA button has visible focus indicator classes', () => {
    render(<CollectionSection />)
    const cta = screen.getByRole('link', { name: /DISCOVER COLLECTION →/i })
    expect(cta.className).toContain('focus-visible:ring-2')
  })

  it('CTA button meets minimum touch target size (44x44px)', () => {
    render(<CollectionSection />)
    const cta = screen.getByRole('link', { name: /DISCOVER COLLECTION →/i })
    expect(cta.className).toContain('min-h-[44px]')
    expect(cta.className).toContain('min-w-[44px]')
  })

  it('uses responsive flex layout (column on mobile, row on desktop)', () => {
    render(<CollectionSection />)
    const section = document.getElementById('collection')
    const container = section!.querySelector(':scope > div')
    expect(container!.className).toContain('flex-col')
    expect(container!.className).toContain('md:flex-row')
  })

  it('title has bold font weight', () => {
    render(<CollectionSection />)
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading.className).toContain('font-bold')
  })

  it('split layout has text on left and image on right', () => {
    render(<CollectionSection />)
    const section = document.getElementById('collection')
    const container = section!.querySelector(':scope > div')
    const children = container!.children
    // First child is text content, second is image
    expect(children.length).toBe(2)
    expect(children[0]!.querySelector('h2')).toBeInTheDocument()
    expect(children[1]!.querySelector('[role="img"]')).toBeInTheDocument()
  })
})
