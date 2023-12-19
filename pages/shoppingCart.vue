<script setup lang="ts">

const isImageShown = ref(false)
const isDeletingProduct = ref(false)
const isChangingQuantity = ref(false)
const isAddingProduct = ref(false)
const isSuggestingProduct = ref(false)

const imageToShow = ref('')
const deletedProductId = ref()
const quantity = ref(1)
const addedProductId = ref()

const cartColumns = [{
  key: 'image'
}, {
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

const columns = [{
  key: 'image'
}, {
  key: 'name',
  label: 'Nazwa'
}, {
  key: 'category',
  label: 'Kategoria'
}, {
  key: 'price',
  label: 'Cena'
}, {
  key: 'actions'
}]

const suggestedProduct = ref<Array<any>>([])
const idx = ref()

const { products } = await useProducts()
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

      idx.value = Math.floor(Math.random() * products.value.length)
      suggestedProduct.value[0] = products.value[idx.value]
    }
  }]
]

function showPhoto(imgUrl: any) {
  isImageShown.value = true
  imageToShow.value = imgUrl
}

function deleteProduct() {
  isDeletingProduct.value = false
}

function continueShopping(productId: any) {
  isSuggestingProduct.value = false
  isAddingProduct.value = false
}

</script>

<template>
  <div class="text-3xl font-bold py-10">
    Mój koszyk
  </div>
  <UModal v-model="isDeletingProduct" prevent-close>
    <div class="p-4">
      <Placeholder class="h-48">
        <div class="flex justify-between w-full py-4">
          <div class="flex w-full">
            Czy na pewno chcesz usunąć ten produkt?
          </div>
          <UButton color="black" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
            @click="isDeletingProduct = false" />
        </div>
        <UDivider />
        <div class="pt-4 w-full flex justify-around">
          <UButton color="gray" label="Nie, zostaw produkt w koszyku" icon="i-heroicons-banknotes"
            @click="isDeletingProduct = false" />
          <UButton label="Tak, usuń produkt" icon="i-heroicons-shopping-cart" @click="deleteProduct" />
        </div>
      </Placeholder>
    </div>
  </UModal>

  <UModal v-model="isChangingQuantity" prevent-close>
    <div class="p-4">
      <Placeholder class="h-48">
        <div class="flex justify-between w-full py-4">
          <div class="flex w-full justify-center">
            <UButtonGroup orientation="horizontal">
              <UButton icon="i-heroicons-minus" color="white" @click="quantity -= 1" />
              <div class="py-2 px-4 border">{{ quantity }}</div>
              <UButton icon="i-heroicons-plus" color="white" @click="quantity += 1" />
            </UButtonGroup>
          </div>
          <UButton color="black" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
            @click="isChangingQuantity = false" />
        </div>
        <UDivider />
        <div class="pt-4 w-full flex justify-around">
          <UButton color="gray" label="Anuluj zmiany" @click="isChangingQuantity = false" />
          <UButton label="Zapisz nową ilość" @click="isChangingQuantity = false" />
        </div>
      </Placeholder>
    </div>
  </UModal>

  <ProductImage v-model="isImageShown" :image-to-show="imageToShow" @close-image="isImageShown = false">
  </ProductImage>

  <AddingProduct v-model="isAddingProduct" @close-adding="isAddingProduct = false" @continue-shopping="continueShopping">
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

  <div class="flex flex-row justify-between gap-4">
    <UCard :ui="{ body: { padding: '' } }" class="flex-1">
      <UTable :columns="cartColumns" :rows="products">
        <template #image-data="{ row }">
          <UButton label="Open" variant="link" @click="showPhoto(row.photo)">
            <UAvatar v-model:src="row.photo" size="md" />
          </UButton>
        </template>
        <template #quantity-data="{ row }">
          1
        </template>
        <template #actions-data="{ row }">
          <UDropdown :items="cartItems(row)">
            <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
          </UDropdown>
        </template>
      </UTable>
    </UCard>

    <div class="flex flex-col justify-start">
      <UCard :ui="{ body: { padding: '' } }" class="flex">
        <div class="flex flex-col">
          <div class="flex flex-row justify-between gap-12 text-xs font-semibold p-4">
            Podsumowanie
          </div>
          <UDivider color="gray" />
          <div class="flex flex-row justify-between gap-12 text-xs p-4">
            <div>Wartość zamówienia</div>
            <div class="font-semibold">39.99 zł</div>
          </div>
          <div class="flex flex-row justify-between gap-12 text-xs p-4">
            <div>Dostawa</div>
            <div class="font-semibold">Bezpłatnie</div>
          </div>
          <UDivider color="gray" />
          <div class="flex flex-row justify-between gap-12 text-sm p-4 font-semibold">
            <div>Suma</div>
            <div>39.99 zł</div>
          </div>

          <UButton class="m-2" :ui="{
            active: 'text-white dark:text-white before:bg-orange-500 dark:before:bg-orange-900',
            inactive: 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:before:bg-gray-50 dark:hover:before:bg-gray-800/50',
          }">
            Złóż zamówienie
          </UButton>
        </div>
      </UCard>
      <div class="flex flex-auto"></div>
    </div>
  </div>
</template>
