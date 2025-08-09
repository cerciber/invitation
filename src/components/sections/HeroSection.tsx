'use client'

import { useState, useRef } from 'react'

export function HeroSection() {
  const [isFlipped, setIsFlipped] = useState(false)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  const handleCardClick = () => {
    setIsFlipped(!isFlipped)
    // Resetear la rotación cuando se voltea la carta para que quede centrada
    setRotation({ x: 0, y: 0 })
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
  }

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

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-50 p-4">
      <div className="perspective-1000">
        <div
          ref={cardRef}
          className={`wedding-card ${isFlipped ? 'flipped' : ''}`}
          style={{
            transform: isFlipped 
              ? `rotateX(${rotation.x}deg) rotateY(${180 + rotation.y}deg)`
              : `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
          }}
          onClick={handleCardClick}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Frente de la invitación */}
          <div className="card-front">
            <div className="card-border">
              <div className="card-header">
                <div className="wedding-ornament"></div>
                <h2 className="wedding-title">Invitación de Boda</h2>
              </div>
              
              <div className="card-content">
                <div className="guest-name-container">
                  <div className="floral-divider"></div>
                  <h1 className="guest-name">NOMBRE_INVITADO</h1>
                  <div className="floral-divider"></div>
                </div>
                
                <div className="invitation-message">
                  <p className="main-message">Tienes el honor de estar invitado</p>
                  <p className="sub-message">a la celebración de nuestro amor</p>
                </div>
                
                <div className="decorative-elements">
                  <div className="wedding-rings"></div>
                  <div className="floral-elements">
                    <span>🌿</span>
                    <span>🌸</span>
                    <span>🌿</span>
                  </div>
                </div>
              </div>
              
              <div className="card-footer">
                <p className="wedding-date">Una celebración de amor eterno</p>
                <div className="elegant-flourish"></div>
              </div>
            </div>
          </div>

          {/* Reverso de la invitación */}
          <div className="card-back">
            <div className="card-border">
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
      
      <div className="tap-hint">
        <p className="text-green-600 text-sm mt-8">Desliza sobre la invitación • Toca para voltear</p>
      </div>
    </section>
  )
}
