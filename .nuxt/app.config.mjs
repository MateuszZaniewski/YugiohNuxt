
import { updateAppConfig } from '#app'
import { defuFn } from 'C:/Users/mateu/Desktop/nuxt/tutorial/node_modules/defu/dist/defu.mjs'

const inlineConfig = {
  "nuxt": {
    "buildId": "b92577d3-bb4b-434d-83b3-6f9288856b5f"
  }
}

// Vite - webpack is handled directly in #app/config
if (import.meta.hot) {
  import.meta.hot.accept((newModule) => {
    updateAppConfig(newModule.default)
  })
}



export default /* #__PURE__ */ defuFn(inlineConfig)
