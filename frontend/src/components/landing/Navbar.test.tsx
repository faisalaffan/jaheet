import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import Navbar from './Navbar'

describe('Navbar', () => {
  it('renders the JAHEET logo', () => {
    render(<Navbar />)
    expect(screen.getByText('JAHEET')).toBeInTheDocument()
  })

  it('renders all navigation links', () => {
    render(<Navbar />)
    expect(screen.getByText('HOME')).toBeInTheDocument()
    expect(screen.getByText('PRODUCTS')).toBeInTheDocument()
    expect(screen.getByText('ABOUT')).toBeInTheDocument()
    expect(screen.getByText('CONTACT')).toBeInTheDocument()
  })

  it('renders search and cart icons', () => {
    render(<Navbar />)
    expect(screen.getByLabelText('Search')).toBeInTheDocument()
    expect(screen.getByLabelText('Shopping cart')).toBeInTheDocument()
  })

  it('renders cart badge with count', () => {
    render(<Navbar />)
    const cartButton = screen.getByLabelText('Shopping cart')
    const badge = cartButton.querySelector('span')
    expect(badge).toHaveTextContent('2')
  })

  it('uses semantic nav element with aria-label', () => {
    render(<Navbar />)
    const nav = screen.getByRole('navigation', { name: 'Main navigation' })
    expect(nav).toBeInTheDocument()
  })

  it('has fixed positioning classes', () => {
    render(<Navbar />)
    const nav = screen.getByRole('navigation', { name: 'Main navigation' })
    expect(nav.className).toContain('fixed')
    expect(nav.className).toContain('top-0')
    expect(nav.className).toContain('z-50')
  })

  it('navigation links have correct href anchors', () => {
    render(<Navbar />)
    expect(screen.getByText('HOME').closest('a')).toHaveAttribute('href', '#home')
    expect(screen.getByText('PRODUCTS').closest('a')).toHaveAttribute('href', '#products')
    expect(screen.getByText('ABOUT').closest('a')).toHaveAttribute('href', '#about')
    expect(screen.getByText('CONTACT').closest('a')).toHaveAttribute('href', '#contact')
  })

  it('calls scrollIntoView on nav link click', async () => {
    const user = userEvent.setup()
    const mockSection = document.createElement('div')
    mockSection.id = 'products'
    mockSection.scrollIntoView = vi.fn()
    document.body.appendChild(mockSection)

    render(<Navbar />)
    await user.click(screen.getByText('PRODUCTS'))

    expect(mockSection.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })

    document.body.removeChild(mockSection)
  })
})

