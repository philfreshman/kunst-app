import { ref } from "vue"

export default function useArtist() {
  const supabase = useSupabaseClient<Database>()
  const data = ref<Artist[]>()
  const loading = ref<boolean>(true)

  async function fetchArtists() {
    try {
      const { pending, data: artistData } = await useLazyAsyncData(
        "artists",
        async () => supabase.from("artists").select("*").order("id"),
        {
          transform: (result) => result.data as Artist[],
          server: false,
        },
      )
      if (artistData.value === null) {
        data.value = []
        return
      }
      // store response to allTodos
      data.value = artistData.value
    } catch (err) {
      console.error("Error retrieving data from db", err)
    }

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
    fetchArtists,
    updateArtist,
  }
}
