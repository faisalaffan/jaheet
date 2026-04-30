const FOOTER_COLUMNS = [
  {
    title: 'GENERAL',
    links: ['About Us', 'Career', 'Contact Us'],
  },
  {
    title: 'PRODUCTS',
    links: ['New Arrivals', 'Best Sellers', 'Sale'],
  },
  {
    title: 'CUSTOMER SERVICE',
    links: ['FAQ', 'Shipping', 'Returns'],
  },
  {
    title: 'SOCIAL MEDIA',
    links: ['Instagram', 'Facebook', 'Twitter'],
  },
] as const

export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-gray-900 text-gray-300"
      aria-label="Site footer"
    >
      {/* Footer columns */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>
              <h3 className="mb-4 text-sm font-semibold tracking-widest text-white">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="inline-block py-1 text-sm text-gray-400 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 rounded"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Brand watermark */}
      <div className="overflow-hidden border-t border-gray-800 py-8">
        <p
          className="select-none text-center text-7xl font-bold tracking-[0.3em] text-white/10 md:text-8xl"
          aria-hidden="true"
        >
          JAHEET
        </p>
      </div>
    </footer>
  )
}
