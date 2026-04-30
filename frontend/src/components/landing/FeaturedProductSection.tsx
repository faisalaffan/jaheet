import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import api from '@/lib/api'
import type { Product } from '@/types'
import ProductCard from './ProductCard'

const TABS = ['All', 'NEW ARRIVALS', 'RECOMMENDED PICKS'] as const

function ProductSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-lg bg-white shadow-sm">
      <div className="aspect-square w-full bg-gray-200" />
      <div className="p-4 space-y-2">
        <div className="h-4 w-3/4 rounded bg-gray-200" />
        <div className="h-4 w-1/2 rounded bg-gray-200" />
      </div>
    </div>
  )
}

export default function FeaturedProductSection() {
  const [activeTab, setActiveTab] = useState<string>(TABS[0])

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: () => api.get('/products').then((r) => r.data),
  })

  const displayProducts = products?.slice(0, 4) ?? []

  return (
    <section id="products" className="bg-white px-6 py-16 md:px-12 lg:px-20">
      {/* Section title */}
      <h2 className="text-center text-2xl font-bold tracking-wide text-gray-900 md:text-3xl">
        FEATURED PRODUCT
      </h2>

      {/* Filter tabs */}
      <div
        className="mt-8 flex flex-wrap items-center justify-center gap-4"
        role="tablist"
        aria-label="Product filter tabs"
      >
        {TABS.map((tab) => (
          <button
            key={tab}
            role="tab"
            aria-selected={activeTab === tab}
            onClick={() => setActiveTab(tab)}
            className={`min-h-[44px] min-w-[44px] rounded-full border px-5 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 ${
              activeTab === tab
                ? 'border-gray-900 bg-gray-900 text-white'
                : 'border-gray-300 bg-white text-gray-700 hover:border-gray-500'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Product grid */}
      <div className="mt-10">
        {isLoading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        )}

        {isError && (
          <p className="py-12 text-center text-gray-500" role="alert">
            Unable to load products. Please try again later.
          </p>
        )}

        {!isLoading && !isError && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {displayProducts.map((product) => (
              <ProductCard
                key={product.id}
                name={product.name}
                price={product.price}
              />
            ))}
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="mt-10 text-center">
        <a
          href="/admin/products"
          className="inline-flex min-h-[44px] min-w-[44px] items-center rounded-full border border-gray-900 px-8 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-900 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2"
        >
          SEE MORE PRODUCTS →
        </a>
      </div>
    </section>
  )
}
