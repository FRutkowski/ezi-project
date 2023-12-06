<script setup>

const isImageShown = ref(false)
const isAddingProduct = ref(false)
const isSuggestingProduct = ref(false)

const imageToShow = ref('')
const addedProductId = ref()

const sort = ref({
  column: 'name',
  direction: 'desc'
})

const columns = [{
  key: 'image'
}, {
  key: 'name',
  label: 'Nazwa',
  sortable: true
}, {
  key: 'category',
  label: 'Kategoria',
  sortable: true
}, {
  key: 'price',
  label: 'Cena',
  sortable: true
}, {
  key: 'actions'
}]

const products = [{
  id: '1',
  name: 'Kawa',
  price: 10,
  category: 'Napój',
  photo:
    'https://images.unsplash.com/photo-1696435552166-b6df73486451?q=80&w=2841&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
},
{
  id: '2',
  name: 'Żeberka',
  price: 10,
  category: 'Danie główne',
  photo:
    'https://media.istockphoto.com/id/1180002154/pl/zdj%C4%99cie/grillowane-%C5%BCeberka-wieprzowe-na-desce-do-krojenia.jpg?s=1024x1024&w=is&k=20&c=YN5pcSfIC1DrV3iahInEOEbNjEMf4PzkWfmCt-1isaY='
},
{
  id: '3',
  name: 'Tatar',
  email: 'dries.vincent@example.com',
  price: 10,
  category: 'Przystawka',
  photo:
    'https://media.istockphoto.com/id/1319938305/pl/zdj%C4%99cie/pyszna-tarta-wo%C5%82owa-z-jajkiem-przepi%C3%B3rczym-i-przyprawami.jpg?s=1024x1024&w=is&k=20&c=0ET_4wQ3dNm2IgB21_e2ltXQ0wE3Svb6_x-TfMjCdDg='
},
{
  id: '4',
  name: 'Zupa pomidorowa',
  price: 10,
  category: 'Zupa',
  photo:
    'https://media.istockphoto.com/id/1144433097/pl/zdj%C4%99cie/zupa-pomidorowa.jpg?s=1024x1024&w=is&k=20&c=TaeDg_XRgT8NtLevdEpAjtsK6fwxaHzrxttu8YCwbDU='
},
{
  id: '5',
  name: 'Beza',
  price: 10,
  category: 'Deser',
  photo:
    'https://media.istockphoto.com/id/1136861359/pl/zdj%C4%99cie/widok-z-g%C3%B3ry-na-ciasto-pavlova-nowej-zelandii-z-bit%C4%85-%C5%9Bmietan%C4%85-i-mieszank%C4%85-%C5%9Bwie%C5%BCych-jag%C3%B3d-na.jpg?s=1024x1024&w=is&k=20&c=xujzYgvquBkRCXuod4NETuQ62Zi0e1vm0057n15kZDU='
},
{
  id: '6',
  name: 'Aperol',
  price: 10,
  category: 'Alkohol',
  photo:
    'https://media.istockphoto.com/id/1307999346/pl/zdj%C4%99cie/kieliszek-lodowego-koktajlu-aperol-spritz-podawanego-w-kieliszku-do-wina-ozdobionym.jpg?s=1024x1024&w=is&k=20&c=Noa7PMKqHx1dywt2QLIHK2PMrF5wWn0HDvpqGO9SLps='
},
{
  id: '7',
  name: 'Pieczywo',
  price: 10,
  category: 'Dodatki',
  photo:
    'https://media.istockphoto.com/id/1125389587/pl/zdj%C4%99cie/pyszny-domowy-chleb-%C5%BCytni-na-zakwasie-na-talerzu-i-mleku-domowe-pieczenie.jpg?s=1024x1024&w=is&k=20&c=G4AEYKt0kcMyXNSyRAenK4Tv4Zc3S4Ttv4qZXLe46jg='
}
]

const items = (row) => [
  [{
    label: 'Dodaj do koszyka',
    icon: 'i-heroicons-shopping-cart',
    click: () => {
      addProduct(row.id)
    }
  }, {
    label: 'Sprawdź sugerowane',
    icon: 'i-heroicons-magnifying-glass-circle',
    click: () => {
      isSuggestingProduct.value = true
      suggestProduct(row.id)
    }
  }]
]

function showPhoto (imgUrl) {
  isImageShown.value = true
  imageToShow.value = imgUrl
}

const suggestedProduct = []
const idx = ref()

