export default function HeroSection() {
  return (
    <section
      id="home"
      className="bg-[#f5f0eb] pt-20"
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-6 py-12 md:flex-row md:gap-12 md:py-20">
        {/* Text content — left side on desktop, top on mobile */}
        <div className="flex flex-1 flex-col items-start gap-6">
          <h1
            id="hero-heading"
            className="text-3xl font-bold leading-tight tracking-tight text-gray-900 md:text-5xl lg:text-6xl"
          >
            SHAPING A NEW ERA OF STYLE AND SOPHISTICATION
          </h1>

          <p className="max-w-md text-base leading-relaxed text-gray-600 md:text-lg">
            Jaheet brings you a curated collection of premium clothing and
            convection craftsmanship — where timeless elegance meets modern
            design for every occasion.
          </p>

          <a
            href="#products"
            className="inline-flex min-h-[44px] min-w-[44px] items-center rounded bg-gray-900 px-6 py-3 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
          >
            GO EXPLORE →
          </a>
        </div>

        {/* Placeholder hero image — right side on desktop, bottom on mobile */}
        <div className="flex flex-1 items-center justify-center">
          <div
            role="img"
            aria-label="Hero image showcasing Jaheet fashion collection"
            className="aspect-3/4 w-full max-w-sm rounded-lg bg-gray-300 md:max-w-md"
          />
        </div>
      </div>
    </section>
  )
}
