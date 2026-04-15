import fs from "fs"
import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import type { ViteDevServer } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'
import { IncomingMessage, ServerResponse } from 'http'

const designSystemStatic = () => ({
  name: 'design-system-static',
  configureServer(server: ViteDevServer) {
    server.middlewares.use((req: IncomingMessage, res: ServerResponse, next: () => void) => {
      if (!req.url) return next()
      if (!req.url.startsWith('/DesignSystem')) return next()

      const urlPath = req.url.split('?')[0] || ''
      const relativePath = urlPath.replace(/^\/DesignSystem\/?/, '')
      const basePath = path.resolve(__dirname, 'public/DesignSystem')

      let filePath = path.resolve(basePath, relativePath)

      if (relativePath === '' || urlPath.endsWith('/')) {
        filePath = path.resolve(basePath, 'index.html')
      }

      if (fs.existsSync(filePath)) {
        const ext = path.extname(filePath)
        if (ext === '.html') res.setHeader('Content-Type', 'text/html')
        if (ext === '.js') res.setHeader('Content-Type', 'application/javascript')
        if (ext === '.css') res.setHeader('Content-Type', 'text/css')
        if (ext === '.svg') res.setHeader('Content-Type', 'image/svg+xml')
        if (ext === '.ico') res.setHeader('Content-Type', 'image/x-icon')
        if (ext === '.txt') res.setHeader('Content-Type', 'text/plain')
        res.end(fs.readFileSync(filePath))
        return
      }

      next()
    })
  }
})

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  assetsInclude: ['**/*.avif', '**/*.webp'],
  plugins: [inspectAttr(), react(), designSystemStatic()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
});
