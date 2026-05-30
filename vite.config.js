import { defineConfig } from 'vite'
import react from "@vitejs/plugin-react";
import viteImagemin from "vite-plugin-imagemin";

export default defineConfig({
  plugins: [
    react(),

    viteImagemin({
      mozjpeg: {
        quality: 75,
      },
      pngquant: {
        quality: [0.7, 0.8],
      },
      webp: {
        quality: 75,
      },
    }),
  ],
  base: '/Jibhi/',
})