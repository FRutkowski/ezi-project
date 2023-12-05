<script setup lang="ts">
const route = useRoute()
const links = [
  {
    label: 'Produkty',
    icon: 'i-heroicons-list-bullet',
    to: `/products/`
  },
  {
    label: 'Mój koszyk',
    icon: 'i-heroicons-shopping-cart',
    to: `/shoppingCart/`,
    exact: true
  },
  {
    label: 'Moje zamówienia',
    icon: 'i-heroicons-clipboard-document-list',
    to: `/orders/`,
    exact: true
  }
]

</script>

<template>
  <div class="pt-16">
    <UDivider class="pb-4"/>
    <UVerticalNavigation :links="links" />
  </div>
</template>
