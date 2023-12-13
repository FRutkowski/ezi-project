<script setup lang="ts">
import { useColorMode } from '@vueuse/core'

// const manageNavigation = [
//   {
//     label: 'Home',
//     icon: 'i-heroicons-home',
//     to: '/'
//   }
// ]

// const user = {
//   avatar: 'https://avatars.githubusercontent.com/u/739984?v=4',
//   name: 'Jan Kowalski',
//   email: 'jan@kowal.ski'
// }

// const router = useRouter()
const colorMode = useColorMode()
colorMode.value = 'light'

// const route = useRoute()
// const pageTransition = computed(() => {
//   const transition = route.meta.pageTransition
//   return typeof transition === 'object'
//     ? transition.name + '-small'
//     : ''
// })
</script>

<template>
  <Html>
    <Head />
    <Body>
      <NuxtLoadingIndicator color="rgb(var(--color-primary-500))" />
      <main>
        <div class="sticky top-0 z-[10] bg-[url('/restaurant.jpg')] bg-cover bg-center text-white font-bold">
          <div class="pl-72 h-28 flex items-center bg-black/50">
            <!-- <img class="w-96" v-bind:src="'/nazwa.png'"/> -->
            <p class="text-4xl">
              Sklep internetowy
            </p>
          </div>
          <!-- <img class="pl-72 h-28 flex items-center bg-black/50" src="/nazwa.jpg"/> -->
        </div>
        <div class="h-screen max-w-screen grid grid-rows-[1fr,auto] text-gray-800 dark:text-gray-200">
          <div class="grid grid-cols-[auto,1fr] h-full bg-white dark:bg-gray-900 shadow-inner">
            <div class="fixed top-28 left-0 w-64 overflow-hidden">
              <div class="flex flex-col p-4 h-full max-h-screen">
                <Transition
                  mode="out-in"
                  :name="pageTransition"
                >
                  <NavBar />
                </Transition>
              </div>

              <div class="h-full">
                <div class="fixed left-64 top-28 h-full w-full bg-gray-100 dark:bg-gray-800  shadow-inner">
                  <div class="max-h-[calc(100vh-5rem)] max-w-[calc(100vw-16rem)] h-full p-8 overflow-auto relative z-[1]">
                    <NuxtPage />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Body>
  </Html>
</template>
