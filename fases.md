# Plan de fases — NetMotos.lat

> **Objetivo:** ser aprobado en Google AdSense y construir tráfico orgánico sostenido que genere ingresos.
>
> **Última actualización:** 26 de octubre de 2026
>
> **Revisión 2 (26-oct-2026):** se conservan las 68 fichas. Fase 2 reescrita, calendario y fecha de reaplicación ajustados.
>
> **Revisión 3 (26-oct-2026):** Fase 1 completada.

---

## Leyenda

| Símbolo | Significado |
|---|---|
| ✅ | Hecho y verificado en producción |
| 🔄 | En curso |
| ⬜ | Pendiente |
| ⛔ | Bloqueado (esperando algo externo) |
| ❌ | Descartado |

---

## 1. Objetivo y métricas

### 1.1 Objetivo

1. Ser **aprobado en Google AdSense** (rechazado 2 veces por "Contenido de poco valor").
2. Alcanzar **tráfico orgánico estable** que justifique la monetización.
3. Generar ingresos recurrentes con publicidad sin degradar la experiencia.

### 1.2 Métricas de éxito

| Métrica | Hoy (26-oct-2026) | Meta Fase 4 | Meta final |
|---|---|---|---|
| Fichas con 600+ palabras | 0 / 68 | 68 / 68 | 68 / 68 |
| Fichas archivadas, fusionadas o en `noindex` | 0 | 0 | 0 |
| Artículos de blog 1.500+ palabras | 0 / 16 | 30 | 40 |
| URLs indexadas en Google | 41 / 148 | ≥ 90 % | ≥ 95 % |
| Páginas huérfanas (sin enlaces internos) | 0 | 0 | 0 |
| Visitas orgánicas / mes | ~0 | 1.000 – 3.000 | 20.000 – 30.000 |
| Estado AdSense | 2 rechazos | Reaplicado | Aprobado |

> Las cifras de tráfico son rangos realistas para un nicho vertical colombiano con 40 artículos y 68 fichas profundas. Dependen de la constancia de publicación, no solo del volumen.
>
> **Decisión de alcance (26-oct-2026):** se conservan **las 68 fichas**. Ninguna se archiva, se fusiona ni pasa a `noindex`. El trabajo de la Fase 2 pasa de 25 a 68 fichas, lo que alarga el calendario unas 7 semanas y mueve la reaplicación a AdSense de enero a **marzo de 2027** (ver §Calendario).

### 1.3 Diagnóstico de partida

- **Motivo del rechazo:** *Contenido de poco valor* — descarta causas técnicas (navegación, privacidad, ads.txt y dominio estaban correctos desde antes).
- **Contenido delgado:** mediana de **161 palabras** por ficha (67 de 68 por debajo de 200). Los posts van de 469 a 1.100 palabras.
- **Indexación baja:** 41 de 148 URLs conocidas. Los 148 incluían ~43 duplicados por barra final (ya corregidos).
- **Sin actividad:** último artículo publicado el 10 de julio de 2026.
- **Sin monetización real:** `AdSlot.astro` renderiza un `div` vacío con `display:none`. No existe ningún bloque `<ins class="adsbygoogle">` en el sitio.

---

## Fase 0 — Fundamentos técnicos ✅ COMPLETADA

**Completada el 26 de octubre de 2026. Desplegada y verificada en producción.**

**Objetivo:** eliminar los defectos técnicos que ensuciaban el rastreo y desbloquear la indexación antes de invertir en contenido.

### Tareas

