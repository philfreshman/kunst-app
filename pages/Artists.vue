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

const search = ref("")

const filteredRows = computed(() => {
  if (!search.value) {
    return artists.data.value
  }
  if (!artists.data.value) {
    return artists.data.value
  }
  return artists.data.value.filter((artwork) => {
    return Object.values(artwork).some((value) => {
      if (typeof value === "object" && value !== null && "name" in value) {
        return String(value.name)
          .toLowerCase()
          .includes(search.value.toLowerCase())
      }
      return String(value).toLowerCase().includes(search.value.toLowerCase())
    })
  })
})
</script>

<template>
  <Container>
    <template #controls>
      <div class="flex dark:border-gray-700 h-full">
        <!-- SEARCH -->
        <UInput
          icon="i-heroicons-magnifying-glass-20-solid"
          v-model="search"
          size="md"
          placeholder="Suche..."
          :ui="{ icon: { trailing: { pointer: '' } } }"
        >
          <template #trailing>
            <UButton
              v-show="search !== ''"
              color="gray"
              variant="link"
              icon="i-heroicons-x-mark-20-solid"
              :padded="false"
              @click="search = ''"
            />
          </template>
        </UInput>
      </div>
    </template>
    <template #content>
      <UTable :columns="columns" :loading="loading" :rows="filteredRows">
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
    </template>
  </Container>

  <!--  EditModal-->
  <BaseModal :isOpen="isModalOpen">
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
    </UForm>

    <template #footer>
      <div class="w-full flex justify-center">
        <UButton @click="submitEdit">Save</UButton>
      </div>
    </template>
  </BaseModal>
</template>
