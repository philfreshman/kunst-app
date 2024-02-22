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

  async function getSnapshotById(snapshot_id: string): Promise<Snapshot> {
    // @ts-ignore
    const { data, error } = await supabase.rpc("get_snapshot", { ["snapshot_id"]: snapshot_id })
    return new Promise((resolve, reject) => {
      error ? reject(error) : resolve(data)
    })
  }

  async function getOfferSnapshotById(offer_id: string): Promise<Snapshot> {
    // @ts-ignore
    const { data, error } = await supabase.rpc("get_offer_snapshot", { ["offer_id"]: offer_id })
    return new Promise((resolve, reject) => {
      error ? reject(error) : resolve(data)
    })
  }

  async function getInvoiceSnapshotById(invoice_id: string): Promise<Snapshot> {
    // @ts-ignore
    const { data, error } = await supabase.rpc("get_invoice_snapshot", { ["invoice_id"]: invoice_id })
    return new Promise((resolve, reject) => {
      error ? reject(error) : resolve(data)
    })
  }

  async function getCollectionIdsFromSnapshot(snapshot_id: string): Promise<any> {
    // @ts-ignore
    const { data, error } = await supabase.rpc("get_collection_ids_from_snap", { ["snapshot_id"]: snapshot_id })
    return new Promise((resolve, reject) => {
      error ? reject(error) : resolve(data)
    })
  }

  async function createSnapshot(snapshot: Snapshot): Promise<any> {
    // @ts-ignore
    const { data, error } = await supabase.rpc("create_snapshot", {
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

  async function updateSnapshot(snapshot: Snapshot): Promise<any> {
    // @ts-ignore
    const { data, error } = await supabase.rpc("update_snapshot", {
      ["snapshot_id"]: snapshot.id,
      ["new_collection"]: snapshot.collection,
      ["new_summary"]: {
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

  function calcRentPrices(formData: KunstDocument, snapshotType: snapshotType) {
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
    updateSnapshot,
    getSnapshotById,
    getOfferSnapshotById,
    getInvoiceSnapshotById,
    getCollectionIdsFromSnapshot
  }
}