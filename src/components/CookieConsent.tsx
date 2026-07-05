import { useState, useEffect } from 'react'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const accepted = localStorage.getItem('cookies-accepted')
    if (!accepted) setVisible(true)
  }, [])

  const acceptAll = () => {
    localStorage.setItem('cookies-accepted', 'all')
    setVisible(false)
  }

  const reject = () => {
    localStorage.setItem('cookies-accepted', 'essential')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="cookie-consent">
      <div className="cookie-consent-content">
        <p>
          NetMotos utiliza cookies propias y de terceros (Google AdSense, Google Analytics) para mejorar tu experiencia y mostrar anuncios relevantes.
        </p>
        <p className="cookie-consent-meta">
          <a href="/privacidad">Más información</a>
        </p>
      </div>
      <div className="cookie-consent-actions">
        <button className="btn btn-outline btn-sm" onClick={reject}>Solo esenciales</button>
        <button className="btn btn-primary btn-sm" onClick={acceptAll}>Aceptar todas</button>
      </div>
    </div>
  )
}
