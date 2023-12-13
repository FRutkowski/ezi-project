<script setup lang="ts">
import type { _padding } from '#tailwind-config/theme';


const isImageShown = ref(false)
const imageToShow = ref('')

const isDeletingProduct = ref(false)
const deletedProductId = ref()

const isChangingQuantity = ref(false)
const quantity = ref(1)

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
  key: 'quantity',
  label: 'Ilość'
}, {
  key: 'actions'
}]

const { products } = await useProducts()
const items = (row: any) => [
  [{
    label: 'Usuń z koszyka',
    icon: 'i-heroicons-archive-box-x-mark',
    click: () => {
      tryDeleteProduct(row.id)
    }
  }, {
    label: 'Zmień ilość',
    icon: 'i-heroicons-plus-circle',
    click: () => {
      changeQuantity(row.id)
    }
  }, {
    label: 'Sprawdź sugerowane',
    icon: 'i-heroicons-magnifying-glass-circle',
    click: () => {

    }
  }]
]

function showPhoto(imgUrl: any) {
  isImageShown.value = true
  imageToShow.value = imgUrl
}

function tryDeleteProduct(productId: any) {
  isDeletingProduct.value = true
  deletedProductId.value = productId
}

function deleteProduct() {
  isDeletingProduct.value = false
}

function changeQuantity(productId: any) {
  isChangingQuantity.value = true
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

  <UModal v-model="isImageShown" prevent-close>
    <div class="flex justify-end w-full absolute p-2">
      <UButton color="black" variant="solid" icon="i-heroicons-x-mark-20-solid" class="-my-1"
        @click="isImageShown = false" />
    </div>
    <img :src="imageToShow">
  </UModal>

  <div class="flex flex-row justify-between gap-4">
    <UCard :ui="{ body: { padding: '' } }" class="flex-1">
      <UTable :columns="columns" :rows="products">
        <template #image-data="{ row }">
          <UButton label="Open" variant="link" @click="showPhoto(row.photo)">
            <UAvatar v-model:src="row.photo" size="md" />
          </UButton>
        </template>
        <template #quantity-data="{ row }">
          1
        </template>
        <template #actions-data="{ row }">
          <UDropdown :items="items(row)">
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
            <div class="font-semibold">120zł</div>
          </div>
          <div class="flex flex-row justify-between gap-12 text-xs p-4">
            <div>Dostawa</div>
            <div class="font-semibold">Bezpłatnie</div>
          </div>
          <UDivider color="gray" />
          <div class="flex flex-row justify-between gap-12 text-sm p-4 font-semibold">
            <div>Suma</div>
            <div>120zł</div>
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
