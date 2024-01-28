<script setup lang="ts">
import Container from "~/components/Container.vue"
import useArtist from "~/composables/useArtist"

const artists = useArtist()
const loading = artists.loading

await artists.fetchArtists()

onBeforeMount(() => {
  artists.fetchArtists()
})

// Table settings
const columns = [
  {
    key: "id",
    label: "#",
  },
  {
    key: "name",
    label: "Name",
  },
  {
    key: "phone",
    label: "Phone",
  },
  {
    key: "email",
    label: "Email",
  },
  {
    key: "actions",
  },
]
const items = (row: Artist) => [
  [
    {
      label: "Edit",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => openEditModal(row),
    },
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
      click: () => console.log("delete"),
      disabled: true,
    },
  ],
]

// Pagination
const page = ref(1) // default page
const length = ref(1) // number of artists
const pageCount = 11 // rows per page
const rows = computed(() => {
  if (artists.data.value) {
    length.value = artists.data.value.length
    return artists.data.value.slice(
      (page.value - 1) * pageCount,
      page.value * pageCount,
    )
  } else {
    return undefined
  }
}) // currently visible rows

// Modal
const isModalOpen = ref(false)
const setModalOpen = () => (isModalOpen.value = true)
const setModalClosed = () => (isModalOpen.value = false)

// Edit
const modalData = reactive({}) as Artist
const openEditModal = (row: Artist) => {
  modalData.id = row.id
  modalData.name = row.name
  modalData.email = row.email
  modalData.phone = row.phone
  setModalOpen()
}
const submitEdit = async () => {
  try {
    await artists.updateArtist(modalData)
    await artists.fetchArtists()
  } catch (e) {
    console.log("Update artist failed", e)
  } finally {
    setModalClosed()
  }
}
</script>

<template>
  <Container_old>
    <UTable
      class="w-[700px]"
      :columns="columns"
      :loading="loading"
      :rows="rows"
    >
      <template #actions-data="{ row }">
        <UDropdown :items="items(row)">
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-ellipsis-horizontal-20-solid"
          />
        </UDropdown>
      </template>
    </UTable>
    <div
      class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700"
    >
      <UPagination v-model="page" :page-count="pageCount" :total="length" />
    </div>
  </Container_old>

  <!--  EditModal-->

  <UModal v-model="isModalOpen" prevent-close>
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <h3
            class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
          >
            Edit
          </h3>
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
        <UFormGroup label="Name">
          <UInput v-model="modalData.name" type="text" />
        </UFormGroup>
        <UFormGroup label="Phone">
          <UInput v-model="modalData.phone" type="text" />
        </UFormGroup>
        <UFormGroup label="Email">
          <UInput v-model="modalData.email" type="text" />
        </UFormGroup>
        <UDivider class="h-10" />
        <div class="w-full flex justify-center">
          <UButton type="submit">Save</UButton>
        </div>
      </UForm>
    </UCard>
  </UModal>
</template>