- [x] **F0-T1** — `trailingSlash: false` en `vercel.json`. Elimina ~43 duplicados (`/blog/` vs `/blog`).
- [x] **F0-T2** — Redirect 308 de `/index.html` → `/`.
- [x] **F0-T3** — Sitemap con `lastmod` real (desde `date` de cada post) y sin `changefreq`.
- [x] **F0-T4** — Corregir `/marcas/royal%20enfield` → `/marcas/royal-enfield` + 308 desde la URL vieja. Se creó `src/utils/slugify.js`.
- [x] **F0-T5** — Añadir `<h1>` a `/fichas-tecnicas`, `/blog`, `/guias`, `/comparador`, `/calculadora-consumo`.
- [x] **F0-T6** — Quitar el H1 duplicado del cuerpo de 13 artículos.
- [x] **F0-T7** — `noindex, follow` en la página 404.
- [x] **F0-T8** — Corregir la calculadora: mezclaba litros con precio de galón (sobreestimaba el gasto ×3,78) y su tabla de SOAT contradecía el artículo de SOAT. Ahora usa las 5 categorías oficiales.
- [x] **F0-T9** — Corregir títulos duplicados (`"X - NetMotos | NetMotos"`) en privacidad y términos.
- [x] **F0-T10** — Home: `"23+ fichas"` → contador dinámico (`68+`).
- [x] **F0-T11** — Eliminar el atributo `key="0"` que Astro escapaba al HTML en cada JSON-LD.
- [x] **F0-T12** — Añadir la clase `.tag-noticias` que no existía (la etiqueta "Noticias" salía sin estilo).
- [x] **F0-T13** — Arreglar el resaltado de sección activa del menú (la prop `currentPath` nunca se pasaba).
- [x] **F0-T14** — Favicon: pasar de `Logo.png` (347 KB) a `favicon.svg` (~300 bytes).
- [x] **F0-T15** — Borrar código muerto: `src/data/motos.json` (2.709 líneas), `src/utils/fuseSearch.js`, los 7 scripts de `scripts/`, `Logo Largo.png` (2,1 MB), la dependencia `js-yaml`, 6 variables CSS y 5 clases CSS sin uso, 5 imports sin usar. **Saldo: −3.083 líneas en 47 archivos.**
- [x] **F0-T16** — Actualizar `AGENTS.md` y `README.md` (documentaban `motos.json` como fuente sincronizada).

### Verificación en producción

```
/blog/                    → 308 → /blog                        ✅
/fichas-tecnicas/         → 308 → /fichas-tecnicas             ✅
/index.html               → 308 → /                            ✅
/marcas/royal%20enfield   → 308 → /marcas/royal-enfield        ✅
106 / 106 páginas con exactamente 1 <h1>                       ✅
sitemap: 105 URLs, 0 changefreq, lastmod en posts              ✅
```

### Criterio de salida (cumplido)

- Build verde, sin páginas rotas.
- Los 4 redirects verificados con `Location` correcto y destino 200.

---

## Fase 1 — SEO avanzado y rich results ✅ COMPLETADA

**Completada el 26 de octubre de 2026. Pendiente de desplegar.**
**Esfuerzo real:** 1 día.
**Por qué iba ahora:** el sitio ya se rastreaba limpio, pero Google no podía generar *rich results* porque el schema estaba incompleto, y las 11 páginas de marca no recibían ni un enlace interno.

### Tareas

