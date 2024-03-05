<script setup lang="ts">
import useArtist from "~/composables/useArtist"
import useFilteredArtworks from "~/composables/useSearchFilter"
import { ref } from "vue"
import { artistsTableColumns } from "~/utils/tableDefinitions"
import BaseSearch from "~/components/BaseSearch.vue"

const artists = useArtist()

const dropdownItems = (t: any, row: Artist) => [
  [
    {
      label: t("actions.edit"),
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => openEditModal(row)
    },
    {
      label: t("actions.delete"),
      icon: "i-heroicons-trash-20-solid",
      click: () => console.log("delete"),
      disabled: true
    }
  ]
]

// Modal
const isModalOpen = ref(false)
const setModalOpen = () => (isModalOpen.value = true)
const setModalClosed = () => (isModalOpen.value = false)

// Edit
const modalData = reactive({}) as Artist
const openEditModal = (row: Artist) => {
  Object.assign(modalData, row)
  setModalOpen()
}
const submitEdit = async () => {
  try {
    await artists.updateArtist(modalData)
    await artists.initArtists()
  } catch (e) {
    console.log("Update artist failed", e)
  } finally {
    setModalClosed()
  }
}

// Search
const { search, filteredRows } = useFilteredArtworks(artists.data)
</script>

<template>
  <Container>
    <template #controls>
      <BaseSearch v-model="search" />
    </template>
    <template #content>
      <UTable :columns="artistsTableColumns($t)" :rows="filteredRows" :loading="artists.loading.value">
        <template #actions-data="{ row }">
          <LazyUDropdown :items="dropdownItems($t, row)">
            <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
          </LazyUDropdown>
        </template>
      </UTable>
    </template>
  </Container>

  <!--EditModal-->
  <BaseModal :isOpen="isModalOpen">
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">{{ $t("actions.edit") }}</h3>
        <UButton
          @click="setModalClosed"
          color="gray"
          variant="ghost"
          icon="i-heroicons-x-mark-20-solid"
          class="-my-1"
        />
      </div>
    </template>

    <UForm :state="modalData" @submit="submitEdit">
      <UFormGroup :label="$t('common.name')" @keyup.enter="submitEdit">
        <UInput v-model="modalData.name" type="text" />
      </UFormGroup>
      <UFormGroup :label="$t('common.phone')">
        <UInput v-model="modalData.phone" type="text" />
      </UFormGroup>
      <UFormGroup :label="$t('common.email')">
        <UInput v-model="modalData.email" type="text" />
      </UFormGroup>
    </UForm>

    <template #footer>
      <div class="w-full flex justify-center">
        <UButton @click="submitEdit">{{ $t("actions.save") }}</UButton>
      </div>
    </template>
  </BaseModal>
</template>