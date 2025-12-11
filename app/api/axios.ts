import axios from 'axios'
import { Product } from '../types/product'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const getCatalog = async (search = '') => {
  const response = await api.get('/catalog', {
    params: { search },
  })
  return response.data as Product[]
}