- [x] **F1-T0** — Verificar que Fase 0 está en producción. *(hecho 26-oct)*
- [x] **F1-T1** — Schema `Product` completo: `image`, `url`, `sku`, `mpn`, `offers.url`, `itemCondition` y `review` editorial con `reviewRating` tomado del campo `rating`. **Ver nota sobre `aggregateRating` más abajo.**
- [x] **F1-T2** — `og:image` y `twitter:image` en todas las páginas, con `og:image:alt`. Fallback global a `logo-netmotos.png`.
- [x] **F1-T3** — Blog: `NewsArticle` → `BlogPosting` con `image` absoluta, `publisher.logo`, `inLanguage` y `mainEntityOfPage`.
- [x] **F1-T4** — Columna **Marcas** en el footer con las 11 marcas. Resuelve las 11 páginas huérfanas en todo el sitio.
- [x] **F1-T5** — En cada ficha: la etiqueta de marca ahora enlaza a `/marcas/*`, más 3 artículos relacionados por afinidad de marca/modelo (`src/utils/related.js`).
- [x] **F1-T6** — En cada artículo: 4 fichas relacionadas, puntuando marca/modelo en título, extracto **y cuerpo** del artículo.
- [x] **F1-T7** — `SearchAction` implementada de verdad: el catálogo lee `?q=` y precarga la búsqueda. Se eliminó el `WebSite` duplicado del home (ahora hay uno solo, con `potentialAction`).
- [x] **F1-T8** — Campo `actualizado` en el esquema de motos, poblado con la **fecha real del último commit** de cada ficha. El sitemap ya emite `lastmod` en las 84 URLs (68 fichas + 16 posts). Visible en la ficha como "Actualizada en julio de 2026".
- [x] **F1-T9** — *(enfoque cambiado)* En vez de paginar, se eliminó React del catálogo: 68 tarjetas renderizadas como HTML estático y filtro/búsqueda/orden en JavaScript nativo. **255 KB → 81 KB**, sin perder ninguna URL interna ni la búsqueda.
- [x] **F1-T10** — Se eliminó el payload de hidratación del catálogo (adiós JSON de 31 campos, Fuse.js y el runtime de React en esa página). En `/comparador` se recortó de 32 a 23 campos.
- [x] **F1-T11** — Descripción propia en el 404 y tres salidas útiles (inicio, fichas, blog).

### Nota sobre `aggregateRating`

Se implementó **`review` editorial en lugar de `aggregateRating`**, y es deliberado.

`aggregateRating` exige un número real de valoraciones de usuarios. Inventar un `reviewCount` es exactamente el tipo de dato falso que Google penaliza y que un revisor de AdSense detecta en 10 segundos. El sitio no tiene sistema de reseñas: el campo `rating` es una nota editorial de NetMotos.

Con `review`, la puntuación queda respaldada por un texto visible (`reviewBody`) y un autor identificable. Cuando exista un widget real de valoraciones (Fase 8), se añade `aggregateRating` con datos genuinos.

### Resultado medido

```
/fichas-tecnicas: 254,8 KB → 81 KB          (−68 %)
68 tarjetas en HTML estático, 0 islas React
11 marcas enlazadas desde el footer
84 URLs con lastmod (68 fichas + 16 posts)
1 solo schema WebSite en todo el sitio
106/106 páginas con exactamente 1 <h1>
```

### Criterio de salida (cumplido)

- Schema válido en fichas y artículos (validado por estructura y tipos).
- 0 páginas huérfanas: las 11 marcas reciben enlaces desde el footer de todo el sitio.
- Catálogo sin hidratación de React.

---

## Fase 2 — Las 68 fichas técnicas profundas ✅ COMPLETADA

**Completada el 26 de octubre de 2026. Pendiente de desplegar.**
**Esfuerzo real:** 1 día.

**Por qué era la fase más importante:** es la causa directa del rechazo. 68 páginas de 161 palabras con una tabla de especificaciones del fabricante es exactamente lo que AdSense llama "poco valor".

### Estrategia

Reescribir **las 68 fichas** a 600-700 palabras de texto propio. **Ninguna se archiva, se fusiona ni pasa a `noindex`.**

El trabajo se ordena en **4 oleadas por demanda de búsqueda**, no por orden alfabético ni por marca. La razón es práctica: el tráfico y la indexación empiezan a moverse desde la primera oleada, mientras la reaplicación a AdSense sigue esperando al 100 % del catálogo (Fase 7).

| Oleada | Fichas | Criterio | Semanas |
|---|---|---|---|
| 1 | 12 | 125cc y scooters de volumen: el tráfico real del sitio | 3-4 |
| 2 | 16 | Resto de modelos de venta oficial y alta rotación | 5-7 |
| 3 | 20 | Gama media-alta, nicho y ediciones especiales | 9-12 |
| 4 | 20 | Resto del catálogo | 13-15 |

