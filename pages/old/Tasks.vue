<!--<script setup lang="ts">-->

<!--import type {Database} from "~/types/database"-->

<!--const client = useSupabaseClient<Database>()-->
<!--const user = useSupabaseUser()-->

<!--const tasksFromServer = ref()-->
<!--const isModalOpen = ref(false)-->
<!--const loading = ref(false)-->
<!--const newTask = ref('')-->

<!--const { data: tasks } = await useAsyncData('tasks', async () => {-->
<!--  const { data } = await client.from('tasks').select('id, title, completed').eq('id', 1)-->

<!--  console.helpers(data)-->
<!--  return data-->
<!--})-->

<!--async function addTask () {-->
<!--  if (newTask.value.trim().length === 0) { return }-->

<!--  loading.value = true-->

<!--  const { data } = await client.from('tasks')-->
<!--    .upsert({-->
<!--      //@ts-ignore-->
<!--      user: user.value.id,-->
<!--      title: newTask.value,-->
<!--      completed: false-->
<!--    })-->
<!--    .select('id, title, completed')-->
<!--    .single()-->

<!--  tasks.value.push(data)-->
<!--  newTask.value = ''-->
<!--  loading.value = false-->
<!--}-->

<!--const completeTask = async (task: Task) => {-->
<!--  await client.from('tasks').update({ completed: task.completed }).match({ id: task.id })-->
<!--}-->

<!--const removeTask = async (task: Task) => {-->
<!--  tasks.value = tasks.value.filter(t => t.id !== task.id)-->
<!--  await client.from('tasks').delete().match({ id: task.id })-->
<!--}-->

<!--const fetchTasksFromServerRoute = async () => {-->
<!--  const { data } = await useFetch('/api/tasks', { headers: useRequestHeaders(['cookie']), key: 'tasks-from-server' })-->

<!--  tasksFromServer.value = data-->
<!--  isModalOpen.value = true-->
<!--}-->

<!--</script>-->

<!--<template>-->

<!--</template>-->

<!--<style scoped>-->

<!--</style>-->

<template></template>