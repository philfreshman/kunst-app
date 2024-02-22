import type { EmitsOptions } from "@vue/runtime-core"

export default function useEsc() {
  function eventListener(emit: any) {
    const closeModalOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        emit("closeModal")
      }
    }
    onMounted(() => {
      window.addEventListener("keydown", closeModalOnEscape)
    })

    onBeforeUnmount(() => {
      window.removeEventListener("keydown", closeModalOnEscape)
    })
  }

  return { eventListener }
}