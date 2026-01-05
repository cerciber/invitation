'use client'

import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { getGuestByCode } from '@/data/guests'
import { getTexts } from '@/data/dogTexts'

export function DressCodeSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  // Obtener información del invitado para modo perro
  const searchParams = useSearchParams()
  const code = typeof searchParams.get('codigo') === 'string' ? searchParams.get('codigo') : undefined
  const guestInfo = code ? getGuestByCode(code) : null
  const dogTexts = getTexts(guestInfo?.dog || false)

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

  const getParallax = (intensity = 8) => {
    // Desactivar parallax en móvil para mejor rendimiento
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return {}
    }
    return {
      transform: `translate3d(${(mouse.x * intensity).toFixed(2)}px, ${(mouse.y * intensity).toFixed(2)}px, 0)`
    }
  }

  return (
    <section className="relative py-8 sm:py-10 bg-gradient-to-b from-white via-green-50/30 to-white overflow-hidden">
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
        className={`relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 scroll-reveal ${isInView ? 'is-visible' : 'is-hidden'}`}
      >
        {/* Encabezado */}
        <div className="text-center reveal-header">
          <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#2d5016]">
            {dogTexts?.dressCodeTitle || 'Código de vestimenta'}
          </h3>
          <p className="mt-1.5 text-[#6b8e23] font-serif text-sm sm:text-base">
            {dogTexts?.dressCodeSubtitle || 'Completamente opcional'}
          </p>
        </div>

        {/* Divisor */}
        <div className="mt-4 max-w-md mx-auto reveal-divider">
          <div className="floral-divider" />
        </div>

        {/* Descripción */}
        <div className="mt-6 text-center max-w-2xl mx-auto px-2">
          <p 
            className="text-[#2d5016]/80 text-sm sm:text-base leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: (dogTexts?.dressCodeDescription || 
                'Si deseas seguir una guía de vestimenta, aquí tienes algunas sugerencias. Recuerda que es completamente **opcional** y lo más importante es que te sientas cómodo y disfrutes de nuestra celebración ✨'
              ).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            }}
          />
        </div>

        {/* Galería de códigos de vestimenta para damas */}
        <div className="relative mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-3xl mx-auto">
          {/* Card 1 - Opción 1 para Damas */}
          <div
            className="relative group"
            style={getParallax(8)}
          >
            {/* Cinta decorativa */}
            <div className="absolute -top-2 left-4 sm:left-8 w-16 sm:w-20 h-5 sm:h-6 bg-[#d4e09b]/80 rotate-[-6deg] rounded-[2px] shadow-sm" />
            <figure className="relative bg-white rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.12)] border border-[#2d5016]/15 rotate-[-2deg] transition-transform duration-300 group-hover:rotate-[-0.5deg]">
              <div className="relative w-full h-96 sm:h-[500px]">
                <Image 
                  src="/assets/dress-code-1.jpeg" 
                  alt="Código de vestimenta para damas - Opción 1" 
                  fill 
                  className="object-contain rounded-t-xl" 
                  sizes="(max-width: 1024px) 100vw, 50vw" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent rounded-t-xl" />
              </div>
              <figcaption className="px-4 sm:px-6 py-3 sm:py-4">
                <h4 className="text-[#2d5016] font-semibold text-base sm:text-lg text-center">
                  {dogTexts?.womenDressCodeTitle || 'Opción 1'}
                </h4>
              </figcaption>
            </figure>
          </div>

          {/* Card 2 - Opción 2 para Damas */}
          <div
            className="relative group"
            style={getParallax(10)}
          >
            {/* Cinta decorativa doble */}
            <div className="absolute -top-2 right-6 sm:right-10 w-16 sm:w-18 h-5 sm:h-6 bg-[#a7c957]/80 rotate-[5deg] rounded-[2px] shadow-sm" />
            <div className="absolute -top-3 right-16 sm:right-24 w-14 sm:w-16 h-5 sm:h-6 bg-[#9cb834]/70 rotate-[-3deg] rounded-[2px] shadow-sm" />
            <figure className="relative bg-white rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.12)] border border-[#2d5016]/15 rotate-[1.5deg] transition-transform duration-300 group-hover:rotate-[0.5deg]">
              <div className="relative w-full h-96 sm:h-[500px]">
                <Image 
                  src="/assets/dress-code-2.jpeg" 
                  alt="Código de vestimenta para damas - Opción 2" 
                  fill 
                  className="object-contain rounded-t-xl" 
                  sizes="(max-width: 1024px) 100vw, 50vw" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent rounded-t-xl" />
              </div>
              <figcaption className="px-4 sm:px-6 py-3 sm:py-4">
                <h4 className="text-[#2d5016] font-semibold text-base sm:text-lg text-center">
                  {dogTexts?.womenDressCodeTitle || 'Opción 2'}
                </h4>
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Nota adicional */}
        <div className="mt-8 text-center px-4">
          <p className="text-[#6b8e23] text-xs sm:text-sm italic leading-relaxed">
            {dogTexts?.dressCodeNote || 
              '💡 Recuerda: El blanco está reservado para los novios. ¡Lo importante es que vengas y celebres con nosotros!'
            }
          </p>
        </div>
      </div>
    </section>
  )
}

export default DressCodeSection
