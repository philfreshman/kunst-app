<script setup lang="ts">
import useFilteredArtworks from "~/composables/useSearchFilter"
import useOffers from "~/composables/useOffers"
import { offersTableColumns } from "~/utils/tableDefinitions"
import BaseSearch from "~/components/BaseSearch.vue"
import useOffersSnapshot from "~/composables/useOffersSnapshot"

const offers = useOffers()

const dropdownItems = (row: Offer) => [
  [
    {
      label: "PDF",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => console.log(row)
    },
    {
      label: "Edit",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => console.log(row)
    },
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
      click: () => setDeleteModalOpen(row)
    }
  ]
]

// Edit Modal
const isModalOpen = ref(false)
const setModalOpen = () => (isModalOpen.value = true)
const setModalClosed = async () => {
  isModalOpen.value = false
  offers.initOffers().then()
}

// Delete Modal
const deleteModalOffer = ref<Offer>()
const isDeleteModalOpen = ref(false)
const setDeleteModalOpen = (row: Offer) => {
  useOffersSnapshot().getOfferSnapshot(row.offer_snapshot_id)
  console.log(row.offer_snapshot_id)
  deleteModalOffer.value = row
  isDeleteModalOpen.value = true
}
const setDeleteModalClosed = () => {
  isDeleteModalOpen.value = false
}
const deleteOffer = () => {
  if (deleteModalOffer.value?.id === undefined) return
  offers.deleteOffer(deleteModalOffer.value.id).then()
  offers.initOffers().then()
  isDeleteModalOpen.value = false
}

// Search
const { search, filteredRows } = useFilteredArtworks(offers.data)
</script>

<template>
  <Container>
    <template #controls>
      <BaseSearch v-model="search" />

      <UButton icon="i-mdi:offer" size="md" color="gray" variant="solid" trailing @click="setModalOpen"> Neues Angebot </UButton>
    </template>

    <template #content>
      <UTable :columns="offersTableColumns" :rows="filteredRows" :loading="offers.loading.value">
        <template #actions-data="{ row }">
          <UDropdown :items="dropdownItems(row)">
            <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
          </UDropdown>
        </template>
      </UTable>
    </template>
  </Container>

  <!--AddModal-->
  <OffersAddModal :offers v-if="isModalOpen" @closeModal="setModalClosed" />

  <!--EditModal-->
  <BaseModal :isOpen="isDeleteModalOpen">
    <template #header> Angebot löschen </template>
    <template #default>
      <p>Are you sure you want to delete this offer?</p>
      <OfferSummaryAccordion :formData="deleteModalOffer" />
    </template>
    <template #footer>
      <div class="flex justify-center">
        <UButton class="mr-3" color="red" variant="solid" @click="setDeleteModalClosed">Cancel</UButton>
        <UButton class="ml-3" color="green" variant="solid" @click="deleteOffer">Delete</UButton>
      </div>
    </template>
  </BaseModal>
</template>

<style lang="sass">
.label-padding
  label
    padding-top: 12px

.label-no-padding
  label
    padding-top: 0
</style>
