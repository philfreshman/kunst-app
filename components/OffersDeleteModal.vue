<script setup lang="ts">
import type { PropType } from "@vue/runtime-core"
import useSnapshot from "~/composables/useSnapshot"

const snap = useSnapshot()
const emit = defineEmits<{ closeModal: []; delete: [] }>()

const props = defineProps({
  formData: {
    type: Object as PropType<Offer | Invoice>,
    required: true
  }
})

const snapshot = ref<Snapshot>()
onBeforeMount(async () => {
  snap
    .getSnapshotById(props.formData.snapshot_id)
    .then((data) => (snapshot.value = data))
    .catch((e) => console.log(e))
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
        <UButton class="ml-3" color="green" variant="solid" @click="emit('delete')">Delete</UButton>
      </div>
    </template>
  </BaseModal>
</template>