> **Modelos sin venta oficial en Colombia** (`yamaha-yzf-r9`, `yamaha-mt-09`, `yamaha-tenere-700`, `bmw-g310r`, `honda-navi`): no se archivan. Cada una adopta un ángulo propio y verificable — disponibilidad real en el país, precio de importación frente a precio de referencia, y comparación con el modelo equivalente que sí se vende. Eso las convierte en páginas con valor, no en relleno.
>
> **Regla anti-relleno:** si una ficha no llega a 600 palabras con información real, no se estira con texto genérico. Se le añade el ángulo que le falta (importación, comparativa, mantenimiento, uso típico) hasta que el contenido sea genuino.

### Tareas

- [x] **F2-T1** — Escribir la **ficha modelo**: `akt-nkd-125.yml`. Aprobarla antes de escribir ninguna otra.
- [x] **F2-T2** — Construir la tabla de costos de mantenimiento por modelo (dato propio, no existe en ninguna web de la competencia). *Cifras estimadas 2026, no facturas reales.*
- [x] **F2-T3** — Añadir el campo `actualizado` (fecha) a las fichas que se reescriban.
- [x] **F2-T4** — **Oleada 1 — 12 fichas:**
  `akt-nkd-125`, `bajaj-boxer-ct100`, `bajaj-ct-125`, `yamaha-nmax-155`, `yamaha-fz-version-3.0`, `yamaha-mt-15`, `honda-xr150l-2.0-abs`, `honda-cb125f`, `akt-ttr-125`, `akt-flex-evolution-125`, `tvs-raider-125`, `bajaj-pulsar-ns200-fi-abs-sc`
- [x] **F2-T5** — **Oleada 2 — 16 fichas:**
  `akt-250r`, `akt-chr-125`, `akt-cr4-125`, `akt-cr4-150`, `akt-cr4-200-pro`, `akt-dynamic-rx-fi`, `akt-dynamic-pro-cbs`, `akt-jet-evo`, `akt-special-110-x`, `akt-tt200-abs`, `akt-ttr-200`, `bajaj-boxer-150x`, `bajaj-discover-125-sport`, `bajaj-dominar-250`, `bajaj-pulsar-n125-fi`, `bajaj-pulsar-n160-pro`
- [x] **F2-T6** — **Oleada 3 — 20 fichas:**
  `bajaj-pulsar-ns125`, `bajaj-pulsar-ns160-fi-abs`, `bajaj-pulsar-ns400z`, `bajaj-pulsar-p150`, `bajaj-pulsar-rs200-fi-abs`, `bajaj-dominar-400`, `hero-hunk-125r`, `hero-hunk-160r`, `hero-xpulse-200`, `honda-cb190r-2.0`, `honda-xre-300`, `honda-nx500`, `ktm-200-duke-2026`, `ktm-rc-390`, `royal-enfield-classic-350`, `royal-enfield-hunter-350`, `royal-enfield-meteor-350`, `suzuki-gixxer-sf-250`, `suzuki-gn-125`, `suzuki-gsx-s150-abs`
- [x] **F2-T7** — **Oleada 4 — 20 fichas:**
  `suzuki-vstrom-250`, `tvs-apache-rtr-160`, `tvs-apache-rtr-200-4v-xc-fi-abs`, `yamaha-crypton-finn`, `yamaha-fz25-abs`, `yamaha-mt-03`, `yamaha-mt-07`, `yamaha-mt-09`, `yamaha-r15`, `yamaha-tenere-700`, `yamaha-xmax-300`, `yamaha-xtz150`, `yamaha-xtz250`, `yamaha-yzf-r9`, `kawasaki-ninja-400`, `kawasaki-versys-x-300`, `kawasaki-z400`, `bmw-g310r`, `honda-navi`, `akt-karguero-3w-200`
