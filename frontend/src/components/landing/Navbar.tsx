import { useState, useCallback } from 'react'

const NAV_LINKS = [
  { label: 'HOME', href: '#home' },
  { label: 'PRODUCTS', href: '#products' },
  { label: 'ABOUT', href: '#about' },
  { label: 'CONTACT', href: '#contact' },
] as const

function SearchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <circle cx={11} cy={11} r={8} />
      <line x1={21} y1={21} x2={16.65} y2={16.65} />
    </svg>
  )
}

function CartIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1={3} y1={6} x2={21} y2={6} />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  )
}

function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6 transition-transform duration-200"
      aria-hidden="true"
    >
      {isOpen ? (
        <>
          <line x1={18} y1={6} x2={6} y2={18} />
          <line x1={6} y1={6} x2={18} y2={18} />
        </>
      ) : (
        <>
          <line x1={3} y1={6} x2={21} y2={6} />
          <line x1={3} y1={12} x2={21} y2={12} />
          <line x1={3} y1={18} x2={21} y2={18} />
        </>
      )}
    </svg>
  )
}

function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  e.preventDefault()
  const id = href.replace('#', '')
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev)
  }, [])

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false)
  }, [])

  const handleMobileLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      handleNavClick(e, href)
      closeMobileMenu()
    },
    [closeMobileMenu],
  )

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="text-2xl font-bold tracking-widest text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 rounded"
        >
          JAHEET
        </a>

        {/* Desktop navigation links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium tracking-wide text-gray-700 transition-colors hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 rounded"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right side icons + hamburger */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label="Search"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center text-gray-700 transition-colors hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 rounded"
          >
            <SearchIcon />
          </button>

          <button
            type="button"
            aria-label="Shopping cart"
            className="relative inline-flex min-h-[44px] min-w-[44px] items-center justify-center text-gray-700 transition-colors hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 rounded"
          >
            <CartIcon />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-gray-900 text-[10px] font-bold text-white">
              2
            </span>
          </button>

          {/* Hamburger menu button — visible only on mobile */}
          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            onClick={toggleMobileMenu}
            className="md:hidden inline-flex min-h-[44px] min-w-[44px] items-center justify-center text-gray-700 transition-colors hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 rounded"
          >
            <HamburgerIcon isOpen={mobileMenuOpen} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <ul className="flex flex-col px-6 py-4 gap-2">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => handleMobileLinkClick(e, link.href)}
                  className="block w-full py-3 text-sm font-medium tracking-wide text-gray-700 transition-colors hover:text-gray-900 hover:bg-gray-50 rounded px-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}
