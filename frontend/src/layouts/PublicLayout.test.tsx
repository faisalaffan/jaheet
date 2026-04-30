import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import PublicLayout from './PublicLayout'

describe('PublicLayout', () => {
  it('renders children inside the layout', () => {
    render(
      <PublicLayout>
        <p>Test content</p>
      </PublicLayout>
    )
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('uses semantic <main> element', () => {
    render(
      <PublicLayout>
        <p>Content</p>
      </PublicLayout>
    )
    const main = document.querySelector('main')
    expect(main).toBeInTheDocument()
    expect(main).toHaveTextContent('Content')
  })

  it('provides a full-width container without sidebar', () => {
    const { container } = render(
      <PublicLayout>
        <p>Full width</p>
      </PublicLayout>
    )
    const wrapper = container.firstElementChild as HTMLElement
    expect(wrapper).toHaveClass('w-full')
    expect(wrapper).toHaveClass('min-h-screen')
  })

  it('does not render a sidebar or nav element', () => {
    render(
      <PublicLayout>
        <p>No sidebar</p>
      </PublicLayout>
    )
    const nav = document.querySelector('nav')
    const aside = document.querySelector('aside')
    expect(nav).not.toBeInTheDocument()
    expect(aside).not.toBeInTheDocument()
  })
})
