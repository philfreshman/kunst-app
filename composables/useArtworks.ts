import { ref } from "vue"

export default function useArtworks() {
  const supabase = useSupabaseClient<Database>()
  const data = ref<Artist[]>()
  const loading = ref<boolean>(true)

  async function fetchArtworks() {
    try {
      const { pending, data: artworksData } = await useLazyAsyncData(
        "artworks",
        async () => supabase.from("artworks").select("*").order("id"),
        {
          transform: (result) => result.data as Artist[],
          server: false,
        },
      )

      if (artworksData.value === null) {
        data.value = []
        return
      }
      // store response to allTodos
      data.value = artworksData.value
    } catch (err) {
      console.error("Error retrieving data from db", err)
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
    fetchArtworks,
  }
}
