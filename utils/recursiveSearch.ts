export default function recursiveSearch(value: any, searchValue: string) {
  if (typeof value === "object" && value !== null) {
    return Object.values(value).some((nestedValue) => recursiveSearch(nestedValue, searchValue))
  }
  return String(value).toLowerCase().includes(searchValue.toLowerCase())
}
