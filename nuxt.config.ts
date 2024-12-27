// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: [
    '@/assets/style.scss' 
  ],
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image', 'shadcn-nuxt', '@nuxtjs/color-mode', '@nuxt/icon', '@pinia/nuxt', '@pinia/nuxt'],
  shadcn: {
    prefix: '',
    componentDir: './components/ui'
  },
  pinia: {
    storesDirs: ['./stores/**'],
  },

})