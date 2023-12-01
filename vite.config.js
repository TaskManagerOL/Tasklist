import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: "localhost",
    port: 8080,
    proxy: {
    '/api': {
        target: 'https://at.kexie.space/api',
        changeOrigin: true,
        ws:true,
        pathRewrite: {
          '^/api':''
        },
        rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }  
})
