export function normalize(text) {
  return (text || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

function hash(text) {
  let value = 0
  for (let i = 0; i < text.length; i++) value = text.charCodeAt(i) + ((value << 5) - value)
  return Math.abs(value)
}

function modelWords(modelo) {
  return normalize(modelo)
    .split(/\s+/)
    .filter(word => word.length > 3)
}

function rotate(list, seed) {
  if (list.length === 0) return []
  const offset = seed % list.length
  return [...list.slice(offset), ...list.slice(0, offset)]
}

export function findRelatedPosts(moto, posts, limit = 3) {
  const marca = normalize(moto.marca)
  const words = modelWords(moto.modelo)

  const ranked = posts
    .map(post => {
      const text = normalize(`${post.title} ${post.excerpt} ${post.category}`)
      let score = 0
      if (text.includes(marca)) score += 4
      for (const word of words) if (text.includes(word)) score += 3
      return { post, score }
    })
    .sort((a, b) => b.score - a.score || b.post.date.localeCompare(a.post.date))

  const matches = ranked.filter(entry => entry.score > 0).map(entry => entry.post)
  if (matches.length >= limit) return matches.slice(0, limit)

  const chosen = [...matches]
  const taken = new Set(chosen.map(post => post.slug))
  const pool = ranked.filter(entry => !taken.has(entry.post.slug)).map(entry => entry.post)

  for (const post of rotate(pool, hash(moto.slug))) {
    if (chosen.length >= limit) break
    chosen.push(post)
  }

  return chosen.slice(0, limit)
}

export function findRelatedMotos(post, motos, limit = 4) {
  const titleText = normalize(`${post.title} ${post.excerpt} ${post.category}`)
  const bodyText = normalize(post.body || '')

  const ranked = motos
    .map(moto => {
      const marca = normalize(moto.marca)
      const modelo = normalize(moto.modelo)
      let score = 0

      if (titleText.includes(marca)) score += 5
      else if (bodyText.includes(marca)) score += 3

      if (titleText.includes(modelo)) score += 6
      else if (bodyText.includes(modelo)) score += 4

      for (const word of modelWords(moto.modelo)) {
        if (titleText.includes(word)) score += 2
        else if (bodyText.includes(word)) score += 1
      }

      return { moto, score }
    })
    .sort((a, b) => b.score - a.score)

  const matches = ranked.filter(entry => entry.score > 0).map(entry => entry.moto)
  if (matches.length >= limit) return matches.slice(0, limit)

  const chosen = [...matches]
  const taken = new Set(chosen.map(moto => moto.slug))
  const pool = ranked.filter(entry => !taken.has(entry.moto.slug)).map(entry => entry.moto)

  for (const moto of rotate(pool, hash(post.slug))) {
    if (chosen.length >= limit) break
    chosen.push(moto)
  }

  return chosen.slice(0, limit)
}
