import { computed, type Ref } from "vue"
import recursiveSearch from "~/utils/recursiveSearch"

export default function useFilteredArtworks(searchObject: any, search: Ref<string>) {
  const filteredRows = computed(() => {
    if (!search.value) {
      return searchObject.data.value
    }
    if (!searchObject.data.value) {
      return searchObject.data.value
    }

    return searchObject.data.value.filter((object) => {
      return recursiveSearch(object, search.value)
    })
  })

  return { filteredRows }
}