describe('Navbar — Hamburger Menu', () => {
  it('renders the hamburger menu button', () => {
    render(<Navbar />)
    const hamburgerBtn = screen.getByLabelText('Toggle navigation menu')
    expect(hamburgerBtn).toBeInTheDocument()
  })

  it('hamburger button has aria-expanded=false by default', () => {
    render(<Navbar />)
    const hamburgerBtn = screen.getByLabelText('Toggle navigation menu')
    expect(hamburgerBtn).toHaveAttribute('aria-expanded', 'false')
  })

  it('mobile dropdown is not visible by default', () => {
    render(<Navbar />)
    const nav = screen.getByRole('navigation', { name: 'Main navigation' })
    // The mobile dropdown should not be in the DOM when closed
    const lists = within(nav).getAllByRole('list')
    // Only the desktop list should be present
    expect(lists).toHaveLength(1)
  })

  it('shows mobile dropdown when hamburger is clicked', async () => {
    const user = userEvent.setup()
    render(<Navbar />)

    const hamburgerBtn = screen.getByLabelText('Toggle navigation menu')
    await user.click(hamburgerBtn)

    // aria-expanded should be true
    expect(hamburgerBtn).toHaveAttribute('aria-expanded', 'true')

    // Mobile dropdown should now be visible with nav links
    const nav = screen.getByRole('navigation', { name: 'Main navigation' })
    const lists = within(nav).getAllByRole('list')
    expect(lists).toHaveLength(2) // desktop + mobile

    // Mobile list should contain all nav links
    const mobileList = lists[1]
    expect(within(mobileList).getByText('HOME')).toBeInTheDocument()
    expect(within(mobileList).getByText('PRODUCTS')).toBeInTheDocument()
    expect(within(mobileList).getByText('ABOUT')).toBeInTheDocument()
    expect(within(mobileList).getByText('CONTACT')).toBeInTheDocument()
  })

  it('hides mobile dropdown when hamburger is clicked again', async () => {
    const user = userEvent.setup()
    render(<Navbar />)

    const hamburgerBtn = screen.getByLabelText('Toggle navigation menu')

    // Open
    await user.click(hamburgerBtn)
    expect(hamburgerBtn).toHaveAttribute('aria-expanded', 'true')

    // Close
    await user.click(hamburgerBtn)
    expect(hamburgerBtn).toHaveAttribute('aria-expanded', 'false')

    const nav = screen.getByRole('navigation', { name: 'Main navigation' })
    const lists = within(nav).getAllByRole('list')
    expect(lists).toHaveLength(1) // Only desktop list
  })

  it('closes mobile dropdown when a nav link is clicked', async () => {
    const user = userEvent.setup()

    // Create target section for smooth scroll
    const mockSection = document.createElement('div')
    mockSection.id = 'about'
    mockSection.scrollIntoView = vi.fn()
    document.body.appendChild(mockSection)

    render(<Navbar />)

    const hamburgerBtn = screen.getByLabelText('Toggle navigation menu')

    // Open menu
    await user.click(hamburgerBtn)
    expect(hamburgerBtn).toHaveAttribute('aria-expanded', 'true')

    // Click a mobile nav link
    const nav = screen.getByRole('navigation', { name: 'Main navigation' })
    const lists = within(nav).getAllByRole('list')
    const mobileList = lists[1]
    await user.click(within(mobileList).getByText('ABOUT'))

    // Menu should close
    expect(hamburgerBtn).toHaveAttribute('aria-expanded', 'false')

    // Smooth scroll should have been called
    expect(mockSection.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })

    document.body.removeChild(mockSection)
  })

  it('hamburger button has visible focus indicator classes', () => {
    render(<Navbar />)
    const hamburgerBtn = screen.getByLabelText('Toggle navigation menu')
    expect(hamburgerBtn.className).toContain('focus-visible:ring-2')
  })

  it('mobile nav links have visible focus indicator classes', async () => {
    const user = userEvent.setup()
    render(<Navbar />)

    // Open menu
    await user.click(screen.getByLabelText('Toggle navigation menu'))

    const nav = screen.getByRole('navigation', { name: 'Main navigation' })
    const lists = within(nav).getAllByRole('list')
    const mobileList = lists[1]
    const mobileLinks = within(mobileList).getAllByRole('link')

    for (const link of mobileLinks) {
      expect(link.className).toContain('focus-visible:ring-2')
    }
  })

  it('hamburger button has md:hidden class for mobile-only visibility', () => {
    render(<Navbar />)
    const hamburgerBtn = screen.getByLabelText('Toggle navigation menu')
    expect(hamburgerBtn.className).toContain('md:hidden')
  })

  it('hamburger button is keyboard accessible via Enter key', async () => {
    const user = userEvent.setup()
    render(<Navbar />)

    const hamburgerBtn = screen.getByLabelText('Toggle navigation menu')

    // Focus the button and press Enter
    hamburgerBtn.focus()
    await user.keyboard('{Enter}')

    expect(hamburgerBtn).toHaveAttribute('aria-expanded', 'true')

    // Press Enter again to close
    await user.keyboard('{Enter}')
    expect(hamburgerBtn).toHaveAttribute('aria-expanded', 'false')
  })

  it('mobile nav links are keyboard navigable via Tab', async () => {
    const user = userEvent.setup()
    render(<Navbar />)

    // Open menu
    const hamburgerBtn = screen.getByLabelText('Toggle navigation menu')
    await user.click(hamburgerBtn)

    const nav = screen.getByRole('navigation', { name: 'Main navigation' })
    const lists = within(nav).getAllByRole('list')
    const mobileList = lists[1]
    const mobileLinks = within(mobileList).getAllByRole('link')

    // Focus the first mobile link and tab through
    mobileLinks[0].focus()
    expect(document.activeElement).toBe(mobileLinks[0])

    await user.tab()
    expect(document.activeElement).toBe(mobileLinks[1])

    await user.tab()
    expect(document.activeElement).toBe(mobileLinks[2])

    await user.tab()
    expect(document.activeElement).toBe(mobileLinks[3])
  })
})
