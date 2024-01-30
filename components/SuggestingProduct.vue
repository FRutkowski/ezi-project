<script setup lang="ts">

const emit = defineEmits<{
  (e: 'close-suggesting'): void,
  (e: 'continue-shopping'): void
}>()

</script>

<template>
  <UModal prevent-close>
    <div class="p-4">
      <Placeholder class="h-48">
        <div class="flex justify-between w-full py-4">
          <p class="text-sm">
            Inne często występujące razem produkty:
          </p>
          <UButton
            color="black"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="$emit('close-suggesting')"
          />
        </div>
        <UDivider />
        <slot />
        <UDivider />
        <div class="pt-4 w-full flex justify-around">
          <UButton
            color="gray"
            label="Kontynuuj zakupy"
            icon="i-heroicons-banknotes"
            @click="$emit('continue-shopping')"
          />
        </div>
      </Placeholder>
    </div>
  </UModal>
</template>
