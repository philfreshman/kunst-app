import { ref } from "vue"

export default function useArtist() {
  const supabase = useSupabaseClient<Database>()
  const loading = ref<boolean>(true)
  const data = ref<Artist[]>()

  // handle page refresh
  onMounted(async () => {
    await initArtists()
  })

  async function initArtists() {
    try {
      loading.value = true
      data.value = await getArtists()
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  async function getArtists(): Promise<Artist[]> {
    const { data, error } = await supabase.rpc("get_artists")
    return new Promise((resolve, reject) => {
      error ? reject(error) : resolve(data)
    })
  }

  async function updateArtist(artist: Artist) {
    const { error } = await supabase.rpc("update_artist", { artist })
    return new Promise((resolve, reject) => {
      error ? reject(error) : resolve(null)
    })
  }

  return {
    data,
    loading,
    initArtists,
    updateArtist
  }
}
