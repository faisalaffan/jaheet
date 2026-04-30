export default function CatalogSection() {
  return (
    <section
      id="catalog"
      className="relative w-full bg-gray-900"
      aria-labelledby="catalog-heading"
    >
      {/* Gradient overlay for visual depth */}
      <div className="absolute inset-0 bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 opacity-90" />

      <div className="relative z-10 flex flex-col items-center justify-center px-6 py-20 text-center md:py-28">
        <h2
          id="catalog-heading"
          className="text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl"
        >
          EXPLORE OUR FASHION CATALOG
        </h2>

        <p className="mt-4 max-w-xl text-base leading-relaxed text-gray-300 md:text-lg">
          Browse our curated collection of premium fashion pieces. Find the
          perfect style that speaks to you and elevate your wardrobe today.
        </p>
      </div>
    </section>
  )
}
