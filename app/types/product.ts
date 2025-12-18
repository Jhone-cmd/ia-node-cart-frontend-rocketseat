export type Product = {
  id: number
  name: string
  description: string
  price: number
  store: {
    id: number
    name: string
  }
  embedding: number[] | null
}