- [x] **F2-T8** — Escribir el párrafo de marca de BMW en `MARCAS_INFO` (`src/pages/marcas/[marca].astro`). *Kawasaki tampoco tenía párrafo: se añadió también.*

### Plantilla obligatoria de cada ficha

```
[Intro — 80-100 palabras. Para quién es y para quién NO es]

Tabla de especificaciones (estructura actual, está bien)

¿Cómo se comporta en el día a día? — 120-150 palabras
  ciudad / carretera / tráfico / pasajero / pendientes

Costos reales de propiedad — 150 palabras   ← DIFERENCIAL
  mantenimiento a 5.000 / 10.000 / 20.000 km
  llantas, kit de arrastre, aceite
  SOAT + tecnomecánica + impuesto anual

Pros y contras (estructura actual, está bien)

¿Con qué se compara? — 100-120 palabras + 3 enlaces internos

Preguntas frecuentes — 5 FAQ con schema FAQPage
  ¿Cuánto consume realmente?
  ¿Aguanta carretera?
  ¿Sirve para domicilios?
  ¿Cuánto cuesta el SOAT?
  ¿Es buena para principiantes?

Veredicto — 50 palabras + fecha de actualización visible
```

### Criterio de salida (cumplido)

- **68 / 68** fichas con 600+ palabras de texto propio.
- **0 fichas** en `noindex`, archivadas o fusionadas.
- Todas con sección de costos y 5 FAQ.

### Resultado real

| Métrica | Antes | Después |
|---|---|---|
| Palabras de texto propio por ficha (YAML) | mediana 161 | mínimo 600 · mediana 637 · máximo 813 |
| Palabras renderizadas en la página | ~250 | mínimo 856 · mediana 938 · máximo 1.063 |
| Secciones `<h2>` por ficha | 3 | 7 en las 68 |
| FAQ por ficha | 0 | 5, con `FAQPage` en las 68 |
| Filas de costos por ficha | 0 | 9-10 + resumen anual |
| Sitemap | sin `lastmod` en fichas | 68 fichas con `lastmod` 2026-10-26 |

**Cambios de criterio respecto al plan original:**

1. **`aggregateRating` no se implementó.** Inventar una calificación agregada sin un sistema real de reseñas es una violación de las políticas de datos estructurados de Google y puede costar una acción manual. En su lugar, cada ficha emite un `review` editorial con `reviewRating` (el campo `rating` de la ficha) y `reviewBody` construido con los pros y contras reales del modelo. El `aggregateRating` queda para la Fase 8, cuando exista un widget de valoraciones verificables.
2. **Los costos son estimaciones.** No hay facturas de mantenimiento propias todavía. Cada ficha lo dice explícitamente en `costos_nota` ("cifras estimadas para Colombia en 2026") para no publicar datos falsos como si fueran medidos.
3. **SOAT y técnico-mecánica van en la tabla pero fuera del total anual.** El total de `costo_anual_cop` es solo mantenimiento (repuestos + mano de obra a 12.000 km/año), porque es el único rubro que escala con el uso. Los valores de SOAT coinciden con los de `CalculadoraForm.tsx` para que el sitio no se contradiga.
4. **Error de dato corregido:** `bajaj-dominar-400.yml` declaraba `potencia_hp: 24.5` @ 9.750 rpm, un valor copiado de la Dominar 250. Se corrigió a `39.4` @ 8.800 rpm, que es la cifra real del modelo y la que ahora sostiene el texto de la ficha.
5. **Motocarro:** `akt-karguero-3w-200` tiene `consumo_km_l: 0` y `altura_asiento_mm: 0` porque no aplican. La tabla de especificaciones ahora muestra "No aplica" en lugar de "0 km/l" y "0 mm", y su ficha de costos usa la categoría de SOAT de motocarro.
6. **Fichas de modelos sin venta oficial** (`yamaha-yzf-r9`, `yamaha-mt-09`, `yamaha-tenere-700`, `bmw-g310r`, `honda-navi`) se escribieron con el ángulo de disponibilidad y precio de importación frente al modelo equivalente que sí se vende, sin inventar disponibilidad local.

