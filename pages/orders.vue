<script setup lang="ts">

const router = useRouter()
const columns = [
  {
    key: 'id',
    label: 'ID zamówienia'
  }, {
    key: 'date',
    label: 'Data',
    sortable: true
  }, {
    key: 'finalPrice',
    label: 'Wartość',
    sortable: true
  }, {
    key: 'products',
    label: 'Produkty'
  }]

const { orders } = await useOrders()
function select (row: any) {
  console.log('Aktualne zamówienie')
  console.log(row)
  const id = row.id
  return router.push(`/order/${id}`)
}

// const button
const isModalOpen = ref()
const currentProducts = ref()
const openModal = (row) => {
  isModalOpen.value = true
  currentProducts.value = row.products
}
</script>

<template>
  <div>
    <UModal
      v-model="isModalOpen"
      prevent-close
    >
      <div class="p-4">
        <Placeholder class="h-48">
          <div class="flex justify-between w-full py-4">
            <div class="flex w-full">
              Produkt został dodany do koszyka!
            </div>
            <div
              v-for="product in currentProducts"
              :key="product.id"
            >
              <div>{{ product.name }}</div>
            </div>
          </div>
        </Placeholder>
      </div>
    </UModal>
    <div class="text-3xl font-bold py-10">
      Moje zamówienia
    </div>
    <UCard :ui="{ body: { padding: '' } }">
      <!-- @select="select" -->
      <UTable
        v-model:columns="columns"
        :rows="orders"
      >
        <template #products-data="{ row }">
          <UButton
            label="Pokaż produkty"
            color="white"
            variant="link"
            @click="select(row)"
          />
        </template>
        <template #finalPrice-data="{ row }">
          {{ row.finalPrice }} zł
        </template>
      </UTable>
    </UCard>
  </div>
</template>
