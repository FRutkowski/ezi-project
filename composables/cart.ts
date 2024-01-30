export const useCart = () => {
  return useState<Product[]>('cart', () => [])
}
