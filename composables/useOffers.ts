import { ref } from "vue"

export default function useOffers() {
  const supabase = useSupabaseClient<Database>()
  const data = ref<Offer[]>()
  const loading = ref<boolean>(true)

  // onMounted(async () => {
  //   await initOffers()
  // })

  async function initOffers() {
    try {
      loading.value = true
      data.value = await getOffers()
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  async function getOffers(): Promise<Offer[]> {
    // @ts-ignore
    const { data, error } = await supabase.rpc("get_offers")
    return new Promise((resolve, reject) => {
      error ? reject(error) : resolve(data)
    })
  }

  async function createOffer(offer: Offer): Promise<unknown> {
    // @ts-ignore
    const { data, error } = await supabase.rpc("insert_offer", { offer })
    return new Promise((resolve, reject) => {
      error ? reject(error) : resolve(data)
    })
  }

  async function deleteOffer(offerId: string): Promise<unknown> {
    // @ts-ignore
    const { data, error } = await supabase.rpc("delete_offer", { ["offer_id"]: offerId })
    return new Promise((resolve, reject) => {
      error ? reject(error) : resolve(data)
    })
  }

  return {
    data,
    loading,
    initOffers,
    createOffer,
    deleteOffer
  }
}
