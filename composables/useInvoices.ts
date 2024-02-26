import { ref } from "vue"

export default function useInvoices() {
  const supabase = useSupabaseClient<Database>()
  const data = ref<Invoice[]>()
  const loading = ref(true)

  async function initInvoices() {
    try {
      loading.value = true
      data.value = await getInvoices()
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  async function getInvoices(): Promise<Invoice[]> {
    // @ts-ignore
    const { data, error } = await supabase.rpc("get_invoices")
    let count = 1
    if (data !== null) {
      ;(data as Invoice[]).forEach((offer: Invoice) => {
        offer.internal_id = count++
      })
    }
    return new Promise((resolve, reject) => {
      error ? reject(error) : resolve(data)
    })
  }

  async function createInvoice(invoice: Invoice): Promise<unknown> {
    // @ts-ignore
    const { data, error } = await supabase.rpc("create_invoice", { invoice })
    return new Promise((resolve, reject) => {
      error ? reject(error) : resolve(data)
    })
  }

  async function updateInvoice(invoice: Invoice): Promise<unknown> {
    // @ts-ignore
    const { data, error } = await supabase.rpc("update_invoice", { invoice })
    return new Promise((resolve, reject) => {
      error ? reject(error) : resolve(data)
    })
  }

  async function deleteInvoice(invoiceId: string): Promise<unknown> {
    // @ts-ignore
    const { data, error } = await supabase.rpc("delete_invoice", { ["invoice_id"]: invoiceId })
    return new Promise((resolve, reject) => {
      error ? reject(error) : resolve(data)
    })
  }

  return {
    data,
    loading,
    initInvoices,
    createInvoice,
    updateInvoice,
    deleteInvoice
  }
}