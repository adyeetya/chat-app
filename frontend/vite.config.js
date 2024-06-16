import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        configure: (proxy, options) => {
          proxy.on('error', (err, req, res) => {
            // console.error('Proxy error', err)
          })
          proxy.on('proxyReq', (proxyReq, req, res) => {
            // console.log('Proxying request:', req.method, req.url)
          })
          proxy.on('proxyRes', (proxyRes, req, res) => {
            // console.log(
            //   'Received response from target:',
            //   proxyRes.statusCode,
            //   req.url
            // )
          })
        },
      },
    },
  },
})
