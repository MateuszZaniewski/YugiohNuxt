// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from "path";
export default defineNuxtConfig({
  devtools: { enabled: false },
  vite: {
    build: {
      rollupOptions: {
        external: ["quill", "chart.js/auto"],
      },
    },
  },
  alias: {
    "@": resolve(__dirname, "/"),
  },
  modules: [
    // ...
    "@pinia/nuxt",
    "@nuxt/image",
    "@nuxtjs/tailwindcss",
    "nuxt-primevue",
  ],
  primevue: {
    usePrimeVue: true,
    options: {
      ripple: true,
      inputStyle: "filled",
    },
    importPT: { as: "Tailwind", from: "primevue/passthrough/tailwind" },
    cssLayerOrder: "tailwind-base, primevue, tailwind-utilities",
    components: {},
    directives: {},
    composables: {},
  },
  css: [
    "primeicons/primeicons.css",
    "primevue/resources/primevue.css",
    'primevue/resources/themes/lara-light-teal/theme.css',
    "~/main.css",
  ],
  ssr: false,
  runtimeConfig: {
    public: {
      API_KEY: process.env.API_KEY,
      AUTH_DOMAIN: process.env.AUTH_DOMAIN,
      PROJECT_ID: process.env.PROJECT_ID,
      STORAGE_BUCKET: process.env.STORAGE_BUCKET,
      MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
      APP_ID: process.env.APP_ID,
      MEASUREMENT_ID: process.env.MEASUREMENT_ID,
    },
  },
});
