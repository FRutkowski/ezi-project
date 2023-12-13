<script setup>

const isImageShown = ref(false)
const isAddingProduct = ref(false)
const isSuggestingProduct = ref(false)

const imageToShow = ref('')
const addedProductId = ref()

const sort = ref({
  column: 'name',
  direction: 'desc'
})

const columns = [{
  key: 'image'
}, {
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
const items = (row) => [
  [{
    label: 'Dodaj do koszyka',
    icon: 'i-heroicons-shopping-cart',
    click: () => {
      addProduct(row.id)
    }
  }, {
    label: 'Sprawdź sugerowane',
    icon: 'i-heroicons-magnifying-glass-circle',
    click: () => {
      isSuggestingProduct.value = true
      suggestProduct(row.id)
    }
  }]
]

function showPhoto(imgUrl) {
  isImageShown.value = true
  imageToShow.value = imgUrl
}

const suggestedProduct = []
const idx = ref()

function addProduct(productId) {
  isSuggestingProduct.value = false
  isAddingProduct.value = true
  addedProductId.value = productId

  idx.value = Math.floor(Math.random() * products.value.length)
  suggestedProduct[0] = products.value[idx.value]
}

function suggestProduct(productId) {
  isAddingProduct.value = false
  isSuggestingProduct.value = true

  idx.value = Math.floor(Math.random() * products.value.length)
  suggestedProduct[0] = products.value[idx.value]
}

function continueShopping(productId) {
  isAddingProduct.value = false
  isSuggestingProduct.value = false
}

</script>

<template>
  <div class="pb-20">
    <UModal v-model="isImageShown" prevent-close>
      <div class="flex justify-end w-full absolute p-2">
        <UButton color="black" variant="solid" icon="i-heroicons-x-mark-20-solid" class="-my-1"
          @click="isImageShown = false" />
      </div>
      <img :src="imageToShow">
    </UModal>

    <UModal v-model="isAddingProduct" prevent-close>
      <div class="p-4">
        <Placeholder class="h-48">
          <div class="flex justify-between w-full py-4">
            <div class="flex w-full">
              Produkt został dodany do koszyka!
            </div>
            <UButton color="black" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
              @click="isAddingProduct = false" />
          </div>
          <p class="py-4 text-sm">
            Inne produkty sugerowane na podstawie Twojego wyboru:
          </p>
          <UDivider />

          <!-- do usunięcia po dodaniu backendu tylko do testów -->
          <div class="absolute hidden">
            idx: {{ idx }}
          </div>

          <UTable v-model:columns="columns" :rows="suggestedProduct">
            <template #image-data="{ row }">
              <UButton label="Open" variant="link" @click="showPhoto(row.photo)">
                <UAvatar v-model:src="row.photo" size="sm" />
              </UButton>
            </template>
            <template #actions-data="{ row }">
              <UDropdown :items="items(row)">
                <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
              </UDropdown>
            </template>
          </UTable>

          <UDivider />
          <div class="pt-4 w-full flex justify-around">
            <UButton color="gray" label="Kontynuuj zakupy" icon="i-heroicons-banknotes" @click="isAddingProduct = false" />
            <UButton label="Przejdź do koszyka" icon="i-heroicons-shopping-cart" @click="$router.push('/shoppingCart')" />
          </div>
        </Placeholder>
      </div>
    </UModal>

    <UModal v-model="isSuggestingProduct" prevent-close>
      <div class="p-4">
        <Placeholder class="h-48">
          <div class="flex justify-between w-full py-4">
            <p class="text-sm">
              Inne często występujące razem produkty:
            </p>
            <UButton color="black" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
              @click="isSuggestingProduct = false" />
          </div>
          <UDivider />

          <!-- do usunięcia po dodaniu backendu tylko do testów -->
          <div class="absolute hidden">
            idx: {{ idx }}
          </div>

          <UTable v-model:columns="columns" :rows="suggestedProduct">
            <template #image-data="{ row }">
              <UButton label="Open" variant="link" @click="showPhoto(row.photo)">
                <UAvatar v-model:src="row.photo" size="sm" />
              </UButton>
            </template>ł
            <template #actions-data="{ row }">
              <UDropdown :items="items(row)">
                <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
              </UDropdown>
            </template>
          </UTable>

          <UDivider />
          <div class="pt-4 w-full flex justify-around">
            <UButton color="gray" label="Kontynuuj zakupy" icon="i-heroicons-banknotes" @click="continueShopping" />
            <UButton label="Przejdź do koszyka" icon="i-heroicons-shopping-cart" @click="$router.push('/shoppingCart')" />
          </div>
        </Placeholder>
      </div>
    </UModal>

    <div class="text-3xl font-bold py-10">
      Produkty
    </div>
    <UCard :ui="{ body: { padding: '' } }">
      <UTable v-model:sort="sort" :columns="columns" :rows="products">
        <template #image-data="{ row }">
          <UButton label="Open" variant="link" @click="showPhoto(row.photo)">
            <UAvatar v-model:src="row.photo" size="md" />
          </UButton>
        </template>
        <template #actions-data="{ row }">
          <UDropdown :items="items(row)">
            <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
          </UDropdown>
        </template>
      </UTable>
    </UCard>
  </div>
</template>
