import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const source = path.resolve(__dirname, '../../NetMotos/src/content/blog')
const dest = path.resolve(__dirname, '../src/content/blog')

const files = fs.readdirSync(source).filter(f => f.endsWith('.md'))
files.forEach(file => {
  const content = fs.readFileSync(path.join(source, file), 'utf-8')
  fs.writeFileSync(path.join(dest, file), content, 'utf-8')
  console.log(`✓ ${file}`)
})
console.log(`\nCopied ${files.length} blog posts`)
