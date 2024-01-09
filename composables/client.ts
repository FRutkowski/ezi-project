import { createGlobalState } from '@vueuse/core'

export const useClients = createGlobalState(async () => {
  // NOTE: We will get data from the database
  const clients = ref<Client[]>([{
    id: 1,
    firstName: 'Filip',
    lastName: 'Rećko',
    address: 'Białystok, ul. Wiejska 45A'
  },
  {
    id: 2,
    firstName: 'Monika',
    lastName: 'Rutkowska',
    address: 'Białystok, ul. Wiejska 46A'
  },
  {
    id: 3,
    firstName: 'Patrycja',
    lastName: 'Słowikowska',
    address: 'Białystok, ul. Wiejska 47A'
  }])

  return { clients }
})
