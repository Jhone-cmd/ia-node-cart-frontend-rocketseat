'use client'
import useSWR from 'swr'
import { getCatalog } from './api/axios'

export default function Home() {
  const products = useSWR('/api/catalog', async () => getCatalog())
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-sans sm:p-20">
      <h1>Product Catalog</h1>
      <pre>{JSON.stringify(products.data, null, 2)}</pre>
    </div>
  )
}