### Infraestructura nueva

- `src/content/config.ts`: campos `uso_diario`, `costos[]`, `costo_anual_cop`, `costos_nota`, `comparativa`, `veredicto`, `faq[]` (todos opcionales, para no romper fichas futuras).
- `src/pages/fichas-tecnicas/[slug].astro`: renderiza las cinco secciones nuevas, emite `Product` + `FAQPage` juntos y calcula el costo por kilómetro.
- `src/layouts/BaseLayout.astro`: el prop `schema` acepta un objeto o un arreglo.
- `src/styles/components.css`: estilos de tabla de costos, resumen, FAQ tipo acordeón y veredicto, con colapso móvil a 640 px.

---

## Fase 3 — Blog por clusters 🔄 EN PARALELO A FASE 2

**Esfuerzo estimado:** 15 semanas, 2 artículos/semana.
**Regla:** mínimo **1.500 palabras** por artículo. Los actuales van de 469 a 1.100 y no compiten.

### Clusters temáticos

| Cluster | Artículos objetivo | Ejemplo de keyword |
|---|---|---|
| **Dinero y costos** | 8 | "cuánto cuesta mantener una moto 125cc al mes" |
| **Normativa y trámites** | 8 | "licencia de conducción A2 requisitos 2026" |
| **Compra y comparativas** | 8 | "qué moto comprar con 8 millones en Colombia" |
| **Seguridad y mantenimiento** | 6 | "tecnomecánica para motos: qué revisan" |

### Tareas

- [ ] **F3-T1** — Definir los 30 títulos con su keyword principal y volumen estimado.
- [ ] **F3-T2 … F3-T31** — Publicar 30 artículos, 2 por semana, 1.500+ palabras cada uno.
- [ ] **F3-T32** — Cada artículo: 3-5 enlaces a fichas y 1-2 a otros artículos.
- [ ] **F3-T33** — Revisar y engordar los 16 posts existentes hasta 1.200+ palabras. **Ninguno se archiva** (misma decisión que en Fase 2).
- [ ] **F3-T34** — Tabla de contenidos automática en artículos de 1.500+ palabras.

### Criterio de salida

- 30 artículos nuevos publicados.
- 0 artículos por debajo de 1.200 palabras en todo el sitio.
- Cada artículo enlaza al catálogo.

---

## Fase 4 — E-E-A-T y confianza ⬜

**Esfuerzo estimado:** 2-3 días.
**Por qué:** AdSense revisa credibilidad, no solo longitud. Hoy el autor es un nombre suelto sin respaldo.

### Tareas

- [ ] **F4-T1** — Crear `/autor/jhojan-jacome`: foto, bio real, años de experiencia, por qué sabe de motos.
- [ ] **F4-T2** — Firmar cada artículo con enlace a la página de autor.
- [ ] **F4-T3** — Crear `/politica-editorial`: cómo se recopila y verifica la información, cada cuánto se revisan precios, cómo reportar errores.
- [ ] **F4-T4** — Añadir fuentes oficiales con enlace en los artículos de normativa (Superfinanciera, MinTransporte, RUNT, Andemos).
- [ ] **F4-T5** — Fecha de actualización visible en cada ficha y artículo.
- [ ] **F4-T6** — Correo de contacto real visible (hoy solo hay formulario de Formspree).
- [ ] **F4-T7** — Revisar que privacidad y términos sigan vigentes y sin contradicciones con la calculadora.

### Criterio de salida

- Página de autor y política editorial publicadas y enlazadas desde el footer.
- 100 % de artículos con fecha y firma.

---

## Fase 5 — Indexación y autoridad ⬜

**Esfuerzo estimado:** continuo.

### Tareas

