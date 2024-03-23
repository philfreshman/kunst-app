export default defineNuxtConfig({
  modules: ["@nuxt/ui", "@nuxtjs/tailwindcss", "nuxt-mdi", "@nuxtjs/supabase", "@nuxtjs/i18n"],
  app: {
    head: {
      title: "Kunst App"
    }
  },
  colorMode: {
    preference: "dark"
  },
  components: {
    global: true,
    dirs: ["~/components", "~/layouts/components"]
  },
  css: ["~/assets/fonts/fonts.sass"],
  devtools: {
    enabled: false
  },
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
    defaultLocale: "de",
    langDir: "./locales/",
    lazy: true,
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected"
    }
  }
})
