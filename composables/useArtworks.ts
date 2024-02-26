import { ref } from "vue"

export default function useArtworks(variant?: string) {
  const supabase = useSupabaseClient<Database>()
  const data = ref<Artwork[] | ArtworkLight[]>()
  const loading = ref<boolean>()

  // handle page refresh
  onMounted(async () => {
    await initArtworks()
  })

  async function initArtworks() {
    try {
      loading.value = true
      data.value = variant === "search" ? await getArtworksSearch() : await getArtworks()
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  async function getArtworks(): Promise<any[]> {
    // @ts-ignore
    const { data, error } = await supabase.rpc("get_artworks")
    return new Promise((resolve, reject) => {
      error ? reject(error) : resolve(data)
    })
  }

  async function getArtworksSearch(): Promise<any[]> {
    // @ts-ignore
    const { data, error } = await supabase.rpc("get_artworks_search")
    return new Promise((resolve, reject) => {
      error ? reject(error) : resolve(data)
    })
  }

  return {
    data,
    loading
  }
}