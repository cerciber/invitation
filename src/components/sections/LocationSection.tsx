'use client'

import { useEffect, useRef, useState } from 'react'

export function LocationSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [copied, setCopied] = useState(false)

  const address = 'Av. Ejemplo 123, Col. Centro, Ciudad Jardín'

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      // Silencioso; si el navegador no soporta clipboard, no rompe la UI
    }
  }

  useEffect(() => {
    const element = containerRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting && entry.intersectionRatio > 0.1),
      { root: null, threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] }
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="relative py-16 sm:py-20 bg-gradient-to-b from-white via-green-50/40 to-white overflow-hidden">
      {/* Fondo decorativo sutil */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(1200px 400px at 50% -10%, rgba(167,201,87,0.10), transparent 60%), radial-gradient(800px 300px at 50% 110%, rgba(167,201,87,0.08), transparent 60%)',
        }}
      />

      <div
        ref={containerRef}
        className={`relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 scroll-reveal ${isInView ? 'is-visible' : 'is-hidden'}`}
      >
        {/* Encabezado */}
        <div className="text-center">
          <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#2d5016]">¿Dónde?</h3>
          <p className="mt-1.5 text-[#6b8e23] font-serif text-sm sm:text-base">Ubicación del evento</p>
        </div>

        {/* Divisor floral */}
        <div className="mt-4 max-w-md mx-auto">
          <div className="floral-divider" />
        </div>

        {/* Contenido: Dirección + Mapa */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch">
          {/* Tarjeta de dirección */}
          <div className="rounded-xl border border-emerald-900/10 bg-white/80 backdrop-blur p-5 sm:p-6 shadow-sm">
            <h4 className="text-base sm:text-lg font-semibold text-[#2d5016]">Salón de Eventos</h4>
            <div className="mt-1 flex items-center gap-2">
              <p className="text-sm sm:text-base text-[#2d5016]/90">{address}</p>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center rounded-lg border border-[#2d5016]/20 px-2.5 py-1.5 text-xs sm:text-sm text-[#2d5016] bg-white hover:bg-[#f1f6ea] transition-colors"
              >
                {copied ? 'Copiado' : 'Copiar'}
              </button>
            </div>
            <p className="mt-1 text-sm text-[#6b8e23]/85">Fecha: 18 de Octubre, 2025 · 16:00 hrs</p>

            <div className="mt-4 flex flex-wrap gap-2">
              <a
                className="inline-flex items-center gap-2 rounded-lg bg-[#2d5016] px-3.5 py-2 text-white text-sm hover:bg-[#254513] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
              >
                Abrir en Google Maps
              </a>
              <a
                className="inline-flex items-center gap-2 rounded-lg border border-[#2d5016]/20 px-3.5 py-2 text-[#2d5016] text-sm bg-white hover:bg-[#f1f6ea] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                href={`https://waze.com/ul?q=${encodeURIComponent(address)}`}
              >
                Abrir en Waze
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


