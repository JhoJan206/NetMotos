import fs from 'node:fs'
import path from 'node:path'
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'

const BLOG_DIR = path.resolve('./src/content/blog')

function readPostDates() {
  const dates = new Map()
  if (!fs.existsSync(BLOG_DIR)) return dates
  for (const file of fs.readdirSync(BLOG_DIR)) {
    if (!file.endsWith('.md')) continue
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf8')
    const slug = raw.match(/^slug:\s*"?([^"\r\n]+)"?/m)?.[1]?.trim()
    const date = raw.match(/^date:\s*"?([^"\r\n]+)"?/m)?.[1]?.trim()
    if (!slug || !date) continue
    const parsed = new Date(date)
    if (Number.isNaN(parsed.getTime())) continue
    dates.set(`/blog/${slug}`, parsed.toISOString())
  }
  return dates
}

const postDates = readPostDates()

export default defineConfig({
  site: 'https://netmotos.lat',
  trailingSlash: 'never',
  integrations: [
    react(),
    sitemap({
      serialize(item) {
        const pathname = new URL(item.url).pathname.replace(/\/$/, '') || '/'
        const lastmod = postDates.get(pathname)
        return lastmod ? { url: item.url, lastmod } : { url: item.url }
      },
    }),
  ],
  vite: {
    ssr: {
      noExternal: ['fuse.js'],
    },
  },
})
