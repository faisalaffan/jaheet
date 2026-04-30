import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import BrandDescription from './BrandDescription'

describe('BrandDescription', () => {
  it('renders a section element with id="about"', () => {
    render(<BrandDescription />)
    const section = document.getElementById('about')
    expect(section).toBeInTheDocument()
    expect(section!.tagName).toBe('SECTION')
  })

  it('renders a heading for the section', () => {
    render(<BrandDescription />)
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toBeInTheDocument()
  })

  it('uses aria-labelledby pointing to the heading', () => {
    render(<BrandDescription />)
    const section = document.getElementById('about')
    expect(section).toHaveAttribute('aria-labelledby', 'brand-description-heading')

    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toHaveAttribute('id', 'brand-description-heading')
  })

  it('renders description text about Jaheet fashion offerings', () => {
    render(<BrandDescription />)
    expect(
      screen.getByText(/clothing and convection craftsmanship/i),
    ).toBeInTheDocument()
  })

  it('highlights the brand name "Jaheet" in bold', () => {
    render(<BrandDescription />)
    const strong = screen.getByText('Jaheet')
    expect(strong.tagName).toBe('STRONG')
    expect(strong.className).toContain('font-bold')
  })

  it('uses centered text layout', () => {
    render(<BrandDescription />)
    const section = document.getElementById('about')
    const container = section!.querySelector(':scope > div')
    expect(container!.className).toContain('text-center')
  })

  it('constrains text width for readability with max-w', () => {
    render(<BrandDescription />)
    const section = document.getElementById('about')
    const container = section!.querySelector(':scope > div')
    expect(container!.className).toContain('max-w-3xl')
  })

  it('uses white background', () => {
    render(<BrandDescription />)
    const section = document.getElementById('about')
    expect(section!.className).toContain('bg-white')
  })

  it('has generous padding', () => {
    render(<BrandDescription />)
    const section = document.getElementById('about')
    expect(section!.className).toContain('py-16')
  })
})
