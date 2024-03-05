<script lang="ts" setup>
const localePath = useLocalePath()
onBeforeMount(() => useRouter().push(localePath("/artists").toLowerCase()))
</script>
<template></template>