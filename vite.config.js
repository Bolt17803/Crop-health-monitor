import { build, defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/Crop-health-monitor/",
  build: {
    outDir: 'dist',
    assetsDir: '',
  },
  resolve: {
    alias: {
      '@components': '/src/components',
      '@css': '/src/Styles.css',
    },
  },
})
