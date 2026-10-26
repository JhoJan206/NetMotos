import fs from 'node:fs'
import path from 'node:path'
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'

const BLOG_DIR = path.resolve('./src/content/blog')
const MOTOS_DIR = path.resolve('./src/content/motos')

function field(raw, name) {
  return raw.match(new RegExp(`^${name}:\\s*"?([^"\\r\\n]+)"?`, 'm'))?.[1]?.trim()
}

function addDate(map, pathname, value) {
  if (!value) return
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return
  map.set(pathname, parsed.toISOString())
}

function readLastmodDates() {
  const dates = new Map()

  if (fs.existsSync(BLOG_DIR)) {
    for (const file of fs.readdirSync(BLOG_DIR)) {
      if (!file.endsWith('.md')) continue
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf8')
      const slug = field(raw, 'slug')
      if (!slug) continue
      addDate(dates, `/blog/${slug}`, field(raw, 'date'))
    }
  }

  if (fs.existsSync(MOTOS_DIR)) {
    for (const file of fs.readdirSync(MOTOS_DIR)) {
      if (!file.endsWith('.yml')) continue
      const raw = fs.readFileSync(path.join(MOTOS_DIR, file), 'utf8')
      const slug = field(raw, 'slug')
      if (!slug) continue
      addDate(dates, `/fichas-tecnicas/${slug}`, field(raw, 'actualizado'))
    }
  }

  return dates
}

const lastmodDates = readLastmodDates()

export default defineConfig({
  site: 'https://netmotos.lat',
  trailingSlash: 'never',
  integrations: [
    react(),
    sitemap({
      serialize(item) {
        const pathname = new URL(item.url).pathname.replace(/\/$/, '') || '/'
        const lastmod = lastmodDates.get(pathname)
        return lastmod ? { url: item.url, lastmod } : { url: item.url }
      },
    }),
  ],
})
