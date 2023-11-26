// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: [
    '@element-plus/nuxt',
    'nuxt-mdi',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase'
  ],

  css: ['~/assets/scss/main.scss'],
  mdi: {
    cache: false,
    componentName: 'MdiIcon',
    defaultSize: '5rem'
  },
  tailwindcss: {
    viewer: false
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  elementPlus: {},
  vite: {
    css: {
      preprocessorOptions: {
        sass: {
          additionalData: '@use "@/assets/scss/colors.scss" as *\n'
        }
      }
    }
  }
})
