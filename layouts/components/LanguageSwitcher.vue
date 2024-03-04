<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()
const router = useRouter()
const switchLocalePath = useSwitchLocalePath()

const availableLocales = computed(() => {
  return locales.value.filter((i) => i.code !== locale.value)
})

onMounted(() => {
  disableLanguageOption()
})

const disableLanguageOption = () => {
  switch (locale.value) {
    case "de":
      languageOptions[0][0].disabled = true
      languageOptions[1][0].disabled = false
      break
    case "en":
      languageOptions[0][0].disabled = false
      languageOptions[1][0].disabled = true
      break
  }
}

const switchToGerman = () => {
  isOpen.value = false
  router.push(switchLocalePath("de").toString().toLowerCase())
  languageOptions[0][0].disabled = true
  languageOptions[1][0].disabled = false
}

const switchToEnglish = () => {
  isOpen.value = false
  router.push(switchLocalePath("en").toString().toLowerCase())
  languageOptions[0][0].disabled = false
  languageOptions[1][0].disabled = true
}

const languageOptions = reactive([
  [
    {
      slot: "german",
      label: "DE",
      disabled: false,
      click() {
        switchToGerman()
      }
    }
  ],
  [
    {
      slot: "english",
      label: "EN",
      disabled: false,
      click() {
        switchToEnglish()
      }
    }
  ]
])

const isOpen = ref(false)
</script>

<template>
  <UDropdown :items="languageOptions" :popper="{ offsetDistance: 5, placement: 'top-end' }" :ui="{ width: '' }">
    <UTooltip :prevent="isOpen" :text="$t('nouns.language')">
      <UButton color="gray" icon="i-heroicons-outline:translate" @click="isOpen = true" />
    </UTooltip>
  </UDropdown>
</template>