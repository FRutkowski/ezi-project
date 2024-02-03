import { fileURLToPath } from 'node:url'
import { existsSync, readFileSync, readdirSync } from 'node:fs'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxt/ui', '@pinia/nuxt', '@vueuse/nuxt', '@vee-validate/nuxt', 'magic-regexp/nuxt', 'nuxt-security'],
  security: {
    csrf: true,
    headers: {
      contentSecurityPolicy: {
        // 'img-src': ['https://images.unsplash.com', 'http://localhost:3000', 'blob:http://localhost:3000']
      }
    }
  },

  ssr: false,

  ui: {
    global: true,
    icons: ['mdi', 'simple-icons', 'heroicons']
  },

  pinia: {
    autoImports: [
      'defineStore',
      'acceptHMRUpdate'
    ]
  },

  components: [
    { path: '~/components/forms', pathPrefix: false },
    { path: '~/components/suggest/products', pathPrefix: false },
    '~/components'
  ],

  veeValidate: {
    autoImports: true
  },

  vite: {
    vue: {
      script: {
        globalTypeFiles: readdirSync(new URL('./types', import.meta.url)).map(
          (file) => fileURLToPath(new URL(`./types/${file}`, import.meta.url))
        ),
        fs: {
          fileExists (file: string) {
            return existsSync(file)
          },
          readFile (file: string) {
            return readFileSync(file, 'utf-8')
          }
        }
      }
    }
  }
})
