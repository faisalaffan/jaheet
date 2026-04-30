import { useRef } from 'react'

const categories = [
  { label: 'BLOUSE & TOPS', alt: 'Blouse and tops category' },
  { label: 'DRESSES', alt: 'Dresses category' },
  { label: 'JACKETS & COATS', alt: 'Jackets and coats category' },
]

export default function CategorySection() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const amount = 300
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    })
  }

  return (
    <section
      id="category"
      className="bg-white"
      aria-labelledby="category-heading"
    >
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-20">
        {/* Header row: title + navigation arrows */}
        <div className="mb-8 flex items-center justify-between">
          <h2
            id="category-heading"
            className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl"
          >
            TOP FASHION CATEGORY
          </h2>

          {/* Navigation arrows — hidden on mobile, visible on md+ */}
          <div className="hidden gap-2 md:flex">
            <button
              type="button"
              onClick={() => scroll('left')}
              aria-label="Scroll categories left"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 transition-colors hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => scroll('right')}
              aria-label="Scroll categories right"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-gray-300 bg-white text-gray-700 transition-colors hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="9 6 15 12 9 18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Category cards — horizontal scroll on desktop, grid on mobile */}
        <div
          ref={scrollRef}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:flex md:gap-6 md:overflow-x-auto md:scroll-smooth md:pb-2"
          role="list"
        >
          {categories.map((cat) => (
            <div
              key={cat.label}
              role="listitem"
              className="shrink-0 md:w-80"
            >
              <div className="group relative overflow-hidden rounded-lg">
                {/* Placeholder image */}
                <div
                  role="img"
                  aria-label={cat.alt}
                  className="aspect-3/4 w-full bg-gray-200"
                />

                {/* Label overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/60 to-transparent p-4">
                  <span className="text-lg font-semibold tracking-wide text-white">
                    {cat.label}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA button */}
        <div className="mt-8 flex justify-center">
          <a
            href="#products"
            className="inline-flex min-h-[44px] min-w-[44px] items-center rounded bg-gray-900 px-6 py-3 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
          >
            EXPLORE →
          </a>
        </div>
      </div>
    </section>
  )
}
