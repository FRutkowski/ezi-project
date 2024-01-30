import { createGlobalState } from '@vueuse/core'

// const images = [
//   'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//   'https://images.unsplash.com/photo-1564436872-f6d81182df12?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//   'https://images.unsplash.com/photo-1572424117831-005b5e9b3ae4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//   'https://images.unsplash.com/photo-1600289031464-74d374b64991?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG1lYWx8ZW58MHx8MHx8fDA%3D',
//   'https://images.unsplash.com/photo-1601579112759-761ccbaa8bde?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
// ]

export const useProducts = createGlobalState(async () => {
  const { data: products } = await useFetch('/api/products', {
    baseURL: 'http://localhost:8080'
  })

  // const productsWithImage = computed(() => {
  //   return products.value.map((product: Product) => {
  //     return {
  //       id: product.id,
  //       name: product.name,
  //       price: product.price,
  //       photo: images[Math.random() * 5]
  //     }
  //   })
  // })

  return { products }
})
