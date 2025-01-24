import react from '@vitejs/plugin-react'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import { resolve } from 'path'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    resolve: {
      alias: {
        '@assets': resolve('resources/assets'),
        '@shared': resolve('src/shared'),
        '@config': resolve('src/config')
      }
    }
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    assetsInclude: 'src/renderer/assets',
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '@assets': resolve('resources/assets'),
        '@shared': resolve('src/shared'),
        '@config': resolve('src/config'),
        '@mock': resolve('src/mock')
      }
    },
    plugins: [react(), tailwindcss()]
  }
})
