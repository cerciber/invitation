'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

export function StorySection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

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

  // Parallax sutil con el mouse
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - (rect.left + rect.width / 2)) / rect.width
      const y = (e.clientY - (rect.top + rect.height / 2)) / rect.height
      setMouse({ x, y })
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  const getParallax = (intensity = 8) => ({
    transform: `translate3d(${(mouse.x * intensity).toFixed(2)}px, ${(mouse.y * intensity).toFixed(2)}px, 0)`
  })

  return (
    <section className="relative py-16 sm:py-20 bg-gradient-to-b from-white via-green-50/30 to-white overflow-hidden">
      {/* Fondo decorativo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(1000px 360px at 50% -10%, rgba(167,201,87,0.10), transparent 60%), radial-gradient(700px 260px at 50% 110%, rgba(167,201,87,0.08), transparent 60%)',
        }}
      />

      <div
        ref={containerRef}
        className={`relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 scroll-reveal ${isInView ? 'is-visible' : 'is-hidden'}`}
      >
        {/* Encabezado */}
        <div className="text-center reveal-header">
          <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#2d5016]">Nuestra historia</h3>
          <p className="mt-1.5 text-[#6b8e23] font-serif text-sm sm:text-base">Un mural de recuerdos</p>
        </div>

        {/* Divisor */}
        <div className="mt-4 max-w-md mx-auto reveal-divider">
          <div className="floral-divider" />
        </div>

        {/* Collage tipo polaroid con cintas y parallax sutil */}
        <div className="relative mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {/* Card 1 */}
          <div
            className="relative group"
            style={getParallax(10)}
          >
            {/* Cinta */}
            <div className="absolute -top-3 left-7 w-16 h-6 bg-[#d4e09b]/80 rotate-[-8deg] rounded-[2px] shadow-sm" />
            <figure className="relative bg-white rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.12)] border border-[#2d5016]/15 rotate-[-3.5deg] transition-transform duration-300 group-hover:rotate-[-1deg]">
              <div className="relative w-full h-64 sm:h-72">
                <Image src="/assets/photo-1.jpeg" alt="Cómo nos conocimos" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
              </div>
              <figcaption className="px-4 py-3">
                <h4 className="text-[#2d5016] font-semibold">Cómo nos conocimos</h4>
                <p className="mt-1 text-sm text-[#2d5016]/85">Una coincidencia que cambió todo.</p>
              </figcaption>
            </figure>
          </div>

          {/* Card 2 */}
          <div
            className="relative group"
            style={getParallax(6)}
          >
            {/* Cinta */}
            <div className="absolute -top-3 right-8 w-16 h-6 bg-[#a7c957]/80 rotate-[7deg] rounded-[2px] shadow-sm" />
            <figure className="relative bg-white rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.12)] border border-[#2d5016]/15 rotate-[2.5deg] transition-transform duration-300 group-hover:rotate-[0.5deg]">
              <div className="relative w-full h-64 sm:h-72">
                <Image src="/assets/photo-1.jpeg" alt="Nuestra primera cita" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
              </div>
              <figcaption className="px-4 py-3">
                <h4 className="text-[#2d5016] font-semibold">Nuestra primera cita</h4>
                <p className="mt-1 text-sm text-[#2d5016]/85">Conversaciones que nunca terminaban.</p>
              </figcaption>
            </figure>
          </div>

          {/* Card 3 */}
          <div
            className="relative group"
            style={getParallax(12)}
          >
            {/* Cinta doble */}
            <div className="absolute -top-3 left-10 w-14 h-6 bg-[#d4e09b]/80 rotate-[-4deg] rounded-[2px] shadow-sm" />
            <div className="absolute -top-4 left-24 w-14 h-6 bg-[#9cb834]/70 rotate-[8deg] rounded-[2px] shadow-sm" />
            <figure className="relative bg-white rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.12)] border border-[#2d5016]/15 -rotate-2 transition-transform duration-300 group-hover:rotate-0">
              <div className="relative w-full h-64 sm:h-72">
                <Image src="/assets/photo-1.jpeg" alt="La propuesta" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
              </div>
              <figcaption className="px-4 py-3">
                <h4 className="text-[#2d5016] font-semibold">La propuesta</h4>
                <p className="mt-1 text-sm text-[#2d5016]/85">Un sí que guardaremos para siempre.</p>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  )
}

export default StorySection


