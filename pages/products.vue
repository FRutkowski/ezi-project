<script setup lang="ts">
  const products = [
    {
      name: 'Kawa',
      category: 'Napój',
      imageUrl:
        'https://images.unsplash.com/photo-1696435552166-b6df73486451?q=80&w=2841&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      name: 'Żeberka',
      category: 'Danie główne',
      imageUrl:
        'https://media.istockphoto.com/id/1180002154/pl/zdj%C4%99cie/grillowane-%C5%BCeberka-wieprzowe-na-desce-do-krojenia.jpg?s=1024x1024&w=is&k=20&c=YN5pcSfIC1DrV3iahInEOEbNjEMf4PzkWfmCt-1isaY=',
    },
    {
      name: 'Tatar',
      email: 'dries.vincent@example.com',
      category: 'Przystawka',
      imageUrl:
        'https://media.istockphoto.com/id/1319938305/pl/zdj%C4%99cie/pyszna-tarta-wo%C5%82owa-z-jajkiem-przepi%C3%B3rczym-i-przyprawami.jpg?s=1024x1024&w=is&k=20&c=0ET_4wQ3dNm2IgB21_e2ltXQ0wE3Svb6_x-TfMjCdDg=',
    },
    {
      name: 'Zupa pomidorowa',
      category: 'Zupa',
      imageUrl:
        'https://media.istockphoto.com/id/1144433097/pl/zdj%C4%99cie/zupa-pomidorowa.jpg?s=1024x1024&w=is&k=20&c=TaeDg_XRgT8NtLevdEpAjtsK6fwxaHzrxttu8YCwbDU=',
    },
    {
      name: 'Beza',
      category: 'Deser',
      imageUrl:
        'https://media.istockphoto.com/id/1136861359/pl/zdj%C4%99cie/widok-z-g%C3%B3ry-na-ciasto-pavlova-nowej-zelandii-z-bit%C4%85-%C5%9Bmietan%C4%85-i-mieszank%C4%85-%C5%9Bwie%C5%BCych-jag%C3%B3d-na.jpg?s=1024x1024&w=is&k=20&c=xujzYgvquBkRCXuod4NETuQ62Zi0e1vm0057n15kZDU=',
    },
    {
      name: 'Aperol',
      category: 'Alkohol',
      imageUrl:
        'https://media.istockphoto.com/id/1307999346/pl/zdj%C4%99cie/kieliszek-lodowego-koktajlu-aperol-spritz-podawanego-w-kieliszku-do-wina-ozdobionym.jpg?s=1024x1024&w=is&k=20&c=Noa7PMKqHx1dywt2QLIHK2PMrF5wWn0HDvpqGO9SLps=',
    },
    {
      name: 'Pieczywo',
      category: 'Dodatki',
      imageUrl:
        'https://media.istockphoto.com/id/1125389587/pl/zdj%C4%99cie/pyszny-domowy-chleb-%C5%BCytni-na-zakwasie-na-talerzu-i-mleku-domowe-pieczenie.jpg?s=1024x1024&w=is&k=20&c=G4AEYKt0kcMyXNSyRAenK4Tv4Zc3S4Ttv4qZXLe46jg=',
    },
  ]
  </script>

<template>
    <ul role="list" class="divide-y divide-gray-100">
      <li v-for="product in products" :key="product.category" class="flex justify-between gap-x-6 py-5">
        <div class="flex min-w-0 gap-x-4">
          <img class="h-12 w-12 flex-none rounded-full bg-gray-50" :src="product.imageUrl" alt="" />
          <div class="min-w-0 flex-auto">
            <p class="text-sm font-semibold leading-6 text-gray-900">{{ product.name }}</p>
            <p class="mt-1 truncate text-xs leading-5 text-gray-500">{{ product.category }}</p>
          </div>
        </div>
        <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
          <p class="text-sm leading-6 text-gray-900">
            <a href="/shoppingCart/" class="inline-flex items-center font-medium hover:underline">
                Dodaj do koszyka
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 ms-2 ">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
            </a>
          </p>
          <p class="mt-1 text-xs leading-5 text-gray-500">
            <a href="#" >
                Sprawdź sugerowane
            </a>
          </p>
        </div>
      </li>
    </ul>
  </template>