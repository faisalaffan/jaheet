import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ProductCard from './ProductCard'

describe('ProductCard', () => {
  const defaultProps = { name: 'Kemeja Batik', price: 150000 }

  it('renders product name', () => {
    render(<ProductCard {...defaultProps} />)
    expect(screen.getByText('Kemeja Batik')).toBeInTheDocument()
  })

  it('renders price formatted in Indonesian Rupiah', () => {
    render(<ProductCard {...defaultProps} />)
    // Intl.NumberFormat('id-ID') uses non-breaking space (U+00A0) between "Rp" and the number
    const priceEl = screen.getByText((_, el) =>
      el?.tagName === 'P' && /Rp\s*150\.000/.test(el.textContent ?? ''),
    )
    expect(priceEl).toBeInTheDocument()
  })

  it('renders a placeholder div when no imageUrl is provided', () => {
    render(<ProductCard {...defaultProps} />)
    const placeholder = screen.getByRole('img', { name: 'Kemeja Batik' })
    expect(placeholder.tagName).toBe('DIV')
    expect(placeholder.className).toContain('bg-gray-200')
    expect(placeholder.className).toContain('aspect-square')
  })

  it('renders an img element when imageUrl is provided', () => {
    render(<ProductCard {...defaultProps} imageUrl="/images/batik.jpg" />)
    const img = screen.getByRole('img', { name: 'Kemeja Batik' })
    expect(img.tagName).toBe('IMG')
    expect(img).toHaveAttribute('src', '/images/batik.jpg')
  })

  it('renders as an article element', () => {
    const { container } = render(<ProductCard {...defaultProps} />)
    expect(container.querySelector('article')).toBeInTheDocument()
  })

  it('has hover shadow transition classes for subtle hover effect', () => {
    const { container } = render(<ProductCard {...defaultProps} />)
    const article = container.querySelector('article')!
    expect(article.className).toContain('hover:shadow-md')
    expect(article.className).toContain('transition-shadow')
  })

  it('formats zero price correctly', () => {
    render(<ProductCard name="Gratis" price={0} />)
    const priceEl = screen.getByText((_, el) =>
      el?.tagName === 'P' && /Rp\s*0/.test(el.textContent ?? ''),
    )
    expect(priceEl).toBeInTheDocument()
  })

  it('formats large price correctly', () => {
    render(<ProductCard name="Jas Premium" price={2500000} />)
    const priceEl = screen.getByText((_, el) =>
      el?.tagName === 'P' && /Rp\s*2\.500\.000/.test(el.textContent ?? ''),
    )
    expect(priceEl).toBeInTheDocument()
  })
})
