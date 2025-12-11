'use client'
import useSWR from 'swr'
import { getCatalog } from '../api/axios'

export function ProductsPage() {
  const products = useSWR('/api/catalog', async () => getCatalog())

  return (
    <div>
      <pre>{JSON.stringify(products.data, null, 2)}</pre>
    </div>
  )
}
