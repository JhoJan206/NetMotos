import { useState, useEffect } from 'react'
import type { ReactNode } from 'react'

interface MotoItem {
  id: string
}

export default function CompararBoton({ motoId }: { motoId: string }) {
  const [enComparador, setEnComparador] = useState(false)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const saved = sessionStorage.getItem('comparador')
    const list: MotoItem[] = saved ? JSON.parse(saved) : []
    setEnComparador(list.some((m: MotoItem) => m.id === motoId))
    setCount(list.length)
  }, [motoId])

  const toggle = () => {
    const saved = sessionStorage.getItem('comparador')
    let list: MotoItem[] = saved ? JSON.parse(saved) : []
    const exists = list.findIndex((m: MotoItem) => m.id === motoId)
    if (exists >= 0) {
      list = list.filter((m: MotoItem) => m.id !== motoId)
    } else {
      if (list.length >= 3) list = list.slice(1)
      list.push({ id: motoId })
    }
    sessionStorage.setItem('comparador', JSON.stringify(list))
    setEnComparador(!exists)
    setCount(list.length)
  }

  return (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
      <button className={`btn ${enComparador ? 'btn-outline' : 'btn-primary'}`} onClick={toggle}>
        {enComparador ? 'Quitar del comparador' : 'Agregar al comparador'}
      </button>
      {count > 0 && (
        <a href="/comparador" className="btn btn-secondary">
          Ver comparador ({count})
        </a>
      )}
    </div>
  )
}
