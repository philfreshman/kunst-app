export default defineNuxtConfig({
  devtools: {
    enabled: false
  },
  css: ["~/assets/fonts/fonts.sass"],
  runtimeConfig: {
    useAuth: false
  },
  imports: {
    autoImport: true
  },
  components: {
    global: true,
    dirs: ["~/components", "~/layouts/components"]
  },
  modules: ["@nuxt/ui", "@nuxtjs/tailwindcss", "nuxt-mdi", "@nuxtjs/supabase"],
  colorMode: {
    preference: "dark"
  }

  // supabase: {
  //   redirectOptions: {
  //     login: '/',
  //     callback: '/confirm'
  //   }
  // }
})
