import { useState, useMemo, useEffect } from 'react'
import Fuse from 'fuse.js'
import { formatCOP } from '../utils/formatCurrency'

interface Moto {
  id: string
  slug: string
  marca: string
  modelo: string
  nombre_completo: string
  tipo: string
  cilindraje: number
  potencia_hp: number
  consumo_km_l: number
  peso_kg: number
  precio_cop: number
  imagen?: string
}

const MOTO_COLORS = ['#E63946', '#1D3557', '#F4A261', '#2A9D8F', '#6B4CE6', '#E07A2F', '#2B4F7A', '#E9C46A']

const CILINDRAJE_RANGOS = [
  { label: '125cc', min: 0, max: 130 },
  { label: '150-200cc', min: 130, max: 200 },
  { label: '200-400cc', min: 200, max: 400 },
  { label: '400-600cc', min: 400, max: 600 },
  { label: '600cc+', min: 600, max: Infinity },
]

function getColor(modelo: string): string {
  let hash = 0
  for (let i = 0; i < modelo.length; i++) hash = modelo.charCodeAt(i) + ((hash << 5) - hash)
  return MOTO_COLORS[Math.abs(hash) % MOTO_COLORS.length]
}

export default function MotoSearchFilter({ motos: motosJson }: { motos: string }) {
  const allMotos: Moto[] = JSON.parse(motosJson)
  const [busqueda, setBusqueda] = useState('')
  const [filtros, setFiltros] = useState({ marca: '', tipo: '', rangoCilindraje: '', precioMax: '' })
  const [comparadas, setComparadas] = useState<string[]>([])

  const fuseInstance = useMemo(() => new Fuse(allMotos, {
    keys: [
      { name: 'nombre_completo', weight: 2 },
      { name: 'marca', weight: 1.5 },
      { name: 'modelo', weight: 1.5 },
      { name: 'tipo', weight: 0.5 },
    ],
    threshold: 0.4,
    includeScore: true,
  }), [allMotos])

  useEffect(() => {
    const saved = sessionStorage.getItem('comparador')
    if (saved) {
      const parsed = JSON.parse(saved)
      setComparadas(parsed.map((m: any) => m.id))
    }
  }, [])

  const motosFiltradas = useMemo(() => {
    let result = [...allMotos]
    if (busqueda.trim()) {
      result = fuseInstance.search(busqueda).map(r => r.item)
    }
    if (filtros.marca) result = result.filter(m => m.marca === filtros.marca)
    if (filtros.tipo) result = result.filter(m => m.tipo === filtros.tipo)
    if (filtros.rangoCilindraje) {
      const rango = CILINDRAJE_RANGOS.find(r => r.label === filtros.rangoCilindraje)
      if (rango) result = result.filter(m => m.cilindraje >= rango.min && m.cilindraje < rango.max)
    }
    if (filtros.precioMax) result = result.filter(m => m.precio_cop <= Number(filtros.precioMax))
    return result
  }, [busqueda, filtros, allMotos, fuseInstance])

  const marcas = [...new Set(allMotos.map(m => m.marca))].sort()
  const tipos = [...new Set(allMotos.map(m => m.tipo))].sort()

  const toggleComparar = (id: string) => {
    setComparadas(prev => {
      const exists = prev.includes(id)
      let next: string[]
      if (exists) {
        next = prev.filter(i => i !== id)
      } else {
        if (prev.length >= 3) next = [...prev.slice(1), id]
        else next = [...prev, id]
      }
      sessionStorage.setItem('comparador', JSON.stringify(next.map(i => ({ id: i }))))
      return next
    })
  }

  return (
    <>
      <div className="filtros-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Buscar por nombre, marca o modelo..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
        />
        <select value={filtros.marca} onChange={e => setFiltros(f => ({ ...f, marca: e.target.value }))}>
          <option value="">Todas las marcas</option>
          {marcas.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
        <select value={filtros.tipo} onChange={e => setFiltros(f => ({ ...f, tipo: e.target.value }))}>
          <option value="">Todos los tipos</option>
          {tipos.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <select value={filtros.rangoCilindraje} onChange={e => setFiltros(f => ({ ...f, rangoCilindraje: e.target.value }))}>
          <option value="">Rango cilindraje</option>
          {CILINDRAJE_RANGOS.map(r => <option key={r.label} value={r.label}>{r.label}</option>)}
        </select>
        <select value={filtros.precioMax} onChange={e => setFiltros(f => ({ ...f, precioMax: e.target.value }))}>
          <option value="">Precio máximo</option>
          <option value="5000000">Hasta $5M</option>
          <option value="10000000">Hasta $10M</option>
          <option value="15000000">Hasta $15M</option>
          <option value="25000000">Hasta $25M</option>
          <option value="50000000">Hasta $50M</option>
          <option value="999999999">Más de $50M</option>
        </select>
      </div>

      {comparadas.length > 0 && (
        <div className="comparador-flotante">
          <span>{comparadas.length} moto{comparadas.length > 1 ? 's' : ''} en comparador</span>
          <a href="/comparador" className="btn btn-primary btn-sm">Ver Comparador</a>
        </div>
      )}

      <div className="fichas-layout">
        <div className="fichas-main">
          {motosFiltradas.length === 0 ? (
            <div className="empty-state">
              <p>No encontramos motos con esos filtros. Intenta con otros criterios.</p>
            </div>
          ) : (
            <div className="grid-3">
              {motosFiltradas.map(moto => (
                <div key={moto.id} className="moto-card">
                  <a href={`/fichas-tecnicas/${moto.slug}`} className="moto-card-image" style={{ background: `linear-gradient(135deg, ${getColor(moto.modelo)}, ${getColor(moto.modelo)}dd)` }}>
                    {moto.imagen ? (
                      <img src={moto.imagen} alt={moto.nombre_completo} className="moto-card-img" loading="lazy" />
                    ) : (
                      <div className="moto-card-placeholder">
                        <span className="moto-initial">{moto.modelo[0]}</span>
                      </div>
                    )}
                  </a>
                  <div className="moto-card-body">
                    <div className="moto-card-header">
                      <span className="moto-marca">{moto.marca}</span>
                      <span className="moto-tipo">{moto.tipo}</span>
                    </div>
                    <h3 className="moto-card-title">
                      <a href={`/fichas-tecnicas/${moto.slug}`}>{moto.nombre_completo}</a>
                    </h3>
                    <div className="moto-card-specs">
                      <span>{moto.cilindraje}cc</span>
                      <span>{moto.potencia_hp} HP</span>
                      <span>{moto.consumo_km_l} km/l</span>
                      <span>{moto.peso_kg} kg</span>
                    </div>
                    <div className="moto-card-footer">
                      <span className="moto-precio">{formatCOP(moto.precio_cop)}</span>
                      <button
                        className={`btn btn-sm ${comparadas.includes(moto.id) ? 'btn-outline' : 'btn-primary'}`}
                        onClick={() => toggleComparar(moto.id)}
                      >
                        {comparadas.includes(moto.id) ? 'Quitar' : 'Comparar'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <aside className="fichas-sidebar">
          <div className="sidebar-card">
            <h4>¿Buscas noticias?</h4>
            <p>Mantente al día con las últimas noticias, lanzamientos y guías del mundo de las motos en Colombia.</p>
            <a href="/blog" className="btn btn-primary btn-sm">Ver noticias</a>
          </div>
        </aside>
      </div>
    </>
  )
}
