import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    dts(),
  ],
  server: {
    host: '0.0.0.0',
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'html2particle',
      fileName: format => `html2particle.${format}.js`,
    },
  },
  optimizeDeps: {
    include: ['html2canvas'],
  },
})
