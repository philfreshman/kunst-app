export default defineNuxtConfig({
  modules: ["@nuxt/ui", "@nuxtjs/tailwindcss", "nuxt-mdi", "@nuxtjs/supabase", "@nuxtjs/i18n"],
  i18n: {
    vueI18n: "./locales/i18n.config.ts", // if you are using custom path, default
    locales: [
      {
        code: "en",
        iso: "en-US",
        name: "English",
        file: "en.json"
      },
      {
        code: "de",
        iso: "de-DE",
        name: "Deutsch",
        file: "de.json"
      }
    ],
    defaultLocale: "en",
    // strategy: "prefix",
    langDir: "./locales/"
  },
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