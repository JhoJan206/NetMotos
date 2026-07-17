import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import * as yaml from 'js-yaml'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const motosDir = path.resolve(__dirname, '../src/content/motos')
const outputJson = path.resolve(__dirname, '../src/data/motos.json')

const files = fs.readdirSync(motosDir).filter(f => f.endsWith('.yml'))
const motos = files.map(f => {
  const full = yaml.load(fs.readFileSync(path.join(motosDir, f), 'utf-8'))
  return full
})

motos.sort((a, b) => a.id.localeCompare(b.id))
fs.writeFileSync(outputJson, JSON.stringify(motos, null, 4), 'utf-8')
console.log(`✓ ${motos.length} motos escritas en motos.json`)
