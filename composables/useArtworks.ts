import { ref } from "vue"

export default function useArtworks() {
  const supabase = useSupabaseClient<Database>()
  const data = ref<Artwork[]>()
  const loading = ref<boolean>(true)

  async function fetchArtworks() {
    try {
      const { pending, data: artworksData } = await useLazyAsyncData(
        "artworks",
        async () =>
          supabase
            .from("artworks")
            .select(
              `
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
    } catch (err) {
      console.error("Error retrieving data from db", err)
    }

    loading.value = false
  }

  return {
    data,
    loading,
    fetchArtworks,
  }
}
