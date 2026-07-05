import { useState, useEffect } from 'react'
import ComparadorTable from './ComparadorTable'
import { formatCOP } from '../utils/formatCurrency'

interface Moto {
  id: string
  nombre_completo: string
  slug: string
  cilindraje: number
  potencia_hp: number
  torque_nm: number
  alimentacion: string
  transmision: string
  combustible: string
  capacidad_tanque_l: number
  consumo_km_l: number
  peso_kg: number
  altura_asiento_mm: number
  distancia_suelo_mm: number
  suspension_delantera: string
  suspension_trasera: string
  freno_delantero: string
  freno_trasero: string
  precio_cop: number
  marca: string
  modelo: string
  tipo: string
  imagen?: string
}

export default function ComparadorApp({ motos: motosJson }: { motos: string }) {
  const allMotos: Moto[] = JSON.parse(motosJson)
  const [selected, setSelected] = useState<Moto[]>([])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const saved = sessionStorage.getItem('comparador')
    if (saved) {
      const parsed = JSON.parse(saved)
      const motos = parsed.map((m: any) => allMotos.find(moto => moto.id === m.id)).filter(Boolean)
      setSelected(motos)
    }
    setReady(true)
  }, [allMotos])

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value
    if (!id) return
    const moto = allMotos.find(m => m.id === id)
    if (!moto) return
    setSelected(prev => {
      if (prev.find(m => m.id === moto.id)) return prev
      const next = prev.length >= 3 ? [...prev.slice(1), moto] : [...prev, moto]
      sessionStorage.setItem('comparador', JSON.stringify(next.map(m => ({ id: m.id }))))
      return next
    })
  }

  const handleRemove = (id: string) => {
    setSelected(prev => {
      const next = prev.filter(m => m.id !== id)
      sessionStorage.setItem('comparador', JSON.stringify(next.map(m => ({ id: m.id }))))
      return next
    })
  }

  const disponibles = allMotos.filter(m => !selected.find(s => s.id === m.id))

  if (!ready) return <div style={{ padding: '40px', textAlign: 'center' }}>Cargando...</div>

  return (
    <>
      <div className="comparador-selector">
        <p className="comparador-subtitle">Selecciona hasta 3 motos para comparar sus especificaciones lado a lado.</p>
        <div className="comparador-selects">
          {[0, 1, 2].map(idx => (
            <select key={idx} value={selected[idx]?.id || ''} onChange={handleSelect}>
              <option value="">Moto {idx + 1}</option>
              {allMotos.map(m => (
                <option key={m.id} value={m.id} disabled={!!selected.find(s => s.id === m.id && s.id !== selected[idx]?.id)}>
                  {m.nombre_completo}
                </option>
              ))}
            </select>
          ))}
        </div>
      </div>

      {selected.length === 0 && (
        <div className="comparador-empty">
          <div className="grid-3">
            {allMotos.slice(0, 6).map(moto => (
              <div key={moto.id} className="moto-card">
                <a href={`/fichas-tecnicas/${moto.slug}`} className="moto-card-image">
                  <div className="moto-card-placeholder">
                    <span className="moto-initial">{moto.modelo[0]}</span>
                  </div>
                </a>
                <div className="moto-card-body">
                  <div className="moto-card-header">
                    <span className="moto-marca">{moto.marca}</span>
                    <span className="moto-tipo">{moto.tipo}</span>
                  </div>
                  <h3 className="moto-card-title">{moto.nombre_completo}</h3>
                  <div className="moto-card-specs">
                    <span>{moto.cilindraje}cc</span>
                    <span>{moto.potencia_hp} HP</span>
                    <span>{moto.consumo_km_l} km/l</span>
                    <span>{moto.peso_kg} kg</span>
                  </div>
                  <div className="moto-card-footer">
                    <span className="moto-precio">{formatCOP(moto.precio_cop)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selected.length > 0 && (
        <div className="comparador-selected">
          <div className="selected-chips">
            {selected.map(m => (
              <span key={m.id} className="selected-chip">
                {m.nombre_completo}
                <button onClick={() => handleRemove(m.id)}>✕</button>
              </span>
            ))}
          </div>
          <ComparadorTable motos={selected} onRemove={handleRemove} />
        </div>
      )}
    </>
  )
}
