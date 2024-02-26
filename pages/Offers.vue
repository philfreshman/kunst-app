<script setup lang="ts">
import useFilteredArtworks from "~/composables/useSearchFilter"
import useOffers from "~/composables/useOffers"
import { offersTableColumns } from "~/utils/tableDefinitions"
import BaseSearch from "~/components/BaseSearch.vue"
import useSnapshot from "~/composables/useSnapshot"
import { formatDateSpan, formatShortDate } from "~/utils/formater"

const offers = useOffers()
onMounted(() => offers.initOffers())

// Table
const { search, filteredRows } = useFilteredArtworks(offers.data)
const dropdownItems = (row: Offer) => [
  [
    {
      label: "Preview",
      icon: "i-heroicons-eye-20-solid",
      click: () => initPreviewModalOpen(row)
    },
    {
      label: "Edit",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => setEditOfferId(row)
    },
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
      click: () => setDeleteModalOpen(row)
    }
  ]
]

// Add-Edit Modal
const isAddModalOpen = ref(false)
const editOffer = ref<Offer | undefined>()
const setAddEditModalOpen = () => (isAddModalOpen.value = true)
const setAddEditModalClosed = async () => {
  isAddModalOpen.value = false
  offers.initOffers().then()
}
const setEditOfferId = (row: Offer) => {
  if (offers.data.value === undefined) return
  editOffer.value = offers.data.value.find((offer) => offer.id === row.id)
  setAddEditModalOpen()
}

// Delete Modal
const deleteModalOffer = ref<Offer>()
const isDeleteModalOpen = ref(false)
const setDeleteModalClosed = () => (isDeleteModalOpen.value = false)
const setDeleteModalOpen = (row: Offer) => {
  deleteModalOffer.value = row
  isDeleteModalOpen.value = true
}
const deleteOffer = async () => {
  if (deleteModalOffer.value?.id === undefined) return
  isDeleteModalOpen.value = false
  await offers.deleteOffer(deleteModalOffer.value.id)
  await offers.initOffers()
}

// Preview Modal
const offerSnapshot = ref<Snapshot>()
const isPreviewModalOpen = ref(false)
const openPreviewModal = () => (isPreviewModalOpen.value = true)
const closePreviewModal = () => (isPreviewModalOpen.value = false)
const initPreviewModalOpen = async (row: Offer) => {
  if (row.id === undefined) return
  useSnapshot()
    .getOfferSnapshotById(row.id)
    .then((res) => {
      offerSnapshot.value = res
      openPreviewModal()
    })
    .catch(() => closePreviewModal())
}

const sort = ref({
  column: "internal",
  direction: "asc"
})
</script>

<template>
  <Container>
    <template #controls>
      <BaseSearch v-model="search" />
      <UButton
        size="md"
        color="gray"
        variant="solid"
        trailing
        @click="
          () => {
            editOffer = undefined
            setAddEditModalOpen()
          }
        "
      >
        Neues Angebot
      </UButton>
    </template>

    <template #content>
      <UTable :sort="sort" :columns="offersTableColumns" :rows="filteredRows" :loading="offers.loading.value">
        <template #date_span-data="{ row }">
          {{ formatDateSpan(row.start_date, row.end_date) }}
        </template>
        <template #offer_date-data="{ row }">
          {{ formatShortDate(row.offer_date) }}
        </template>
        <template #actions-data="{ row }">
          <UDropdown :items="dropdownItems(row)">
            <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
          </UDropdown>
        </template>
      </UTable>
    </template>
  </Container>

  <!--AddEditModal-->
  <OffersAddEditModal v-if="isAddModalOpen" :editOffer @closeModal="setAddEditModalClosed" />

  <!--PreviewModal-->
  <LazyPreviewModal v-if="isPreviewModalOpen" :data="offerSnapshot" @closeModal="closePreviewModal" />

  <!--DeleteModal-->
  <OffersDeleteModal
    v-if="isDeleteModalOpen"
    :formData="deleteModalOffer"
    @closeModal="setDeleteModalClosed"
    @delete="deleteOffer"
  />
</template>