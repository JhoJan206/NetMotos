import { formatCOP } from '../utils/formatCurrency'

interface Moto {
  id: string
  nombre_completo: string
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
}

const SPEC_LABELS: Record<string, string> = {
  cilindraje: 'Cilindraje',
  potencia_hp: 'Potencia',
  torque_nm: 'Torque',
  alimentacion: 'Alimentación',
  transmision: 'Transmisión',
  combustible: 'Combustible',
  capacidad_tanque_l: 'Tanque',
  consumo_km_l: 'Consumo',
  peso_kg: 'Peso',
  altura_asiento_mm: 'Asiento',
  distancia_suelo_mm: 'Distancia al suelo',
  suspension_delantera: 'Susp. Delantera',
  suspension_trasera: 'Susp. Trasera',
  freno_delantero: 'Freno Del.',
  freno_trasero: 'Freno Tras.',
  precio_cop: 'Precio',
}

const SPEC_UNITS: Record<string, string> = {
  cilindraje: 'cc',
  potencia_hp: ' HP',
  torque_nm: ' Nm',
  capacidad_tanque_l: ' L',
  consumo_km_l: ' km/l',
  peso_kg: ' kg',
  altura_asiento_mm: ' mm',
  distancia_suelo_mm: ' mm',
}

const NUMERIC_KEYS = ['cilindraje', 'potencia_hp', 'torque_nm', 'capacidad_tanque_l', 'consumo_km_l', 'peso_kg', 'altura_asiento_mm', 'distancia_suelo_mm', 'precio_cop']

function formatValue(moto: Moto, key: string): string {
  if (key === 'precio_cop') return formatCOP((moto as any)[key])
  const val = (moto as any)[key]
  if (val === undefined || val === null) return '—'
  const unit = SPEC_UNITS[key] || ''
  return `${val}${unit}`
}

function isBetter(val: any, key: string, values: any[]): boolean {
  if (!NUMERIC_KEYS.includes(key)) return false
  const higherBetter = ['potencia_hp', 'torque_nm', 'capacidad_tanque_l', 'consumo_km_l', 'distancia_suelo_mm']
  const lowerBetter = ['peso_kg', 'altura_asiento_mm', 'precio_cop']
  const isHigher = higherBetter.includes(key)
  const isLower = lowerBetter.includes(key)
  if (!isHigher && !isLower) return false
  const nums = values.filter(v => typeof v === 'number' && !isNaN(v))
  if (nums.length < 2) return false
  return isHigher ? val === Math.max(...nums) : val === Math.min(...nums)
}

export default function ComparadorTable({ motos, onRemove }: { motos: Moto[]; onRemove: (id: string) => void }) {
  if (!motos || motos.length === 0) return null

  const specKeys = Object.keys(SPEC_LABELS)

  return (
    <div className="comparador-table-wrapper">
      <table className="comparador-table">
        <thead>
          <tr>
            <th className="spec-label-cell">Especificación</th>
            {motos.map(moto => (
              <th key={moto.id} className="moto-header-cell">
                <div className="moto-header-content">
                  <span className="moto-header-name">{moto.nombre_completo}</span>
                  <button className="btn-remove" onClick={() => onRemove(moto.id)} title="Quitar del comparador">✕</button>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {specKeys.map(key => {
            const values = motos.map(m => (m as any)[key])
            return (
              <tr key={key}>
                <td className="spec-label-cell">{SPEC_LABELS[key]}</td>
                {motos.map((moto, idx) => (
                  <td key={moto.id} className={isBetter((moto as any)[key], key, values) ? 'cell-best' : ''}>
                    {formatValue(moto, key)}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
