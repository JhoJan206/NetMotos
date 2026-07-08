import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'

export default defineConfig({
  site: 'https://netmotos.lat',
  trailingSlash: 'never',
  integrations: [react(), sitemap({
    changefreq: 'daily',
    lastmod: new Date(),
  })],
  vite: {
    ssr: {
      noExternal: ['fuse.js'],
    },
  },
})
