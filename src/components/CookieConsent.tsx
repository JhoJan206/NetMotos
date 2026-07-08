import { useState, useEffect } from 'react'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const accepted = localStorage.getItem('cookies-accepted')
    if (!accepted) {
      setVisible(true)
    } else if (accepted === 'all' && typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
        analytics_storage: 'granted',
      })
    }
  }, [])

  const acceptAll = () => {
    localStorage.setItem('cookies-accepted', 'all')
    setVisible(false)
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
        analytics_storage: 'granted',
      })
    }
  }

  const reject = () => {
    localStorage.setItem('cookies-accepted', 'essential')
    setVisible(false)
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        analytics_storage: 'denied',
      })
    }
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
