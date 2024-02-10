import { ref } from "vue"
import { calcPrice } from "~/utils/calcPrice"

export default function useOffersSnapshot() {
  const tax = 0.19
  const supabase = useSupabaseClient<Database>()
  const loading = ref<boolean>(true)
  const data = ref<Collection[]>()
  const offerSnapshot = ref<OfferSnapshot>()

  async function initCollection(artworkIds: string[]) {
    try {
      loading.value = true
      data.value = await createCollection(artworkIds)
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  async function createOfferSnapshot(offerSnapshot: OfferSnapshot): Promise<any> {
    const { data, error } = await supabase.rpc("insert_offer_snapshot", {
      ["collection"]: offerSnapshot.collection,
      ["summary"]: offerSnapshot.summary
    })
    return new Promise((resolve, reject) => {
      error ? reject(error) : resolve(data)
    })
  }

  async function createCollection(artworkIds: string[]): Promise<Collection[]> {
    const { data, error } = await supabase.rpc("get_collection", { ["ids"]: [artworkIds] })
    return new Promise((resolve, reject) => {
      error ? reject(error) : resolve(data)
    })
  }

  function calcRentPrices(formData: Offer) {
    if (!data.value) return
    data.value.forEach((item) => {
      item.rent_price = calcPrice(formData.start_date, formData.end_date, item.price)
    })
    calcSnapshot()
  }

  function calcSnapshot() {
    if (!data.value) return
    const netRentalFee = data.value.reduce((acc, item) => acc + item.rent_price, 0)
    const salesTax = netRentalFee * tax
    const total = netRentalFee + salesTax
    offerSnapshot.value = {
      collection: data.value,
      summary: {
        net_rental_fee: netRentalFee.toFixed(2),
        tax: tax * 100,
        sales_tax: salesTax.toFixed(2),
        total: total.toFixed(2)
      }
    }
  }

  return {
    collectionData: data,
    offerSnapshot,
    initCollection,
    calcRentPrices,
    createOfferSnapshot
  }
}
