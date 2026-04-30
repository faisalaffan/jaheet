export interface ProductCardProps {
  name: string
  price: number
  imageUrl?: string
}

const formatRupiah = (value: number): string =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value)

export default function ProductCard({ name, price, imageUrl }: ProductCardProps) {
  return (
    <article className="group overflow-hidden rounded-lg bg-white shadow-sm transition-shadow duration-200 hover:shadow-md">
      {/* Product image */}
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={name}
          className="aspect-square w-full object-cover"
        />
      ) : (
        <div
          role="img"
          aria-label={name}
          className="aspect-square w-full bg-gray-200"
        />
      )}

      {/* Product info */}
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-900">{name}</h3>
        <p className="mt-1 text-sm font-semibold text-gray-700">
          {formatRupiah(price)}
        </p>
      </div>
    </article>
  )
}
