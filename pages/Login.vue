<script setup lang="ts">
import { z } from "zod"
import type { FormError } from "#ui/types"
import { useI18n } from "vue-i18n"
const { t: $t } = useI18n()

const router = useRouter()
const supabase = useSupabaseClient()

definePageMeta({ layout: "auth" })

const notifyTimeout = 5000
const notifyVisible = ref(false)
const showNotification = () => (notifyVisible.value = true)
const hideNotification = () => (notifyVisible.value = false)

const schema = z.object({
  email: z.string().email($t("validation.email-invalid")),
  password: z.string().min(8, $t("validation.password-min-8"))
})

const state = reactive({
  email: import.meta.env.VITE_DEMO_EMAIL || "",
  password: import.meta.env.VITE_DEMO_PASSWORD || ""
})

const validate = (state: any | undefined): FormError[] => {
  const errors: FormError[] = []
  if (!state.email) errors.push({ path: "email", message: $t("validation.email-required") })
  if (!state.password) errors.push({ path: "password", message: $t("validation.password-required") })
  return errors
}

const onSubmit = async () => {
  const { error: authError } = await supabase.auth.signInWithPassword({
    email: state.email,
    password: state.password
  })

  if (authError == null) {
    await router.push("/")
  } else {
    showNotification()
    handleErrors()
  }
}

const handleErrors = () => {
  setTimeout(() => {
    state.email = ""
    state.password = ""
  }, notifyTimeout)
}
</script>

<template>
  <BackgroundPattern class="absolute top-0 h-full overflow-hidden" />

  <UNotification
    id="1"
    v-if="notifyVisible"
    class="absolute top-[78px] right-5 w-72"
    :description="$t('errors.email-password')"
    :timeout="notifyTimeout"
    :title="$t('errors.error')"
    color="red"
    icon="i-heroicons-bolt"
    :close-button="{ icon: '', variant: 'outline' }"
    :callback="hideNotification"
  />

  <div class="h-screen">
    <div class="absolute w-min h-auto right-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div class="relative pb-20">
        <Card class="shadow-xl bg-white">
          <div class="m-2 w-72">
            <h1 class="flex w-full justify-center pb-6 text-3xl">{{ $t("login.title") }}</h1>
            <UForm :schema="schema" :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
              <UFormGroup :label="$t('login.email')" name="email">
                <UInput v-model="state.email" />
              </UFormGroup>

              <UFormGroup :label="$t('login.password')" name="password">
                <UInput v-model="state.password" type="password" autocomplete="off" />
              </UFormGroup>

              <div class="pt-6 flex w-full justify-center">
                <UButton type="submit"> {{ $t("login.submit") }} </UButton>
              </div>
            </UForm>
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>