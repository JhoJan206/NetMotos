import { useState, useMemo } from 'react'

interface Post {
  title: string
  slug: string
  excerpt: string
  category: string
  date: string
  author?: string
  cover_image?: string
}

const CATEGORIES = ['Todas', 'Lanzamientos', 'Guías', 'Normativa', 'Noticias', 'Deportes', 'Seguridad Vial']
const POSTS_PER_PAGE = 6

const CATEGORY_COLORS: Record<string, string> = {
  Lanzamientos: '#FFE0E0',
  'Guías': '#FFF3D6',
  Normativa: '#D6E8FF',
  Noticias: '#D6FFE0',
  Deportes: '#E8D6FF',
  'Seguridad Vial': '#FFD6E8',
}

export default function BlogFilter({ posts: postsJson }: { posts: string }) {
  const allPosts: Post[] = JSON.parse(postsJson)
  const [categoria, setCategoria] = useState('Todas')
  const [pagina, setPagina] = useState(1)

  const filtrados = useMemo(() => {
    if (categoria === 'Todas') return allPosts
    return allPosts.filter(p => p.category === categoria)
  }, [categoria, allPosts])

  const totalPaginas = Math.ceil(filtrados.length / POSTS_PER_PAGE)
  const paginados = filtrados.slice((pagina - 1) * POSTS_PER_PAGE, pagina * POSTS_PER_PAGE)

  const handleCategoria = (cat: string) => {
    setCategoria(cat)
    setPagina(1)
  }

  return (
    <>
      <div className="blog-categories">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`cat-btn ${categoria === cat ? 'active' : ''}`}
            onClick={() => handleCategoria(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="blog-layout">
        <div className="blog-main">
          {paginados.length === 0 ? (
            <div className="empty-state">
              <p>No hay artículos en esta categoría todavía.</p>
            </div>
          ) : (
            <div className="grid-3">
              {paginados.map(post => (
                <article key={post.slug} className="blog-card">
                  <a href={`/blog/${post.slug}`} className="blog-card-image" style={{ background: CATEGORY_COLORS[post.category] || '#F0F0F0' }}>
                    {post.cover_image ? (
                      <img src={post.cover_image} alt={post.title} className="blog-card-img" loading="lazy" />
                    ) : (
                      <div className="blog-card-placeholder">
                        <span>{post.category[0]}</span>
                      </div>
                    )}
                  </a>
                  <div className="blog-card-body">
                    <div className="blog-card-meta">
                      <span className={`tag tag-${post.category.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')}`}>
                        {post.category}
                      </span>
                      <span className="blog-date">{post.date}</span>
                    </div>
                    <h3 className="blog-card-title">
                      <a href={`/blog/${post.slug}`}>{post.title}</a>
                    </h3>
                    <p className="blog-card-excerpt">{post.excerpt}</p>
                    <div className="blog-card-footer">
                      <span className="blog-author">{post.author}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {totalPaginas > 1 && (
            <div className="paginacion">
              <button
                disabled={pagina === 1}
                onClick={() => setPagina(p => p - 1)}
                className="btn btn-sm btn-outline"
              >
                Anterior
              </button>
              <span className="pagina-info">Página {pagina} de {totalPaginas}</span>
              <button
                disabled={pagina === totalPaginas}
                onClick={() => setPagina(p => p + 1)}
                className="btn btn-sm btn-outline"
              >
                Siguiente
              </button>
            </div>
          )}
        </div>
        <aside className="blog-sidebar">
          <div className="ad-slot" style={{ background: '#F0F0F0', border: '1px dashed #D0D0D0', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '250px', color: '#999', fontSize: '0.8rem', textAlign: 'center', padding: '8px' }}>
            <span>Espacio publicitario</span>
          </div>
          <div className="sidebar-card">
            <h4>¿Buscas moto?</h4>
            <p>Revisa nuestras fichas técnicas con especificaciones completas y precios actualizados.</p>
            <a href="/fichas-tecnicas" className="btn btn-primary btn-sm">Ver fichas</a>
          </div>
        </aside>
      </div>
    </>
  )
}
