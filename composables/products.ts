import { createGlobalState } from '@vueuse/core'

export const useProducts = createGlobalState(async () => {
  // NOTE: We will get data from the database
  const products = ref<Product[]>([{
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
  }])

  return { products }
})
