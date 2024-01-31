import { ref } from "vue"

export default function useOffers() {
  const supabase = useSupabaseClient<Database>()
  const data = ref<Offer[]>()
  const loading = ref<boolean>(true)

  // handle page refresh
  onMounted(() => {
    if (data.value) fetchOffers()
  })

  async function fetchOffers() {
    try {
      const { data: offerData } = await useLazyAsyncData("artists", async () => supabase.from("offers").select("*").order("id"), {
        transform: (result) => result.data as Offer[],
        server: false,
      })
      if (offerData.value === null) {
        data.value = []
        return
      }
      // store response to allTodos
      data.value = offerData.value
    } catch (err) {
      console.error("Error retrieving data from db", err)
    }

    loading.value = false
  }

  async function updateOffer(offer: Offer) {
    const { error } = await supabase.from("offers").upsert(offer)
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
    fetchOffers,
    updateOffer,
  }
}
