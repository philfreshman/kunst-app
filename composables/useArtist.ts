import { ref } from "vue"

export default function useArtist() {
  const supabase = useSupabaseClient<Database>()
  const loading = ref<boolean>(true)
  const data = ref<Artist[]>()

  // handle page refresh
  onMounted(async () => {
    if (data.value === null) await initArtists()
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
      if (error === null) {
        resolve(data)
      } else {
        reject("Operation failed")
      }
    })
  }

  async function updateArtist(artist: Artist) {
    const { error } = await supabase.rpc("update_artist", { artist })

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
    initArtists,
    getArtists,
    updateArtist
  }
}
