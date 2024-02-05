import { ref } from "vue"

export default function useCollection() {
  const supabase = useSupabaseClient<Database>()
  const loading = ref<boolean>(true)
  const data = ref<Collection[]>()

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

  async function createCollection(artworkIds: string[]): Promise<Collection[]> {
    console.log("artworkIds", artworkIds)
    // const { data, error } = await supabase.rpc("create_collection", { ["ids"]: ["ZDNkMWNjZTg"] })
    const { data, error } = await supabase.rpc("create_collection", { ["ids"]: [artworkIds] })
    return new Promise((resolve, reject) => {
      error ? reject(error) : resolve(data)
    })
  }

  return {
    collectionData: data,
    initCollection
  }
}
