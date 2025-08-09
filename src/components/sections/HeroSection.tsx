'use client'

import { useState, useRef } from 'react'

export function HeroSection() {
  const [isFlipped, setIsFlipped] = useState(false)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  const handleCardClick = () => {
    setIsFlipped(!isFlipped)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const mouseX = e.clientX
    const mouseY = e.clientY
    
    // Calcular la rotación basada en la posición del mouse
    const rotateY = ((mouseX - centerX) / (rect.width / 2)) * 15 // Max 15 grados
    const rotateX = ((centerY - mouseY) / (rect.height / 2)) * 15 // Max 15 grados
    
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
    const rotateY = ((touchX - centerX) / (rect.width / 2)) * 15
    const rotateX = ((centerY - touchY) / (rect.height / 2)) * 15
    
    setRotation({ x: rotateX, y: rotateY })
  }

  const handleTouchEnd = () => {
    // Volver a la posición normal cuando termina el toque
    setRotation({ x: 0, y: 0 })
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-4">
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
          {/* Frente de la carta */}
          <div className="card-front">
            <div className="card-border">
              <div className="card-header">
                <div className="holographic-bar"></div>
                <h2 className="card-title">INVITACIÓN ESPECIAL</h2>
              </div>
              
              <div className="card-content">
                <div className="guest-name-container">
                  <div className="decorative-ornament top"></div>
                  <h1 className="guest-name">NOMBRE_INVITADO</h1>
                  <div className="decorative-ornament bottom"></div>
                </div>
                
                <div className="invitation-message">
                  <p className="main-message">¡Estás invitado!</p>
                  <p className="sub-message">Tu pase a nuestra boda</p>
                </div>
                
                <div className="decorative-elements">
                  <div className="rings"></div>
                  <div className="hearts">
                    <span>♥</span>
                    <span>♥</span>
                    <span>♥</span>
                  </div>
                </div>
              </div>
              
              <div className="card-footer">
                <div className="rarity-symbol">★</div>
                <span className="card-type">WEDDING RARE</span>
              </div>
            </div>
          </div>

          {/* Reverso de la carta */}
          <div className="card-back">
            <div className="card-border">
              <div className="back-pattern"></div>
              
              <div className="event-details">
                <h3 className="event-title">Detalles del Evento</h3>
                
                <div className="detail-item">
                  <span className="label">Fecha:</span>
                  <span className="value">15 de Diciembre, 2024</span>
                </div>
                
                <div className="detail-item">
                  <span className="label">Hora:</span>
                  <span className="value">7:00 PM</span>
                </div>
                
                <div className="detail-item">
                  <span className="label">Lugar:</span>
                  <span className="value">Hacienda San José</span>
                </div>
                
                <div className="detail-item">
                  <span className="label">Dress Code:</span>
                  <span className="value">Formal Elegante</span>
                </div>
              </div>
              
              <div className="back-footer">
                <div className="wedding-symbols">
                  <span>💍</span>
                  <span>🌹</span>
                  <span>💍</span>
                </div>
                <p className="back-text">Carta de Invitación Oficial</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="tap-hint">
        <p className="text-gray-600 text-sm mt-8">Mueve el cursor sobre la carta • Toca para voltear</p>
      </div>
    </section>
  )
}
