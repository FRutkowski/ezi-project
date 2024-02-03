<script setup lang="ts">

const isImageShown = ref<boolean>(false)
const isDeletingProduct = ref<boolean>(false)
const isChangingQuantity = ref<boolean>(false)
const isAddingProduct = ref<boolean>(false)
const isSuggestingProduct = ref<boolean>(false)

const imageToShow = ref('')
const deletedProductId = ref()
const quantity = ref(1)
const addedProductId = ref()

const cartColumns = [
// {
//   key: 'image'
// },
  {
    key: 'name',
    label: 'Nazwa'
  }, {
    key: 'category',
    label: 'Kategoria'
  }, {
    key: 'price',
    label: 'Cena'
  }, {
    key: 'quantity',
    label: 'Ilość'
  }, {
    key: 'actions'
  }]

const columns = [
// {
//   key: 'image'
// },
  {
    key: 'name',
    label: 'Nazwa',
    sortable: true
  }, {
    key: 'category',
    label: 'Kategoria',
    sortable: true
  }, {
    key: 'price',
    label: 'Cena',
    sortable: true
  }, {
    key: 'actions'
  }]

const suggestedProduct = ref<Array<any>>([])
const idx = ref()

const { products } = await useProducts()
const cart = useCart()
const cartChange = ref(0)
const cartItems = (row: any) => [
  [{
    label: 'Usuń z koszyka',
    icon: 'i-heroicons-archive-box-x-mark',
    click: () => {
      isDeletingProduct.value = true
      deletedProductId.value = row.id
    }
  }, {
    label: 'Zmień ilość',
    icon: 'i-heroicons-plus-circle',
    click: () => {
      isChangingQuantity.value = true
    }
  }, {
    label: 'Sprawdź sugerowane',
    icon: 'i-heroicons-magnifying-glass-circle',
    click: () => {
      isSuggestingProduct.value = true

      idx.value = Math.floor(Math.random() * products.value.length)
      suggestedProduct.value[0] = products.value[idx.value]
    }
  }]
]

const items = (row: any) => [
  [{
    label: 'Dodaj do koszyka',
    icon: 'i-heroicons-shopping-cart',
    click: async () => {
      const filteredCart = cart.value.filter((product: Product) => product.id === row.id)
      if (filteredCart.length > 0) {
        return
      }

      cart.value.push(row)
      cartChange.value++
      isSuggestingProduct.value = false
      isAddingProduct.value = true
      addedProductId.value = row.id

      idx.value = Math.floor(Math.random() * products.value.length)
      suggestedProduct.value[0] = products.value[idx.value]
      const result = await useFetch('/api/client-actions', {
        baseURL: 'http://localhost:8080',
        method: 'POST',
        body: {
          clientId: 1,
          objectId: row.id,
          type: 'ADD_TO_CART'
        }
      })
    }
  }, {
    label: 'Sprawdź sugerowane',
    icon: 'i-heroicons-magnifying-glass-circle',
    click: () => {
      isSuggestingProduct.value = true

      idx.value = Math.floor(Math.random() * products.value.length)
      suggestedProduct.value[0] = products.value[idx.value]
    }
  }]
]

function showPhoto (imgUrl: any) {
  isImageShown.value = true
  imageToShow.value = imgUrl
}

function deleteProduct () {
  cartChange.value--
  isDeletingProduct.value = false
  const indexToRemove = cart.value.findIndex((product: Product) => product.id === deletedProductId.value)
  if (indexToRemove !== -1) cart.value.splice(indexToRemove, 1)
}

function continueShopping (productId: any) {
  isSuggestingProduct.value = false
  isAddingProduct.value = false
}

const finalPrice = computed(() => {
  return cart.value.reduce((acc: number, product: Product) => acc + product.price, 0)
})

const cartIds = computed(() => cart.value.map((product: Product) => product.id))

async function createNewOrder () {
  const result = await useFetch('/api/orders', {
    baseURL: 'http://localhost:8080',
    method: 'POST',
    body: {
      clientId: 1,
      finalPrice: finalPrice.value,
      productIds: cartIds.value
    }
  })

  cart.value = []
}

const page = ref(1)
const pageCount = 8

const searchInput = ref('')
const filteredRows = computed(() => {
  if (!searchInput.value) {
    return cart.value
  }

  return cart.value.filter((product: Product) => {
    return Object.values(product).some((value) => {
      return String(value).toLowerCase().includes(searchInput.value.toLowerCase())
    })
  })
})

const filteredCart = computed(() => {
  return filteredRows.value.slice((page.value - 1) * pageCount, (page.value) * pageCount)
})