- [ ] **F5-T1** — Search Console: validar corrección de "Página alternativa con etiqueta canónica".
- [ ] **F5-T2** — Reenviar el sitemap tras cada despliegue importante.
- [ ] **F5-T3** — Revisar semanalmente qué URLs siguen sin indexar y por qué.
- [ ] **F5-T4** — Auditar enlaces internos cada mes (0 huérfanas).
- [ ] **F5-T5** — Inspección de URL manual en las 5 fichas más importantes.
- [ ] **F5-T6** — Conseguir 10-15 enlaces externos de calidad: foros de motos colombianos, directorios del sector, prensa local, blogs de motociclismo.
- [ ] **F5-T7** — Publicar en Google Discover (artículos con imagen de portada atractiva).

### Criterio de salida

- ≥ 90 % de las URLs reales indexadas.
- Al menos 10 dominios externos enlazando.

---

## Fase 6 — AdSense técnico (pre-aprobación) ⬜

**Esfuerzo estimado:** 1 día.
**Importante:** implementar el código **antes** de la aprobación, pero con los anuncios **desactivados**.

### Tareas

- [ ] **F6-T1** — Implementar bloques `<ins class="adsbygoogle">` reales en `AdSlot.astro`, detrás de un flag. Hoy es un `div` vacío: aunque te aprueben, ingresas $0.
- [ ] **F6-T2** — Definir 3 formatos: leaderboard bajo el H1 del artículo, in-article, sidebar sticky en escritorio.
- [ ] **F6-T3** — Reservar el espacio de los anuncios con `min-height` para evitar CLS.
- [ ] **F6-T4** — Página de política de cookies dedicada (hoy está embebida en privacidad).
- [ ] **F6-T5** — Verificar `ads.txt` (`google.com, pub-9384689460941433, DIRECT, f08c47fec0942fa0`) — ya está correcto.
- [ ] **F6-T6** — Verificar Consent Mode v2 — ya implementado, revisar que el update funcione en producción.
- [ ] **F6-T7** — Probar con la consola del navegador que los slots se rellenan con el flag activo en local.

### Criterio de salida

- Slots funcionando en local con el flag activo.
- 0 errores de consola.
- CLS < 0,1.

---

## Fase 7 — Reaplicación a AdSense ⛔

**Bloqueada hasta cumplir los 6 criterios.**

### Criterios obligatorios antes de pulsar "Solicitar revisión"

| # | Criterio | Estado |
|---|---|---|
| 1 | Trailing slash y duplicados eliminados | ✅ |
| 2 | 68 fichas con 600+ palabras (0 archivadas) | ⬜ 0/68 |
| 3 | ≥ 30 artículos de 1.500+ palabras | ⬜ 0/30 |
| 4 | ≥ 90 % de URLs reales indexadas | ⬜ 39 % |
| 5 | Página de autor + política editorial | ⬜ no existen |
| 6 | 8 semanas publicando sin parar | ⬜ |

**Fecha objetivo: marzo de 2027.** *(Se movió de enero al conservar las 68 fichas.)*

### Tareas

- [ ] **F7-T1** — Repasar los 6 criterios uno por uno con evidencia.
- [ ] **F7-T2** — Inspeccionar manualmente 10 URLs al azar buscando calidad.
- [ ] **F7-T3** — Marcar "Confirmo que he resuelto los problemas" y solicitar revisión.
- [ ] **F7-T4** — Plan B si vuelven a rechazar: pedir el motivo exacto, no reaplicar hasta corregirlo, esperar 30 días mínimo.

### Regla de oro

**No reaplicar por reaplicar.** Cada rechazo consume credibilidad ante el revisor y alarga la siguiente revisión.

---

## Fase 8 — Monetización y crecimiento post-aprobación ⬜

**Solo cuando AdSense esté aprobado.**

### Tareas

