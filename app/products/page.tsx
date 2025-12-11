'use client'

import { useSearchParams } from 'next/navigation'
import useSWR from 'swr'
import { Input } from '@/components/ui/input'
import { getCatalog } from '../api/axios'

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const search = searchParams.get('search') || ''
  const products = useSWR(`/api/catalog?q=${search}`, async () =>
    getCatalog(search)
  )

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    window.history.pushState({}, '', `/products?search=${e.target.value}`)
  }

  return (
    <div className="my-10">
      <Input onChange={handleSearch} />
      {products.data?.map(product => (
        <div className="border-b p-4" key={product.id}>
          <h2 className="font-semibold text-lg">{product.name}</h2>
          <p className="text-green-600">{(product.price / 100).toFixed(2)}</p>
        </div>
      ))}
    </div>
  )
}
