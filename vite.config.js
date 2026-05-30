import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
 plugins: [
    react(),
    viteImagemin({
      mozjpeg: { quality: 75 },
      optipng: { optimizationLevel: 5 },
      pngquant: { quality: [0.7, 0.8] },
      webp: { quality: 75 }
    })
  ],
  base: '/Jibhi/',
})