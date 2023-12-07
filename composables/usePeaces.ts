import { ref } from 'vue'

export default function usePeaces(){

  const supabase = useSupabaseClient<Database>()
  const data = ref<Artist[]>()
  const loading = ref<boolean>(true)

  async function fetchPeaces() {
    try {
      const {pending, data: peacesData} = await useLazyAsyncData('peaces', async () =>
        supabase.from('peaces').select('*').order('id'), {
        transform: result => result.data as Artist[], server: false
      })

      if (peacesData.value === null) {
        data.value = []
        return
      }
      // store response to allTodos
      data.value = peacesData.value
    } catch (err) {
      console.error('Error retrieving data from db', err)
    }

    loading.value = false

  }
  //
  // async function updateArtist(artist: Artist){
  //   try{
  //     const response = await supabase.from('artists').upsert(artist)
  //     if(response.status === 201){
  //       await fetchArtists()
  //     }
  //   }
  //   catch(error){
  //     console.log(error)
  //     alert("error")
  //   }
  // }

  return {
    data,
    loading,
    fetchPeaces,
  }
}
