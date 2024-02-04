import { computed } from "vue"

function recursiveSearch(value: any, searchValue: string) {
  if (typeof value === "object" && value !== null) {
    return Object.values(value).some((nestedValue) => recursiveSearch(nestedValue, searchValue))
  }
  return String(value).toLowerCase().includes(searchValue.toLowerCase())
}

export default function useFilteredArtworks(searchObject: any) {
  const search = ref("")
  const filteredRows = computed(() => {
    if (!search.value) {
      return searchObject.value
    }
    if (!searchObject.value) {
      return searchObject.value
    }
    return searchObject.value.filter((object) => {
      return recursiveSearch(object, search.value)
    })
  })

  return { search, filteredRows }
}
