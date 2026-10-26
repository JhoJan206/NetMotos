import { useState } from 'react'
import { formatCOP } from '../utils/formatCurrency'

interface FormState {
  kmMes: number
  precioGalon: number
  consumoKmL: number
  categoria: string
}

interface Resultados {
  costoMesGasolina: number
  costoAnoGasolina: number
  soat: number
  mantenimiento: number
  totalAno: number
  totalMes: number
}

const LITROS_POR_GALON = 3.785

const CATEGORIAS: Record<string, { label: string; soat: number; mantenimiento: number }> = {
  ciclomotor: { label: 'Ciclomotor (hasta 50cc)', soat: 124100, mantenimiento: 250000 },
  menos100: { label: 'Menos de 100cc', soat: 256200, mantenimiento: 350000 },
  '100a200': { label: '100cc a 200cc', soat: 343300, mantenimiento: 450000 },
  motocarro: { label: 'Motocarro o tricimoto', soat: 386900, mantenimiento: 600000 },
  mas200: { label: 'Más de 200cc', soat: 761400, mantenimiento: 800000 },
}

export default function CalculadoraForm() {
  const [form, setForm] = useState<FormState>({
    kmMes: 500,
    precioGalon: 16000,
    consumoKmL: 50,
    categoria: '100a200',
  })

  const [resultados, setResultados] = useState<Resultados | null>(null)

  const calcular = (e: React.FormEvent) => {
    e.preventDefault()

    const consumo = form.consumoKmL > 0 ? form.consumoKmL : 1
    const litrosAno = (form.kmMes * 12) / consumo
    const litrosMes = form.kmMes / consumo
    const costoAnoGasolina = (litrosAno / LITROS_POR_GALON) * form.precioGalon
    const costoMesGasolina = (litrosMes / LITROS_POR_GALON) * form.precioGalon

    const categoria = CATEGORIAS[form.categoria] ?? CATEGORIAS['100a200']
    const soat = categoria.soat
    const mantenimiento = categoria.mantenimiento

    setResultados({
      costoMesGasolina: Math.round(costoMesGasolina),
      costoAnoGasolina: Math.round(costoAnoGasolina),
      soat,
      mantenimiento,
      totalAno: Math.round(costoAnoGasolina + soat + mantenimiento),
      totalMes: Math.round(costoMesGasolina + soat / 12 + mantenimiento / 12),
    })
  }

  return (
    <>
      <form className="calc-form" onSubmit={calcular}>
        <div className="calc-field">
          <label>Kilómetros por mes</label>
          <input
            type="number"
            value={form.kmMes}
            onChange={e => setForm(f => ({ ...f, kmMes: Number(e.target.value) }))}
            min={1}
            max={10000}
            required
          />
        </div>
        <div className="calc-field">
          <label>Precio del galón de gasolina corriente (COP)</label>
          <input
            type="number"
            value={form.precioGalon}
            onChange={e => setForm(f => ({ ...f, precioGalon: Number(e.target.value) }))}
            min={1000}
            max={50000}
            required
          />
        </div>
        <div className="calc-field">
          <label>Consumo de tu moto (km por litro)</label>
          <input
            type="number"
            value={form.consumoKmL}
            onChange={e => setForm(f => ({ ...f, consumoKmL: Number(e.target.value) }))}
            min={10}
            max={100}
            required
            step="0.5"
          />
        </div>
        <div className="calc-field">
          <label>Cilindraje (define el SOAT)</label>
          <select value={form.categoria} onChange={e => setForm(f => ({ ...f, categoria: e.target.value }))}>
            {Object.entries(CATEGORIAS).map(([value, { label }]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Calcular
        </button>
      </form>

      {resultados && (
        <div className="calc-results">
          <h3>Resultados Estimados</h3>
          <div className="results-grid">
            <div className="result-card">
              <span className="result-label">Gasolina / mes</span>
              <span className="result-value">{formatCOP(resultados.costoMesGasolina)}</span>
            </div>
            <div className="result-card">
              <span className="result-label">Gasolina / año</span>
              <span className="result-value">{formatCOP(resultados.costoAnoGasolina)}</span>
            </div>
            <div className="result-card">
              <span className="result-label">SOAT / año</span>
              <span className="result-value">{formatCOP(resultados.soat)}</span>
            </div>
            <div className="result-card">
              <span className="result-label">Mantenimiento / año</span>
              <span className="result-value">{formatCOP(resultados.mantenimiento)}</span>
            </div>
            <div className="result-card result-total">
              <span className="result-label">Total por mes</span>
              <span className="result-value">{formatCOP(resultados.totalMes)}</span>
            </div>
            <div className="result-card result-total">
              <span className="result-label">Total por año</span>
              <span className="result-value">{formatCOP(resultados.totalAno)}</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
