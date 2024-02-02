import { ref } from "vue"

export default function useArtworks() {
  const supabase = useSupabaseClient<Database>()
  const data = ref<Artwork[]>()
  const dataLight = ref<ArtworkLight[]>()
  const dataById = ref<Artwork[]>()
  const loading = ref<boolean>()

  supabase.rpc("get_artworks", { id: 1 }).then((res) => {
    console.log(res)
  })

  // handle page refresh
  onMounted(() => {
    if (data.value) fetchArtworks()
  })

  async function fetchArtworks() {
    loading.value = true
    try {
      // const { data: artworksData } = await useAsyncData(
      //   "artworks",
      //   async () =>
      //     supabase
      //       .from("artworks")
      //       .select(
      //         `
      //         id,
      //         article_id,
      //         artwork_url (url_id),
      //         title,
      //         height,
      //         width,
      //         price,
      //         artists:artist_id (name)
      //       `
      //       )
      //       .order("id"),
      //   {
      //     transform: (result) => result.data as any[],
      //     server: false
      //   }
      // )
      const { data: artworksData } = await useAsyncData(
        "artworks_url",
        async () =>
          supabase
            .from("artworks_url")
            .select(
              `
              urls:artwork_id (img_url)
            `
            )
            .order("id"),
        {
          transform: (result) => result.data as any[],
          server: false
        }
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

  async function fetchArtworksById(ids: number[]) {
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
              title,
              height,
              width,
              price
            `
            )
            .in("id", ids)
            .order("id"),
        {
          transform: (result) => result.data as any[],
          server: false
        }
      )

      if (artworksData.value === null) {
        data.value = []
        return
      }
      // store response
      dataById.value = artworksData.value
      loading.value = false
    } catch (err) {
      console.error("Error retrieving data from db", err)
    }

    loading.value = false
  }

  async function fetchArtworksLight2() {
    const { data, error } = await supabase.rpc("get_all_artworks_search_materialized")

    if (error) console.log(error)
    console.log(data)
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
              `
          ),
        // .order("title"),
        {
          transform: (result) => result.data as any[],
          server: false
        }
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
    dataById,
    loading,
    fetchArtworks,
    fetchArtworksLight,
    fetchArtworksLight2,
    fetchArtworksById
  }
}
