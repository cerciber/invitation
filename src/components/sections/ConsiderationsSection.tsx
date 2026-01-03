'use client'

import { useEffect, useRef, useState } from 'react'

interface Consideration {
  id: string
  title: string
  description: string
  icon?: string
}

// Lista parametrizada de consideraciones
const considerations: Consideration[] = [
  {
    id: 'dress-code',
    title: 'Código de vestimenta',
      description: 'Ven **elegante** ✨ El blanco está reservado para los novios 💕',
    icon: '👔'
  },
  {
    id: 'timing',
    title: 'Horarios',
    description: 'Desde las **3:00 PM** y podrán estar hasta que amanezca 🌙',
    icon: '⏰'
  },
  {
    id: 'gifts',
    title: 'Regalos',
    description: '**No es necesario**, pero si desean obsequiarnos algo, los sobres son bienvenidos 💌',
    icon: '🎁'
  },
  {
    id: 'no-children',
    title: 'Solo adultos',
    description: '**Boda sin niños** para que disfruten sin preocupaciones 🥂',
    icon: '🔞'
  }
]

export function ConsiderationsSection() {
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
    <section className="relative py-8 sm:py-10 bg-gradient-to-b from-green-50/30 via-white to-green-50/30 overflow-hidden">
      {/* Fondo decorativo sutil */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(1000px 300px at 50% -10%, rgba(167,201,87,0.08), transparent 60%), radial-gradient(600px 200px at 50% 110%, rgba(167,201,87,0.06), transparent 60%)',
        }}
      />

      <div
        ref={containerRef}
        className={`relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 scroll-reveal ${isInView ? 'is-visible' : 'is-hidden'}`}
      >
        {/* Encabezado */}
        <div className="text-center">
          <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#2d5016]">Para tener en cuenta</h3>
          <p className="mt-1.5 text-[#6b8e23] font-serif text-sm sm:text-base">Información importante para el día especial</p>
        </div>

        {/* Divisor floral */}
        <div className="mt-4 max-w-md mx-auto">
          <div className="floral-divider" />
        </div>

        {/* Lista de consideraciones */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {considerations.map((consideration, index) => (
            <div
              key={consideration.id}
              className="rounded-xl border border-emerald-900/10 bg-white/80 backdrop-blur p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow duration-300"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              <div className="flex items-start gap-3">
                {consideration.icon && (
                  <span className="text-2xl flex-shrink-0 mt-0.5" role="img" aria-hidden="true">
                    {consideration.icon}
                  </span>
                )}
                <div className="flex-1 min-w-0">
                  <h4 className="text-base sm:text-lg font-semibold text-[#2d5016] mb-1">
                    {consideration.title}
                  </h4>
                  <p 
                    className="text-sm sm:text-base text-[#6b8e23]/90 leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: (consideration.description || 'Información próximamente')
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default ConsiderationsSection
