import { ref } from "vue"
import { calcPrice } from "~/utils/calcPrice"

export default function useSnapshot() {
  const tax = 0.19
  const supabase = useSupabaseClient<Database>()
  const loading = ref<boolean>(true)
  const data = ref<Collection[]>()
  const snapshot = ref<Snapshot>()

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

  async function getSnapshot(snap_id: string): Promise<Snapshot> {
    // @ts-ignore
    const { data, error } = await supabase.rpc("get_snapshot", { ["snapshot_id"]: snap_id })
    return new Promise((resolve, reject) => {
      error ? reject(error) : resolve(data)
    })
  }

  async function getSnapshotById(snap_id: string): Promise<OffersSnapshots> {
    // @ts-ignore
    const { data, error } = await supabase.rpc("get_offer_snapshots", { ["offer_id"]: snap_id })
    return new Promise((resolve, reject) => {
      error ? reject(error) : resolve(data)
    })
  }

  async function createSnapshot(snapshot: Snapshot): Promise<any> {
    // @ts-ignore
    const { data, error } = await supabase.rpc("insert_snapshot", {
      ["collection"]: snapshot.collection,
      ["summary"]: {
        ["snapshot_type"]: snapshot.snapshot_type,
        ["net_rental_fee"]: snapshot.net_rental_fee,
        ["tax"]: snapshot.tax,
        ["sales_tax"]: snapshot.sales_tax,
        ["total"]: snapshot.total
      }
    })
    return new Promise((resolve, reject) => {
      error ? reject(error) : resolve(data)
    })
  }

  async function createCollection(artworkIds: string[]): Promise<Collection[]> {
    // @ts-ignore
    const { data, error } = await supabase.rpc("get_collection", { ["ids"]: [artworkIds] })
    return new Promise((resolve, reject) => {
      error ? reject(error) : resolve(data)
    })
  }

  function calcRentPrices(formData: Offer, snapshotType: snapshotType) {
    if (!data.value) return
    data.value.forEach((item) => {
      item.rent_price = calcPrice(formData.start_date, formData.end_date, item.price)
    })
    calcSnapshot(snapshotType)
  }

  function calcSnapshot(snapshotType: snapshotType) {
    if (!data.value) return
    const netRentalFee = data.value.reduce((acc, item) => acc + item.rent_price, 0)
    const salesTax = netRentalFee * tax
    const total = netRentalFee + salesTax
    snapshot.value = {
      collection: data.value,
      snapshot_type: snapshotType,
      net_rental_fee: netRentalFee.toFixed(2),
      tax: tax * 100,
      sales_tax: salesTax.toFixed(2),
      total: total.toFixed(2)
    }
  }

  return {
    collectionData: data,
    snapshot,
    initCollection,
    calcRentPrices,
    createSnapshot,
    getSnapshot,
    getSnapshotById
  }
}