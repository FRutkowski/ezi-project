<script setup lang="ts">

const props = defineProps<{ id: string }>()

const isImageShown = ref(false)
const imageToShow = ref('')

const cartColumns = [
//   {
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

const route = useRoute()
// const { products } = await useProducts()
const { orders } = await useOrders()
const products = computed(() => {
  return orders.value[route.params.id - 1].products
})

function showPhoto (imgUrl: any) {
  isImageShown.value = true
  imageToShow.value = imgUrl
}

const finalPrice = computed(() => {
  return products.value.reduce((acc: number, product: Product) => acc + product.price, 0)
})

</script>

<template>
  <div>
    <div class="text-3xl font-bold py-10">
      Zamówienie numer {{ $route.params.id }}
    </div>

    <ProductImage
      v-model="isImageShown"
      :image-to-show="imageToShow"
      @close-image="isImageShown = false"
    />

    <div class="flex flex-row justify-between gap-4">
      <UCard
        :ui="{ body: { padding: '' } }"
        class="flex-1"
      >
        <UTable
          :columns="cartColumns"
          :rows="products"
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

          <template #quantity-data="{ row }">
            1
          </template>
        </UTable>
      </UCard>

      <div class="flex flex-col justify-start">
        <UCard
          :ui="{ body: { padding: '' } }"
          class="flex"
        >
          <div class="flex flex-col">
            <div class="flex flex-row justify-between gap-12 text-xs font-semibold p-4">
              Podsumowanie
            </div>
            <!-- <UDivider color="gray" />
            <div class="flex flex-row justify-between gap-12 text-xs p-4">
              <div>Wartość zamówienia</div>
              <div class="font-semibold">
                39.99 zł
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
          </div>
        </UCard>
        <div class="flex flex-auto" />
      </div>
    </div>
  </div>
</template>
