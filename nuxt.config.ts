// https://nuxt.com/docs/api/configuration/nuxt-config
// import { imagetools } from 'vite-imagetools'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules:['@nuxt/ui', '@nuxt/image','@vueuse/nuxt'],
  css: ['~/assets/css/main.css'],
  ssr: false,

  image: {
    // Default quality for all NuxtImg components
    quality: 80,
    // Serve modern formats when supported
    format: ['webp', 'jpg'],
    // Screen widths to generate srcsets for
    screens: {
      xs: 375,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      '2xl': 1536,
    },
  },

  // Improve chunk splitting for faster initial load
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'vue-vendor': ['vue', 'vue-router'],
          },
        },
      },
    },
  },
  // vite: {
  //   plugins: [
  //     imagetools()
  //   ]
  // }
})
