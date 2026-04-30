import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import CategorySection from './CategorySection'

describe('CategorySection', () => {
  it('renders a section element with id="category"', () => {
    render(<CategorySection />)
    const section = document.getElementById('category')
    expect(section).toBeInTheDocument()
    expect(section!.tagName).toBe('SECTION')
  })

  it('renders the section title "TOP FASHION CATEGORY"', () => {
    render(<CategorySection />)
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toHaveTextContent('TOP FASHION CATEGORY')
  })

  it('renders at least 3 category cards with correct labels', () => {
    render(<CategorySection />)
    expect(screen.getByText('BLOUSE & TOPS')).toBeInTheDocument()
    expect(screen.getByText('DRESSES')).toBeInTheDocument()
    expect(screen.getByText('JACKETS & COATS')).toBeInTheDocument()
  })

  it('renders placeholder images with role="img" and alt text', () => {
    render(<CategorySection />)
    expect(
      screen.getByRole('img', { name: /blouse and tops category/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('img', { name: /dresses category/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('img', { name: /jackets and coats category/i }),
    ).toBeInTheDocument()
  })

  it('renders left and right navigation arrow buttons', () => {
    render(<CategorySection />)
    expect(
      screen.getByRole('button', { name: /scroll categories left/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /scroll categories right/i }),
    ).toBeInTheDocument()
  })

  it('renders the "EXPLORE →" CTA link', () => {
    render(<CategorySection />)
    const cta = screen.getByRole('link', { name: /EXPLORE →/i })
    expect(cta).toBeInTheDocument()
    expect(cta).toHaveAttribute('href', '#products')
  })

  it('uses aria-labelledby pointing to the heading', () => {
    render(<CategorySection />)
    const section = document.getElementById('category')
    expect(section).toHaveAttribute('aria-labelledby', 'category-heading')

    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toHaveAttribute('id', 'category-heading')
  })

  it('CTA link has visible focus indicator classes', () => {
    render(<CategorySection />)
    const cta = screen.getByRole('link', { name: /EXPLORE →/i })
    expect(cta.className).toContain('focus-visible:ring-2')
  })

  it('CTA link meets minimum touch target size (44x44px)', () => {
    render(<CategorySection />)
    const cta = screen.getByRole('link', { name: /EXPLORE →/i })
    expect(cta.className).toContain('min-h-[44px]')
    expect(cta.className).toContain('min-w-[44px]')
  })

  it('navigation buttons have visible focus indicator classes', () => {
    render(<CategorySection />)
    const leftBtn = screen.getByRole('button', {
      name: /scroll categories left/i,
    })
    const rightBtn = screen.getByRole('button', {
      name: /scroll categories right/i,
    })
    expect(leftBtn.className).toContain('focus-visible:ring-2')
    expect(rightBtn.className).toContain('focus-visible:ring-2')
  })

  it('navigation buttons meet minimum touch target size (44x44px)', () => {
    render(<CategorySection />)
    const leftBtn = screen.getByRole('button', {
      name: /scroll categories left/i,
    })
    const rightBtn = screen.getByRole('button', {
      name: /scroll categories right/i,
    })
    expect(leftBtn.className).toContain('min-h-[44px]')
    expect(leftBtn.className).toContain('min-w-[44px]')
    expect(rightBtn.className).toContain('min-h-[44px]')
    expect(rightBtn.className).toContain('min-w-[44px]')
  })

  it('uses white background', () => {
    render(<CategorySection />)
    const section = document.getElementById('category')
    expect(section!.className).toContain('bg-white')
  })

  it('title has bold font weight', () => {
    render(<CategorySection />)
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading.className).toContain('font-bold')
  })

  it('scroll container uses responsive grid on mobile and flex on desktop', () => {
    render(<CategorySection />)
    const section = document.getElementById('category')
    const scrollContainer = section!.querySelector('[role="list"]')
    expect(scrollContainer).toBeInTheDocument()
    expect(scrollContainer!.className).toContain('grid')
    expect(scrollContainer!.className).toContain('md:flex')
  })

  it('right arrow button calls scrollBy on the scroll container', async () => {
    const user = userEvent.setup()
    render(<CategorySection />)

    const section = document.getElementById('category')
    const scrollContainer = section!.querySelector('[role="list"]')
    const scrollBySpy = vi.fn()
    scrollContainer!.scrollBy = scrollBySpy

    const rightBtn = screen.getByRole('button', {
      name: /scroll categories right/i,
    })
    await user.click(rightBtn)

    expect(scrollBySpy).toHaveBeenCalledWith({
      left: 300,
      behavior: 'smooth',
    })
  })

  it('left arrow button calls scrollBy on the scroll container', async () => {
    const user = userEvent.setup()
    render(<CategorySection />)

    const section = document.getElementById('category')
    const scrollContainer = section!.querySelector('[role="list"]')
    const scrollBySpy = vi.fn()
    scrollContainer!.scrollBy = scrollBySpy

    const leftBtn = screen.getByRole('button', {
      name: /scroll categories left/i,
    })
    await user.click(leftBtn)

    expect(scrollBySpy).toHaveBeenCalledWith({
      left: -300,
      behavior: 'smooth',
    })
  })

  it('each category card has a list item role', () => {
    render(<CategorySection />)
    const items = screen.getAllByRole('listitem')
    expect(items.length).toBeGreaterThanOrEqual(3)
  })

  it('navigation arrow buttons contain SVG chevron icons', () => {
    render(<CategorySection />)
    const leftBtn = screen.getByRole('button', {
      name: /scroll categories left/i,
    })
    const rightBtn = screen.getByRole('button', {
      name: /scroll categories right/i,
    })
    expect(leftBtn.querySelector('svg')).toBeInTheDocument()
    expect(rightBtn.querySelector('svg')).toBeInTheDocument()
  })
})
