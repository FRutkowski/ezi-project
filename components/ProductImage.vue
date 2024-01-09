<script setup lang="ts">

const props = defineProps({
  imageToShow: {
    type: String,
    required: true
  }
})

const emit = defineEmits<{
  (e: 'close-image'): void
}>()

</script>

<template>
  <UModal prevent-close>
    <div class="flex justify-end w-full absolute p-2">
      <UButton
        color="black"
        variant="solid"
        icon="i-heroicons-x-mark-20-solid"
        class="-my-1"
        @click="$emit('close-image')"
      />
    </div>
    <img :src="imageToShow">
  </UModal>
</template>

