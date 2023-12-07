import { ref } from 'vue'

export default function useArtist(){

  const supabase = useSupabaseClient<Database>()
  const data = ref<Artist[]>()
  const loading = ref<boolean>(true)

  async function fetchArtists() {
    try {
      const {pending, data: artistData} = await useLazyAsyncData('artists', async () =>
        supabase.from('artists').select('*').order('id'), {
        transform: result => result.data as Artist[], server: false
      })

      if (artistData.value === null) {
        data.value = []
        return
      }
      // store response to allTodos
      data.value = artistData.value
    } catch (err) {
      console.error('Error retrieving data from db', err)
    }

    loading.value = false

  }

  async function updateArtist(artist: Artist){
    try{
      const response = await supabase.from('artists').upsert(artist)
      if(response.status === 201){
        await fetchArtists()
      }
    }
    catch(error){
      console.log(error)
      alert("error")
    }
  }

  return {
    data,
    loading,
    fetchArtists,
    updateArtist
  }
}
