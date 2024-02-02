import { ref } from "vue"

export default function useArtist() {
  const supabase = useSupabaseClient<Database>()
  const data = ref<Artist[]>()
  const loading = ref<boolean>(true)

  // handle page refresh
  onMounted(async () => {
    if (data.value) await getArtists()
  })

  async function getArtists() {
    loading.value = true
    const { data: artistData, error } = await supabase.rpc("get_artists")
    if (error) {
      console.error("Error retrieving data from db", error)
      return
    }
    data.value = artistData
    loading.value = false
  }

  async function updateArtist(artist: Artist) {
    const { error } = await supabase.from("artists").upsert(artist)

    return new Promise((resolve, reject) => {
      if (error === null) {
        resolve("Operation was successful")
      } else {
        reject("Operation failed")
      }
    })
  }

  return {
    data,
    loading,
    updateArtist,
    getArtists
  }
}
