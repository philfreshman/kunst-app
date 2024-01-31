import { ref } from "vue"

export default function useArtworks() {
  const supabase = useSupabaseClient<Database>()
  const data = ref<Artwork[]>()
  const dataLight = ref<ArtworkLight[]>()
  const loading = ref<boolean>()

  // handle page refresh
  onMounted(() => {
    if (data.value) fetchArtworks()
  })

  async function fetchArtworks() {
    loading.value = true
    try {
      const { data: artworksData } = await useAsyncData(
        "artworks",
        async () =>
          supabase
            .from("artworks")
            .select(
              `
                id,
                article_id,
                img_url,
                title,
                height,
                width,
                price,
                artists:artist_id (name)
              `,
            )
            .order("id"),
        {
          transform: (result) => result.data as any[],
          server: false,
        },
      )

      if (artworksData.value === null) {
        data.value = []
        return
      }
      // store response
      data.value = artworksData.value
      loading.value = false
    } catch (err) {
      console.error("Error retrieving data from db", err)
    }

    loading.value = false
  }

  async function fetchArtworksLight() {
    loading.value = true
    try {
      const { data: artworksLightData } = await useAsyncData(
        "artworks",
        async () =>
          supabase.from("artworks").select(
            `
              id,
              article_id,
              img_url,
              title,
              artists:artist_id (name)
              `,
          ),
        // .order("title"),
        {
          transform: (result) => result.data as any[],
          server: false,
        },
      )

      if (artworksLightData.value === null) {
        dataLight.value = []
        return
      }
      // store response
      dataLight.value = artworksLightData.value
      loading.value = false
    } catch (err) {
      console.error("Error retrieving data from db", err)
    }

    loading.value = false
  }

  return {
    data,
    dataLight,
    loading,
    fetchArtworks,
    fetchArtworksLight,
  }
}
