import axios from 'axios'

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
  return response.data
}