function addProduct (productId) {
  isSuggestingProduct.value = false
  isAddingProduct.value = true
  addedProductId.value = productId

  idx.value = Math.floor(Math.random() * products.length)
  suggestedProduct[0] = products[idx.value]
}

function suggestProduct (productId) {
  isAddingProduct.value = false
  isSuggestingProduct.value = true

  idx.value = Math.floor(Math.random() * products.length)
  suggestedProduct[0] = products[idx.value]
}

function continueShopping (productId) {
  isAddingProduct.value = false
  isSuggestingProduct.value = false
}

</script>

<template>
  <div>
    <UModal
      v-model="isImageShown"
      prevent-close
    >
      <div class="flex justify-end w-full absolute p-2">
        <UButton
          color="black"
          variant="solid"
          icon="i-heroicons-x-mark-20-solid"
          class="-my-1"
          @click="isImageShown = false"
        />
      </div>
      <img :src="imageToShow">
    </UModal>

    <UModal
      v-model="isAddingProduct"
      prevent-close
    >
      <div class="p-4">
        <Placeholder class="h-48">
          <div class="flex justify-between w-full py-4">
            <div class="flex w-full">
              Produkt został dodany do koszyka!
            </div>
            <UButton
              color="black"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="isAddingProduct = false"
            />
          </div>
          <p class="py-4 text-sm">
            Inne produkty sugerowane na podstawie Twojego wyboru:
          </p>
          <UDivider />

          <!-- do usunięcia po dodaniu backendu tylko do testów -->
          <div class="absolute hidden">
            idx: {{ idx }}
          </div>

          <UTable
            v-model:columns="columns"
            :rows="suggestedProduct"
          >
            <template #image-data="{ row }">
              <UButton
                label="Open"
                variant="link"
                @click="showPhoto(row.photo)"
              >
                <UAvatar
                  v-model:src="row.photo"
                  size="sm"
                />
              </UButton>
            </template>ł
            <template #actions-data="{ row }">
              <UDropdown :items="items(row)">
                <UButton
                  color="gray"
                  variant="ghost"
                  icon="i-heroicons-ellipsis-horizontal-20-solid"
                />
              </UDropdown>
            </template>
          </UTable>

          <UDivider />
          <div class="pt-4 w-full flex justify-around">
            <UButton
              color="gray"
              label="Kontynuuj zakupy"
              icon="i-heroicons-banknotes"
              @click="isAddingProduct=false"
            />
            <UButton
              label="Przejdź do koszyka"
              icon="i-heroicons-shopping-cart"
            />
          </div>
        </Placeholder>
      </div>
    </UModal>

    <UModal
      v-model="isSuggestingProduct"
      prevent-close
    >
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
              @click="isSuggestingProduct = false"
            />
          </div>
          <UDivider />

          <!-- do usunięcia po dodaniu backendu tylko do testów -->
          <div class="absolute hidden">
            idx: {{ idx }}
          </div>

          <UTable
            v-model:columns="columns"
            :rows="suggestedProduct"
          >
            <template #image-data="{ row }">
              <UButton
                label="Open"
                variant="link"
                @click="showPhoto(row.photo)"
              >
                <UAvatar
                  v-model:src="row.photo"
                  size="sm"
                />
              </UButton>
            </template>ł
            <template #actions-data="{ row }">
              <UDropdown :items="items(row)">
                <UButton
                  color="gray"
                  variant="ghost"
                  icon="i-heroicons-ellipsis-horizontal-20-solid"
                />
              </UDropdown>
            </template>
          </UTable>

          <UDivider />
          <div class="pt-4 w-full flex justify-around">
            <UButton
              color="gray"
              label="Kontynuuj zakupy"
              icon="i-heroicons-banknotes"
              @click="continueShopping"
            />
            <UButton
              label="Przejdź do koszyka"
              icon="i-heroicons-shopping-cart"
            />
          </div>
        </Placeholder>
      </div>
    </UModal>

    <UCard :ui="{ body: { padding: '' }}">
      <UTable
        v-model:sort="sort"
        :columns="columns"
        :rows="products"
      >
        <template #image-data="{ row }">
          <UButton
            label="Open"
            variant="link"
            @click="showPhoto(row.photo)"
          >
            <UAvatar
              v-model:src="row.photo"
              size="md"
            />
          </UButton>
        </template>
        <template #actions-data="{ row }">
          <UDropdown :items="items(row)">
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-ellipsis-horizontal-20-solid"
            />
          </UDropdown>
        </template>
      </UTable>
    </UCard>
  </div>
</template>
