import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const content = `---
title: "Test Post"
slug: "test-post"
category: "Lanzamientos"
date: "2026-07-04"
excerpt: "Test excerpt for Astro migration"
author: "Jhojan Jacome"
---
# Test Post

This is a test post for the Astro migration.
`

fs.writeFileSync(path.resolve(__dirname, '../src/content/blog/test-post.md'), content, 'utf-8')
console.log('✓ test-post.md created')
