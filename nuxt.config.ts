// https://nuxt.com/docs/api/configuration/nuxt-config
// import { imagetools } from 'vite-imagetools'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules:['@nuxt/ui', '@nuxt/image','@vueuse/nuxt'],
  css: ['~/assets/css/main.css'],
  ssr: false
  // vite: {
  //   plugins: [
  //     imagetools()
  //   ]
  // }
})
