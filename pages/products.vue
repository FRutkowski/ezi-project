<script setup lang="ts">

const isImageShown = ref(false)
const isAddingProduct = ref(false)
const isSuggestingProduct = ref(false)

const imageToShow = ref('')
const addedProductId = ref()

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

const items = (row: any) => [
  [{
    label: 'Dodaj do koszyka',
    icon: 'i-heroicons-shopping-cart',
    click: () => {
      isSuggestingProduct.value = false
      isAddingProduct.value = true
      addedProductId.value = row.id

      idx.value = Math.floor(Math.random() * products.value.length)
      suggestedProduct.value[0] = products.value[idx.value]
    }
  }, {
    label: 'Sprawdź sugerowane',
    icon: 'i-heroicons-magnifying-glass-circle',
    click: () => {
      isSuggestingProduct.value = true
      isAddingProduct.value = false

      idx.value = Math.floor(Math.random() * products.value.length)
      suggestedProduct.value[0] = products.value[idx.value]
    }
  }]
]

function showPhoto(imgUrl: any) {
  isImageShown.value = true
  imageToShow.value = imgUrl
}

const suggestedProduct = ref<Array<any>>([])
const idx = ref()

function continueShopping(productId: any) {
  isAddingProduct.value = false
  isSuggestingProduct.value = false
}

</script>

<template>
  <div class="pb-20">
    <ProductImage v-model="isImageShown" :image-to-show="imageToShow" @close-image="isImageShown = false">
    </ProductImage>

    <AddingProduct v-model="isAddingProduct" @close-adding="isAddingProduct = false"
      @continue-shopping="continueShopping">
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
    </AddingProduct>

    <SuggestingProduct v-model="isSuggestingProduct" @close-suggesting="isSuggestingProduct = false"
      @continue-shopping="continueShopping">
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
    </SuggestingProduct>

    <div class="text-3xl font-bold py-10">
      Produkty
    </div>
    <UCard :ui="{ body: { padding: '' } }">
      <UTable v-model:columns="columns" :rows="products">
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