console.log('products ids')
console.log(cartIds.value)
const { data: suggestedProductsFromBackend } = await useFetch('/api/products/cart-suggestion', {
  baseURL: 'http://localhost:8080',
  method: 'POST',
  params: {
    clientId: 1
  },
  body: {
    productIds: cartIds.value
  }
})

console.log(suggestedProductsFromBackend.value)
watch(cartChange, async () => {
  console.log('hello from here')
  const { data: fetchProducts } = await useFetch('/api/products/cart-suggestion', {
    baseURL: 'http://localhost:8080',
    method: 'POST',
    params: {
      clientId: 1
    },
    body: {
      productIds: cartIds.value
    }
  })

  suggestedProductsFromBackend.value = fetchProducts.value
})

const suggestedProducts = computed(() => suggestedProductsFromBackend.value.slice(0, 7))

watch(suggestedProducts, () => {
  console.log('nowe sugerowane produkty')
  console.log(suggestedProducts.value)
})
</script>

<template>
  <div>
    <div class="text-3xl font-bold py-10">
      Mój koszyk
    </div>
    <UModal
      v-model="isDeletingProduct"
      prevent-close
    >
      <div class="p-4">
        <Placeholder class="h-48">
          <div class="flex justify-between w-full py-4">
            <div class="flex w-full">
              Czy na pewno chcesz usunąć ten produkt?
            </div>
            <UButton
              color="black"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="isDeletingProduct = false"
            />
          </div>
          <UDivider />
          <div class="pt-4 w-full flex justify-around">
            <UButton
              color="gray"
              label="Nie, zostaw produkt w koszyku"
              icon="i-heroicons-banknotes"
              @click="isDeletingProduct = false"
            />
            <UButton
              label="Tak, usuń produkt"
              icon="i-heroicons-shopping-cart"
              @click="deleteProduct"
            />
          </div>
        </Placeholder>
      </div>
    </UModal>

    <UModal
      v-model="isChangingQuantity"
      prevent-close
    >
      <div class="p-4">
        <Placeholder class="h-48">
          <div class="flex justify-between w-full py-4">
            <div class="flex w-full justify-center">
              <UButtonGroup orientation="horizontal">
                <UButton
                  icon="i-heroicons-minus"
                  color="white"
                  @click="quantity -= 1"
                />
                <div class="py-2 px-4 border">
                  {{ quantity }}
                </div>
                <UButton
                  icon="i-heroicons-plus"
                  color="white"
                  @click="quantity += 1"
                />
              </UButtonGroup>
            </div>
            <UButton
              color="black"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="isChangingQuantity = false"
            />
          </div>
          <UDivider />
          <div class="pt-4 w-full flex justify-around">
            <UButton
              color="gray"
              label="Anuluj zmiany"
              @click="isChangingQuantity = false"
            />
            <UButton
              label="Zapisz nową ilość"
              @click="isChangingQuantity = false"
            />
          </div>
        </Placeholder>
      </div>
    </UModal>

    <ProductImage
      v-model="isImageShown"
      :image-to-show="imageToShow"
      @close-image="isImageShown = false"
    />

    <AddingProduct
      v-model="isAddingProduct"
      @close-adding="isAddingProduct = false"
      @continue-shopping="continueShopping"
    >
      <UTable
        v-model:columns="columns"
        :rows="suggestedProduct"
      >
        <!-- <template #image-data="{ row }">
          <UButton
            label="Open"
            variant="link"
            @click="showPhoto(row.photo)"
          >
            <UAvatar
              v-model:src="row.photo"
              size="sm"
            />
          </UButton>
        </template> -->
        <template #actions-data="{ row }">
          <UDropdown :items="items(row)">
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-ellipsis-horizontal-20-solid"
            />
          </UDropdown>
        </template>
      </UTable>
    </AddingProduct>

    <SuggestingProduct
      v-model="isSuggestingProduct"
      @close-suggesting="isSuggestingProduct = false"
      @continue-shopping="continueShopping"
    >
      <UTable
        v-model:columns="columns"
        :rows="suggestedProduct"
      >
        <!-- <template #image-data="{ row }">
          <UButton
            label="Open"
            variant="link"
            @click="showPhoto(row.photo)"
          >
            <UAvatar
              v-model:src="row.photo"
              size="sm"
            />
          </UButton>
        </template> -->
        <template #actions-data="{ row }">
          <UDropdown :items="items(row)">
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-ellipsis-horizontal-20-solid"
            />
          </UDropdown>
        </template>
      </UTable>
    </SuggestingProduct>

    <div class="flex flex-row justify-between gap-4">
      <div class="flex flex-col w-full gap-4">
        <UCard
          :ui="{ body: { padding: '' } }"
        >
          <UTable
            :columns="cartColumns"
            :rows="filteredCart"
          >
            <!-- <template #image-data="{ row }">
              <UButton
                label="Open"
                variant="link"
                @click="showPhoto(row.photo)"
              >
                <UAvatar
                  v-model:src="row.photo"
                  size="md"
                />
              </UButton>
            </template> -->
            <template #name-data="{ row }">
              <div class="w-10">
                {{ row.name }}
              </div>
            </template>

            <template #category-data="{ row }">
              <div>{{ row.category.name }}</div>
            </template>
            <template #quantity-data>
              1
            </template>
            <template #actions-data="{ row }">
              <UDropdown :items="cartItems(row)">
                <UButton
                  color="gray"
                  variant="ghost"
                  icon="i-heroicons-ellipsis-horizontal-20-solid"
                />
              </UDropdown>
            </template>
          </UTable>
          <div class="flex items-center px-4 py-8">
            <div class="text-sm mr-auto">
              <p v-if="cart.length === pageCount">
                {{ 'Wyświetlanie ' + ((page * pageCount) - pageCount + 1) + ' do ' + (page * pageCount) + ' z ' + filteredRows.length + 'wyników' }}
              </p>
              <p v-else>
                {{ 'Wyświetlanie ' + ((page * pageCount) - pageCount + 1) + ' do ' + filteredRows.length + ' z ' + filteredRows.length + 'wyników' }}
              </p>
            </div>
            <UPagination
              v-model="page"
              :prev-button="{ icon: 'i-heroicons-arrow-small-left-20-solid', label: 'Poprzedni', color: 'gray' }"
              :next-button="{ icon: 'i-heroicons-arrow-small-right-20-solid', trailing: true, label: 'Następny', color: 'gray' }"
              :page-count="pageCount"
              :total="filteredRows.length"
            />
          </div>
        </UCard>

        <div
          v-if="cart.length > 0"
          class="flex flex-row justify-between gap-12 text-sm font-semibold p-4 pt-6 pb-0"
        >
          Produkty sugerowane na podstawie Twojego koszyka:
        </div>
        <div
          v-else
          class="flex flex-row justify-between gap-12 text-sm font-semibold p-4 pt-6 pb-0"
        >
          Produkty sugerowane na podstawie Twoich ostatnich zamówień
        </div>
        <UCard
          :ui="{ body: { padding: '' } }"
          class="flex-1"
        >
          <UTable
            v-model:columns="columns"
            :rows="suggestedProducts"
          >
            <!-- <template #image-data="{ row }">
              <UButton
                label="Open"
                variant="link"
                @click="showPhoto(row.photo)"
              >
                <UAvatar
                  v-model:src="row.photo"
                  size="md"
                />
              </UButton>
            </template> -->
            <template #category-data="{ row }">
              <div>{{ row.category.name }}</div>
            </template>
            <template #actions-data="{ row }">
              <UDropdown :items="items(row)">
                <UButton
                  color="gray"
                  variant="ghost"
                  icon="i-heroicons-ellipsis-horizontal-20-solid"
                />
              </UDropdown>
            </template>
          </UTable>
        </UCard>
      </div>

      <div class="flex flex-col justify-start">
        <UCard
          :ui="{ body: { padding: '' } }"
          class="flex"
        >
          <div class="flex flex-col">
            <div class="flex flex-row justify-between gap-12 text-xs font-semibold p-4">
              Podsumowanie
            </div>
            <UDivider color="gray" />
            <!-- <div class="flex flex-row justify-between gap-12 text-xs p-4">
              <div>Wartość zamówienia</div>
              <div class="font-semibold">
                {{ finalPrice.toFixed(2) }}zł
              </div>
            </div>
            <div class="flex flex-col text-xs gap-4 p-4">
              <div class="flex flex-row justify-between gap-12 text-xs">
                <div>Dostawa</div>
                <div class="font-semibold">
                  Bezpłatnie
                </div>
              </div>
            </div> -->

            <UDivider color="gray" />
            <div class="flex flex-row justify-between gap-12 text-sm p-4 font-semibold">
              <div>Wartość zamówienia</div>
              <div class="font-semibold">
                {{ finalPrice.toFixed(2) }}zł
              </div>
            </div>

            <UButton
              class="m-2"
              :ui="{
                active: 'text-white dark:text-white before:bg-orange-500 dark:before:bg-orange-900',
                inactive: 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:before:bg-gray-50 dark:hover:before:bg-gray-800/50',
              }"
              @click="createNewOrder"
            >
              Złóż zamówienie
            </UButton>
          </div>
        </UCard>
        <div class="flex flex-auto" />
      </div>
    </div>
  </div>
</template>
