// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'path'
export default defineNuxtConfig({
  devtools: { enabled: true },
  alias : {
    "@" : resolve(__dirname, "/")
  },
  modules: [
    // ...
    '@pinia/nuxt',
  ],
  css: ['~/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  spaLoadingTemplate: false

})
