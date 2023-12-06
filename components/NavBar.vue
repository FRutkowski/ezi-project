<script setup lang="ts">
const links = [
  {
    label: 'Produkty',
    icon: 'i-heroicons-list-bullet',
    to: '/products/'
  },
  {
    label: 'Mój koszyk',
    icon: 'i-heroicons-shopping-cart',
    to: '/shoppingCart/',
    exact: true
  },
  {
    label: 'Moje zamówienia',
    icon: 'i-heroicons-clipboard-document-list',
    to: '/orders/',
    exact: true
  }
]

</script>

<template>
  <div class="pt-16">
    <UDivider class="pb-4" />
    <UVerticalNavigation
      :links="links"
      :ui="{
        active: 'text-white dark:text-white before:bg-orange-500 dark:before:bg-orange-900',
        inactive: 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:before:bg-gray-50 dark:hover:before:bg-gray-800/50',
        icon: {
          active: 'text-white dark:text-gray-200',
          inactive: 'text-gray-400 dark:text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-200'
        },
      }"
    />
  </div>
</template>
