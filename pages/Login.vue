<script setup lang="ts">
import type { FormError, FormSubmitEvent } from "#ui/types"

const router = useRouter()
const supabase = useSupabaseClient()
const user = useSupabaseUser()

definePageMeta({ layout: "auth" })

const state = reactive({
  email: import.meta.env.VITE_USERNAME,
  password: import.meta.env.VITE_PASSWORD
})

const validate = (state: any | undefined): FormError[] => {
  const errors = []
  if (!state.email) errors.push({ path: "email", message: "Required" })
  if (!state.password) errors.push({ path: "password", message: "Required" })
  return errors
}

async function onSubmit(event: FormSubmitEvent<any>) {
  await signIn()
  await router.push("/artists")
}

const signIn = async () => {
  const { error } = await supabase.auth.signInWithPassword({
    email: state.email,
    password: state.password
  })
  if (error) console.log(error)
}

const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) console.log(error)
}
</script>

<template>
  <BackgroundPattern class="absolute top-0 h-full overflow-hidden" />

  <div class="h-screen">
    <div class="absolute w-min h-auto right-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div class="relative pb-20">
        <Card class="shadow-xl bg-white">
          <div class="m-2 w-72">
            <h1 class="flex w-full justify-center pb-6 text-3xl">{{ $t("login.title") }}</h1>

            <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
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