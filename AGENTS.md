# AGENTS.md — NetMotos.lat

## Commands

```bash
npm run dev      # dev server (localhost:4321)
npm run build    # static build → dist/
npm run preview  # serve built site locally
```

No test or lint commands exist.

## Project structure

- **Astro 5** static site, React 19 islands, TypeScript strict
- Content via Astro content collections (`src/content/`)
- Deployed on Vercel, site URL `https://netmotos.lat`

### Two synchronized data sources for motorcycles

| Source | Format | Location |
|--------|--------|----------|
| Primary | YAML (1 file per bike) | `src/content/motos/*.yml` |
| Legacy | JSON (single array) | `src/data/motos.json` |

Both must be kept in sync. The `scripts/migrate-motos.js` utility regenerates YAML from JSON (run with `node scripts/migrate-motos.js`).

## Moto schema (31 fields, `src/content/config.ts`)

```typescript
id, slug, marca, modelo, nombre_completo, anio (default 2024),
tipo, cilindraje, potencia_hp, potencia_rpm, torque_nm, torque_rpm,
alimentacion, encendido, arranque, transmision, combustible,
capacidad_tanque_l, consumo_km_l, peso_kg, altura_asiento_mm, distancia_suelo_mm,
suspension_delantera, suspension_trasera, freno_delantero, freno_trasero,
llanta_delantero, llanta_trasero, precio_cop,
imagen (optional), pros: string[], contras: string[], rating (0-5)
```

`tipo` values used: `Naked`, `Deportiva`, `Scooter`, `Doble Propósito`, `Clásica`

## Blog schema

```yaml
category: z.enum(['Lanzamientos', 'Guías', 'Normativa', 'Noticias', 'Deportes', 'Seguridad Vial'])
date: string (YYYY-MM-DD)
excerpt: string
cover_image?: string
author: string (defaults to 'Jhojan Jacome')
```

## Routing (all static, no SSR)

| Pattern | Source |
|---------|--------|
| `/fichas-tecnicas/[slug]` | `getCollection('motos')` → `moto.data.slug` |
| `/blog/[slug]` | `getCollection('blog')` → `post.slug` |
| `/marcas/[marca]` | filters motos by `marca` |
| `/guias` | filters blog by `category === 'Guías'` |

## Conventions

- `trailingSlash: 'never'` — links must omit trailing `/`
- Path aliases: `@layouts/`, `@components/`, `@utils/` → `src/*`
- No comments in code
- Prices in COP, stored as number, formatted with `formatCurrency.js`
- Images go in `public/images/motos/` and `public/images/blog/`
- JSON-LD schema.org/Product on every ficha page
- AdSense slots via `<AdSlot id="..." />`

## Path aliases (from tsconfig)

```json
"@layouts/*": ["src/layouts/*"],
"@components/*": ["src/components/*"],
"@utils/*": ["src/utils/*"]
```
