<script setup lang="ts">

const emit = defineEmits<{
  (e: 'close-adding'): void,
  (e: 'continue-shopping'): void
}>()

</script>

<template>
  <UModal prevent-close>
    <div class="p-4">
      <Placeholder class="h-48">
        <div class="flex justify-between w-full py-4">
          <div class="flex w-full">
            Produkt został dodany do koszyka!
          </div>
          <UButton color="black" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
            @click="$emit('close-adding')" />
        </div>
        <div class="pt-4 w-full flex justify-around">
          <UButton label="Wróć do koszyka" icon="i-heroicons-shopping-cart" @click="$emit('continue-shopping')" />
        </div>
      </Placeholder>
    </div>
  </UModal>
</template>

