interface LookItem {
  name: string
  price: number
}

const lookItems: LookItem[] = [
  { name: 'Silk Blouse', price: 450000 },
  { name: 'Tailored Trousers', price: 650000 },
  { name: 'Leather Belt', price: 275000 },
]

const formatRupiah = (value: number): string =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)

export default function LookSection() {
  return (
    <section
      id="look"
      className="bg-[#f5f0eb]"
      aria-labelledby="look-heading"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-12 md:flex-row md:gap-12 md:py-20">
        {/* Model photo — left side on desktop, top on mobile */}
        <div className="flex flex-1 items-center justify-center">
          <div
            role="img"
            aria-label="Model wearing the complete look"
            className="aspect-3/4 w-full max-w-sm rounded-lg bg-gray-200 md:max-w-md"
          />
        </div>

        {/* Item list — right side on desktop, bottom on mobile */}
        <div className="flex flex-1 flex-col gap-6">
          <h2
            id="look-heading"
            className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl"
          >
            ITEM IN THIS LOOK
          </h2>

          <ul className="flex flex-col gap-4" aria-label="Items in this look">
            {lookItems.map((item) => (
              <li
                key={item.name}
                className="flex items-center gap-4 rounded-lg bg-white p-3 shadow-sm"
              >
                {/* Item thumbnail */}
                <div
                  role="img"
                  aria-label={item.name}
                  className="h-16 w-16 shrink-0 rounded bg-gray-200"
                />

                {/* Item details */}
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-900">
                    {item.name}
                  </span>
                  <span className="text-sm text-gray-600">
                    {formatRupiah(item.price)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
