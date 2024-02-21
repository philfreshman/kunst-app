<script setup lang="ts">
// Setup
import type { PropType } from "@vue/runtime-core"
import useSnapshot from "~/composables/useSnapshot"

const snap = useSnapshot()
const emit = defineEmits<{ closeModal: []; deleteOffer: [] }>()

const props = defineProps({
  formData: {
    type: Object as PropType<Offer>,
    required: true
  }
})

const snapshot = ref<Snapshot>()
onBeforeMount(async () => {
  try {
    snapshot.value = await snap.getSnapshotById(props.formData.snapshot_id)
  } catch (e) {
    console.log(e)
  }
})
</script>

<template>
  <BaseModal :isOpen="snapshot !== undefined" :isWide="true">
    <template #header> Möchtest du sicher diese Angebot löschen? </template>
    <template #default>
      <DocumentSummaryAccordion :formData :snapshot />
    </template>
    <template #footer>
      <div class="flex justify-center">
        <UButton class="mr-3" color="red" variant="solid" @click="emit('closeModal')">Cancel</UButton>
        <UButton class="ml-3" color="green" variant="solid" @click="emit('deleteOffer')">Delete</UButton>
      </div>
    </template>
  </BaseModal>
</template>