<script lang="ts" setup>
const localePath = useLocalePath()
onBeforeMount(() => useRouter().push(localePath("/offers")))
</script>
<template></template>
