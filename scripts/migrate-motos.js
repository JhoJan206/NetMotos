import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import * as yaml from 'js-yaml'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const motosJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../src/data/motos.json'), 'utf-8'))
const outputDir = path.resolve(__dirname, '../src/content/motos')

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true })

motosJson.forEach(moto => {
  const filename = `${moto.id}.yml`
  const yml = yaml.dump(moto, { lineWidth: 120, noRefs: true, quotingType: "'", forceQuotes: false })
  fs.writeFileSync(path.join(outputDir, filename), yml, 'utf-8')
  console.log(`✓ ${filename}`)
})

console.log(`\nMigradas ${motosJson.length} motos a ${outputDir}`)
