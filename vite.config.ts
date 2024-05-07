/// <reference types="vitest"/>
import react from '@vitejs/plugin-react'
import { URL, fileURLToPath } from 'url'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url)),
      },
    ],
  },
  test: {
    setupFiles: ['./src/vitest-custom.ts'],
  },
  build: {
    sourcemap: true,
  },
  css: {
    devSourcemap: true,
  },
})
