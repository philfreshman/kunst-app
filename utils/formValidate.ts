import type { FormError, FormErrorEvent } from "#ui/types"

const validate = (formData: Invoice): FormError[] => {
  const errors = [] as FormError[]
  if (!formData.start_date) errors.push({ path: "start_date", message: "Required" })
  if (!formData.end_date) errors.push({ path: "end_date", message: "Required" })
  return errors
}

async function onError(event: FormErrorEvent) {
  const element = document.getElementById(event.errors[0].id)
  element?.focus()
  element?.scrollIntoView({ behavior: "smooth", block: "center" })
}

export { validate, onError }