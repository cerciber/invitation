'use client'

import { useEffect, useRef, useState } from 'react'

export function LocationSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

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
          <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-emerald-900">¿Dónde?</h3>
          <p className="mt-1.5 text-emerald-800/90 font-serif text-sm sm:text-base">Ubicación del evento</p>
        </div>

        {/* Divisor floral */}
        <div className="mt-4 max-w-md mx-auto">
          <div className="floral-divider" />
        </div>

        {/* Contenido: Dirección + Mapa */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch">
          {/* Tarjeta de dirección */}
          <div className="rounded-xl border border-emerald-900/10 bg-white/80 backdrop-blur p-5 sm:p-6 shadow-sm">
            <h4 className="text-base sm:text-lg font-semibold text-emerald-900">Salón de Eventos</h4>
            <p className="mt-1 text-sm sm:text-base text-emerald-900/90">
              Av. Ejemplo 123, Col. Centro, Ciudad Jardín
            </p>
            <p className="mt-1 text-sm text-emerald-800/80">Fecha: 18 de Octubre, 2025 · 16:00 hrs</p>

            <div className="mt-4 flex flex-wrap gap-2">
              <a
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-3.5 py-2 text-white text-sm hover:bg-emerald-800 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Av. Ejemplo 123, Col. Centro, Ciudad Jardín')}`}
              >
                Abrir en Google Maps
              </a>
              <a
                className="inline-flex items-center gap-2 rounded-lg border border-emerald-900/15 px-3.5 py-2 text-emerald-900 text-sm bg-white hover:bg-emerald-50 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                href={`https://waze.com/ul?q=${encodeURIComponent('Av. Ejemplo 123, Col. Centro, Ciudad Jardín')}`}
              >
                Abrir en Waze
              </a>
            </div>
          </div>

          {/* Mapa embebido */}
          <div className="rounded-xl overflow-hidden border border-emerald-900/10 shadow-sm bg-white/60">
            <iframe
              title="Mapa de ubicación"
              className="w-full h-[260px] sm:h-[320px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.0000000000005!2d-99.133208!3d19.432607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0000000000000000%3A0x0000000000000000!2sLugar%20de%20Ejemplo!5e0!3m2!1ses!2smx!4v1700000000000"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  )
}


