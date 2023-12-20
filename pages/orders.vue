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

const orders = [{
  id: 1,
  date: '2021-03-24',
  quantity: 3,
  amount: 39.99,
  images: [
    { url: 'https://images.unsplash.com/photo-1696435552166-b6df73486451?q=80&w=2841&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { url: 'https://media.istockphoto.com/id/1180002154/pl/zdj%C4%99cie/grillowane-%C5%BCeberka-wieprzowe-na-desce-do-krojenia.jpg?s=1024x1024&w=is&k=20&c=YN5pcSfIC1DrV3iahInEOEbNjEMf4PzkWfmCt-1isaY=' },
    { url: 'https://media.istockphoto.com/id/1319938305/pl/zdj%C4%99cie/pyszna-tarta-wo%C5%82owa-z-jajkiem-przepi%C3%B3rczym-i-przyprawami.jpg?s=1024x1024&w=is&k=20&c=0ET_4wQ3dNm2IgB21_e2ltXQ0wE3Svb6_x-TfMjCdDg=' }
  ]
}, {
  id: 2,
  date: '2023-04-14',
  quantity: 2,
  amount: 119.99,
  images: [
    { url: 'https://images.unsplash.com/photo-1696435552166-b6df73486451?q=80&w=2841&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { url: 'https://media.istockphoto.com/id/1180002154/pl/zdj%C4%99cie/grillowane-%C5%BCeberka-wieprzowe-na-desce-do-krojenia.jpg?s=1024x1024&w=is&k=20&c=YN5pcSfIC1DrV3iahInEOEbNjEMf4PzkWfmCt-1isaY=' },
    { url: 'https://media.istockphoto.com/id/1319938305/pl/zdj%C4%99cie/pyszna-tarta-wo%C5%82owa-z-jajkiem-przepi%C3%B3rczym-i-przyprawami.jpg?s=1024x1024&w=is&k=20&c=0ET_4wQ3dNm2IgB21_e2ltXQ0wE3Svb6_x-TfMjCdDg=' },
    { url: 'https://media.istockphoto.com/id/1144433097/pl/zdj%C4%99cie/zupa-pomidorowa.jpg?s=1024x1024&w=is&k=20&c=TaeDg_XRgT8NtLevdEpAjtsK6fwxaHzrxttu8YCwbDU='},
    { url: 'https://images.unsplash.com/photo-1696435552166-b6df73486451?q=80&w=2841&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { url: 'https://media.istockphoto.com/id/1180002154/pl/zdj%C4%99cie/grillowane-%C5%BCeberka-wieprzowe-na-desce-do-krojenia.jpg?s=1024x1024&w=is&k=20&c=YN5pcSfIC1DrV3iahInEOEbNjEMf4PzkWfmCt-1isaY=' },
    { url: 'https://media.istockphoto.com/id/1319938305/pl/zdj%C4%99cie/pyszna-tarta-wo%C5%82owa-z-jajkiem-przepi%C3%B3rczym-i-przyprawami.jpg?s=1024x1024&w=is&k=20&c=0ET_4wQ3dNm2IgB21_e2ltXQ0wE3Svb6_x-TfMjCdDg=' },
    { url: 'https://media.istockphoto.com/id/1144433097/pl/zdj%C4%99cie/zupa-pomidorowa.jpg?s=1024x1024&w=is&k=20&c=TaeDg_XRgT8NtLevdEpAjtsK6fwxaHzrxttu8YCwbDU='},
    { url: 'https://images.unsplash.com/photo-1696435552166-b6df73486451?q=80&w=2841&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { url: 'https://media.istockphoto.com/id/1180002154/pl/zdj%C4%99cie/grillowane-%C5%BCeberka-wieprzowe-na-desce-do-krojenia.jpg?s=1024x1024&w=is&k=20&c=YN5pcSfIC1DrV3iahInEOEbNjEMf4PzkWfmCt-1isaY=' },
    { url: 'https://media.istockphoto.com/id/1319938305/pl/zdj%C4%99cie/pyszna-tarta-wo%C5%82owa-z-jajkiem-przepi%C3%B3rczym-i-przyprawami.jpg?s=1024x1024&w=is&k=20&c=0ET_4wQ3dNm2IgB21_e2ltXQ0wE3Svb6_x-TfMjCdDg=' },
    { url: 'https://media.istockphoto.com/id/1144433097/pl/zdj%C4%99cie/zupa-pomidorowa.jpg?s=1024x1024&w=is&k=20&c=TaeDg_XRgT8NtLevdEpAjtsK6fwxaHzrxttu8YCwbDU='},
    { url: 'https://images.unsplash.com/photo-1696435552166-b6df73486451?q=80&w=2841&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { url: 'https://media.istockphoto.com/id/1180002154/pl/zdj%C4%99cie/grillowane-%C5%BCeberka-wieprzowe-na-desce-do-krojenia.jpg?s=1024x1024&w=is&k=20&c=YN5pcSfIC1DrV3iahInEOEbNjEMf4PzkWfmCt-1isaY=' },
    { url: 'https://media.istockphoto.com/id/1319938305/pl/zdj%C4%99cie/pyszna-tarta-wo%C5%82owa-z-jajkiem-przepi%C3%B3rczym-i-przyprawami.jpg?s=1024x1024&w=is&k=20&c=0ET_4wQ3dNm2IgB21_e2ltXQ0wE3Svb6_x-TfMjCdDg=' },
    { url: 'https://media.istockphoto.com/id/1144433097/pl/zdj%C4%99cie/zupa-pomidorowa.jpg?s=1024x1024&w=is&k=20&c=TaeDg_XRgT8NtLevdEpAjtsK6fwxaHzrxttu8YCwbDU='},
    { url: 'https://images.unsplash.com/photo-1696435552166-b6df73486451?q=80&w=2841&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { url: 'https://media.istockphoto.com/id/1180002154/pl/zdj%C4%99cie/grillowane-%C5%BCeberka-wieprzowe-na-desce-do-krojenia.jpg?s=1024x1024&w=is&k=20&c=YN5pcSfIC1DrV3iahInEOEbNjEMf4PzkWfmCt-1isaY=' },
    { url: 'https://media.istockphoto.com/id/1319938305/pl/zdj%C4%99cie/pyszna-tarta-wo%C5%82owa-z-jajkiem-przepi%C3%B3rczym-i-przyprawami.jpg?s=1024x1024&w=is&k=20&c=0ET_4wQ3dNm2IgB21_e2ltXQ0wE3Svb6_x-TfMjCdDg=' },
    { url: 'https://media.istockphoto.com/id/1144433097/pl/zdj%C4%99cie/zupa-pomidorowa.jpg?s=1024x1024&w=is&k=20&c=TaeDg_XRgT8NtLevdEpAjtsK6fwxaHzrxttu8YCwbDU='},
    { url: 'https://images.unsplash.com/photo-1696435552166-b6df73486451?q=80&w=2841&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { url: 'https://media.istockphoto.com/id/1180002154/pl/zdj%C4%99cie/grillowane-%C5%BCeberka-wieprzowe-na-desce-do-krojenia.jpg?s=1024x1024&w=is&k=20&c=YN5pcSfIC1DrV3iahInEOEbNjEMf4PzkWfmCt-1isaY=' },
    { url: 'https://media.istockphoto.com/id/1319938305/pl/zdj%C4%99cie/pyszna-tarta-wo%C5%82owa-z-jajkiem-przepi%C3%B3rczym-i-przyprawami.jpg?s=1024x1024&w=is&k=20&c=0ET_4wQ3dNm2IgB21_e2ltXQ0wE3Svb6_x-TfMjCdDg=' },
    { url: 'https://media.istockphoto.com/id/1144433097/pl/zdj%C4%99cie/zupa-pomidorowa.jpg?s=1024x1024&w=is&k=20&c=TaeDg_XRgT8NtLevdEpAjtsK6fwxaHzrxttu8YCwbDU='},
    { url: 'https://images.unsplash.com/photo-1696435552166-b6df73486451?q=80&w=2841&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }
  ]
}]

function select (row: any) {
  const id = row.id
  return router.push(`/order/${id}`)
}

</script>

<template>
  <div class="text-3xl font-bold py-10">
    Moje zamówienia
  </div>
  <UCard :ui="{ body: { padding: '' } }">
    <UTable v-model:columns="columns" :rows="orders" @select="select">
      <template #image-data="{ row }">
        <UAvatarGroup class="" v-for="img in row.images" >
          <UAvatar class="flex" v-model:src="img.url"/>
        </UAvatarGroup>
      </template>
      <template #amount-data="{ row }">
        {{ row.amount }} zł
      </template>
    </UTable>
  </UCard>
</template>
