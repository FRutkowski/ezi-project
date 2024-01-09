import { createGlobalState } from '@vueuse/core'

export const useProducts = createGlobalState(async () => {
  const { data: products } = await useFetch('/api/products', {
    baseURL: 'http://localhost:8080'
  })

  return { products }
})
