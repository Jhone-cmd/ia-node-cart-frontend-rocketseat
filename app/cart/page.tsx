'use client'

import useSWR from "swr"
import { getCart } from "../api/axios"
import { Cart } from "../types/cart"

export default function CartPage() {
    const cart = useSWR<Cart>('/api/cart', async () => getCart())

    return (
        <div>
            <pre>{JSON.stringify(cart.data, null, 2)}</pre>
        </div>
    )
}