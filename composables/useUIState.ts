import { createSharedComposable } from "@vueuse/core"

const _useUIState = () => {
  const route = useRoute()

  const isHeaderDialogOpen = ref(false)
  const isContentSearchModalOpen = ref(false)
  const isDashboardSidebarSlidoverOpen = ref(false)
  const isDashboardSearchModalOpen = ref(false)

  watch(
    () => route.path,
    () => {
      isDashboardSidebarSlidoverOpen.value = false
    }
  )

  return {
    isHeaderDialogOpen,
    isContentSearchModalOpen,
    isDashboardSidebarSlidoverOpen,
    isDashboardSearchModalOpen
  }
}

export const useUIState = createSharedComposable(_useUIState)