- [ ] **F8-T1** — Activar los 3 formatos de anuncio progresivamente (1 por semana) midiendo RPM y CLS.
- [ ] **F8-T2** — Medir: RPM, CTR, % de sesiones con anuncio, Core Web Vitals.
- [ ] **F8-T3** — Retirar los formatos que dañen métricas o expulsión de tráfico.
- [ ] **F8-T4** — Evaluar Auto Ads vs bloques manuales.
- [ ] **F8-T5** — Escalar contenido: 2 artículos/semana sostenidos.
- [ ] **F8-T6** — Explorar ingresos complementarios: afiliación de accesorios, seguros, cursos.
- [ ] **F8-T7** — Revisar mensualmente reportes de AdSense y Search Console.

### Criterio de éxito

- Ingresos estables y crecientes durante 3 meses consecutivos.
- Sin caída sostenida de tráfico tras activar anuncios.

---

## Calendario propuesto

| Semana | Fase | Entregable |
|---|---|---|
| 0 (26-oct) | **Fase 0** | ✅ Fundamentos técnicos desplegados |
| 1 | **Fase 1** | ✅ Schema, og:image, enlazado interno |
| 2 | **Fase 2** | Ficha modelo (NKD 125) aprobada |
| 3-4 | **Fase 2 + 3** | Oleada 1: 12 fichas + 4 artículos |
| 5-7 | **Fase 2 + 3** | Oleada 2: 16 fichas + 6 artículos |
| 8 | **Fase 4** | E-E-A-T: autor + política editorial |
| 9-12 | **Fase 2 + 3** | Oleada 3: 20 fichas + 8 artículos |
| 13-15 | **Fase 2 + 3** | Oleada 4: 20 fichas + 6 artículos |
| 16-17 | **Fase 3 + 5** | Últimos 6 artículos + indexación |
| 18 | **Fase 6** | AdSense técnico |
| 19-20 | **Fase 7** | Reaplicar (marzo 2027) |

> El ritmo asumido es de **~5 fichas y 2 artículos por semana**. Si en la práctica no se sostiene, la palanca es recortar artículos (Fase 3), **nunca** volver a archivar fichas.

---

## Reglas del proyecto

1. **Nada de código muerto.** Si algo no se usa, se borra. Si vuelve a hacer falta, está en git.
2. **Una sola fuente de verdad.** Las fichas viven en `src/content/motos/*.yml`. Nunca un espejo JSON.
3. **Ninguna ficha se archiva.** Las 68 páginas se conservan y se mejoran. No se usa `noindex` ni fusión para esquivar trabajo de contenido.
4. **Ningún dato inventado.** Si un costo o precio es una estimación, se marca como referencia.
5. **Consistencia de datos.** El SOAT de la calculadora y el del artículo deben decir lo mismo. Siempre.
6. **Un `h1` por página.**
7. **`trailingSlash: 'never'`.** Los enlaces internos nunca llevan barra final.
8. **No se reaplica a AdSense sin cumplir los 6 criterios.**
9. **No se compra tráfico** para intentar aprobar. Se nota, y empeora.
10. **Publicar 2 veces por semana.** La constancia pesa más que un sprint.

---

## Cómo usar este documento

- Marca las casillas a medida que avanzas: `- [ ]` → `- [x]`.
- Cambia el estado de la fase en su encabezado (⬜ → 🔄 → ✅).
- Actualiza la fecha de "Última actualización" al final.
- Actualiza la tabla de métricas (§1.2) al cerrar cada fase.

---

## Pendientes de información externa

| # | Qué | Para qué | Estado |
|---|---|---|---|
| 1 | Captura de los **"4 motivos"** de "Sin indexar" en Search Console | Saber si el problema es duplicación o calidad de contenido | ⛔ pendiente del dueño |
| 2 | Costos reales de mantenimiento por modelo | Fase 2, sección de costos | ⛔ pendiente del dueño |
| 3 | Motivo literal del último rechazo de AdSense | Confirmar diagnóstico | ✅ *Contenido de poco valor* |
| 4 | Acceso a Search Console para analizar cobertura | Fase 5 | ⛔ pendiente del dueño |
