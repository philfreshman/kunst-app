<script setup lang="ts">

const peaces = usePeaces()
await peaces.fetchPeaces()

onBeforeMount( () => {
  peaces.fetchPeaces()
})

const q = ref('')

const filteredRows = computed(() => {
  if (!q.value) {
    return peaces.data.value
  }
  if (!peaces.data.value){
    return peaces.data.value
  }
  return peaces.data.value.filter((peace) => {
    return Object.values(peace).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase())
    })
  })
})



// Table settings
const columns = [
  {
    key: 'articleid',
    label: 'Artikel ID',
    sortable: true
  }, {
    key: 'imgurl',
    label: 'Bild',
    class: 'w-1/4'
  }, {
    key: 'height',
    label: 'Größe',
    sortable: true
  }, {
    key: 'width',
    label: 'Breite',
    sortable: true
  }, {
    key: 'worth',
    label: 'Wert',
    sortable: true
  }, {
    key: 'title',
    label: 'Titel',
    sortable: true
  }
]

const log = (value: any) => {
  console.log(value)
}

</script>

<template>

  <!-- SEARCH -->
  <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
    <UInput v-model="q" placeholder="Filter people..." />
  </div>

  <UTable
    :columns="columns"
    :rows="filteredRows"
  >
    <template #imgurl-data="{ row }" class="bg-red-50">
      <LazyUPopover class="h-20 w-fit content-fit bg-red-500" mode="hover" :popper="{ placement: 'right' }">
        <template #panel class="bg-red-50">
          <img class="" :src="row.imgurl"  alt=""/>
        </template>
        <img class="h-20" :src="row.imgurl"  alt=""/>
      </LazyUPopover>
    </template>
  </UTable>


</template>
