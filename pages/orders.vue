<script setup lang="ts">

const router = useRouter()
const columns = [{
  key: 'date',
  label: 'Data',
  sortable: true
}, {
  key: 'amount',
  label: 'Wartość',
  sortable: true
}, {
  key: 'image'
}]

const { orders } = await useOrders()
function select (row: any) {
  const id = row.id
  return router.push(`/order/${id}`)
}

</script>

<template>
  <div>
    <div class="text-3xl font-bold py-10">
      Moje zamówienia
    </div>
    <UCard :ui="{ body: { padding: '' } }">
      <UTable
        v-model:columns="columns"
        :rows="orders"
        @select="select"
      >
        <template #image-data="{ row }">
          <UAvatarGroup
            v-for="img in row.products"
            class=""
          >
            <UTooltip :text="img.name">
              <UAvatar
                v-model:src="img.url"
                class="flex"
              />
            </UTooltip>
          </UAvatarGroup>
        </template>
        <template #amount-data="{ row }">
          {{ row.amount }} zł
        </template>
      </UTable>
    </UCard>
  </div>
</template>
