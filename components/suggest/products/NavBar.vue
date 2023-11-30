<script setup lang="ts">
const route = useRoute()
const links = [
  {
    label: 'Sugestie',
    icon: 'i-heroicons-building-office',
    to: `/suggest/products/`,
    exact: true
  },
  {
    label: 'Produkty',
    icon: 'i-heroicons-user-group',
    to: `/suggest/products/`
  },
]

</script>

<template>
  <div>
    <UVerticalNavigation :links="links" />
  </div>
</template>
