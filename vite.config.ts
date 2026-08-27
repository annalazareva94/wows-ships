import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'https://vortex.worldofwarships.eu',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})

//Все запросы, начинающиеся с /api, будут перенаправляться на https://vortex.worldofwarships.eu.
//changeOrigin: true – меняет заголовок Origin на целевой домен, чтобы сервер не блокировал.
//rewrite убирает префикс /api, чтобы итоговый URL был корректным.