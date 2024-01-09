declare interface Product {
  id: number,
  name: string,
  price: number,
  category: string,
  photo: string
}

declare interface Order {
  id: number
  date: Date
  quantity: number
  price: number
  products: Product[]
}

declare interface Client {
  id: number
  firstName: string
  lastName: string
  address: string
}
