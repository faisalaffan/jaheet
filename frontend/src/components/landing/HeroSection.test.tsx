import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import HeroSection from './HeroSection'

describe('HeroSection', () => {
  it('renders a section element with id="home"', () => {
    render(<HeroSection />)
    const section = document.getElementById('home')
    expect(section).toBeInTheDocument()
    expect(section!.tagName).toBe('SECTION')
  })

  it('renders the bold headline text', () => {
    render(<HeroSection />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent(
      'SHAPING A NEW ERA OF STYLE AND SOPHISTICATION',
    )
  })

  it('renders a subtitle describing the Jaheet brand', () => {
    render(<HeroSection />)
    expect(screen.getByText(/Jaheet brings you/i)).toBeInTheDocument()
  })

  it('renders the CTA button with correct text', () => {
    render(<HeroSection />)
    const cta = screen.getByRole('link', { name: /GO EXPLORE →/i })
    expect(cta).toBeInTheDocument()
    expect(cta).toHaveAttribute('href', '#products')
  })

  it('renders a placeholder hero image with alt text', () => {
    render(<HeroSection />)
    const img = screen.getByRole('img', {
      name: /hero image showcasing jaheet fashion collection/i,
    })
    expect(img).toBeInTheDocument()
  })

  it('uses beige/tan background color', () => {
    render(<HeroSection />)
    const section = document.getElementById('home')
    expect(section!.className).toContain('bg-[#f5f0eb]')
  })

  it('has padding-top to account for fixed navbar', () => {
    render(<HeroSection />)
    const section = document.getElementById('home')
    expect(section!.className).toContain('pt-20')
  })

  it('uses aria-labelledby pointing to the heading', () => {
    render(<HeroSection />)
    const section = document.getElementById('home')
    expect(section).toHaveAttribute('aria-labelledby', 'hero-heading')

    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveAttribute('id', 'hero-heading')
  })

  it('CTA button has visible focus indicator classes', () => {
    render(<HeroSection />)
    const cta = screen.getByRole('link', { name: /GO EXPLORE →/i })
    expect(cta.className).toContain('focus-visible:ring-2')
  })

  it('CTA button meets minimum touch target size (44x44px)', () => {
    render(<HeroSection />)
    const cta = screen.getByRole('link', { name: /GO EXPLORE →/i })
    expect(cta.className).toContain('min-h-[44px]')
    expect(cta.className).toContain('min-w-[44px]')
  })

  it('uses responsive flex layout (column on mobile, row on desktop)', () => {
    render(<HeroSection />)
    const section = document.getElementById('home')
    const container = section!.querySelector(':scope > div')
    expect(container!.className).toContain('flex-col')
    expect(container!.className).toContain('md:flex-row')
  })

  it('headline has bold font weight', () => {
    render(<HeroSection />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading.className).toContain('font-bold')
  })
})
