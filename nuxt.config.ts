// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from "path";
export default defineNuxtConfig({
  devtools: { enabled: true },
  alias: {
    "@": resolve(__dirname, "/"),
  },
  modules: [
    // ...
    "@pinia/nuxt",
    "@nuxt/image",
    'nuxt-primevue'
  ],
  primevue: {
    usePrimeVue: true,
    options: {
      unstyled: false,
    },
    importPT: { as: 'Tailwind', from: 'primevue/passthrough/tailwind' },
    cssLayerOrder: 'primevue, tailwind-base, tailwind-components, tailwind-utilities',
    components: {
        
    },
    directives: {
        
    },
    composables: {
        
    }
  },
  css: ['primevue/resources/themes/md-light-indigo/theme.css', "~/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  ssr: false,
  runtimeConfig: {
    public: {
      API_KEY : process.env.API_KEY,
      AUTH_DOMAIN : process.env.AUTH_DOMAIN,
      PROJECT_ID : process.env.PROJECT_ID,
      STORAGE_BUCKET : process.env.STORAGE_BUCKET,
      MESSAGING_SENDER_ID : process.env.MESSAGING_SENDER_ID,
      APP_ID : process.env.APP_ID,
      MEASUREMENT_ID : process.env.MEASUREMENT_ID
    }
  },
  
});
