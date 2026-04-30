import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import LookSection from './LookSection'

describe('LookSection', () => {
  it('renders a section element with id="look"', () => {
    render(<LookSection />)
    const section = document.getElementById('look')
    expect(section).toBeInTheDocument()
    expect(section!.tagName).toBe('SECTION')
  })

  it('renders the section title "ITEM IN THIS LOOK"', () => {
    render(<LookSection />)
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toHaveTextContent('ITEM IN THIS LOOK')
  })

  it('uses aria-labelledby pointing to the heading', () => {
    render(<LookSection />)
    const section = document.getElementById('look')
    expect(section).toHaveAttribute('aria-labelledby', 'look-heading')

    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toHaveAttribute('id', 'look-heading')
  })

  it('renders a large model photo placeholder with alt text', () => {
    render(<LookSection />)
    const img = screen.getByRole('img', {
      name: /model wearing the complete look/i,
    })
    expect(img).toBeInTheDocument()
  })

  it('renders at least 3 items in the item list', () => {
    render(<LookSection />)
    const list = screen.getByRole('list', { name: /items in this look/i })
    const items = list.querySelectorAll('li')
    expect(items.length).toBeGreaterThanOrEqual(3)
  })

  it('renders each item with a thumbnail, name, and price', () => {
    render(<LookSection />)
    // Check item names
    expect(screen.getByText('Silk Blouse')).toBeInTheDocument()
    expect(screen.getByText('Tailored Trousers')).toBeInTheDocument()
    expect(screen.getByText('Leather Belt')).toBeInTheDocument()

    // Check prices are formatted in Rupiah
    expect(screen.getByText(/Rp\s*450\.000/)).toBeInTheDocument()
    expect(screen.getByText(/Rp\s*650\.000/)).toBeInTheDocument()
    expect(screen.getByText(/Rp\s*275\.000/)).toBeInTheDocument()

    // Check thumbnails (role="img" with item name as label)
    expect(screen.getByRole('img', { name: 'Silk Blouse' })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Tailored Trousers' })).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Leather Belt' })).toBeInTheDocument()
  })

  it('uses beige/tan background color', () => {
    render(<LookSection />)
    const section = document.getElementById('look')
    expect(section!.className).toContain('bg-[#f5f0eb]')
  })

  it('uses responsive flex layout (column on mobile, row on desktop)', () => {
    render(<LookSection />)
    const section = document.getElementById('look')
    const container = section!.querySelector(':scope > div')
    expect(container!.className).toContain('flex-col')
    expect(container!.className).toContain('md:flex-row')
  })

  it('model photo is first child (top on mobile, left on desktop)', () => {
    render(<LookSection />)
    const section = document.getElementById('look')
    const container = section!.querySelector(':scope > div')
    const children = container!.children
    // First child contains the model photo
    expect(children[0]!.querySelector('[role="img"]')).toBeInTheDocument()
    // Second child contains the item list
    expect(children[1]!.querySelector('h2')).toBeInTheDocument()
  })

  it('title has bold font weight', () => {
    render(<LookSection />)
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading.className).toContain('font-bold')
  })
})
