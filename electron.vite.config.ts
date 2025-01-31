import react from '@vitejs/plugin-react'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import { resolve } from 'path'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    resolve: {
      alias: {
        '@': resolve('src/main'),
        '@assets': resolve('resources/assets'),
        '@shared': resolve('src/shared'),
        '@services': resolve('src/main/services')
      }
    }
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
    resolve: {
      alias: {
        '@shared': resolve('src/shared')
      }
    }
  },
  renderer: {
    assetsInclude: 'src/renderer/assets',
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '@assets': resolve('resources/assets'),
        '@shared': resolve('src/shared'),
        '@lib': resolve('src/renderer/shadcn/lib'),
        '@components': resolve('src/renderer/src/components'),
        '@controllers': resolve('src/renderer/src/controllers'),
        '@shadcn': resolve('src/renderer/shadcn/components'),
        '@mock': resolve('src/mock')
      }
    },
    plugins: [react(), tailwindcss()]
  }
})
