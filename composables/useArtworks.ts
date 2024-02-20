import { ref } from "vue"

export default function useArtworks(variant?: string) {
  const supabase = useSupabaseClient<Database>()
  const data = ref<Artwork[] | ArtworkLight[]>()
  const dataLight = ref<ArtworkLight[]>()
  const dataById = ref<Artwork[]>()
  const loading = ref<boolean>()

  // handle page refresh
  onMounted(async () => {
    await initArtworks()
  })

  async function initArtworks() {
    try {
      loading.value = true
      data.value = variant === "search" ? await getArtworksSearch() : await getArtworks()
    } catch (e) {
      console.error(e)
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

  async function fetchArtworksById(ids: number[]) {
    // loading.value = true
    // try {
    //   const { data: artworksData } = await useAsyncData(
    //     "artworks",
    //     async () =>
    //       supabase
    //         .from("artworks")
    //         .select(
    //           `
    //           id,
    //           article_id,
    //           title,
    //           height,
    //           width,
    //           price
    //         `
    //         )
    //         .in("id", ids)
    //         .order("id"),
    //     {
    //       transform: (result) => result.data as any[],
    //       server: false
    //     }
    //   )
    //
    //   if (artworksData.value === null) {
    //     data.value = []
    //     return
    //   }
    //   // store response
    //   dataById.value = artworksData.value
    //   loading.value = false
    // } catch (err) {
    //   console.error("Error retrieving data from db", err)
    // }
    //
    // loading.value = false
  }

  async function fetchArtworksLight2() {
    // const { data, error } = await supabase.rpc("get_all_artworks_search_materialized")
    //
    // if (error) console.log(error)
    // console.log(data)
  }

  async function fetchArtworksLight() {
    // loading.value = true
    // try {
    //   const { data: artworksLightData } = await useAsyncData(
    //     "artworks",
    //     async () =>
    //       supabase.from("artworks").select(
    //         `
    //           id,
    //           article_id,
    //           img_url,
    //           title,
    //           artists:artist_id (name)
    //           `
    //       ),
    //     // .order("title"),
    //     {
    //       transform: (result) => result.data as any[],
    //       server: false
    //     }
    //   )
    //
    //   if (artworksLightData.value === null) {
    //     dataLight.value = []
    //     return
    //   }
    //   // store response
    //   dataLight.value = artworksLightData.value
    //   loading.value = false
    // } catch (err) {
    //   console.error("Error retrieving data from db", err)
    // }
    //
    // loading.value = false
  }

  return {
    data,
    dataLight,
    dataById,
    loading,
    getArtworksSearch,
    fetchArtworksLight,
    fetchArtworksLight2,
    fetchArtworksById
  }
}