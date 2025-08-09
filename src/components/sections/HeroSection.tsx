'use client'

import { useState, useRef, useEffect } from 'react'
import { getGuestByCode, getDefaultGuestName } from '@/data/guests'

interface HeroSectionProps {
  guestCode?: string
}

export function HeroSection({ guestCode }: HeroSectionProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [isInteracting, setIsInteracting] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // Obtener información del invitado basada en el código
  const guestInfo = guestCode ? getGuestByCode(guestCode) : null
  const guestName = guestInfo?.name || getDefaultGuestName()

  const handleCardClick = () => {
    setIsFlipped(!isFlipped)
    // Resetear la rotación cuando se voltea la carta para que quede centrada
    setRotation({ x: 0, y: 0 })
  }

  // Prevenir zoom por doble clic
  const handleDoubleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    return false
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const mouseX = e.clientX
    const mouseY = e.clientY
    
    // Calcular la rotación basada en la posición del mouse
    const rotateY = Math.max(-15, Math.min(15, ((mouseX - centerX) / (rect.width / 2)) * 25)) // Limitado a ±15°
    const rotateX = Math.max(-15, Math.min(15, ((centerY - mouseY) / (rect.height / 2)) * 25)) // Limitado a ±15°
    
    setRotation({ x: rotateX, y: rotateY })
  }

  const handleMouseLeave = () => {
    // Volver a la posición normal cuando el mouse sale
    setRotation({ x: 0, y: 0 })
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!cardRef.current) return
    
    const touch = e.touches[0]
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const touchX = touch.clientX
    const touchY = touch.clientY
    
    // Calcular la rotación basada en la posición del toque
    const rotateY = Math.max(-15, Math.min(15, ((touchX - centerX) / (rect.width / 2)) * 30)) // Limitado a ±15°
    const rotateX = Math.max(-15, Math.min(15, ((centerY - touchY) / (rect.height / 2)) * 30)) // Limitado a ±15°
    
    setRotation({ x: rotateX, y: rotateY })
  }

  const handleTouchEnd = () => {
    // Volver a la posición normal cuando termina el toque
    setRotation({ x: 0, y: 0 })
    setIsInteracting(false)
  }

  const handleInteractionStart = () => {
    setIsInteracting(true)
  }

  const handleMouseUp = () => {
    setIsInteracting(false)
  }

  // Efecto para bloquear el scroll de la página mientras se interactúa con la tarjeta
  useEffect(() => {
    if (!isInteracting) return

    const preventDefaultIfCancelable = (event: Event) => {
      if ((event as any).cancelable) {
        event.preventDefault()
      }
    }

    const endInteraction = () => setIsInteracting(false)

    const originalBodyOverflow = document.body.style.overflow
    const originalHtmlOverflow = document.documentElement.style.overflow
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'

    window.addEventListener('wheel', preventDefaultIfCancelable, { passive: false })
    window.addEventListener('touchmove', preventDefaultIfCancelable, { passive: false })
    window.addEventListener('mouseup', endInteraction)
    window.addEventListener('touchend', endInteraction)

    return () => {
      document.body.style.overflow = originalBodyOverflow
      document.documentElement.style.overflow = originalHtmlOverflow
      window.removeEventListener('wheel', preventDefaultIfCancelable as EventListener)
      window.removeEventListener('touchmove', preventDefaultIfCancelable as EventListener)
      window.removeEventListener('mouseup', endInteraction)
      window.removeEventListener('touchend', endInteraction)
    }
  }, [isInteracting])

  // Función para el efecto paralaje de la foto
  const getPhotoParallaxStyle = () => {
    // Movimiento sutil en dirección opuesta a la rotación de la carta
    const offsetX = rotation.y * -0.8 // Aumentado para mayor visibilidad
    const offsetY = rotation.x * 0.5  // Aumentado para mayor efecto
    
    return {
      transform: `translate(${offsetX}px, ${offsetY}px) scale(1.05)`,
      transition: 'transform 0.15s ease-out' // Más rápida para mayor responsividad
    }
  }

  // Función para el efecto paralaje de elementos del frente
  const getFrontParallaxStyle = (intensity = 1) => {
    // Movimiento más pronunciado para que sea más visible
    const offsetX = rotation.y * -1.2 * intensity
    const offsetY = rotation.x * 0.8 * intensity
    
    return {
      transform: `translate(${offsetX}px, ${offsetY}px)`,
      transition: 'transform 0.15s ease-out'
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-50 p-4">
      <div className="perspective-1000">
        <div
          ref={cardRef}
          className={`wedding-card ${isFlipped ? 'flipped' : ''}`}
          style={{
            touchAction: isInteracting ? 'none' as const : 'manipulation' as const,
            transform: isFlipped 
              ? `rotateX(${rotation.x}deg) rotateY(${180 + rotation.y}deg)`
              : `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
          }}
          onClick={handleCardClick}
          onDoubleClick={handleDoubleClick}
          onMouseMove={handleMouseMove}
          onMouseDown={handleInteractionStart}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleInteractionStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Frente de la invitación */}
          <div className="card-front">
            <div className="card-border">
              <div className="card-header">
                <div className="wedding-ornament" style={getFrontParallaxStyle(1.2)}></div>
                <h2 className="wedding-title" style={getFrontParallaxStyle(0.7)}>Invitación de Boda</h2>
              </div>
              
              <div className="card-content">
                <div className="guest-name-container">
                  <div className="floral-divider" style={getFrontParallaxStyle(1.5)}></div>
                  <h1 className="guest-name" style={getFrontParallaxStyle(0.8)}>Denis & Cesar</h1>
                  <div className="floral-divider" style={getFrontParallaxStyle(1.5)}></div>
                </div>
                
                <div className="invitation-message" style={getFrontParallaxStyle(0.6)}>
                  <p className="main-message">{guestName} te queremos invitar a nuestra boda!</p>
                  <p className="sub-message">a la celebración de nuestro amor</p>
                </div>
                
                <div className="decorative-elements">
                  <div className="floral-elements" style={getFrontParallaxStyle(1.8)}>
                    <span>🌿</span>
                    <span>🌿</span>
                    <span>🌿</span>
                  </div>
                </div>
              </div>
              
              <div className="card-footer">
                <p className="wedding-date" style={getFrontParallaxStyle(0.5)}>Una celebración de amor eterno</p>
                <div className="elegant-flourish" style={getFrontParallaxStyle(1.4)}></div>
              </div>
            </div>
          </div>

          {/* Reverso de la invitación */}
          <div className="card-back">
            <div className="card-border">
              {/* Elementos decorativos elegantes */}
              <div className="back-decorative-elements">
                {/* Hojas decorativas en las esquinas */}
                <div className="corner-leaves">
                  <div className="leaf leaf-top-left" style={getFrontParallaxStyle(2.2)}></div>
                  <div className="leaf leaf-top-right" style={getFrontParallaxStyle(1.8)}></div>
                  <div className="leaf leaf-bottom-left" style={getFrontParallaxStyle(2.5)}></div>
                  <div className="leaf leaf-bottom-right" style={getFrontParallaxStyle(1.9)}></div>
                </div>
                
                {/* Ornamentos florales en los bordes */}
                <div className="border-ornaments">
                  <div className="ornament ornament-top" style={getFrontParallaxStyle(1.5)}></div>
                  <div className="ornament ornament-bottom" style={getFrontParallaxStyle(1.7)}></div>
                  <div className="ornament ornament-left" style={getFrontParallaxStyle(2.0)}></div>
                  <div className="ornament ornament-right" style={getFrontParallaxStyle(1.6)}></div>
                </div>
                
                {/* Detalles florales sutiles */}
                <div className="floating-details">
                  <div className="detail detail-1" style={getFrontParallaxStyle(2.8)}></div>
                  <div className="detail detail-2" style={getFrontParallaxStyle(1.4)}></div>
                  <div className="detail detail-3" style={getFrontParallaxStyle(2.1)}></div>
                  <div className="detail detail-4" style={getFrontParallaxStyle(1.9)}></div>
                </div>
              </div>
              
              <div className="photo-container">
                <img 
                  src="/assets/photo-1.jpeg" 
                  alt="Foto de la pareja" 
                  className="couple-photo"
                  style={getPhotoParallaxStyle()}
                />
                <div className="photo-overlay"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
