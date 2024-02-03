<script setup lang="ts">

const isImageShown = ref(false)
const isAddingProduct = ref(false)
const isSuggestingProduct = ref(false)

const imageToShow = ref('')
const addedProductId = ref()

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

const { products } = await useProducts()
const cart = useCart()
const suggestedProductsFromBackend = ref()

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

      console.log(result)
    }
  }, {
    label: 'Sprawdź sugerowane',
    icon: 'i-heroicons-magnifying-glass-circle',
    click: async () => {
      isSuggestingProduct.value = true
      isAddingProduct.value = false

      idx.value = Math.floor(Math.random() * products.value.length)
      suggestedProduct.value[0] = products.value[idx.value]
      const result = await useFetch('/api/client-actions', {
        baseURL: 'http://localhost:8080',
        method: 'POST',
        body: {
          clientId: 1,
          objectId: row.id,
          type: 'VIEW_PRODUCT'
        }
      })

      console.log(result)
      const { data: fetchProducts } = await useFetch('/api/products/category-suggestion-or', {
        baseURL: 'http://localhost:8080',
        method: 'POST',
        params: {
          clientId: 1
        },
        body: {
          productIds: [row.id]
        }
      })

      console.log('Odebrane produkty')
      console.log(fetchProducts)
      suggestedProductsFromBackend.value = fetchProducts.value.slice(0, 7)
    }
  }]
]

async function showPhoto (row: Product) {
  isImageShown.value = true
  imageToShow.value = row.photo

  await useFetch('/api/client-actions', {
    baseURL: 'http://localhost:8080',
    method: 'POST',
    body: {
      clientId: 1,
      objectId: row.id,
      type: 'VIEW_PRODUCT'
    }
  })
}

const suggestedProduct = ref<Array<any>>([])
const idx = ref()

function continueShopping (productId: any) {
  isAddingProduct.value = false
  isSuggestingProduct.value = false
}

const getImageSourceFromArrayOfBytes = (bytes: any) => {
  const blob = new Blob([bytes], { type: 'image/jpeg' })
  const object = URL.createObjectURL(blob)
  console.log('------------- url zdjecia')
  console.log(object)
  return object
}

const page = ref(1)
const pageCount = 8

const searchInput = ref('')
const filteredRows = computed(() => {
  if (!searchInput.value) {
    return products.value
  }

  return products.value.filter((product: Product) => {
    return Object.values(product).some((value) => {
      return String(value).toLowerCase().includes(searchInput.value.toLowerCase())
    })
  })
})

const rows = computed(() => {
  return filteredRows.value.slice((page.value - 1) * pageCount, (page.value) * pageCount)
})

</script>

<template>
  <div class="pb-20">
    <ProductImage
      v-model="isImageShown"
      :image-to-show="imageToShow"
      @close-image="isImageShown = false"
    />

    <UModal
      v-model="isAddingProduct"
      prevent-close
    >
      <div class="p-4">
        <Placeholder class="h-48">
          <div class="flex justify-between w-full py-4">
            <div class="flex w-full">
              Produkt został dodany do koszyka!
            </div>
            <UButton
              color="black"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              is-adding-product="false"
            />
          </div>
          <div class="pt-4 w-full flex justify-around">
            <UButton
              color="gray"
              label="Kontynuuj zakupy"
              icon="i-heroicons-banknotes"
              @click="continueShopping"
            />
            <UButton
              label="Przejdź do koszyka"
              icon="i-heroicons-shopping-cart"
              @click="$router.push('/shoppingCart')"
            />
          </div>
        </Placeholder>
      </div>
    </UModal>

    <SuggestingProduct
      v-model="isSuggestingProduct"
      @close-suggesting="isSuggestingProduct = false"
      @continue-shopping="continueShopping"
    >
      <UTable
        v-model:columns="columns"
        :rows="suggestedProductsFromBackend"
      >
        <!-- <template #image-data="{ row }">
          <UButton
            label="Open"
            variant="link"
            @click="showPhoto(row)"
          >
            <UAvatar
              v-model:src="row.photo"
              size="sm"
            />
          </UButton>
        </template> -->
        <template #category-data="{ row }">
          <div>
            {{ row.category.name }}
          </div>
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
    </SuggestingProduct>

    <div class="text-3xl font-bold py-10">
      Produkty
    </div>
    <UCard :ui="{ body: { padding: '' } }">
      <UTable
        v-model:columns="columns"
        :rows="rows"
      >
        <!-- <template #image-data="{ row }">
          <UButton
            label="Open"
            variant="link"
            @click="showPhoto(row.photo)"
          > -->
        <!-- src="https://images.unsplash.com/photo-1600289031464-74d374b64991?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG1lYWx8ZW58MHx8MHx8fDA%3D" -->
        <!-- <UAvatar
              :src="getImageSourceFromArrayOfBytes(row.photo)"
              size="md"
              crossorigin
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
              icon="i-heroicons-ellipsis-horizontal-20-solid"
              variant="ghost"
            />
          </UDropdown>
        </template>
      </UTable>
      <div class="flex items-center px-4 py-8">
        <div class="text-sm mr-auto">
          <p v-if="rows.length === pageCount">
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
  </div>
</template>
