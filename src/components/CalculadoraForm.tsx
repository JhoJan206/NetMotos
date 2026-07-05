import { useState } from 'react'
import { formatCOP } from '../utils/formatCurrency'

interface FormState {
  kmMes: number
  precioGalon: number
  consumoKmL: number
  cilindraje: string
}

interface Resultados {
  costoMesGasolina: number
  costoAnoGasolina: number
  soat: number
  mantenimiento: number
  totalAno: number
  totalMes: number
}

const soatPorCilindraje: Record<string, number> = {
  '100': 256200,
  '200': 343300,
  '400': 543300,
  '600': 761400,
  'mayor': 989800,
}

const mantenimientoAnual: Record<string, number> = {
  '100': 350000,
  '125': 400000,
  '200': 500000,
  '400': 600000,
  '600': 800000,
  'mayor': 1200000,
}

export default function CalculadoraForm() {
  const [form, setForm] = useState<FormState>({
    kmMes: 500,
    precioGalon: 16000,
    consumoKmL: 50,
    cilindraje: '125',
  })

  const [resultados, setResultados] = useState<Resultados | null>(null)

  const calcular = (e: React.FormEvent) => {
    e.preventDefault()
    const kmAno = form.kmMes * 12
    const galonesAno = kmAno / form.consumoKmL
    const costoAnoGasolina = galonesAno * form.precioGalon
    const costoMesGasolina = (form.kmMes / form.consumoKmL) * form.precioGalon
    const cil = form.cilindraje
    const soat = soatPorCilindraje[cil] || soatPorCilindraje['125']
    const mantenimiento = mantenimientoAnual[cil] || mantenimientoAnual['125']

    setResultados({
      costoMesGasolina: Math.round(costoMesGasolina),
      costoAnoGasolina: Math.round(costoAnoGasolina),
      soat,
      mantenimiento,
      totalAno: Math.round(costoAnoGasolina + soat + mantenimiento),
      totalMes: Math.round(costoMesGasolina + (soat / 12) + (mantenimiento / 12)),
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
            min={1} max={10000} required
          />
        </div>
        <div className="calc-field">
          <label>Precio del galón de gasolina corriente (COP)</label>
          <input
            type="number"
            value={form.precioGalon}
            onChange={e => setForm(f => ({ ...f, precioGalon: Number(e.target.value) }))}
            min={1000} max={50000} required
          />
        </div>
        <div className="calc-field">
          <label>Consumo de tu moto (km/l)</label>
          <input
            type="number"
            value={form.consumoKmL}
            onChange={e => setForm(f => ({ ...f, consumoKmL: Number(e.target.value) }))}
            min={10} max={100} required step="0.5"
          />
        </div>
        <div className="calc-field">
          <label>Cilindraje (para SOAT y mantenimiento)</label>
          <select value={form.cilindraje} onChange={e => setForm(f => ({ ...f, cilindraje: e.target.value }))}>
            <option value="100">Menos de 100cc</option>
            <option value="200">100cc - 200cc</option>
            <option value="400">200cc - 400cc</option>
            <option value="600">400cc - 600cc</option>
            <option value="mayor">Más de 600cc</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Calcular</button>
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
