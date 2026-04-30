import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Footer from './Footer'

describe('Footer', () => {
  it('renders a semantic <footer> element', () => {
    render(<Footer />)
    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeInTheDocument()
    expect(footer.tagName).toBe('FOOTER')
  })

  it('has id="contact" for anchor navigation', () => {
    render(<Footer />)
    const footer = document.getElementById('contact')
    expect(footer).toBeInTheDocument()
    expect(footer!.tagName).toBe('FOOTER')
  })

  it('uses a dark background', () => {
    render(<Footer />)
    const footer = screen.getByRole('contentinfo')
    expect(footer.className).toContain('bg-gray-900')
  })

  it('renders the GENERAL column with correct links', () => {
    render(<Footer />)
    expect(screen.getByText('GENERAL')).toBeInTheDocument()
    expect(screen.getByText('About Us')).toBeInTheDocument()
    expect(screen.getByText('Career')).toBeInTheDocument()
    expect(screen.getByText('Contact Us')).toBeInTheDocument()
  })

  it('renders the PRODUCTS column with correct links', () => {
    render(<Footer />)
    expect(screen.getByText('PRODUCTS')).toBeInTheDocument()
    expect(screen.getByText('New Arrivals')).toBeInTheDocument()
    expect(screen.getByText('Best Sellers')).toBeInTheDocument()
    expect(screen.getByText('Sale')).toBeInTheDocument()
  })

  it('renders the CUSTOMER SERVICE column with correct links', () => {
    render(<Footer />)
    expect(screen.getByText('CUSTOMER SERVICE')).toBeInTheDocument()
    expect(screen.getByText('FAQ')).toBeInTheDocument()
    expect(screen.getByText('Shipping')).toBeInTheDocument()
    expect(screen.getByText('Returns')).toBeInTheDocument()
  })

  it('renders the SOCIAL MEDIA column with correct links', () => {
    render(<Footer />)
    expect(screen.getByText('SOCIAL MEDIA')).toBeInTheDocument()
    expect(screen.getByText('Instagram')).toBeInTheDocument()
    expect(screen.getByText('Facebook')).toBeInTheDocument()
    expect(screen.getByText('Twitter')).toBeInTheDocument()
  })

  it('renders 4 column headings', () => {
    render(<Footer />)
    const headings = screen.getAllByRole('heading', { level: 3 })
    expect(headings).toHaveLength(4)
    expect(headings[0]).toHaveTextContent('GENERAL')
    expect(headings[1]).toHaveTextContent('PRODUCTS')
    expect(headings[2]).toHaveTextContent('CUSTOMER SERVICE')
    expect(headings[3]).toHaveTextContent('SOCIAL MEDIA')
  })

  it('renders all links as anchor elements with href="#"', () => {
    render(<Footer />)
    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(12)
    links.forEach((link) => {
      expect(link).toHaveAttribute('href', '#')
    })
  })

  it('renders the JAHEET brand watermark text', () => {
    render(<Footer />)
    expect(screen.getByText('JAHEET')).toBeInTheDocument()
  })

  it('marks the watermark as aria-hidden', () => {
    render(<Footer />)
    const watermark = screen.getByText('JAHEET')
    expect(watermark).toHaveAttribute('aria-hidden', 'true')
  })

  it('uses a responsive grid layout for columns', () => {
    render(<Footer />)
    const footer = screen.getByRole('contentinfo')
    const grid = footer.querySelector('.grid')
    expect(grid).toBeInTheDocument()
    expect(grid!.className).toContain('grid-cols-1')
    expect(grid!.className).toContain('lg:grid-cols-4')
  })
})
